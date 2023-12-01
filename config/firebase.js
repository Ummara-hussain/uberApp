import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore, collection, addDoc, doc, onSnapshot } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAsoM6TNaedRwyVIFHUkKyTz2ZsKLWRCIU",
    authDomain: "uberapp-9b435.firebaseapp.com",
    projectId: "uberapp-9b435",
    storageBucket: "uberapp-9b435.appspot.com",
    messagingSenderId: "462408968537",
    appId: "1:462408968537:web:68c69dbb327ae9c3d90448",
    measurementId: "G-9W6P01XSQF"
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)

async function addARide({ pickup, destination, rideType, fare, status }) {
    try {
        const doc = await addDoc(collection(db, "rides"), {
            pickup, destination, rideType, fare, status
        });
        return doc.id
    } catch (e) {
        alert(e.message)
    }

}

export { addARide, doc, onSnapshot, db }