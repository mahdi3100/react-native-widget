import React, { createRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  ActivityIndicator   ,
  Alert

} from 'react-native';
//import { ExchangeContext } from "../Context/ExchangeContext.js";
import ListCrypto from "./ListCrypto.js";
import ListRCur from "./ListRCur.js";

/**Main component of Toolbar */
class Toolbar extends React.Component {
  constructor(props) {
    super(props);
    //Change default Values
    this.defaultCurrencyFrom = "BTC";//BTC|XRP|ETH
    this.defaultCurrencyTo = "USD";//USD|GBP|EUR
    this.state = {
      amountFrom: "0",//must be string for TextInput
      amountTo: "0",//must be string for TextInput
      fetchLoader: false,//show or hide fetch loader
      fetchError: "",//show or hide error element
      saveExchangeContext: "NO",//For DEV "NO"; PROD=> {} ; chenge this value in where useContext() has been used 
      logoTo:"USD"
    };
    
    this.changeCurFrom = this.changeCurFrom.bind(this);
    this.changeCurTo = this.changeCurTo.bind(this);
    this.saveExchange = this.saveExchange.bind(this);
    this.checkAmount = this.checkAmount.bind(this);
    this.curFrom = this.defaultCurrencyFrom;
    this.curTo = this.defaultCurrencyTo;

    this.CurToRef = createRef(this.defaultCurrencyTo);
  }
  componentDidMount() {
    //check component mounted times for Debug purpose
    console.log("check component mounted times for Debug purpose ")
    console.log("in case called Twice that because React.StrictMode in dev mode")
  }
  //Method to handle curency change in DropDown select
  changeCurFrom(curFrom) {
    this.curFrom = curFrom;
   
  }
  //Method to handle curency change in DropDown select
  changeCurTo(curTo,logoTo) {
    this.curTo = curTo;
    this.setState((mystate)=>mystate.logoTo=logoTo);
  }
  //Method to check ammount in input "Amount From"
  checkAmount(Amount) {
   // Alert.alert("aoutoo",`==>${Amount}`);
    return (!isNaN(Amount) && Amount > 0) ? true : false;
  }
  //Event to catch SAVE trigger button 
  saveExchange() {
    //already fetching , return to prevent many calls for ajax
    if (this.state.fetchLoader) return;
    let getAmountFrom = this.state.amountFrom
    let getCurrencyFrom = this.curFrom;
    let getCurrencyTo = this.curTo;
    this.setState({ fetchLoader: true });
    this.setState({ fetchError: "" });
    let baseURL = process.env.REACT_APP_API_BASE_URL || '192.168.182.173:8787' || 'localhost:8787';
    //baseURL = baseURL.replace("http//","")
   
    fetch("http://"+baseURL + "/convert?from=" + getCurrencyFrom + "&to=" + getCurrencyTo + "&amount=" + getAmountFrom)
      .then(res => res.json())
      .then(res => {
       
        this.setState({ fetchLoader: false });
        if (res["err"]) {
     
          /** no connection to Api(external) Rate  , this error happens in localhost in case internet issue*/
          (typeof(res["err"]) === "object")
          ?
          this.setState({ fetchError: "An error has occured" })
          :
          this.setState({ fetchError: res["err"] })
          
          this.setState({ amountTo: 0 });
          return
        }
       
        this.setState({ amountTo: res["amountTo"].toString() });
        //pass response to Context to update History in LiveElements component            
        this.setState({
          saveExchangeContext: {
            "id": res["id"],
            "date": res["date"],
            "currencyFrom": getCurrencyFrom,
            "amountFrom": getAmountFrom,
            "currencyTo": getCurrencyTo,
            "amountTo": res["amountTo"],
            "type": "Exchange",
          }
        });
      }).catch((error) => {
      //  Alert.alert("error",JSON.stringify(error));
      console.log(JSON.stringify(error))
      });
  }
  //<ListCrypto defaultCurFrom={this.defaultCurrencyFrom} changeCurFrom={(currencyFrom)=>this.changeCurFrom(currencyFrom)}/>
     //  <ListRCur defaultCurTo={this.defaultCurrencyTo} changeCurTo={(currencyTo)=>this.changeCurTo(currencyTo)}/>
      
