import "./table.css";



export default function Table({data = [], type}) {

    const tableHeaders =  [
        'SYMBOL',
        'BID', 
        'BID_SIZE', 
        'ASK', 
        'ASK_SIZE', 
        'DAILY_CHANGE', 
        'DAILY_CHANGE_RELATIVE', 
        'LAST_PRICE', 
        'VOLUME', 
        'HIGH', 
        'LOW'
      ];

      const renderHeader = ()=>{
          console.log('rendering tables haeader')
        return tableHeaders.map((value)=>{
           return <div className="div-table-col tableHeader">{value}</div>
        })
      }

      const renderData = ()=>{
          if(data.length){
      return data.map((value)=>{
         return  <div className="div-table-col">{value}</div>
      })
    } else{
        return <div className="tableInfo">No information available</div>
    }

    }

  return (
    <div className="div-table">
      <div className="div-table-row ">
        {renderHeader()}
      </div>
      <div className="div-table-row">
       {renderData()}
      </div>
     </div>
  );
}
