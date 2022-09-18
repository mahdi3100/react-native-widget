
import React, { useEffect, useState ,useRef, memo } from "react";
import {Button,Pressable,Text,StyleSheet,View,} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
//import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';

function ListCrypto({defaultCurTo , changeCurTo}){

  const data = [
    { label: 'USD', value: 'USD' },
    { label: 'GBP', value: 'GBP' },
    { label: 'EUR', value: 'EUR' },
  ]
    //stock Icons's name of Iconify
    const IconToolBar = {
        "USD": { "icon": "dollar", "logo": "$" },
        "GBP": { "icon": "sterling", "logo": "£" },//it does not work! try with fa5
        "EUR": { "icon": "euro", "logo": "€" },
    }
    const [isFocus, setIsFocus] = useState(false);
    const [curTo , setCurTo] = useState(defaultCurTo)
    let styleItemSelected = useRef({"icon":IconToolBar[curTo]["icon"]})


    const renderLabel = () => {
      if (curTo || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Currency
          </Text>
        );
      }
      return null;
    };
    useEffect(()=>{
     
    //  document.querySelector(".dropdown-item").addEventListener("mousedown",function(){alert("test")})
    styleItemSelected.current= {"icon":IconToolBar[curTo]["icon"]}
    changeCurTo(curTo)
  },[curTo]);

    return(
      <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={false}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
        value={curTo}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setCurTo(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <FontAwesome 
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name={styleItemSelected.current["icon"]}
            size={20}
            brands
          />
        )}
      />
    </View>
);


}


const styles = StyleSheet.create({
container: {
backgroundColor: 'white',
padding: 16,
},
dropdown: {
height: 50,
borderColor: 'gray',
borderWidth: 0.5,
borderRadius: 8,
paddingHorizontal: 8,
},
icon: {
  marginRight:13,
},
label: {
position: 'absolute',
backgroundColor: 'white',
left: 22,
top: 8,
zIndex: 999,
paddingHorizontal: 8,
fontSize: 14,
},
placeholderStyle: {
fontSize: 16,
},
selectedTextStyle: {
fontSize: 16,
},
iconStyle: {
width: 20,
height: 20,
},
inputSearchStyle: {
height: 40,
fontSize: 16,
},
});
export default memo(ListCrypto);