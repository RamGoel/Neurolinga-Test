import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView, TextInput } from "react-native";
import { fields } from '../res/data'
import styles from "../res/styles";
import { miProducts } from "./firebase";
import { makeid } from "../res/constants";
import { ref, db, onValue, set, dbF, saveLocal, getProducts, setCart, miOrders } from "./firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderForm = ({ navigation, route }) => {

  const { store } = route.params
  const [address, setAddress] = useState('')
  const [products, setProducts] = useState(miProducts);
  const [formData, setData] = useState([
    {
      "dropName": "Product Type",
      "label": "Mi Phones",
      "value": "Mi Phones"
    },
    {
      "dropName": "Product Type",
      "label": "Mi TV",
      "value": "Mi TV"
    },
    {
      "dropName": "Product Type",
      "label": "Mi Laptops",
      "value": "Mi Laptops"
    },
    {
      "dropName": "Product Type",
      "label": "Mi Speakers",
      "value": "Mi Speakers"
    },
    {
      "dropName": "Product Type",
      "label": "Mi Bands",
      "value": "Mi Bands"
    },
    {
      "dropName": "Delivery Mode",
      "label": "Home Delivery",
      "value": "Home Delivery"
    },
    {
      "dropName": "Delivery Mode",
      "label": "In-Store Delivery",
      "value": "In-Store Delivery"
    }
  ])
  const [isHome, setIsHome] = useState(0);
  const [passData, setPassData] = useState({
    "Operator Id": store.Id,
    "Store Type": store.type,
    "Store Name": store.Name,
    "Product Serial Number": "",
    "Service Order Number": "",
    "Product Type": "",
    "Choose Product": "",
    Color: "",
    Size: "",
    "Delivery Mode": "",
    "Customer Contact Number": "",
  });

  useEffect(() => {
    const filteredProducts = products.filter(
      (obj) => obj.category == passData["Product Type"]
    );
    const copyDropItems = [...formData];
    filteredProducts.map((elem) => {
      var flag = 0;
      copyDropItems.map((elem1) => {
        if (JSON.stringify(elem1) == JSON.stringify(elem)) {
          flag = 1;
        }
      });
      if (flag == 0) {
        copyDropItems.push({
          label: elem.name,
          value: elem.name,
          dropName: "Choose Product",
        });
      }
    });
    setData(copyDropItems);
  }, [passData["Product Type"]]);

  useEffect(() => {
    const chosenProduct = products.filter(
      (obj) => obj.name == passData["Choose Product"]
    );

    if (chosenProduct.length > 0) {
      console.log("sndjsnd", chosenProduct);
      const copyDropItems = [...formData];
      chosenProduct[0].colors.map((elem) => {
        copyDropItems.push({ label: elem, value: elem, dropName: "Color" });
      });
      chosenProduct[0].variants.map((elem) => {
        copyDropItems.push({ label: elem, value: elem, dropName: "Size" });
      });
      const submitData = { ...passData }
      submitData.subTotal = chosenProduct[0].price[0]
      submitData.deliveryCharge = chosenProduct[0].price[1]
      submitData.taxPercent = chosenProduct[0].price[2]
      submitData.totalPrice = chosenProduct[0].price[3]

      setPassData(submitData)
      setData(copyDropItems);
    }
  }, [passData["Choose Product"]]);

  return (
    <ScrollView style={styles.formContainer}>
      {fields.map((elem) => {
        if (elem[1] != "input") {
          var dropItems = formData.filter((obj) => obj.dropName == elem[0]);
          return (
            <Dropdown
              key={elem[0]}
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={dropItems}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={elem[0]}
              value={passData[`${elem[0]}`]}
              onChange={(item) => {
                var obj = { ...passData };
                obj[`${elem[0]}`] = item.value;
                if (
                  elem[0] == "Delivery Mode" &&
                  item.value == "Home Delivery"
                ) {
                  setIsHome(1);
                }
                if (
                  elem[0] == "Delivery Mode" &&
                  item.value == "In-Store Delivery"
                ) {
                  setIsHome(0);
                }
                setPassData(obj);
              }}
            />
          );
        } else {

          if (elem[0] == "Operator Id") {
            return <TextInput
              key={elem[0]}
              value={`${store.Id}`}
              keyboardType={`${elem[2]}`}
              style={styles.textInput}
              placeholder={elem[0]}
              editable={false}
            />
          } else {

            if (elem[0] == "Delivery Address") {
              return isHome ? (
                <TextInput
                  key={elem[0]}
                  value={address}
                  style={styles.textInput}
                  placeholder={elem[0]}
                  keyboardType={`${elem[2]}`}
                  onChangeText={setAddress}
                />
              ) : (
                null
              );
            } else {
              return (
                <TextInput
                  key={elem[0]}
                  value={passData[`${elem}`]}
                  style={styles.textInput}
                  keyboardType={`${elem[2]}`}
                  placeholder={elem[0]}
                  onChangeText={(e) => {
                    var obj = { ...passData };
                    obj[`${elem[0]}`] = e;
                    setPassData(obj);
                  }}
                />
              );
            }
          }
        }
      })}


      <View style={{ flex: 1, flexDirection: 'row' }}>



        <Pressable style={{ ...styles.pressable, flex: 1, marginLeft: 5 }} onPress={() => {

          //Check if Value Empty
          var flag = 0;
          Object.keys(passData).map((elem) => {
            if (passData[`${elem}`] == "") {
              flag = 1;
            }
          });

          if (flag == 0) {


            if (passData["Delivery Mode"] == "Home Delivery") {

              if (address.length > 5) {

                //Continue Order

                if (miOrders) {

                  const prevUser = Object.values(miOrders).find((elem) => elem["Customer Contact Number"] == passData["Customer Contact Number"])
                  if (prevUser) {
                    navigation.navigate("OrderConfirm", { data: { ...passData, commMode: prevUser.commMode, cname: prevUser.cname, cmail: prevUser.cmail } });
                  } else {
                    navigation.navigate("CustomerDetails", { data: passData });

                  }
                } else {

                  navigation.navigate("CustomerDetails", { data: passData });

                }



              } else {
                alert("Address Should Contain minimum 5 Characters")
              }


            } else {
              //Continue Order

              if (miOrders) {

                const prevUser = Object.values(miOrders).find((elem) => elem["Customer Contact Number"] == passData["Customer Contact Number"])
                if (prevUser) {
                  navigation.navigate("OrderConfirm", { data: { ...passData, commMode: prevUser.commMode, cname: prevUser.cname, cmail: prevUser.cmail } });
                } else {
                  navigation.navigate("CustomerDetails", { data: passData });

                }
              } else {

                navigation.navigate("CustomerDetails", { data: passData });

              }


            }





          }
          else alert("All Fields are Compulsory");


        }}>
          <Text style={styles.pressText}>Continue</Text>
        </Pressable>
      </View>

    </ScrollView>
  );

};

export default OrderForm;

