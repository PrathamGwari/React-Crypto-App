import React from "react";
import '../coin.css'
const Coin = ({id, setSelectedCoin, img, name, price, change})=>{
    const onClickCoin = ()=>{
        console.log(name);
        const data = {
            id : id,
            img : img,
            name : name,
            price : price,
            change : change
        }
        setSelectedCoin(data);
    }

    return (
        <div className="mx-5 my-3 bg-dark px-2 coin-container box-shadow" onClick={onClickCoin}>
            <div className="row d-flex align-items-center">
                {/* coin image */}
                <div className="col-5 text-center py-2 px-3">
                    <div className="bg-light coin-img-container p-2"><img className="img-fluid" width="40rem" src={img} alt='' /></div>
                </div>

                {/* coin name */}
                <div className="col-7 text-left text-light py-auto px-0">
                    <span className="resp-name">{name}</span>
                </div>
            </div>
        </div>
    );
}

export default Coin;