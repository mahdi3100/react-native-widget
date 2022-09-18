import React, {  forwardRef, useState } from "react";
import 'bulma/css/bulma.min.css';
import {  Form, Box, Button,Level } from 'react-bulma-components';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon as Iconify } from '@iconify/react';
const {Item ,Side} = Level
/* FilterDateSQL Component of Filter By Date  , gets 2 date and send them 
to Comopent Parent History */
function FilterDateSQL(props){
    const [startDate1, setStartDate1] = useState(new Date());
    const [startDate2, setStartDate2] = useState(new Date());
    /*
      useEffect(()=>{
        console.log(Date.parse(startDate1).toLocaleString())
    
      },[startDate1])*/
  
    const Date1Input = forwardRef(({ value, onClick }, ref) => (
      <button className="button" style={{ fontSize: "13px" }} onClick={onClick} ref={ref}>
        <Iconify icon={"akar-icons:calendar"} style={{ marginRight: "10px" }} width="18" height="18" />
  
        <p style={{ fontSize: "13px" }}>{value}</p>
      </button>
    ));
    const Date2Input = forwardRef(({ value, onClick }, ref) => (
      <button className="button" style={{ fontSize: "13px" }} onClick={onClick} ref={ref}>
        <Iconify icon={"akar-icons:calendar"} style={{ marginRight: "10px" }} width="18" height="18" />
  
        <p style={{ fontSize: "13px" }}>{value}</p>
      </button>
  
    ));
  
  
    const handleFilterSQL = () => {
      if (props.filterclear) {
        return props.filtersql(null)
      }
      return props.filtersql(startDate1, startDate2)
    }
  
    /** Prevent Data Picker Elements to be shown in case the filter resault */
    const DataPickerShown = () => {
  
      if (props.filterclear == false) {
        return (
          <>
         
            <Form.Field>
              <Form.Label size={"small"} textColor={"grey"}>Date from</Form.Label>
              <DatePicker
                selected={startDate1}
                onChange={(date) => setStartDate1(date)}
                customInput={<Date1Input />}
              /></Form.Field>
            <Form.Field>
              <Form.Label size={"small"} textColor={"grey"}>Date to</Form.Label>
              <DatePicker
                selected={startDate2}
                onChange={(date) => setStartDate2(date)}
                customInput={<Date2Input />}
              />
            </Form.Field>
           
          </>
        )
      } else return (null)
    }
    return (
      <Box>

        <Level>
          <Side >
            <Item >
              <div className="filterbox">
                <DataPickerShown />
                <Form.Field>
                  <Form.Label size={"small"} textColor={"white"}>Fitlter</Form.Label>
                  <Button onClick={handleFilterSQL} renderAs="button" color="info">
                    {(props.filterclear) ? "Remove Filter" : "Filter"}
                  </Button>
                </Form.Field></div>
            </Item>
          </Side>
        </Level>

      </Box>
    );
  }
export default FilterDateSQL; 
  