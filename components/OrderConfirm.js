import React, { useState, use } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
  Platform
} from "react-native";


import { Dropdown } from "react-native-element-dropdown";
import { Card } from "react-native-paper";
import styles from "../res/styles";
import { makeid } from "../res/constants";
import { ref, db, onValue, set } from "./firebase";



const increaseOrderCount = (id, tempVal) => {
  const thisStoreRef = ref(db, `Stores/${id}`);
  var storeObj = {}
  onValue(thisStoreRef, (snapshot) => {
    storeObj = { ...snapshot.val() };
  });
  storeObj.totalOrders = Number(storeObj.totalOrders) + 1
  storeObj.totalSales = Number(storeObj.totalSales) + Number(tempVal.totalPrice)
  storeObj.totalCustomers = Number(storeObj.totalCustomers) + 1
  set(thisStoreRef, storeObj);
  console.log(storeObj)
}

const removeFromCart = (tempVal) => {
  if (tempVal.cartId) {

    set(ref(db, `Cart/${tempVal.cartId}`), null)
  }
}


const OrderConfirm = ({ navigation, route }) => {
  const { data } = route.params;
  const [amount, setAmount] = useState('')
  const [tempVal, setTempVal] = useState({
    ...data,
    paymentMethod: "",
  });
  var formFields = [
    { label: "Offline Payment", value: "offline" },
    { label: "Online Payment", value: "online" },
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
    <ScrollView style={styles.formContainer}>
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
        placeholder={"Mode of Payment"}
        value={tempVal.paymentMethod}
        onChange={(item) => {
          const res = { ...tempVal };
          res.paymentMethod = item.value;
          setTempVal(res);
        }}
      />

      {
        (tempVal.paymentMethod == 'offline')
          ? <TextInput
            style={styles.textInput}
            placeholder="Amount Paid"
            value={amount}
            keyboardType={"numeric"}
            onChangeText={setAmount}
          />

          : null

      }




      <Pressable style={styles.pressable} onPress={async () => {

        const orderIdFinal = `${makeid(10)}${tempVal.cname}`;
        var td = new Date();
        const transactionDate = `${td.getDate()}/${td.getMonth()}/${td.getFullYear()} ${td.getHours()}:${td.getMinutes()}`


        const completeOrder = (data) => {
          set(ref(db, `Orders/${orderIdFinal}`), data);

          //Increasing Sales and Orders
          increaseOrderCount(tempVal['Operator Id'], tempVal)

          //Removing Order From Cart
          removeFromCart(tempVal)


            (data.paymentMethod == 'offline') ? alert("Order Completed") : alert(`Transaction Id is ${data.transactionId}`)
        }

        if (tempVal.paymentMethod == "online") {
          const transId = makeid(8)
          if (Platform.OS == "web") {
            if (window.confirm(`Confirm Payment of ${tempVal.totalPrice}`)) {
              completeOrder({
                ...tempVal,
                orderId: orderIdFinal,
                paidAmount: amount,
                tDate: transactionDate,
                transactionId: transId

              })
            }
          } else {
            Alert.alert(
              "Log Out",
              `Confirm Payment of ${tempVal.totalPrice}`,
              [{
                text: "Yes", onPress: () => completeOrder({
                  ...tempVal,
                  orderId: orderIdFinal,
                  paidAmount: amount,
                  tDate: transactionDate,
                  transactionId: transId

                })
              }, { text: "No" }], { cancelable: false })
          }
        }
        else if (tempVal.paymentMethod == "offline") {
          if (amount) {


            completeOrder({
              ...tempVal,
              orderId: orderIdFinal,
              paidAmount: amount,
              tDate: transactionDate

            })

          } else {
            alert("Fill Amount")
          }
        }
        else {

          alert("Choose Payment Method")

        }



      }}>
        <Text style={styles.pressText}>Complete Order</Text>
      </Pressable>



    </ScrollView >
  );
};

export default OrderConfirm;

