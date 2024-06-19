import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, Timestamp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCQFMYIOSodxV4koB0G1T7Euzum99neFRA",
    authDomain: "caloriemate-a83c3.firebaseapp.com",
    projectId: "caloriemate-a83c3",
    storageBucket: "caloriemate-a83c3.appspot.com",
    messagingSenderId: "239408555354",
    appId: "1:239408555354:web:265a4e1d5dc0c6bf9e7f63",
    measurementId: "G-2WSS36EKP7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const userEmail = localStorage.getItem('userEmail');
const userDocRef = doc(db, "userData", userEmail);
const userDoc = await getDoc(userDocRef);
const editProfile = document.getElementById('profile-form');


if (userDoc.exists()) {
    const userData = userDoc.data();
    document.getElementById('eHeight').value = userData.height;
    document.getElementById('eWeight').value = userData.weight;
    document.getElementById('dob').valueAsDate  = userData.birthdate.toDate();
    
} else {
    alert("No such document!");
}

editProfile.addEventListener("submit", function (event) {
    event.preventDefault();

    const height = parseInt(document.getElementById('eHeight').value);
    const weight = parseInt(document.getElementById('eWeight').value);
    const dob = new Date(document.getElementById('dob').value);
    updateDoc(userDocRef, {
        height: height,
        weight: weight,
        birthdate: Timestamp.fromDate(dob),
    })
    .then(() => {
        alert("Profile changed...");
        window.location.href = 'profile.html';
    })
    .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
    });
});
