import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Image,
  Platform,
} from "react-native";
import { useState } from "react";
import { signInWithEmailAndPassword ,onAuthStateChanged,auth } from "../firebase";
import { fontSizeConstant } from "./res/constants";
export default function Login({ navigation, route }) {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const loginUser = (obj) => {
    if (obj.email != "" && obj.password != "") {

      signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then((user) => {
          onAuthStateChanged(auth, (user) => {
            navigation.navigate("Home", formData);
          });
        })
        .catch((error) => {
          {
            alert(`User not found`);
            navigation.navigate("Home", formData);

          }
        });
    } else {
      alert("Please Enter E-mail or Password");
    }

  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/login.png')}
      />
      <Text style={styles.paragraph}>Login with Mi Account</Text>
      <View>
        <TextInput
          style={styles.textInput}
          placeholder="E-mail ID"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />
      </View>
      <Button
        title="SUBMIT"
        onPress={() => {
          loginUser(formData);
        }}
      />
      <Text style={styles.bottomLine}>Not Registered? Contact Us</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 24,
    fontSize:fontSizeConstant,
    backgroundColor:'white',
    height:'100%'

  },
  paragraph:{
    fontSize:fontSizeConstant,
    textAlign:'center',
    fontWeight:'bold'
  },
  btn: {
    marginBottom: 10,
    marginTop: 10,
    fontSize:fontSizeConstant
  },
  textInput: {
    marginBottom: 10,
    marginTop: 10,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 3,
    fontSize:15
  },
  tinyLogo:{
    height:250,
    width:'100%'
  },
  bottomLine:{
    marginTop:10,
    textAlign:'center',


  }
});
