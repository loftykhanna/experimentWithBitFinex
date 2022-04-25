import React, { useEffect, useState } from "react";
import LoadingScreen from "react-loading-screen";
import "./styles.css";

import App from "./App";

import ErrorBoundary from "./Components/Error";

import { checkStatus } from "./Api";

export default function Main() {
  const [isLoding, setIsLoding] = useState(1);
  const [platformError, setPlatformError] = useState("");

  useEffect(() => {
    checkStatus().then(
      (response) => {
        // has setup 1 min of loading in order to show we are checking status of bitfinex platform
        setTimeout(() => {
          setIsLoding(!response.data[0]);
        }, 1000);
      },
      (rejected) => {
        // has setup 1 min of loading in order to show we are checking status of bitfinex platform
        setPlatformError("There is some internal issue, Please try again!");

        setTimeout(() => {
          setIsLoding(1);
        }, 1000);
      }
    );
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        {isLoding ? (
          <LoadingScreen
            loading={true}
            bgColor="#f1f1f1"
            spinnerColor="#9ee5f8"
            textColor="#676767"
            text="Loading..."
          />
        ) : (
          <App platformError={platformError} />
        )}
      </div>
    </ErrorBoundary>
  );
}
