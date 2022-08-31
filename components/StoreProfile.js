import { useState } from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { fontSizeConstant } from "./res/constants";


export default function StoreProfile({ navigation, route }) {
    const [data, setData] = useState(
        {
            "Store Name": "AV Enterprises",
            "Store Type": "Mi Stores",
            "Mi Account Id": "27898292829",
            "Operator Id": "0121999",
            "Address": "Lal Kuan Ghaziabad",
            "City": "Ghaziabad",
            "State": "Uttar Pradesh"
    
        }
    )
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>

                <Image
                    style={styles.tinyLogo}
                    source={require('../assets/splash.png')}
                />
            </View>

            {
                Object.keys(data).map((elem) => {
                    return (

                        <View style={styles.listBox}>
                            <Text style={styles.listItem}>
                                {elem}
                            </Text>
                            <Text style={styles.listItem}>
                                {data[`${elem}`]}
                            </Text>
                        </View>
                    )
                })
            }


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#FFFFFF",
        height: '100%',
        fontSize: fontSizeConstant

    },
    imageContainer: {
        padding: 10,
        margin: 10,

    },
    btnView: {
        margin: 10,
        fontSize: fontSizeConstant

    },
    tinyLogo: {
        height: 250,
        width: '100%',
        borderRadius: 20
    },
    listBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderColor:'black',
        borderWidth:0.5,
        padding:4
    },
    listItem: {
        padding: 2,
        margin: 2,
        fontSize:18,
        opacity:0.5,

    },
});
