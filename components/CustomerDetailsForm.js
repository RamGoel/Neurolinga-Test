import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Button, ScrollView } from "react-native";
import { fontSizeConstant } from "./res/constants";
const CustomerDetailsForm = ({ navigation, route }) => {
  const { data } = route.params;
  const [formData, setData] = useState({
    ...data,
    cname: "",
    cmail: "",
    comMode: "",
  });
  const communicationModes = [
    { label: "E-mail", value: "email" },
    { label: "Whatsapp", value: "whatsapp" },
  ];

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Customer Name"
        value={formData.cname}
        onChangeText={(e) => {
          var res = { ...formData };
          res.cname = e;
          setData(res);
        }}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Customer E-mail"
        value={formData.cmail}
        onChangeText={(e) => {
          var res = { ...formData };
          res.cmail = e;
          setData(res);
        }}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={communicationModes}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={"Mode of Business Communication"}
        value={formData.comMode}
        onChange={(item) => {
          var res = { ...formData };
          res.comMode = item.value;
          setData(res);
        }}
      />

      <Button
        title="Continue"
        onPress={() => {
          if (
            formData.cname == "" ||
            formData.cmail == "" ||
            formData.comMode == ""
          ) {
            alert("All Details are Required");
          } else {
            navigation.navigate("OrderConfirm", { data: formData });
          }
        }}
      />
    </ScrollView>
  );
};

export default CustomerDetailsForm;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  textInput: {
    padding: 10,
    border: "1px solid black",
    margin: 10,
    borderRadius: 10,
  },
  pageHead: {
    fontSize: fontSizeConstant,
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
    fontSize:fontSizeConstant,
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
});
