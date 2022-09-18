import React, { useState } from "react";
import 'bulma/css/bulma.min.css';
import { Heading, Notification, Container, Box, Columns, Button } from 'react-bulma-components';
import FilterDateSQL from "./FilterDate.js";
import Desktoptable from "./DesktopTable.js";
import LiveElements from "./LiveElement.js";
import Mobiletable from "./MobileTable.js";
//react env must startwith REACT_APP_
let baseURL = process.env.REACT_APP_API_BASE_URL || 'localhost:8787';
//baseURL = baseURL.replace("http//","")

function Showexchangehistyory({ exchanges }) {
  const [windowSizeChnaged, setWindowSizeChnaged] = useState(window.innerWidth)
  const windowSize = React.useRef(window.innerWidth);
  React.useLayoutEffect(() => {
    window.addEventListener("resize", function (e) {
      //if window's size is under 700 and changed under size of 700 so no need to call setWindowSizeChnaged 
      if (window.innerWidth <= 700 && windowSize.current > 700) {
        //console.log("will render")
        /**
         * can not use directly setWindowSizeChnaged(window.innerWidth) it will not update every time when the size changes
         */
        windowSize.current = window.innerWidth
        setWindowSizeChnaged(windowSize.current)
        //if window's size is above 700 and changed above size of 700 so no need to call setWindowSizeChnaged 
      } else if (window.innerWidth > 700 && windowSize.current <= 700) {
        //console.log("will render")
        /**
         * can not use directly setWindowSizeChnaged(window.innerWidth) it will not update every time when the size changes
         */
        windowSize.current = window.innerWidth
        setWindowSizeChnaged(windowSize.current)
      }
    });
    return () => window.removeEventListener("resize", () => {/** clear event */ });
  }, [window.innerWidth]);

  
  return (
    (windowSizeChnaged > 700) ? <Desktoptable  exchanges={exchanges} /> : <Mobiletable exchanges={exchanges} />
  )
}
/**Main Component */
class History extends React.Component {
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
      });
  }
  render() {
    return (
      <Container style={{ marginTop: "45px" }}>
        <Box  >
          <Heading subtitle>History</Heading>
          <Columns centered>
            <Columns.Column >
              {
                (this.state.historyLoading &&
                  <div className="loader is-centered is-loading" style={{ margin: "20px 0", height: "70px", width: "70px" }}></div>
                )
              }
              {
                (this.state.errorFetch &&
                  <Notification color="danger">
                    {this.state.errorFetch}
                  </Notification>
                )
              }
              {
                (!this.state.historyLoading && !this.state.errorFetch &&
                  <>

                    <FilterDateSQL filterclear={this.state.filterclear} filtersql={this.filtersqlupdate} />
                    <LiveElements live={this.liveupdate} />


                    {(this.state.emptyResault) ?

                      <Notification color="danger">
                        No data to show !
                        <Button onClick={() => { this.history() }}>Reload</Button>
                      </Notification>
                      :
                      <Showexchangehistyory exchanges={this.state.exchanges} />
                    }

                  </>
                )
              }
            </Columns.Column>
          </Columns>
        </Box>
      </Container>
    );
  }
}
export default History;
