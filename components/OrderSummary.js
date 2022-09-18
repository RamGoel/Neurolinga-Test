import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Pressable } from "react-native";
import { Button, ScrollView } from "react-native";
import * as Print from 'expo-print'
import { Card } from "react-native-paper";
import styles from "../res/styles";
import { makeid } from "../res/constants";


const OrderSummary = ({ navigation, route }) => {
  const { data } = route.params;

  const orderData = [
    [
      { fieldName: "Name", fieldValue: data.cname },
      { fieldName: "Street", fieldValue: data["Delivery Address"] || "In-Store Delivery" },
      { fieldName: "Contact", fieldValue: data["Customer Contact Number"] },
      { fieldName: "Email", fieldValue: data.cmail },
      { fieldName: "Communication", fieldValue: data.comMode },
    ],
    [
      { fieldName: "Subtotal", fieldValue: data.subTotal },
      { fieldName: "Delivery", fieldValue: data.deliveryCharge },
      { fieldName: "Tax (18% GST)", fieldValue: data.taxPercent },
      { fieldName: "Transaction Id", fieldValue: data.transactionId || "Offline Payment" },
      { fieldName: "Invoice Number", fieldValue: data.orderId },
      { fieldName: "Transaction Date & Time", fieldValue: data.tDate || "Not Available" },
      { fieldName: "Payment Method", fieldValue: data.paymentMethod },
      { fieldName: "Total Amount", fieldValue: data.totalPrice },
      { fieldName: "paidAmount", fieldValue: data.paidAmount || "Product Amount" },

    ],
    [
      { fieldName: "Name", fieldValue: data["Choose Product"] },
      {
        fieldName: "Service Order Id",
        fieldValue: data["Service Order Number"],
      },
      { fieldName: "Category", fieldValue: data["Product Type"] },
      { fieldName: "Color", fieldValue: data.Color },
      { fieldName: "Variant", fieldValue: data.Size },
      { fieldName: "Serial Number", fieldValue: data["Product Serial Number"] },
      { fieldName: "Delivery Method", fieldValue: data["Delivery Mode"] },
    ],
  ];

  const html = `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      ${data['Choose Product']} purchased by ${data.cname}
    </h1>
    <table>
    
    ${orderData[0].map((elem) => {
    return (
      <tr style={styles.listBox} key={makeid(5)}>
        <td style={styles.listItem}>{elem.fieldName}</td>
        <td style={styles.listItem}>{elem.fieldValue}</td>
      </tr>
    );
  })}    
    ${orderData[1].map((elem) => {
    return (
      <tr style={styles.listBox} key={makeid(5)}>
        <td style={styles.listItem}>{elem.fieldName}</td>
        <td style={styles.listItem}>{elem.fieldValue}</td>
      </tr>
    );
  })}    
    ${orderData[2].map((elem) => {
    return (
      <tr style={styles.listBox} key={makeid(5)}>
        <td style={styles.listItem}>{elem.fieldName}</td>
        <td style={styles.listItem}>{elem.fieldValue}</td>
      </tr>
    );
  })}    
    </table>
  </body>
</html>`

  const printToFile = async () => {
    await Print.printToFileAsync({
      html
    });

  }

  return (
    <ScrollView style={styles.formContainer}>
      <Card style={{ padding: 10, marginVertical: 10, border: "1px solid black" }}>
        <Text style={styles.cardHead}>Customer Details</Text>
        {orderData[0].map((elem) => {
          return (
            <View style={styles.listBox} key={makeid(5)}>
              <Text style={styles.listItem}>{elem.fieldName}</Text>
              <Text style={styles.listItem}>{elem.fieldValue}</Text>
            </View>
          );
        })}
      </Card>
      <Card style={{ padding: 10, marginVertical: 10, border: "1px solid black" }}>
        <Text style={styles.cardHead}>Product Details</Text>
        {orderData[2].map((elem) => {
          return (
            <View style={styles.listBox} key={makeid(5)}>
              <Text style={styles.listItem}>{elem.fieldName}</Text>
              <Text style={styles.listItem}>{elem.fieldValue}</Text>
            </View>
          );
        })}
      </Card>
      <Card style={{ padding: 10, marginVertical: 10, border: "1px solid black" }}>
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
      <Pressable style={styles.pressable} onPress={printToFile}>
        <Text style={styles.pressText}>Print Slip</Text>
      </Pressable>
    </ScrollView>
  );
};

export default OrderSummary;


