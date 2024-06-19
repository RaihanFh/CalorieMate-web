import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getFirestore, setDoc, doc, Timestamp, } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCQFMYIOSodxV4koB0G1T7Euzum99neFRA",
    authDomain: "caloriemate-a83c3.firebaseapp.com",
    projectId: "caloriemate-a83c3",
    storageBucket: "caloriemate-a83c3.appspot.com",
    messagingSenderId: "239408555354",
    appId: "1:239408555354:web:265a4e1d5dc0c6bf9e7f63",
    measurementId: "G-2WSS36EKP7"
};

const signInForm = document.getElementById('form-signIn');
const bmiForm = document.getElementById('form-bmi');

const app = initializeApp(firebaseConfig);

signInForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('userEmail', user.email);
        alert("Signed in...")
        window.location.href='index.html';
    })
    .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
    });
})

bmiForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const auth = getAuth();
    const db = getFirestore(app);
    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[type="radio"][name="gender"]:checked').value;
    const birthdate = document.getElementById("birthdate").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const target = document.getElementById("targetWeight").value;
    const bmiScore = calculateBMI(height, weight);
    const idealWeight = calculateIdealWeight(height);

    if (confirm(`Are you sure with the data ?`)) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Your account has been successfully created");

            const userData = {
                birthdate: Timestamp.fromDate(new Date(birthdate)),
                email: user.email,
                gender: gender,
                height: parseInt(height),
                weight: parseInt(weight),
                name: name,
                img: "https://firebasestorage.googleapis.com/v0/b/caloriemate-a83c3.appspot.com/o/userPic%2FDEFAULT_PROFILE_PIC.png?alt=media&token=8ff196d2-32b8-4496-90bf-aba8a0bfcbc1",
                "BMI data":{
                    BMIScore: bmiScore,
                    UserTarget: parseInt(target),
                    healthyWeight: [idealWeight.min, idealWeight.max]
                }
            }
            const docRef=doc(db, "userData", user.email);
            setDoc(docRef,userData)
            .then(()=>{
                localStorage.setItem('userEmail', user.email);
                alert("Your data has been successfully stored");
                window.location.href='index.html';
            })
            .catch((error)=>{
                const errorCode = error.message;
                alert(errorCode);
                console.error("error writing document", error);
            });

        })
        .catch((error) => {
            const errorCode = error.code;
            alert(errorCode)
        });
    } else {
        alert("Submission canceled.");
    }
})

function calculateBMI(height, weight) {
    return weight / (height / 100) ** 2;
}

function calculateIdealWeight(height) {
    const minBMI = 18.5;
    const maxBMI = 24.9;
    return {
        min: Math.ceil(minBMI * (height / 100) ** 2),
        max: Math.floor(maxBMI * (height / 100) ** 2),
    };
}


