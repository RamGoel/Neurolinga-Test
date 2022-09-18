import React, { useState, use } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
} from "react-native";

import AsyncStorage from
  '@react-native-async-storage/async-storage';
import { Dropdown } from "react-native-element-dropdown";
import { Card } from "react-native-paper";
import styles from "../res/styles";
import { makeid } from "../res/constants";
import RazorpayCheckout from "react-native-razorpay";
import { increaseOrderCount, setOrders, setCart, getLocal } from "./firebase";






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
      { fieldName: "E-mail", fieldValue: data.cmail },
      { fieldName: "Product", fieldValue: data["Choose Product"] },
    ],
    [
      { fieldName: "Subtotal", fieldValue: data.subTotal },
      { fieldName: "Delivery", fieldValue: data.deliveryCharge },
      { fieldName: "Tax (18% GST)", fieldValue: data.taxPercent },
      { fieldName: "Total Amount", fieldValue: data.totalPrice },
    ],
  ];



  const displayRazorpay = () => {

    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_aWhdjMGJMO8dCQ', // Your api key
      amount: data.totalPrice,
      name: data.cname,
      prefill: {
        email: 'goel@ode2code',
        contact: '9191919191',
        name: 'Mi Store',
      },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        alert(`Success: ${data.razorpay_order_id}`);
        return 1;
      })
      .catch(error => {
        // handle failure
        return 0;
      });



  }







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



        if (tempVal.paymentMethod) {

          var orderObj = {}
          if (tempVal.paymentMethod == "offline") {
            if (amount) {

              orderObj = {
                ...tempVal,
                orderId: orderIdFinal,
                paidAmount: amount,
                tDate: transactionDate
              }
            } else {
              alert("Fill Amount")
            }
          } else {

            const transId = displayRazorpay()
            if (transId) {
              orderObj = {
                ...tempVal,
                orderId: orderIdFinal,
                transactionId: transId,
                tDate: transactionDate
              }
            } else {
              alert("Payment Failed")
            }

          }

          setOrders(orderObj);

          //Increasing Sales and Orders
          increaseOrderCount(tempVal['Operator Id'], tempVal)

          //Removing Order From Cart
          if (tempVal.cartId) {
            //Removing Order From Cart
            setCart(tempVal.cartId, null)
          }


          alert("Order Completed")

          const data = await AsyncStorage.getItem('XiBillerUser')
          navigation.navigate('Home', { data: JSON.parse(data) })

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

