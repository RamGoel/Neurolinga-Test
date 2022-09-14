import React, { useState, use } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  Alert,
  ScrollView,
} from "react-native";


import { Dropdown } from "react-native-element-dropdown";
import { Card } from "react-native-paper";
import styles from "../res/styles";
import { makeid } from "../res/constants";
import RazorpayCheckout from "react-native-razorpay";
import { ref, db, onValue, set } from "./firebase";
import PaypalExpressBtn from 'react-paypal-express-checkout';



const increaseOrderCount = (id, tempVal) => {
  const thisStoreRef = ref(db, `Stores/${id}`);
  var storeObj = {}
  onValue(thisStoreRef, (snapshot) => {
    storeObj = snapshot.val();
  });
  storeObj.totalOrders = storeObj.totalOrders + 1
  storeObj.totalSales = Number(storeObj.totalSales) + Number(tempVal.totalPrice)
  storeObj.totalCustomers = storeObj.totalCustomers + 1
  set(ref(db, `Stores/${id}`), storeObj);
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



  // const displayRazorpay = () => {

  //   var options = {
  //     description: 'Credits towards consultation',
  //     image: 'https://i.imgur.com/3g7nmJC.png',
  //     currency: 'INR',
  //     key: 'rzp_test_aWhdjMGJMO8dCQ', // Your api key
  //     amount: data.totalPrice,
  //     name: data.cname,
  //     prefill: {
  //       email: 'goel@ode2code',
  //       contact: '9191919191',
  //       name: 'Mi Store',
  //     },
  //   };
  //   RazorpayCheckout.open(options)
  //     .then(data => {
  //       // handle success
  //       alert(`Success: ${data.razorpay_order_id}`);
  //       return 1;
  //     })
  //     .catch(error => {
  //       // handle failure
  //       return 0;
  //     });



  // }


  async function displayRazorpay() {
    return await fetch("https://api-3t.sandbox.paypal.com/nvp", {
      body: {
        USER: 'sb-mz37c20786147_api1.business.example.com',
        PASSWORD: "ALHUG76FFU2P5QJ3",
        SIGNATURE: 'AgmkzHe.Bqd-6Ck0MUpzaNjADETJAGbs8riHt-S7FL.qBj99btpwNvQO',
        METHOD: 'setExpressCheckout',
        VERSION: '98',
        PAYMENTREQUEST_0_AMT: '10',
        PAYMENTREQUEST_0_CURRENCYCODE: 'USD',
        PAYMENTREQUEST_0_PAYMENTACTION: 'SALE',
        cancelUrl: 'https://example.com/cancel.html',
        returnUrl: 'https://example.com/success.html',
      },

      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    })
  }


  const onSuccess = (payment) => {
    // Congratulation, it came here means everything's fine!
    console.log("The payment was succeeded!", payment);
    removeFromCart()
    navigation.navigate('Home')
    // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  }
  const onCancel = (data) => {
    // User pressed "cancel" or close Paypal's popup!
    console.log('The payment was cancelled!', data);
    // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  }
  const onError = (err) => {
    // The main Paypal's script cannot be loaded or somethings block the loading of that script!
    console.log("Error!", err);
    // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
    // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  }
  let env = 'sandbox'; // you can set here to 'production' for production
  let currency = 'USD'; // or you can set this value from your props or state
  let total = 1; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
  const client = {
    sandbox: 'Abwn8s5FdFn6YMQ4Hxgf8qGmmFiOnoiGLKBMG4e7TjTRPOl-kssavfscpb5oahUiAAo5nbG9urrH8qKu',
    production: 'YOUR-PRODUCTION-APP-ID',
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



      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel} />
      <Pressable style={styles.pressable} onPress={async () => {

        const orderIdFinal = `${makeid(10)}${tempVal.cname}`;
        var td = new Date();
        const transactionDate = `${td.getDate()}/${td.getMonth()}/${td.getFullYear()} ${td.getHours()}:${td.getMinutes()}`


        if (tempVal.paymentMethod == "online") {

          console.log(displayRazorpay())
          // if (true) {

          //   //Code to Save on Firebase
          //   set(ref(db, `Orders/${orderIdFinal}`), {
          //     ...tempVal,
          //     orderId: orderIdFinal,
          //     tDate: transactionDate
          //   });


          //   //Increasing Sales and Orders
          //   increaseOrderCount(tempVal['Operator Id'], tempVal)

          //   //Removing Order From Cart
          //   removeFromCart(tempVal)

          //   alert("Order Completed")

          // } else {
          //   Alert.alert("", "Payment Gateway Integration Failed")
          // }
        }
        else if (tempVal.paymentMethod == "offline") {
          if (amount) {

            set(ref(db, `Orders/${orderIdFinal}`), {
              ...tempVal,
              orderId: orderIdFinal,
              paidAmount: amount

            });

            //Increasing Sales and Orders
            increaseOrderCount(tempVal['Operator Id'], tempVal)

            //Removing Order From Cart
            removeFromCart(tempVal)


            alert("Order Completed")



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

