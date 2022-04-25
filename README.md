# Bitfinex

Some basic experiment with Bitfinex API's

# Live URL 

[Live URL](https://6265ec92cbf68410ecaff5a6--comfy-beijinho-5b8b98.netlify.app/)

Note : Please enable CORS extension in your browser 

# How to start project

```
npm install
```

```
npm start
```



# Few Things I have tried

- Before loading application, I have made sure bitfinex is up. Showing proper message if its down.
- Added virtualization on Exchange and Currency List - There is some issue with npm package (react-window), spent a lot of time in debuging but was not able to solve. List dont work properly when we scroll. Will see this bug later
- Added 2 tabs for for currency and exchange. These tab data is not refreshed on tab changes as possiblity of change of data on tab change is very less.
- Added search inside list with debounce
- Added Error boundaries for error handling.
- Added candlestick graph for month wise data - if for some symbols,  data is not available, no api call is made to fetch graph data and no graph is shown in that case.
- Created API.js to make API calls.
- Created Constants and utils for common code.
