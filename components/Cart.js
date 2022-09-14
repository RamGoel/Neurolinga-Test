import React, { useState, useEffect } from "react";
import { ScrollView, Text, Pressable, Alert } from "react-native";
import { Card } from "react-native-paper";
import styles from "../res/styles";
import { makeid } from "../res/constants";
import { NoOrdersComponent, SpinnerComponent } from "./atoms";
import { ref,db,onValue,set } from "./firebase";

const Cart = ({ navigation, route }) => {

  const [orders, setOrders] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {

    var data = []
    onValue(ref(db, 'Cart/'), (snap) => {
      if (snap.val()) {
        data = snap.val()
        setOrders(data)
        setIsLoaded(true)
      }
      setIsLoaded(true);
    })
  }, [""]);


  return (
    <ScrollView style={[styles.formContainer]}>
      <Text style={{ opacity: 0.4, padding: 10, letterSpacing: 0.5 }}>Long Press to Delete Orders From Cart.</Text>

      {isLoaded ? (

        (orders.length) ?
          Object.keys(orders).map((elem) => {
            return (
              <Pressable
                onPress={() => {
                  Alert.alert(
                    "",
                    "Continue this Order?",
                    [{
                      text: "Yes", onPress: () => {
                        navigation.navigate(`${orders[`${elem}`].screen}`, {
                          data: orders[`${elem}`],
                        });
                      }
                    }, { text: "No" }], { cancelable: false })




                }}
                key={makeid(4)}
                onLongPress={() => {
                  Alert.alert("", "Remove From Cart?", [
                    {
                      text: "Yes",
                      onPress: () => {
                        setIsLoaded(false)

                        set(ref(db, `Cart/${elem}`), null).then(() => {

                          setIsLoaded(true)
                        })
                      }
                    },
                    {
                      text: "No",
                      onPress: () => {
                        setIsLoaded(true)

                      }
                    }
                  ])
                }}
              >

                <Card
                  style={{ width: "100%", padding: 10, margin: 10, borderWidth: 0.5, shadowColor: 'white' }}

                >

                  <Text style={styles.cardHead}>{orders[`${elem}`]['Choose Product']}</Text>
                  <Text>{orders[`${elem}`]['Product Type']}</Text>



                </Card>
              </Pressable>
            );
          }) : <NoOrdersComponent />


      ) : (
        <SpinnerComponent />
      )}
    </ScrollView>
  );
};

export default Cart;


