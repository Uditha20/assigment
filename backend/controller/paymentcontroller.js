import Payment from "../model/paymentModel.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { CustomError } from "../utils/customerError.js";
import Stripe from "stripe";

const addOrder = asyncErrorHandler(async (req, res, next) => {
  const { user, items, total, billDetails } = req.body;
  const addOrder = await Payment.create({ user, items, total, billDetails });
  return res.status(201).json({ message: "Order placed successfully." });
});

const paymentSession = asyncErrorHandler(async (req, res, next) => {
  const stripe = Stripe(
    process.env.STRIPE
  );
  const { total } = req.body;
  const totalAmountInCents = parseInt(parseFloat(total) * 100);
  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: "Total Order Amount",
        },
        unit_amount: totalAmountInCents,
      },
      quantity: 1,
    },
  ];

  const session = await await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/",
    cancel_url: "http://localhost:5173/Login",
  });

  res.json({ id: session.id });
});

const getOrdersByUser = asyncErrorHandler(async (req, res, next) => {
  const userId = req.params.userId; // Assuming you're getting the user ID from the route parameters
  const userOrders = await Payment.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "items.product",
      model: "product",
    });

  if (!userOrders) {
    return res.status(404).send("No orders found for this user.");
  }

  res.json(userOrders);
});
export { addOrder, getOrdersByUser, paymentSession };
