import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button, ScrollView, TextInput } from "react-native";
import { db, ref, onValue } from "../firebase";
import { fontSizeConstant } from "./res/constants";
const OrderForm = ({ navigation, route }) => {
  const [formData, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [isHome, setIsHome] = useState(0);
  const [passData, setPassData] = useState({
    "Operator Id": "",
    "Store Type": "",
    "Store Name": "",
    "Product Serial Number": "",
    "Service Order Number":"",
    "Product Type": "",
    "Choose Product": "",
    Color:  "",
    Size: "",
    "Delivery Mode": "",
    "Delivery Address": "",
    "Customer Contact Number": "",
  });
  const fields = [
    ["Operator Id", "input"],
    ["Store Type", ""],
    ["Store Name", "input"],
    ["Product Serial Number", "input"],
    ["Service Order Number", "input"],
    ["Product Type", ""],
    ["Choose Product", ""],
    ["Color", ""],
    ["Size", ""],
    ["Delivery Mode", ""],
    ["Delivery Address", "input"],
    ["Customer Contact Number", "input"],
  ];

  useEffect(() => {
    const formDataRef = ref(db, "formData/");
    onValue(formDataRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
    const ProductsRef = ref(db, "Products/");
    onValue(ProductsRef, (snapshot) => {
      const data = snapshot.val();
      setProducts(data);
    });
  }, [""]);

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
      const submitData={...passData}
      submitData.subTotal=chosenProduct[0].price[0]
      submitData.deliveryCharge=chosenProduct[0].price[1]
      submitData.taxPercent=chosenProduct[0].price[2]
      submitData.totalPrice=chosenProduct[0].price[3]

      setPassData(submitData)
      setData(copyDropItems);
    }
  }, [passData["Choose Product"]]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageHead}>Fill Order Details</Text>
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
                console.log(passData);
              }}
            />
          );
        } else {
          if (elem[0] == "Delivery Address") {
            return isHome ? (
              <TextInput
                key={elem[0]}
                value={passData[`${elem}`]}
                style={styles.textInput}
                placeholder={elem[0]}
                onChangeText={(e) => {
                  var obj = { ...passData };
                  obj[`${elem[0]}`] = e;
                  setPassData(obj);
                }}
              />
            ) : (
              <Text></Text>
            );
          } else {
            return (
              <TextInput
                key={elem[0]}
                value={passData[`${elem}`]}
                style={styles.textInput}
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
      })}

      <Button
        title="Continue"
        onPress={() => {
          var flag = 0;
          Object.keys(passData).map((elem) => {
            if (passData[`${elem}`] == "") {
              flag = 1;
              alert(elem)
            }
          });
          if (flag == 0) navigation.navigate("CustomerDetails",{data:passData});
          else alert("All Fields are Compulsory");
        }}
      />
    </ScrollView>
  );
  
};

export default OrderForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  pageHead: {
    fontSize:fontSizeConstant,
    textAlign: "center",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 10,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize:fontSizeConstant
  },
  placeholderStyle: {
    fontSize:fontSizeConstant
  },
  selectedTextStyle: {
    fontSize:fontSizeConstant
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize:fontSizeConstant
  },
  textInput: {
    margin: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    border: "1px solid black",
  },
});
