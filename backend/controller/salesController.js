import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { CustomError } from "../utils/customerError.js";
import Payment from "../model/salesModel.js";

const addPayment = asyncErrorHandler(async (req, res, next) => {
    try {
      const {
        name,
        address,
        apartment,
        town,
        phoneNo,
        email,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
        total
      } = req.body;
  
      const newPayment = new Payment({
        name,
        address,
        apartment,
        town,
        phoneNo,
        email,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvv,
        total
      });
  
      await newPayment.save();
  
      return res.status(201).json({ message: "Payment added successfully", newPayment });
    } catch (err) {
      const error = new CustomError(err, 404);
      return next(error);
    }
  });


  const getAllpayemt = asyncErrorHandler(async (req, res, next) => {
    const payments = await Payment.aggregate([
      // Lookup to join with the user collection
      {
        $lookup: {
          from: 'users', // Name of the user collection in MongoDB
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      // Unwind the userDetails array (if you expect only one user per payment)
      {
        $unwind: '$userDetails',
      },
      // Lookup to join with the product collection for each item in the items array
      {
        $unwind: '$items',
      },
      {
        $lookup: {
          from: 'products', // Name of the product collection in MongoDB
          localField: 'items.product',
          foreignField: '_id',
          as: 'items.productDetails',
        },
      },
      // Unwind the productDetails array (if you expect only one product per item)
      {
        $unwind: '$items.productDetails',
      },
      // Group back the items into an array after unwinding
      {
        $group: {
          _id: '$_id',
          user: { $first: '$user' },
          userDetails: { $first: '$userDetails' },
          items: { $push: '$items' },
          billDetails: { $first: '$billDetails' },
          total: { $first: '$total' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
        },
      },
    
    ]);
  
    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  });
  
  
  

  export {addPayment,getAllpayemt};