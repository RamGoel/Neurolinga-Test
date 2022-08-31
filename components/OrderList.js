import React, { useState, useEffect } from "react";
import { Button, ScrollView,StyleSheet, Text, TextInput, View } from "react-native";
import { Card } from "react-native-paper";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase";

const OrderConfirm = ({ navigation, route }) => {
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [allOrders, setAllOrders] = useState({});
  useEffect(() => {
    const ordersRef = ref(db, "Orders/");
    onValue(ordersRef, (snap) => {
      setOrders(snap.val());
      setAllOrders(snap.val());
      setIsLoaded(true);
    });
  }, [""]);

  const [search, setSearch] = useState("");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.listBox}>
        <TextInput
          style={styles.textInput}
          placeholder="Search by Name"
          value={search}
          onChange={(e) => {
            Object.filter = (obj, predicate) =>
              Object.keys(obj)
                .filter((key) => predicate(obj[key].cname))
                .reduce((res, key) => ((res[key] = obj[key]), res), {});
            setSearch(e.target.value);
            setOrders(
              Object.filter(allOrders, (name) => name.includes(e.target.value))
            );
          }}
        />
        <Button title="Date" />
      </View>
      {isLoaded ? (
        Object.keys(orders).map((elem) => {
          return (
            <Card
              style={{ padding: 10, margin: 10, border: "1px solid black" }}
              key={elem.orderId}
              onClick={() => {
                navigation.navigate("OrderSummary", {
                  data: orders[`${elem}`],
                });
              }}
            >
              <Text style={styles.cardHead}>{orders[`${elem}`].cname}</Text>
              <Text>{orders[`${elem}`].orderId}</Text>

              <View style={styles.listBox}>
                <Text style={styles.listItem}>
                  {orders[`${elem}`].totalPrice}
                </Text>
                <Text style={styles.listItem}>
                  {orders[`${elem}`]["Choose Product"]}
                </Text>
              </View>
            </Card>
          );
        })
      ) : (
        <View
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>Loading...</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default OrderConfirm;

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
    width: "100%",
  },
  pageHead: {
    fontSize: 25,
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
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
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
    fontWeight: 'bold',
  },
});
