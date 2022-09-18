import 'bulma/css/bulma.min.css';
import { Block} from 'react-bulma-components';
/** No need to use Memo , it will after all cause there is Click attached on every every Element Block  */
export default function MobileElementsTable({exchanges , onClick}){
   return(
    exchanges.map((exchange, key)=>(
    
              
        <Block className="Mobile-TableElement" key={key} onClick={()=>onClick(exchange)}>
            <div> 
                  <h4>{exchange.currencyFrom}<i style={{ margin:"0 10px" }}className="fas fa-arrow-right"></i>{exchange.currencyTo}</h4>
                  <p>Amount {exchange.currencyFrom} {exchange.amountTo}</p>
            </div>
            <div>
            <div  className="Mobile-StatusExchange" style={{backgroundColor:(exchange.type == "Exchange") ? "#3e8ed0" : "#48c78e"}} ></div>
            </div>
        </Block>
      )
  )
   );
}