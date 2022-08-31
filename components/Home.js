import { Text, View, StyleSheet, Image, Button } from "react-native";
import { fontSizeConstant } from "./res/constants";
export default function Home({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/illus.png')}
      />
      <View style={styles.btnView}>
        <Button
          title="New Order"
          onPress={() => {
            navigation.navigate("OrderForm", {});
          }}
        />
      </View>
      <View style={styles.btnView}>
        <Button
          title="View Previous Orders"
          onPress={() => {
            navigation.navigate("OrderList", {});
          }}
        />
      </View>
      <View style={styles.btnView}>
        <Button title="Store Profile"  onPress={() => {
            navigation.navigate("Profile", {});
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 24,
    backgroundColor:"#FFFFFF",
    height:'100%',
    fontSize:fontSizeConstant

  },
  btnView: {
    margin: 10,
    fontSize:fontSizeConstant

  },
  tinyLogo:{
    height:250,
    width:'100%'
  }
});
