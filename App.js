import * as React from "react";
import { Icon, Badge } from "react-native-elements";
import { Platform, View, Alert, BackHandler } from "react-native";
import Home from "./components/Home";
import OrderForm from "./components/OrderForm";
import Login from "./components/Login";
import Cart from './components/Cart'
import CustomerDetailsForm from "./components/CustomerDetailsForm";
import OrderConfirm from "./components/OrderConfirm";
import OrderList from "./components/OrderList";
import OrderSummary from "./components/OrderSummary";
import { NavigationContainer, Link } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoreProfile from "./components/StoreProfile";
import styles from "./res/styles";
import StoreDataForm from "./components/StoreDataForm";
import { db, onChildAdded, onValue, ref } from './components/firebase'
const Stack = createNativeStackNavigator();


const showConfirmDialog = () => {


  if (Platform.OS == "web") {
    if (window.confirm("Do you Want to Exit?")) {
      navigation.navigate('Login')
    }
  } else {
    Alert.alert(
      "Log Out",
      "Do you want to Exit?",
      [{ text: "Yes", onPress: () => BackHandler.exitApp() }, { text: "No" }], { cancelable: false })
  }



};
export default function App() {
  const [totalCart, setCart] = React.useState(0)
  React.useEffect(() => {
    onValue(ref(db, 'Cart/'), (snap) => {
      if (snap.val()) {
        setCart(Object.keys(snap.val()).length)
      }
    })
  }, [''])
  return (
    <NavigationContainer>


      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home", headerLeft: () => null, headerRight: () => (
              <View style={{ ...styles.listBox, justifyContent: 'flex-end' }}>

                <Link to={{ screen: 'Cart', params: { id: 'jane' } }} style={{ marginRight: 5 }}>
                  <Icon
                    name="shopping-cart"
                    color='#000'
                  />
                  <Badge status="primary" value={totalCart} style={{ position: 'absolute' }} />
                </Link>
                <Icon
                  onPress={showConfirmDialog}
                  name="logout"
                  type="Ionicons"
                  color='#000'
                />


              </View>
            )
          }}
        />

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ title: "Cart" }}
        />
        <Stack.Screen
          name="OrderForm"
          component={OrderForm}
          options={{ title: "Order Details" }}
        />
        <Stack.Screen
          name="CustomerDetails"
          component={CustomerDetailsForm}
          options={{ title: "Customer Details" }}
        />
        <Stack.Screen
          name="OrderConfirm"
          component={OrderConfirm}
          options={{ title: "Verify Details" }}
        />

        <Stack.Screen
          name="OrderList"
          component={OrderList}
          options={{ title: "Previous Orders" }}
        />
        <Stack.Screen
          name="OrderSummary"
          component={OrderSummary}
          options={{ title: "Order Summary" }}
        />
        <Stack.Screen
          name="Profile"
          component={StoreProfile}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="StoreDataForm"
          component={StoreDataForm}
          options={{ title: "Fill Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



