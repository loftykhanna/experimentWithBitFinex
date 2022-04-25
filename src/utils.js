export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function formatCandleStickData(data, symbol) {
  let series = [];
  let candleData = data.map((value) => {
    return {
      x: new Date(value[0]),
      y: [value[1], value[2], value[3], value[4]],
    };
  });

  series.push({
    data: candleData,
  });

  let filteredData = {
    series,
    options: {
      chart: {
        type: "candlestick",
        height: 350,
      },
      title: {
        text: "CandleStick Chart",
        align: "left",
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
    symbol: symbol,
  };
  return filteredData;
}
