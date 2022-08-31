import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button, ScrollView } from "react-native";

import { Card } from "react-native-paper";

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

const OrderSummary = ({ navigation, route }) => {
  const { data } = route.params;

  const orderData = [
    [
      { fieldName: "Name", fieldValue: data.cname },
      { fieldName: "Street", fieldValue: data["Delivery Address"] },
      { fieldName: "Contact", fieldValue: data["Customer Contact Number"] },
      { fieldName: "Email", fieldValue: data.cmail },
    ],
    [
      { fieldName: "Subtotal", fieldValue: data.subTotal },
      { fieldName: "Delivery", fieldValue: data.deliveryCharge },
      { fieldName: "Tax (18% GST)", fieldValue: data.taxPercent },
      { fieldName: "Transaction Id", fieldValue: "" },
      { fieldName: "Invoice Number", fieldValue: "" },
      { fieldName: "Transaction Time", fieldValue: "" },
      { fieldName: "Payment Method", fieldValue: data.method },
      { fieldName: "Total Amount", fieldValue: data.totalPrice },
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

  return (
    <ScrollView style={styles.container}>
      <Card style={{ padding: 10, margin: 10, border: "1px solid black" }}>
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
      <Card style={{ padding: 10, margin: 10, border: "1px solid black" }}>
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
      <Card style={{ padding: 10, margin: 10, border: "1px solid black" }}>
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

      <Button title="Print Slip" style={styles.btn} />
    </ScrollView>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
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
    fontWeight: 700,
  },
  btn: {
    backgroundColor: "black",
    margin: 10,
  },
});
