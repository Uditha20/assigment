import React from 'react'

function LandImageDiv(props) {
    return (
        <>
            <section className="jarallax min-height300 padding-large site-banner "
                style={{
                    backgroundImage: `url(${props.img})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="page-title">{props.pageName}</h1>
                            <div className="breadcrumbs">
                                <span className="item">
                                    <a href="index.html">{props.name1}</a>
                                </span>
                                <span className="item">{props.name2}</span>
                                <span className="item">
                                    <a href="login.html">{props.name3}</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandImageDiv