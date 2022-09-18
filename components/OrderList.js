import React, { useState, useEffect } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { Card } from "react-native-paper";
import styles from "../res/styles";
import { SearchBar, Icon } from "react-native-elements";
import { NoOrdersComponent, SpinnerComponent } from "./atoms";
import { miOrders } from "./firebase";



const OrderConfirm = ({ navigation, route }) => {
  const { operId } = route.params
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allOrders, setAllOrders] = useState({});


  useEffect(() => {

    const k = Object.values(miOrders).filter((elem) => elem['Operator Id'] == operId)
    setAllOrders(k)
    setOrders(k)
    setIsLoaded(true)




  }, [""]);

  const [search, setSearch] = useState("");

  return (

    <ScrollView style={[styles.formContainer]}>

      <View style={styles.listBox}>
        <SearchBar
          placeholder="Search by Name"
          onChangeText={(key) => {
            setSearch(key)
            setOrders(
              allOrders.filter((elem) => elem.cname.includes(key.toLowerCase()))
            );
          }}
          value={search}
          cancelIcon="1"
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarContainer}
        />



      </View>


      {
        isLoaded ? (
          (orders.length) ? (
            orders.map((elem) => {

              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate("OrderSummary", {
                      data: elem,
                    });
                  }}
                  key={elem.orderId}
                >

                  <Card
                    style={{ padding: 10, margin: 10, borderWidth: 0.5, shadowColor: 'white', textAlign: 'left' }}

                  >
                    <Text style={styles.cardHead}>{elem.cname}</Text>
                    <Text>{elem.orderId}</Text>
                    <Text>{elem['Store Name']}</Text>


                    <View style={styles.listBox}>
                      <Text style={styles.listItem}>
                        {elem.totalPrice}
                      </Text>
                      <Text style={styles.listItem}>
                        {elem["Choose Product"]}
                      </Text>
                    </View>
                  </Card>
                </Pressable>
              );
            })
          ) : (<NoOrdersComponent />)
        ) : (<SpinnerComponent />)
      }
    </ScrollView>
  );

};

export default OrderConfirm;


