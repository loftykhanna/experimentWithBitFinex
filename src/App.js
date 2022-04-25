import { useEffect, useState } from "react";
import { getSymbolInformation, getAllExchangeSymbols } from "./Api";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import "./styles.css";

import Exchange from "./Components/Exchange";
import Table from "./Components/Table";
import CONSTANTS from "./Constants";

let exchangeSymbols;
let currencySymbols;
export default function App({ platformError }) {
  const [selectedSymbols, setSelectedSymbols] = useState(undefined);
  const [exchangeSymbols, setExchangeSymbols] = useState([]);
  const [currencySymbols, setCurrencySymbols] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    getAllExchangeSymbols("exchange").then(
      (response) => {
        //exchangeSymbols = response.data[0];
        setExchangeSymbols(response.data[0]);
      },
      (rejected) => {
        setExchangeSymbols([]);
      }
    );

    getAllExchangeSymbols("currency").then(
      (response) => {
        // currencySymbols = response.data[0];
        setCurrencySymbols(response.data[0]);
      },
      (rejected) => {
        setCurrencySymbols([]);
      }
    );
  }, []);

  const tabChange = (index) => {
    setTabIndex(index);
    setSelectedSymbols();
  };

  const selectSymbol = (symbol, type) => {
    getSymbolInformation(symbol, type).then(
      (result) => {
        setSelectedSymbols(result.data[0] ? result.data[0] : []);
      },
      (error) => {
        setSelectedSymbols([]);
      }
    );
  };

  return (
    <>
      {platformError != "" ? (
        <div>{platformError}</div>
      ) : (
        <div className="layout">
          <div className="header">
            <h1> Bitfinex </h1></div>

          <div className="container">
            <div className="left">
              <Tabs onSelect={tabChange}>
                <TabList>
                  <Tab>Exchange</Tab>
                  <Tab>Currency</Tab>
                </TabList>
              </Tabs>
              {tabIndex === 0 && exchangeSymbols.length && (
                <Exchange
                  type="exchange"
                  setSelectedSymbols={selectSymbol}
                  symbolList={exchangeSymbols}
                />
              )}
              {tabIndex === 1 && currencySymbols.length && (
                <Exchange
                  type="currency"
                  setSelectedSymbols={selectSymbol}
                  symbolList={currencySymbols}
                />
              )}
            </div>

            <div className="right">
              <div className="tableWrapper">
                <Table
                  data={selectedSymbols}
                  type={CONSTANTS.tabIndexMap[tabIndex]}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
