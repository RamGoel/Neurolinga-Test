import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import { Card } from "react-native-paper";
import { db, set, ref } from "../firebase";
import { fontSizeConstant } from "./res/constants";
function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const OrderConfirm = ({ navigation, route }) => {
  const { data } = route.params;
  const [visible, setVisible] = useState(false);
  const [tempVal, setTempVal] = useState({
    ...data,
    method: "",
    amountPaid: "",
  });
  var formFields = [
    { label: "Cash", value: "cash" },
    { label: "UPI", value: "upi" },
    { label: "Credit Card", value: "c-card" },
    { label: "Debit Card", value: "d-card" },
  ];
  const orderData = [
    [
      { fieldName: "Name", fieldValue: data.cname },
      { fieldName: "Address", fieldValue: data["Delivery Address"] },
      { fieldName: "Contact", fieldValue: data["Customer Contact Number"] },
      { fieldName: "Product", fieldValue: data["Choose Product"] },
    ],
    [
      { fieldName: "Subtotal", fieldValue: data.subTotal },
      { fieldName: "Delivery", fieldValue: data.deliveryCharge },
      { fieldName: "Tax (18% GST)", fieldValue: data.taxPercent },
      { fieldName: "Total Amount", fieldValue: data.totalPrice },
    ],
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={{ margin: 10 }}>
        Please check all the details before you continue
      </Text>
      <Card style={{ padding: 10, margin: 10 }}>
        <Text style={styles.cardHead}>Order Details</Text>
        {orderData[0].map((elem) => {
          return (
            <View style={styles.listBox} key={makeid(5)}>
              <Text style={styles.listItem}>{elem.fieldName}</Text>
              <Text style={styles.listItem}>{elem.fieldValue}</Text>
            </View>
          );
        })}
      </Card>
      <Card style={{ padding: 10, margin: 10 }}>
        <Text style={styles.cardHead}>Payment Details</Text>
        {orderData[1].map((elem) => {
          return (
            <View style={styles.listBox} key={makeid(5)}>
              <Text style={styles.listItem}>{elem.fieldName}</Text>
              <Text style={styles.listItem}>{elem.fieldValue}</Text>
            </View>
          );
        })}
      </Card>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={formFields}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={"Payment Method"}
        value={tempVal.method}
        onChange={(item) => {
          const res = { ...tempVal };
          res.method = item.value;
          setTempVal(res);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Amount Paid"
        value={tempVal.amount}
        onChangeText={(e) => {
          const res = { ...tempVal };
          res.amountPaid = e;
          setTempVal(res);
          console.log(tempVal);
        }}
      />

      <Button
        title="Complete Order"
        onPress={() => {
          if (tempVal.method != "" && tempVal.amountPaid != "") {
            setVisible(true);

            const id = makeid(10);
            set(ref(db, `Orders/${id}`), {
              ...tempVal,
              orderId: id,
            });

            setTimeout(() => {
              setVisible(0);
              navigation.navigate("Home");
            }, 4000);
          } else {
            alert("All Details are Required");
          }
        }}
      />
      <Dialog
        visible={visible}
        onTouchOutside={() => {
          setVisible(false);
        }}
      >
        <DialogContent>
          <View>
            <Image
              style={styles.tinyLogo}
              source={require("../assets/complete.png")}
            />
            <Text style={{textAlign:"center"}}>Order has been Completed</Text>
            <Text>You'll be redirected to Home Screen after 3 seconds.</Text>
          </View>
        </DialogContent>
      </Dialog>
    </ScrollView>
  );
};

export default OrderConfirm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  textInput: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
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
  listBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  listItem: {
    padding: 2,
    margin: 2,
  },
  cardHead: {
    fontSize: 17,
    fontWeight: "bold",
  },
  tinyLogo:{
    height:250,
    width:'100%'
  }
});
