const signInButton = document.getElementById('signInButton');
const signUpButton = document.getElementById('signUpButton');
const backButton = document.getElementById('backButton');
const backButtonBMI = document.getElementById('backButtonBMI');
const signInContainer = document.getElementById('signIn');
const signUpContainer = document.getElementById('signup');
const registContainer = document.getElementById('regist');
const bmiContainer = document.getElementById('bmi');
const submitSignInButton = document.getElementById('submitSignIn');
const submitSignUpButton = document.getElementById('submitSignUp');
const submitRegistButton = document.getElementById('submitRegist');
const submitBMIButton = document.getElementById('submitBMI');
const signInForm = document.getElementById('form-signIn');
const signUpForm = document.getElementById('form-signUp');
const registForm = document.getElementById('form-regist');
const bmiForm = document.getElementById('form-bmi');

signInButton.addEventListener('click', function () {
    signInContainer.style.display = "block";
    signUpContainer.style.display = "none";
});

signUpButton.addEventListener('click', function () {
    signInContainer.style.display = "none";
    signUpContainer.style.display = "block";
});

signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const password = document.getElementById("rPassword").value;
    const repeatPassword = document.getElementById("repeatPassword").value;

    if (validatePasswordLength(password) && validatePasswordLength(repeatPassword)) {
        if (validPasswordAndRepeat(password, repeatPassword)) {
            registContainer.style.display = "block";
            signUpContainer.style.display = "none";
            signInContainer.style.display = "none";
        } else {
            alert("Password and repeat password are not the same.");
        }
    } else {
        // Show an error message if the password is too short
        alert("Password must be at least 6 characters long.");
    }
})

registForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const sliderLeft = document.getElementById("sliderLeft");
    const sliderRight = document.getElementById("sliderRight");
    const slider = document.getElementById("targetWeight");
    const bmi = calculateBMI(height, weight);
    const idealWeight = calculateIdealWeight(height);
    const bmiCategory = getBMICategory(bmi);
    const bmiScoreTab = document.getElementById("bmi_score");
    const idealWeightTab = document.getElementById("weight-ranges");

    bmiScoreTab.textContent = `${bmi.toFixed(1)} - ${bmiCategory}`;
    idealWeightTab.textContent = `${idealWeight.min}kg - ${idealWeight.max}kg`;
    sliderLeft.textContent = `${idealWeight.min}`;
    sliderRight.textContent = `${idealWeight.max}`;
    slider.max = idealWeight.max;
    slider.min = idealWeight.min;
    slider.value = Math.round((idealWeight.max+idealWeight.min)/2);
    

    registContainer.style.display = "none";
    bmiContainer.style.display = "block";
});



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

backButton.addEventListener('click', function () {
    registContainer.style.display = "none";
    signUpContainer.style.display = "block";
});

backButtonBMI.addEventListener('click', function () {
    registContainer.style.display = "block";
    bmiContainer.style.display = "none";
});

function validatePasswordLength(password) {
    return password.length >= 6;
}

function validPasswordAndRepeat(pass, repeat) {
    return pass === repeat;
}