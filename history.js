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




const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector(".navbar__menu");
const profileBtn = document.querySelector(".profile-btn");
const profileMenu = document.querySelector(".profile-menu");
const editProfileBtn = document.querySelector(".edit-profile-btn");
const profilePopup = document.querySelector("#profile-popup");
const closeBtn = document.querySelector(".close-btn");

menu.addEventListener("click", function () {
    menu.classList.toggle("is-active");
    menuLinks.classList.toggle("active");
});

profileBtn.addEventListener("click", function (e) {
    e.preventDefault();
    profileBtn.classList.toggle("active");
    profileMenu.classList.toggle("show");
});

document.addEventListener("click", function (e) {
    if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
        profileBtn.classList.remove("active");
        profileMenu.classList.remove("show");
    }
});

editProfileBtn.addEventListener("click", function (e) {
    e.preventDefault();
    profilePopup.style.display = "flex";
});

closeBtn.addEventListener("click", function () {
    profilePopup.style.display = "none";
});

window.addEventListener("click", function (e) {
    if (e.target === profilePopup) {
        profilePopup.style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', async  function() {
    const historyContainer = document.getElementById('history-container');
    const userEmail = localStorage.getItem('userEmail');
    const today = new Date();
    const docRef = doc(db, "IntakeData", `${userEmail}-${today.getDate()}${today.getMonth()+1}${today.getFullYear()}`);
    const docs = await getDoc(docRef);
    const data = docs.data();
    const foodHistory = data['Intake_List'];

    foodHistory.forEach(item => {
        const foodResult = document.createElement('div');
        foodResult.classList.add('nutrition-facts');
        
        const header = document.createElement('div');
        header.classList.add('nutrition-header');

        // Format date
        const date = new Date(/*data.date.toDate()*/);
        const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}`;
        const formattedDateTime = ` ${formattedDate}`;

        header.innerHTML = `
            <span class="food-info">${item.name} (${item.weight} g)</span>
            <span class="date-time">${formattedDateTime}</span>
            <i class="fas fa-chevron-down dropdown-icon"></i>
        `;
        
        const content = document.createElement('div');
        content.classList.add('nutrition-content');
        content.innerHTML = `
            <p>Calories: ${item.calorie.toFixed(0)} g</p>
            <p>Protein: ${item.protein.toFixed(0)} g</p>
            <p>Fat: ${item.fat.toFixed(0)} g</p>
            <p>Carbohydrates: ${item.carb.toFixed(0)} g</p>
        `;

        header.addEventListener('click', () => {
            const isOpen = content.style.display === 'block';
            content.style.display = isOpen ? 'none' : 'block';
            const icon = header.querySelector('.dropdown-icon');
            icon.classList.toggle('fa-chevron-down', isOpen);
            icon.classList.toggle('fa-chevron-up', !isOpen);
        });

        foodResult.appendChild(header);
        foodResult.appendChild(content);
        historyContainer.appendChild(foodResult);
    });
});
