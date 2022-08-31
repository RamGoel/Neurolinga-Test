import * as React from "react";
import Home from "./components/Home";
import OrderForm from "./components/OrderForm";
import Login from "./components/Login";
import CustomerDetailsForm from "./components/CustomerDetailsForm";
import OrderConfirm from "./components/OrderConfirm";
import OrderList from "./components/OrderList";
import OrderSummary from "./components/OrderSummary";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoreProfile from "./components/StoreProfile";
const Stack = createNativeStackNavigator();

export default function App() {
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
          options={{ title: "Home" }}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}


