const CONSTANTS = {
  baseUrl: "https://api-pub.bitfinex.com/v2/",
  pathParams: "tickers",
  configParam: "conf",
  exchangeParam: "pub:list:pair:exchange",
  currencyParam: "pub:list:currency",
  queryParams: "symbols=",
  checkStatus: "platform/status",
  candleUrl: "/candles/trade:1M:",
  tableHeaders: [
    "SYMBOL",
    "BID",
    "BID_SIZE",
    "ASK",
    "ASK_SIZE",
    "DAILY_CHANGE",
    "DAILY_CHANGE_RELATIVE",
    "LAST_PRICE",
    "VOLUME",
    "HIGH",
    "LOW",
  ],
  SymbolMaps: {
    exchange: {
      0: "SYMBOL",
      1: "BID",
      2: "BID_SIZE",
      3: "ASK",
      4: "ASK_SIZE",
      5: "DAILY_CHANGE",
      6: "DAILY_CHANGE_RELATIVE",
      7: "LAST_PRICE",
      8: "VOLUME",
      9: "HIGH",
      10: "LOW",
    },
    currency: {
      0: "SYMBOL",
      2: "BID",
      4: "BID_SIZE",
      5: "ASK",
      7: "ASK_SIZE",
      8: "DAILY_CHANGE",
      9: "DAILY_CHANGE_RELATIVE",
      10: "LAST_PRICE",
      11: "VOLUME",
      12: "HIGH",
      13: "LOW",
    },
  },
  tabIndexMap: {
    0: "exchange",
    1: "currency",
  },
};

export default CONSTANTS;
