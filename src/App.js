import { useEffect, useState } from "react";
import { getSymbolInformation, getAllExchangeSymbols } from "./Api";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import "./styles.css";

import Exchange from './Components/Exchange'
import Table from './Components/Table'


let exchangeSymbols;
let currencySymbols;
export default function App() {

  
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [exchangeSymbols, setExchangeSymbols] = useState([]);
  const [currencySymbols, setCurrencySymbols] = useState([]);
  const [tabIndex, setTabIndex] = useState(0)
  useEffect(() => {
    
    console.log('running useEffect;')
    getAllExchangeSymbols('exchange').then(
      (response) => {
        //exchangeSymbols = response.data[0];
        setExchangeSymbols(response.data[0])
      },
      (rejected) => {
        console.log("its error", rejected);
        setExchangeSymbols([]);
      }
    );

    getAllExchangeSymbols('currency').then(
      (response) => {
       // currencySymbols = response.data[0];
        setCurrencySymbols(response.data[0])
      },
      (rejected) => {
        console.log("its error", rejected);
        setCurrencySymbols([])
      }
    );

  }, []);

  const selectSymbol = (symbol, type)=>{

    getSymbolInformation(symbol, type).then((result)=>{
      console.log('selected symbol information', result, selectedSymbols);
      setSelectedSymbols(result.data[0]);
    }, (error)=>{
      console.log('error while fetching symbol information')
      setSelectedSymbols([]);
    })

  }

 
  return (
    <div className="layout">
      <div className="header"> Next think assignment </div>

      <div className="container">
   
     
        <div className="left">
        <Tabs onSelect={(index) => {
          console.log('index', index)
          setTabIndex(index)}}>
    <TabList>
      <Tab>Exchange</Tab>
      <Tab>Currency</Tab>
    </TabList>

   
  </Tabs>
      {tabIndex ===0 && exchangeSymbols.length &&
        <Exchange type='exchange' setSelectedSymbols={selectSymbol} symbolList={exchangeSymbols} />}
          {tabIndex ===1 &&
        <Exchange type='currency' setSelectedSymbols={selectSymbol} symbolList={currencySymbols}  />}
   
        </div>

        <div className="right">

          {selectedSymbols}

          <div className="tableWrapper">
          <Table data={selectedSymbols} />
          </div>
        </div>
      </div>
    </div>
  );
}
