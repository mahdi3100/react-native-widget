import {Text , StyleSheet , View ,Button ,  ActivityIndicator, Alert } from 'react-native';
import React from "react";
import Mobiletable from "./MobileTable.js";
//import FilterDateSQL from "./FilterDate.js";
//   <FilterDateSQL filterclear={this.state.filterclear} filtersql={this.filtersqlupdate} />

let baseURL = process.env.REACT_APP_API_BASE_URL || '192.168.182.173:8787' || 'localhost:8787';

class History extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          fetched: false,//check if fetch return
          historyLoading: true,//show progress loading fetch
          errorFetch: false,//show fetch's error
          exchanges: [],//Object where fetech stock response 
          filterclear: false,//Weather to show Filter or Clear Filter in Filter FilterDateSQL component
          emptyResault:false, //in case empty resault we show notification rather than table that contains resault 
        }
        /** callback For Component LiveElements */
        this.liveupdate = this.liveupdate.bind(this)
        /** callback For Component FilterDateSQL */
        this.filtersqlupdate = this.filtersqlupdate.bind(this)
      }
      shouldComponentUpdate() {
        return true;
      }
      componentDidMount() {
        //Cacll fetch history once component get mounted 
        (this.state.fetched == false && this.history());
      }
      /** Get Resault for Filter DATE From Component FilterDateSQL*/
      filtersqlupdate(date1, date2) {
        if (!date1) {
          return this.history();
        }
        this.setState({ historyLoading: true });
        //react env must startwith REACT_APP_
     
        fetch("http://"+baseURL + "/history/filter?date1=" + date1 + "&date2=" + date2)
          .then(res => res.json())
          .then(res => {
            this.setState({ filterclear: true , emptyResault:false , historyLoading: false});
           
            if (res["err"]) { return this.setState({ errorFetch: res["err"] }); }
            if(res.length == 0){return this.setState({ emptyResault: true});}
           
            this.setState({ exchanges: res, fetched: true });
          });
      }
      /**Main method to update exchanges state */
      liveupdate(newelement) {
        this.setState({ exchanges: [newelement, ...this.state.exchanges] })
      }
      /**History Method */
      history() {
  
        this.setState({ historyLoading: true });
        
        fetch("http://"+baseURL + "/history")
          .then(res => res.json())
          .then(res => {
         
            this.setState({ filterclear: false , emptyResault:false , historyLoading: false});
    
            if (res["err"]) { return this.setState({ errorFetch: res["err"] }); }
            if(res.length == 0){return this.setState({ emptyResault: true});}
            this.setState({ exchanges: res, fetched: true });
          }).catch(err => (  console.log(err) ));
      }
      render(){
    return (
        <View style={styles.container}>
          
            <View  style={styles.centered} >
    
                {
                  (this.state.historyLoading &&
                    <ActivityIndicator  size="large" color="#000" />
            
                  )
                }
                {
                  (this.state.errorFetch &&
                    
               <Text style={{color:"red",fontSize:15,fontWeight:"bold"}} >
               {this.state.errorFetch}
               </Text>
                  )
                }
                {
                  (!this.state.historyLoading && !this.state.errorFetch &&
                    <>
                      {(this.state.emptyResault) ?
                       <Text >
                           No data to show !
                          <Button onClick={() => { this.history() }}>Reload</Button>
                       </Text>
             
                        :
                        <Mobiletable exchanges={this.state.exchanges} />
                      }
  
                    </>
                  )
                }
       
            </View>
        
        </View>
      )
            }
      /**
       *    <FilterDateSQL filterclear={this.state.filterclear} filtersql={this.filtersqlupdate} />
                      <LiveElements live={this.liveupdate} />
       */
}
const styles = StyleSheet.create({
    container: {
     
    },
    heading:{

    },
    centered:{

    }
});
export default History;