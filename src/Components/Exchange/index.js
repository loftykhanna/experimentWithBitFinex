import React, { useEffect, useState, memo } from "react";
// import { getAllExchangeSymbols } from "../../Api";

import { debounce } from "../../utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FixedSizeList as List } from "react-window";

import "./exchange_style.css";

let initialSymbol;
function Exchange(props) {
  const [allSymbols, setAllSymbols] = useState(props.symbolList);
  initialSymbol = props.symbolList;

  const tempSymbols = [...allSymbols];
  useEffect(() => {
    /*  getAllExchangeSymbols(props.type).then(
      (response) => {
        initialSymbol = response.data[0];
        setAllSymbols(response.data[0]);
      },
      (rejected) => {
        console.log("its errpr", rejected);
      }
    ); */
  }, []);

  const renderLeft = memo(({ data, index, key }) => {
    if (data.length) {
      let symbol = data[index];
      return (
        <div
          className="symbol"
          key={key}
          onClick={() => {
            props.setSelectedSymbols(symbol, props.type);
          }}
        >
          <div className="symbolText" key={key}>
            {symbol}
          </div>
          <div key={key} className="iconsList">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      );
    } else {
      return <div> No data available</div>;
    }
  });

  const filterList = (value) => {
    let reg = new RegExp(value.toUpperCase());
    if (value) {
      let filteredResult = initialSymbol.filter(function (name) {
        return name.match(reg);
      });
      setAllSymbols(filteredResult);
    } else {
      setAllSymbols(initialSymbol);
    }
  };
  const debouncedFilterList = debounce(filterList, 300);
  const searchList = (e) => {
    const {
      target: { value },
    } = e;
    debouncedFilterList(value);
  };
  return (
    <div>
      <div class="search">
        <input
          type="text"
          class="searchTerm"
          placeholder="What are you looking for?"
          onChange={searchList}
        />
        <button type="submit" class="searchButton">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className="symbols">
        {allSymbols.length ? (
          <List
            className="List"
            height={1100}
            itemCount={allSymbols.length}
            itemSize={50}
            width={600}
            itemData={tempSymbols}
          >
            {renderLeft}
          </List>
        ) : (
          <> No Data available</>
        )}
      </div>
    </div>
  );
}

export default React.memo(Exchange);
