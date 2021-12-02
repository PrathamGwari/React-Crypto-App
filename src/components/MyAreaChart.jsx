import axios from "axios";
import React, {useEffect, useState, useRef } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

let data = [];

const MyAreaChart = ({selectedCoin, x, y})=>{
    const [myData, setMyData] = useState([]);
    const btns = useRef([]);
    const rightPanel = useRef(document.querySelector('#right-panel'));
    const leftPanel = useRef(document.querySelector('#left-panel'));
    const panelContainer = useRef(document.querySelector('#panel-container'));
    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    useEffect(()=>{
        btns.current = [document.querySelector('#min-btn'), document.querySelector('#hr-btn'), document.querySelector('#six-hr-btn'), document.querySelector('#day-btn')];
        rightPanel.current = document.querySelector('#right-panel');
        leftPanel.current = document.querySelector('#left-panel');
        panelContainer.current = document.querySelector('#panel-container'); 

        if(isEmpty(selectedCoin)){
            console.log('please select a coin');
        } else{
            panelContainer.current.classList.remove('expanded-view');
            rightPanel.current.classList.remove('col-md-0');
            rightPanel.current.classList.add('col-md-8')
            leftPanel.current.classList.remove('col-md-12');
            leftPanel.current.classList.remove('px-5');
            leftPanel.current.classList.add('col-md-4');
        }
    })

    const getGraphData = (res, time)=>{
        data = [];
        for(let i=0; i<res.prices.length; i++){
            data.push({
                name : `${i+1} ${time} ago`,
                price : res.prices[i][1].toFixed(2)
            });
        }
        data = data.reverse();
        setMyData(data);
        console.log(myData);
    }

    const ActivateBtn = (idx)=>{
        btns.current.forEach((btn)=>{
            if(btn.classList.contains('active')){
                btn.classList.remove('active')
            }
        });
        btns.current[idx].classList.add('active');
    }

    useEffect( async ()=>{
        const minUrl = `https://api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=inr&days=0.03&interval=minutely`;
        const response = await axios.get(minUrl);

        console.log(`%c ${response.data.prices}`, 'background-color: blue;');

        console.log("coin changed to " + selectedCoin.name);

        console.log(response.data.prices);

        ActivateBtn(0);
        getGraphData(response.data ,"min");
    }, [selectedCoin])

    const getMinData = async ()=>{
        ActivateBtn(0);

        const minUrl = `https://api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=inr&days=0.03&interval=minutely`;
        const response = await axios.get(minUrl);

        console.log(`%c ${response.data.prices}`, 'background-color: blue;');

        console.log("coin changed to " + selectedCoin.name);

        console.log(response.data.prices);

        getGraphData(response.data ,"min");
    }
    const getHourData = async ()=>{
        ActivateBtn(1);
        const minUrl = `https://api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=inr&days=0.02&interval=hourly`;
        const response = await axios.get(minUrl);

        console.log(`%c ${response.data.prices}`, 'background-color: blue;');

        console.log("coin changed to " + selectedCoin.name);

        console.log(response.data.prices);

        getGraphData(response.data ,"hr");
    }
    const getSixHrData = async ()=>{
        ActivateBtn(2)
        const minUrl = `https://api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=inr&days=0.12&interval=hourly`;
        const response = await axios.get(minUrl);

        console.log(`%c ${response.data.prices}`, 'background-color: blue;');

        console.log("coin changed to " + selectedCoin.name);

        console.log(response.data.prices);

        // getting graph data for 6hr interval
        data = [];
        for(let i=0; i<response.data.prices.length; i+=6){
            data.push({
                name : `${i+6} hrs ago`,
                price : response.data.prices[i][1].toFixed(2)
            });
        }
        data = data.reverse();
        setMyData(data);
        console.log(myData);
    }
    const getDayData = async ()=>{
        ActivateBtn(3);
        const minUrl = `https://api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=inr&days=10&interval=daily`;
        const response = await axios.get(minUrl);

        console.log(`%c ${response.data.prices}`, 'background-color: blue;');

        console.log("coin changed to " + selectedCoin.name);

        console.log(response.data.prices);

        getGraphData(response.data ,"day");
    }
    return (
        <>
        <ResponsiveContainer minWidth={x} minHeight={y}>
            <AreaChart
                // width={500}
                // height={400}
                data={myData}
                margin={{
                top: 0,
                right: 50,
                left: 0,
                bottom: 0
                }}
            >
                <CartesianGrid  />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="price" stroke="#0c59f1" fill="#c3d5f7" />
            </AreaChart>
        </ResponsiveContainer>

        {/* time buttons */}
        <div className="container px-5 my-4">
            <div className="row time-panel py-2 box-shadow">
                <div class="btn-toolbar justify-content-around" role="toolbar" aria-label="Toolbar with button groups">
                <button type="button" class="btn btn-outline-light active shadow rounded-pill" id="min-btn" onClick={getMinData}>1mi</button>
                <button type="button" class="btn btn-outline-light shadow rounded-pill" id="hr-btn" onClick={getHourData}>1hr</button>
                <button type="button" class="btn btn-outline-light shadow rounded-pill" id="six-hr-btn" onClick={getSixHrData}>6hr</button>
                <button type="button" class="btn btn-outline-light shadow rounded-pill" id="day-btn" onClick={getDayData}>1D</button>
                </div>
            </div>
        </div>
        </>
    );
}

export default MyAreaChart;