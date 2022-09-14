import { Text,View, Pressable } from "react-native";
import styles from '../res/styles'
import { HomeInsightCard } from "./atoms";


export default function Home({ navigation, route }) {
  const { data } = route.params


  return (
    <View style={styles.container}>
      <Text style={styles.pageHead}>Hi, {data.Name}</Text>
      <HomeInsightCard data={data.totalOrders} icon="shopping-bag" text="Orders"/>
      <HomeInsightCard data={data.totalSales} icon="money" text="Sales"/>
      <HomeInsightCard data={data.totalCustomers} icon="people" text="Customers"/>

      <Pressable style={styles.pressable} onPress={() => {
        navigation.navigate("OrderForm", {store:data});
      }}>
        <Text style={styles.pressText}>New Order</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={() => {
        navigation.navigate("OrderList", {operId:data.Id});
      }}>
        <Text style={styles.pressText}>View Orders</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={() => {
        navigation.navigate("Profile", {user:data});
      }}>
        <Text style={styles.pressText}>Store Profile</Text>
      </Pressable>


    </View>
  );
}
