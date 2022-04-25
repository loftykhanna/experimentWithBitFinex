import { useState } from "react";
import CONSTANTS from "../../Constants";
import "./table.css";
import ReactApexChart from "react-apexcharts";
import { getCandleStickData } from "../../Api";
import { formatCandleStickData } from "../../utils";

import LoadingScreen from "react-loading-screen";

export default function Table({ data, type }) {
  const [candleStickData, setCandleStickData] = useState({});
  const [isCandleStickGraphLoading, setCandleStickLoadingState] = useState();

  const renderHeader = () => {
    return CONSTANTS.tableHeaders.map((value) => {
      return <div className="div-table-col tableHeader">{value}</div>;
    });
  };

  const renderGraph = (symbol) => {
    setCandleStickLoadingState(true);
    setCandleStickData({});
    getCandleStickData(symbol).then(
      (response) => {
        setCandleStickData(formatCandleStickData(response.data, symbol));
        setCandleStickLoadingState(false);
      },
      (rejected) => {
        setCandleStickLoadingState(false);
      }
    );
  };

  const removeChart = () => {
    if (candleStickData.symbol) {
      setCandleStickData({});
    }
    if (isCandleStickGraphLoading) setCandleStickLoadingState();
  };
  const renderData = (symbolType = "exchange") => {
    if (!data) {
      removeChart();
      return (
        <div className="tableEmpty">
          Please Click on Arrow with currency/exchange to display data
        </div>
      );
    }
    if (data.length) {
      let filteredData = data.filter((_value, index) => {
        return CONSTANTS.SymbolMaps[symbolType][index] ? true : false;
      });
      if (candleStickData.symbol != data[0] && !isCandleStickGraphLoading)
        renderGraph(filteredData[0]);
      return filteredData.map((value) => {
        return <div className="div-table-col">{value}</div>;
      });
    } else {
      removeChart();
      return <div className="tableInfo">No information available</div>;
    }
  };

  return (
    <div className="div-table">
      <div className="div-table-row ">{renderHeader()}</div>
      <div className="div-table-row">{renderData(type)}</div>
      <div style={{ width: "50vw" }}>
        <div className="candle">
          {isCandleStickGraphLoading ? (
            <LoadingScreen
              loading={true}
              spinnerColor="#9ee5f8"
              textColor="#676767"
              text="Loading..."
            />
          ) : (
            candleStickData.series &&
            candleStickData.series[0].data.length > 0  && (
              <ReactApexChart
                options={candleStickData.options}
                series={candleStickData.series}
                type="candlestick"
                height={350}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
