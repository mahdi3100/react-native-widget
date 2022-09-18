import { useContext, useEffect } from "react";
import { ExchangeContext } from "../Context/ExchangeContext.js";
var W3CWebSocket = require('websocket').w3cwebsocket;
let baseURL = process.env.REACT_APP_API_BASE_URL || 'localhost:8787';
//baseURL = baseURL.replace("http//","")
/*create instance of WebSocket Client*/
var client = new W3CWebSocket('ws://'+baseURL, 'echo-protocol');
/**Component to catch Live Price comming From server by Websocket */
function LiveElements(props){
  var { elementExchange } = useContext(ExchangeContext);
  if (elementExchange === undefined) {
    throw new Error("elementExchange was used outside of its Provider");
  }
  useEffect(() => {
    //to prevent add empty row in case Mount Unmount triggered through filter component, "NO" value used for DEV understading , Have to set it up to {}
    if (elementExchange != "NO") {
      props.live(elementExchange)
    }
    client.onerror = function () {
      console.log('Connection Error');
    };
    client.onopen = function () {
      console.log('WebSocket Client Connected');
    };
    client.onclose = function () {
      console.log('echo-protocol Client Closed');
    };
    /** Receive message from server through websocket */
    client.onmessage = function (e) {
      let message = JSON.parse(e.data)
      /**Transfer the message to Parent component History through "live" props */
      props.live(message.data)
    };
  }, [elementExchange])
  return (null);
}
export default LiveElements;