  render() {
    console.log(this.state.saveExchangeContext)
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

      <View style={styles.container}>
    
        <View style={styles.centerizedView}>
       <View style={styles.authBox}>
        <View style={styles.inputBox}>
           <Text style={styles.inputLabel}>Currency from</Text>     

           <ListCrypto defaultCurFrom={this.defaultCurrencyFrom} changeCurFrom={(currencyFrom)=>this.changeCurFrom(currencyFrom)}/>

    
      </View>
       <View style={styles.inputBox}>
           <Text style={styles.inputLabel}>Amount</Text>          
             
           

                <TextInput
                style={[styles.input]}
                  selectionColor={"black"}
                autoCapitalize={false}
                keyboardType='decimal-pad'
                textContentType='none'
                onChangeText={(value) => this.setState({ amountFrom: value })}
                value={this.state.amountFrom}
                placeholder="Amount"
              />

       </View>
   
            
        <View style={styles.inputBox}>
           <Text style={styles.inputLabel}>Currency to</Text>          
          
  

           <ListRCur defaultCurTo={this.defaultCurrencyTo} changeCurTo={(currencyTo,logoTo)=>this.changeCurTo(currencyTo,logoTo)}/>
      
       </View>

       <View style={styles.inputBox}>
           <Text style={styles.inputLabel}>Amount</Text> 
   
          <View  style={{display:"flex",flexDirection:"row"}}>
          <TextInput
                style={[styles.input,{flex:3}]}
                editable={false}
                selectTextOnFocus={false}
                value={this.state.amountTo}
              />    
          {(this.state.fetchLoader)?<ActivityIndicator  style={{flex:1}} size="small" color="#eee" />:<Text  style={{flex:1,fontSize:17,marginLeft:5,fontWeight:"bold",textAlignVertical:"center"}} size="small" >{this.state.logoTo}</Text>}
          </View>
     

               <Text style={[styles.inputLabel,{color:"red",fontSize:15,fontWeight:"bold"}]} >
               {this.state.fetchError}
               </Text>
              
       </View>
            
          
<TouchableOpacity

      onPress={this.saveExchange}
      style={[styles.appButtonContainer ,
        (() => { return (this.checkAmount(this.state.amountFrom)) ? null : styles.appButtonDisabled})()
      ]}
 
     disabled={(() => { return (this.checkAmount(this.state.amountFrom)) ? false : true})()} 
    >
      <Text style={[styles.appButtonText,
      (() => { return (this.checkAmount(this.state.amountFrom)) ? null : styles.appButtonDisabled})()
    ]}>Save</Text>
 
</TouchableOpacity>


            
</View>
       </View>
    
      </View>
      </TouchableWithoutFeedback>
    );
  }
  /**
   *                 <Button
                color="green"
        disabled={(() => { return (this.checkAmount(this.state.amountFrom)) ? false : "disabled" })()} 
        title="Save"
        onPress={this.saveExchange}
      />
      
  */
  /*
  <ExchangeContext.Consumer>
  {({ /*elementExchange,*/ /*setExchnage }) => (
 
  setExchnage(this.state.saveExchangeContext)
  )}
</ExchangeContext.Consumer>*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
   // backgroundColor:"white"
  },
  centerizedView:{
    width: '100%',
    top: '5%',
  },
 
  authBox: {
    width: '80%',
   // backgroundColor: '#fafafa',
   backgroundColor:"white", 
   borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
 
  },
  appButtonContainer: {
 width: '100%',
 display: 'flex',
 flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingVertical:14,
    borderRadius: 4,
    elevation:2,
    shadowColor:"#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
  backgroundColor:"#7b6",
  
  },
  appButtonDisabled:{
    backgroundColor:"#fff",
    color:"gray"
  },
  appButtonText: {
    fontSize: 18,
    color:"white",
    fontWeight: "bold",
    alignSelf: "center",
    //textTransform: "uppercase",
    
  },
 
})
export { Toolbar as default };
