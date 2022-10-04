
import { View,Text,StyleSheet, ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
/** No need to use Memo , it will after all cause there is Click attached on every every Element Block  */
export default function MobileElementsTable({exchanges , onClick}){
   return(
    <ScrollView>
      {
    exchanges.map((exchange, key)=>(
    
              
        <View style={styles.MobileTableElement} key={key} onClick={()=>onClick(exchange)}>
            <View style={{display:"flex",flexDirection:"row",marginBottom:14}}> 
                  <Text style={styles.txtCurr}>{exchange.currencyFrom} </Text>
                  <FontAwesome 
            style={[styles.icon,{ flex:2,textAlign:"center"}]}
            name="arrow-right"
            size={20}
            brands
          />
           <Text style={styles.txtCurr}>{exchange.currencyTo}</Text> 
           </View>

             <Text>Amount {exchange.currencyFrom} {exchange.amountTo}</Text>
          
            <View style={[styles.MobileStatusExchange,{backgroundColor:(exchange.type == "Exchange") ? "#3e8ed0" : "#48c78e"}]} >
            <Text style={{fontWeight:"bold",color:"#fff"}}>{exchange.type}</Text>
            </View>
        </View>
      )
  )
    }
  </ScrollView>
   );
}
const styles=StyleSheet.create({
    MobileStatusExchange:{
     
        borderRadius: 100,
       /* width:15,
        height:15,*/
        marginTop:7,
        paddingVertical:13,
        alignItems:"center"
      },
      MobileTableElement:
      {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#fff",
      borderRadius: 10,
      marginBottom:7,
      marginStart:7,
      marginEnd:7,
      elevation:3,
      padding: 30,
      },
      icon: {
        marginRight:13,
      },
      txtCurr:{
       
        fontWeight:"bold",
        fontSize:17,
        
      }
});