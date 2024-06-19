import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

document.addEventListener('DOMContentLoaded', async function () {
    const userEmail = localStorage.getItem('userEmail');
    const userDocRef = doc(db, "userData", userEmail);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
        const userData = userDoc.data();

        const profileImg = document.getElementById("profile-img");
        
        profileImg.src = userData.img;
        
        profileImg.addEventListener('load', () => {
            document.querySelector('.profile__container').style.display = 'flex';
        });

        document.getElementById("profile-name").textContent = `Name: ${userData.name}`;
        document.getElementById("profile-email").textContent = `Email: ${userData.email}`;
        document.getElementById("profile-gender").textContent = `Gender: ${userData.gender}`;
        document.getElementById("profile-birthdate").textContent = `Birthdate: ${userData.birthdate.toDate().toLocaleDateString()}`;
        document.getElementById("profile-height").textContent = `Height: ${userData.height} cm`;
        document.getElementById("profile-weight").textContent = `Weight: ${userData.weight} kg`;
        document.getElementById("profile-bmi").textContent = `BMI: ${userData['BMI data'].BMIScore.toFixed(1)}`;
        document.getElementById("profile-status").textContent = `Weight Status: ${getBMICategory(userData['BMI data'].BMIScore)}`;
    } else {
        alert("No such document!");
    }
});

function getBMICategory(score) {
    if (score <= 15.9) {
        return "Very Severely Underweight";
    } else if (score >= 16.0 && score <= 16.9) {
        return "Severely Underweight";
    } else if (score >= 17.0 && score <= 18.4) {
        return "Underweight";
    } else if (score >= 18.5 && score <= 24.9) {
        return "Normal";
    } else if (score >= 25.0 && score <= 29.9) {
        return "Overweight";
    } else if (score >= 30.0 && score <= 34.9) {
        return "Obese Class I";
    } else if (score >= 35.0 && score <= 39.9) {
        return "Obese Class II";
    } else {
        return "Obese Class III";
    }
}