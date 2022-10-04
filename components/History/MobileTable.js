import React, { useState, useEffect } from "react";


import MobileElementsTable from "./MobileElementsTable.js";
function ShowDetailExchange({exchangeDetails , onClick}){
  return(  );
    /*
    <Block className="Mobile-DetailExchange">
           
      <Notification>
      <Button remove onClick={onClick} />
        <table>
          <tbody>
          <tr><td>Date & Time</td><td>{exchangeDetails.date}</td></tr>
          <tr><td>Status</td><td> <div  className="Mobile-StatusExchange" style={{backgroundColor:(exchangeDetails.type == "Exchange") ? "#3e8ed0" : "#48c78e"}} ></div></td></tr>
          <tr><td>From</td><td>{exchangeDetails.currencyFrom}</td></tr>
          <tr><td>To</td><td>{exchangeDetails.currencyTo}</td></tr>
          <tr><td>Amount</td><td>{exchangeDetails.amountFrom}</td></tr>
          <tr><td>Total Amount</td><td>{exchangeDetails.amountTo}</td></tr>
          </tbody>
        </table>
        <Button color="success" className="is-fullwidth"onClick={onClick}>Close</Button>
      </Notification>

</Block>*/

}

    function Mobiletable({exchanges}){
    
      const [detailExchange , setDetailExchange] = useState({});
      const [hideDetail , setHideDetail] = useState(false);
    
      const noderef = React.useRef(null);
      function showDetailSection(exchange){
    
        setDetailExchange(exchange);
        setHideDetail(true)
      }
      useEffect(()=>{
        console.log("rednnnnder")
      })
      return(
        <>{
    
           //optimize this map with Memo
       <MobileElementsTable exchanges={exchanges}onClick={(exchange)=>showDetailSection(exchange)}/>
      
      }
      </>
      );
          
    }
export default Mobiletable;    