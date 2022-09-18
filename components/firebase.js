import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, onValue, set, push } from 'firebase/database';


async function saveLocal(key, data) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data))
        return true;
    } catch (e) {
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

var miProducts = []

try {
    const productRef = ref(db, `Products/`)
    onValue(productRef, async (snap) => {
        var data = snap.val()
        await AsyncStorage.setItem('miProducts', JSON.stringify(data))
        miProducts = data
    })
} catch (e) {
    const data = AsyncStorage.getItem("miProducts")
    miProducts = JSON.parse(data);
}


var miOrders = []

try {
    onValue(ref(db, 'Orders/'), async (snap) => {
        if (snap.val()) {
            await AsyncStorage.setItem('miOrders', JSON.stringify(snap.val()))
            miOrders = snap.val()

        }
    })
} catch (e) {
    const data = AsyncStorage.getItem('miOrders')
    miOrders = JSON.parse(data);
}



var miCart = []

try {
    onValue(ref(db, 'Cart/'), async (snap) => {
        if (snap.val()) {
            await AsyncStorage.setItem('miCart', JSON.stringify(snap.val()))
            miCart = snap.val()

        }
    })
} catch (e) {
    const data = AsyncStorage.getItem('miCart')
    miCart = JSON.parse(data);
}


const setStore = (storeData) => {
    try {
        const pushRef = push(ref(db, `Stores/${storeData.Id}`))
        set(pushRef, storeData)
    } catch (e) {
        console.log(e)
    }
}

const setOrders = (data) => {
    try {
        const pushRef = push(ref(db, `Orders/${data.orderId}`))
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
        const pushRef = push(ref(db, `Orders/${id}`))
        set(pushRef, storeObj)
        AsyncStorage.setItem('miStore', storeObj)
    })
}






export { miProducts, miCart, miOrders, setStore, setOrders, setCart, increaseOrderCount, saveLocal, ref, set, onAuthStateChanged, auth, db, onValue, signInWithEmailAndPassword }
