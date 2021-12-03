import React from 'react';

const InfoPanel = ({selectedCoin})=>{
    return (
        <>
            <div className="row align-items-center blue-coin-panel box-shadow">
                {/* image */}
                <div className="col-md-3">
                    <div className="row my-2 mx-2 bg-white img-bg-box shadow">
                    <center>{selectedCoin.img == null? '' : <img className="coin-img py-2" src={selectedCoin.img} alt="" />}</center>
                    </div>
                </div>
                {/* price */}
                <div className="col-md-6 display-5 text-dark">
                    <div className="row my-2 mx-2 bg-white img-bg-box shadow">
                    <center>{selectedCoin.price == null? '' : `₹${selectedCoin.price}`}</center>
                    </div>
                </div>
                {/* price change */}
                <div className="col-md-3 display-5 text-dark">
                    <div className="row my-2 mx-2 bg-white img-bg-box shadow">
                    <center>{selectedCoin.change == null? '' : selectedCoin.change < 0 ? `${selectedCoin.change.toFixed(1)}%` : `+${selectedCoin.change.toFixed(1)}%`}</center>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoPanel;