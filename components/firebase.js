import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, onValue, set, push, onChildAdded, onChildChanged } from 'firebase/database';


async function saveLocal(key, data) {
    if (window.navigator.onLine) {
        await AsyncStorage.setItem(key, JSON.stringify(data))
        return true;
    } else {
        alert(JSON.stringify(e))
    }
}

const firebaseConfig = {
    apiKey: 'AIzaSyCRRGrKSo0RnHT0YHY92LGSJA5mNccZPP4',
    authDomain: 'ode2code-8109f.firebaseapp.com',
    databaseURL: 'https://ode2code-8109f-default-rtdb.firebaseio.com',
    projectId: 'ode2code-8109f',
    storageBucket: 'ode2code-8109f.appspot.com',
    messagingSenderId: '498335715985',
    appId: '1:498335715985:web:9ba486506a056f10b06530',
    measurementId: 'G-3TQE3H0JD1',
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const productRef = ref(db, `Products/`)
const orderRef = ref(db, 'Orders/')
const cartRef = ref(db, 'Cart/')

var miProducts = []
var miOrders = {}
var miCart = {}



onChildAdded(orderRef, (data) => {
    miOrders[`${data.val().orderId}`] = data.val()
})
onChildAdded(cartRef, (data) => {
    miCart[`${data.val().orderId}`] = data.val()
})

onChildChanged(ref(db, 'Stores/'), (data) => {
    AsyncStorage.setItem('XiBillerUser', JSON.stringify(data.val()))
})

async function handleProducts() {

    if (window.navigator.onLine) {
        onValue(productRef, async (snap) => {
            var data = snap.val()
            await AsyncStorage.setItem('miProducts', JSON.stringify(data))
            miProducts = data
        })
    } else {
        alert("product catch")
        const data = await AsyncStorage.getItem("miProducts")
        miProducts = JSON.parse(data);
    }
}
async function handleOrders() {

    if (window.navigator.onLine) {
        onValue(orderRef, async (snap) => {
            if (snap.val()) {
                await AsyncStorage.setItem('miOrders', JSON.stringify(snap.val()))
                miOrders = snap.val()

            }
        })

    } else {
        alert("order catch")
        const data = await AsyncStorage.getItem('miOrders')
        miOrders = JSON.parse(data);
    }
}
// async function handleCart() {

//     if (window.navigator.onLine) {
//         onValue(cartRef, async (snap) => {
//             if (snap.val()) {
//                 await AsyncStorage.setItem('miCart', JSON.stringify(snap.val()))
//                 miCart = snap.val()

//             }
//         })
//     } else {
//         alert("cart catch")
//         const data = await AsyncStorage.getItem('miCart')
//         miCart = JSON.parse(data);
//     }
// }

handleOrders()
// handleCart()
handleProducts()

const setStore = (storeData) => {
    set(ref(db, `Stores/${storeData.Id}`), storeData)
}

const setOrders = (data) => {
    try {
        const pushRef = push(ref(db, `Orders/`))
        set(pushRef, data)
    } catch (e) {
        console.log(e)
    }
}

const setCart = (cartId, data) => {

    const pushRef = push(ref(db, `Cart/${cartId}`))
    set(pushRef, data)
}
const increaseOrderCount = async (id, tempVal) => {
    await AsyncStorage.getItem('XiBillerUser').then((data) => {
        const storeObj = JSON.parse(data)
        storeObj.totalOrders = storeObj.totalOrders + 1
        storeObj.totalSales = Number(storeObj.totalSales) + Number(tempVal.totalPrice)
        storeObj.totalCustomers = storeObj.totalCustomers + 1
        set(ref(db, `Stores/${id}`), storeObj)
        AsyncStorage.setItem('XiBillerUser', JSON.stringify(storeObj))
    })
}






export { miProducts, miCart, miOrders, setStore, setOrders, setCart, increaseOrderCount, saveLocal, ref, set, onAuthStateChanged, auth, db, onValue, signInWithEmailAndPassword }
