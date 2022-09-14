import { StyleSheet } from "react-native";


var styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        flex: 1,
        padding: 24,
        backgroundColor: '#ffffff',
        height: '100%',
        justifyContent: 'center'
    },
    formContainer: {
        textAlign: 'center',
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        height: '100%',
        paddingTop: 10,
        paddingBottom: 40,
    },

    paragraph: {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    btn: {
        marginBottom: 20,
        marginTop: 20,
        fontSize: 17
    },
    textInput: {
        height: 45,
        borderColor: "gray",
        borderWidth: 0.7,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginVertical: 10,
        textAlign: 'left',
        // backgroundColor:'red'
    },
    bottomLine: {
        marginTop: 10,
        textAlign: 'center',


    },
    tinyLogo: {
        height: 150,
        width: 150,
        // borderRadius: 500,
        marginVertical: 20,
        marginHorizontal: 'auto'
    },

    pageHead: {
        fontSize: 25,
        textAlign: "center",
    },
    dropdown: {
        height: 45,
        borderColor: "gray",
        borderWidth: 0.7,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginVertical: 10,
        textAlign: 'left'
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
        fontSize: 14,
        opacity: 0.4,
    },
    selectedTextStyle: {
        fontSize: 14
    },
    iconStyle: {
        width: 20,
        height: 20,
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
        fontWeight: "bold",
    },
    pressable: {
        backgroundColor: '#000',
        padding: 10,
        marginVertical: 10,
        height: 45,
        borderRadius: 10,
    },
    pressText: {
        color: 'white',
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'center'
    },
    dialogText: {
        fontSize: 14,
        textAlign: 'center'
    },
    searchBarContainer: { backgroundColor: 'white', width: '100%', borderTopColor: 'white', borderBottomColor: 'white' },
    dataCard: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 0.2,
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    cardMain: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    cardBasic: {
        fontSize: 14
    },
    cardIcon: {
        fontSize: 25
    }


})


export default styles