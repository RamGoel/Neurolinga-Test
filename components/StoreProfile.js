import { useState } from "react";
import { Text, View, StyleSheet, Image, Button } from "react-native";
import { makeid } from "../res/constants";

import styles from "../res/styles";
export default function StoreProfile({ navigation, route }) {
    const {user}=route.params
    const [data, setData] = useState(
        {
            "Store Name": user.Name,
            "Store Type": user.type,
            "Mi Account Id": user.email,
            "Operator Id": user.Id,
            "Address": user.Street,
            "City": user.City,
            "State": user.State
    
        }
    )
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>

                <Image
                    style={styles.tinyLogo}
                    source="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                />
            </View>

            {
                Object.keys(data).map((elem) => {
                    return (

                        <View style={styles.listBox} key={makeid(5)}>
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
