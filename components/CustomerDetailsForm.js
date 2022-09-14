import React, { useState } from "react";
import {Pressable, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView } from "react-native";
import styles from '../res/styles'
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
    <ScrollView style={styles.formContainer}>
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
        keyboardType="email-address"
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

      
      <Pressable style={styles.pressable} onPress={() => {
          if (
            formData.cname == "" ||
            formData.cmail == "" ||
            formData.comMode == ""
          ) {
            alert("All Details are Required");
          } else {
            navigation.navigate("OrderConfirm", { data: formData });
          }
        }}>
            <Text style={styles.pressText}>Continue</Text>
        </Pressable>
    </ScrollView>
  );
};

export default CustomerDetailsForm;
