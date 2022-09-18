import React,{useEffect, useState} from 'react';
const ExchangeContext = React.createContext({
    /*
    elementExchange:"ok",
    setExchnage : (element)=>{}
    */
  });
  
  const ExchangeContextProvider = (props)=>{
    const [elemExchnage , setNewLiveElement] = useState({})
    return (
      <ExchangeContext.Provider value={{
        elementExchange:elemExchnage,
        setExchnage:(newExchange)=>{setNewLiveElement(newExchange)}
       } }>
         {props.children}
  </ExchangeContext.Provider> 
    )
  }
export {ExchangeContext,ExchangeContextProvider};