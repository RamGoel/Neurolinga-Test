import styles from "../res/styles"
import { View, Text, Pressable, ActivityIndicator } from "react-native"
const HomeInsightCard = (props) => {
    return (

        <View style={styles.dataCard}>
            <View>
                <Text style={styles.cardMain}>{props.data}+</Text>
                <Text style={styles.cardBasic}>{props.text}</Text>

            </View>
        </View>

    )
}


const NoOrdersComponent = () => {
    return <View key='xvx' style={{ height: '100%' }}>
        <Text style={{ textAlign: 'center', opacity: 0.7 }}>No Orders Found</Text>
    </View>
}


const SpinnerComponent = () => {
    return <View style={{ justifyContent: 'center' }}>

        <ActivityIndicator size="large" color="#808080" />
    </View>
}


export { HomeInsightCard, NoOrdersComponent, SpinnerComponent }






