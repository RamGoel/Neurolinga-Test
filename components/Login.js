import {
  Text,
  View,
  TextInput,
  Pressable,
  ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../res/styles'
import { useEffect, useState } from "react";
import { onValue, ref, db, auth, onAuthStateChanged, signInWithEmailAndPassword, saveLocal, getLocal } from "./firebase";

export default function Login({ navigation, route }) {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSpinner, setSpinner] = useState(true)
  const [viewLogin, setLogin] = useState(false)


  const loginUser = async (mail, pwd) => {
    if (mail != "" && pwd != "") {
      setSpinner(false)

      signInWithEmailAndPassword(auth, mail, pwd)
        .then((user) => {
          onAuthStateChanged(auth, (user) => {
            const storeRef = ref(db, `Stores/`)
            onValue(storeRef, async(snap) => {
              var data = snap.val();
              data = Object.values(data).filter((elem) => elem.mail != mail)
              if (data) {
                if (await AsyncStorage.getItem('XiBillerUser') != data[0]) {
                  saveLocal('XiBillerUser', data[0]);
                }
                navigation.navigate('Home', { data: data[0] });
                setSpinner(true)
              } else {
                navigation.navigate('StoreDataForm', { user: { mail: mail, password: pwd } })
                setSpinner(true)
              }
            })
          });
        })
        .catch((error) => {
          const v = error.message.split('/')
          alert(v[v.length - 1])
          setSpinner(true)
        });


    } else {

      alert("Please Enter E-mail or Password");
    }

  };

  useEffect(() => {
    async function checkLocal(){
    if (await AsyncStorage.getItem('XiBillerUser') != null) {
      var obj = JSON.parse(await AsyncStorage.getItem('XiBillerUser'))
      navigation.navigate('Home', { data: obj })
    }else{
      setLogin(true)
    }}
    checkLocal()
  }, [''])

  return (

    (viewLogin) ?
      (showSpinner) ? (
        <View style={styles.container}>


          <Text style={styles.paragraph}>Login with Mi Account</Text>

          <View>
            <TextInput
              style={styles.textInput}
              placeholder="E-mail ID"
              value={email}
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.textInput}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={setPassword}
            />


          </View>

          <Pressable style={styles.pressable} onPress={() => {
            loginUser(email, password);
          }}>
            <Text style={styles.pressText}>Login</Text>
          </Pressable>

        </View>


      ) : (<View style={{ height: '100%', justifyContent: 'center' }}>

        <ActivityIndicator size="large" color="#808080" />
      </View>
      ) : null
  )
}
