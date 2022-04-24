import axios from "axios";
import CONSTANTS from "./Constants";


const config = {
  headers:  {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }, 
  mode : 'no-cors'
}
const mode = 'no-cors';
export function getAllSymbols(symbols) {
  return axios.get(
    `${CONSTANTS.baseUrl}/${CONSTANTS.pathParams}?${CONSTANTS.queryParams}${symbols}`, config
  );
}

export function getAllExchangeSymbols(type) {
  return axios.get(
    `${CONSTANTS.baseUrl}/${CONSTANTS.configParam}/${
      type == "exchange" ? CONSTANTS.exchangeParam : CONSTANTS.currencyParam
    }`,  config
  );
}

export function getSymbolInformation(symbol, type) {
  if(type=== 'exchange'){
    symbol = 't' + symbol
  }
  if(type=== 'currency'){
    symbol = 'f' + symbol
  }
  
  return axios.get(
    `${CONSTANTS.baseUrl}/${CONSTANTS.pathParams}?${CONSTANTS.queryParams}${symbol}`,  config
  );
}
