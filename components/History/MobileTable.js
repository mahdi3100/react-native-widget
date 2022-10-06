import React, {useRef,useMemo ,useCallback, useState, useEffect } from "react";

import {Alert, Modal,View,Text,StyleSheet, ScrollView} from 'react-native';

//import BottomSheet , {BottomSheetView,useBottomSheetDynamicSnapPoints} from '@gorhom/bottom-sheet';


import MobileElementsTable from "./MobileElementsTable.js";
function ShowDetailExchange({exchangeDetails, initExchange}){

  useEffect(()=>
    {
      if(Object.keys(exchangeDetails).length === 0){ //prevent compoent to re-render
        return;
      }
      setModalVisible(true)
      //return()=>{}
    }
  ,[exchangeDetails])

  const [modalVisible, setModalVisible] = useState(false);
  return( 

  
    <Modal
      animationType="fade"
      transparent={false}
      backgroundColor="#000"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
        initExchange()
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View >


             <View style={styles.rowModal}>
             <Text style={styles.rowModalTextB} >Date:</Text>
             <Text style={styles.rowModalText}>{exchangeDetails.date}</Text>
             </View>

    <View style={styles.rowModal}>
             <Text style={styles.rowModalTextB}>Status:</Text>
             <Text style={[styles.rowModalText,{padding:13,borderRadius:7,backgroundColor:(exchangeDetails.type == "Exchange") ? "#3e8ed0" : "#48c78e"}]} >{exchangeDetails.type}</Text>
             </View>


             <View style={styles.rowModal}>
             <Text style={styles.rowModalTextB}>From:</Text>
             <Text style={styles.rowModalText}>{exchangeDetails.currencyFrom}</Text>
             </View>

             <View style={styles.rowModal}>
             <Text style={styles.rowModalTextB}>To:</Text>
             <Text style={styles.rowModalText}>{exchangeDetails.currencyTo}</Text>
             </View>

             <View style={styles.rowModal}>
             <Text style={styles.rowModalTextB}>Amount:</Text>
             <Text style={styles.rowModalText}>{exchangeDetails.amountFrom}</Text>
             </View>


             <View style={styles.rowModal}>
             <Text style={styles.rowModalTextB}>Total Amount:</Text>
             <Text style={styles.rowModalText}>{exchangeDetails.amountTo}</Text>
             </View>

          </View>

         
            <Text  style={[styles.button, styles.buttonClose]}
            onPress={() => {initExchange() ; setModalVisible(!modalVisible)}}
           >Hide</Text>
          
        </View>
      </View>
    </Modal>


   );
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
       <ShowDetailExchange exchangeDetails={detailExchange}  initExchange={()=>{setDetailExchange({})}}/>
      </>
      );
          
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
      },
      contentContainer: {
        flex: 1,
        alignItems: 'center',
      },
      //Modal

      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      rowModal:{
        display:"flex",flexDirection:"row",
        marginVertical:10,
        alignContent:"center",
        textAlignVertical:"center",
        justifyContent:"center",
        alignItems:"center"

      },
      rowModalTextB:{
        marginHorizontal:10,
        fontWeight:"bold"
      },
      rowModalText:{
            
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical:13

      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
        color:"#fff"
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
    });
export default Mobiletable;    