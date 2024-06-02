import React from 'react';
import {AdvancedRealTimeChart} from "react-ts-tradingview-widgets";
import './Crypto.css'

function Crypto () {
    return (
        <div id="Crypto" class="crypto p-5 mb-2 bg-dark text-light" style={{height:650, paddingBottom: 50}}>
            <AdvancedRealTimeChart theme="dark" interval='D' autosize symbol="BITSTAMP:BTCUSD" locale='en'  allow_symbol_change='true' watchlist={["TSLA", "GME", "AMC", "AAPL", "BTCUSD"]}></AdvancedRealTimeChart>
        </div>
    );
};

export default Crypto;