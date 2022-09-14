import React, { useState } from "react";
import { Pressable, Text, View, TextInput, ScrollView } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { makeid } from "../res/constants";
import styles from '../res/styles'
const StoreDataForm = ({ navigation, route }) => {

    const { user } = route.params
    const id = makeid(10)
    const [storeData, setData] = useState({
        type:'',
        email: user.mail,
        password: user.password,
        Id: id,
        Name: "",
        Owner: "",
        City: "",
        State: "",
        Street: "",
        Phone: "",
        totalCustomers:0,
        totalOrders:0,
        totalSales:0
    })

    const fields = ["Name", "Owner", "Street", "State", "City"]
    return (
        <ScrollView style={styles.formContainer}>

            <TextInput
                key="id"
                value={storeData.Id}
                style={styles.textInput}
                editable={false}
            />


            <Dropdown
                key="type"
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={[{ label: "Mi Store", value: "Mi Store" }, { label: "Mi Live", value: "Mi Live" }]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Store Type"
                value={type}
                onChange={(item) => {
                    setData({...storeData,type:item.value})
                }}
            />
            {
                fields.map((elem) => {
                    return <TextInput
                        key={`${elem}`}
                        value={storeData[`${elem}`]}
                        style={styles.textInput}
                        placeholder={elem}
                        onChangeText={
                            (val) => {
                                var k = { ...storeData }
                                k[elem] = val
                                setData(k)
                            }
                        }
                    />
                })
            }

            <TextInput
                key="phone"
                value={storeData.phone}
                style={styles.textInput}
                placeholder="Phone"
                keyboardType="numeric"
                maxLength={10}
                minLength={10}
                onChangeText={(val) => setData({ ...storeData, Phone: val })}
            />

            <Pressable style={styles.pressable} onPress={() => {

                
                var flag = 0;
                Object.keys(storeData).map((elem) => {
                        if (storeData[`${elem}`] === "") {
                            flag = 1;
                            alert(elem)
                        }
                    
                });
                if (flag == 0) {
                    set(ref(db, `Stores/${storeData.Id}`), storeData);
                    navigation.navigate('Home', { data: storeData })
                }
                else alert("All Fields are Compulsory");
            }}>
                <Text style={styles.pressText}>Save Details</Text>
            </Pressable>
        </ScrollView>
    );
};

export default StoreDataForm;
