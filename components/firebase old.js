import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { reject } from 'lodash';


async function saveLocal(key, data) {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data))
        return true;
    } catch (e) {
        alert(JSON.stringify(e))
    }
}

async function getLocal(key) {



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



const getProducts = () => {
    return new Promise((resolve, reject) => {
        try {

            const productRef = ref(db, `Products/`)
            onValue(productRef, (snap) => {
                var data = snap.val()
                resolve(data);
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getOrders = () => {
    return new Promise((resolve, reject) => {
        try {
            var data = []
            onValue(ref(db, 'Orders/'), (snap) => {
                if (snap.val()) {
                    resolve(snap.val())

                }
            })
        } catch (e) {
            reject(e)
        }
    })
}


const setStore = (storeData) => {
    try {
        set(ref(db, `Stores/${storeData.Id}`), storeData);

    } catch (e) {
        console.log(e)
    }
}

const setOrders = (data) => {
    try {
        set(`Orders/${data.orderId}`, data)
    } catch (e) {
        console.log(e)
    }
}

const setCart = (cartId, data) => {

    set(ref(db, `Cart/${cartId}`), data)

}


const increaseOrderCount = (id, tempVal) => {
    const thisStoreRef = ref(db, `Stores/${id}`);
    var storeObj = {}
    onValue(thisStoreRef, (snapshot) => {
        storeObj = snapshot.val();
        storeObj.totalOrders = storeObj.totalOrders + 1
        storeObj.totalSales = Number(storeObj.totalSales) + Number(tempVal.totalPrice)
        storeObj.totalCustomers = storeObj.totalCustomers + 1
        set(ref(db, `Stores/${id}`), storeObj);
    });
}






export { getProducts, getOrders, setStore, setOrders, setCart, increaseOrderCount, getLocal, saveLocal, ref, set, onAuthStateChanged, auth, db, onValue, signInWithEmailAndPassword }
