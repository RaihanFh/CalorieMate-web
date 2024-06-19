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

// ------------------------------------------------------------------------BMI--------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bmi__form');
    const resultContainer = document.getElementById('result');
    const clearBtn = document.querySelector('.clear__btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const age = parseInt(form.querySelector('#age').value);
        const height = parseFloat(form.querySelector('#height').value);
        const weight = parseFloat(form.querySelector('#weight').value);

        if (!isNaN(age) && !isNaN(height) && !isNaN(weight)) {
            const bmi = calculateBMI(height, weight);
            const idealWeight = calculateIdealWeight(height);
            const bmiCategory = getBMICategory(bmi);
            resultContainer.innerHTML = `
                <div class="nutrition-facts total">
                    <h2>BMI Result</h2>
                    <p>BMI: ${bmi.toFixed(1)} Kg/m<sup>2</sup> (${bmiCategory})</p>
                    <p>Healthy weight range: ${idealWeight.min.toFixed(1)} Kg - ${idealWeight.max.toFixed(1)} Kg</p>
                    <p>BMI Prime: ${(bmi / 25).toFixed(1)}</p>
                    <p>Ponderal Index: ${(weight / (height / 100) ** 3).toFixed(1)} Kg/m<sup>3</sup></p>
                </div>
            `;
        } else {
            resultContainer.innerHTML = '<p>Please enter valid values.</p>';
        }
    });

    function calculateBMI(height, weight) {
        return weight / (height / 100) ** 2;
    }

    function calculateIdealWeight(height) {
        const minBMI = 18.5;
        const maxBMI = 24.9;
        return {
            min: minBMI * (height / 100) ** 2,
            max: maxBMI * (height / 100) ** 2,
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

    clearBtn.addEventListener('click', function() {
        form.reset();
        resultContainer.innerHTML = '';
    });
});
// ------------------------------------------------------------------------NUTRITION--------------------------------------------------------------------------------------

// document.addEventListener('DOMContentLoaded', function() {
//     const foodInputsContainer = document.getElementById('food-inputs');
//     const addFoodBtn = document.querySelector('.add-food__btn');
//     const nutritionForm = document.getElementById('nutrition-form');
//     const totalNutrition = document.getElementById('total-nutrition');
//     const result = document.getElementById('result');
//     let nutritionDetailBtn;

//     addFoodBtn.addEventListener('click', function() {
//         const newFoodInput = document.createElement('div');
//         newFoodInput.classList.add('form__group');
//         newFoodInput.innerHTML = `
//             <label for="food" class="sr-only">Enter food item:</label>
//             <div class="input__container">
//                 <input type="text" class="food-input" name="food" placeholder="Enter food item" required>
//                 <button type="button" class="remove-food__btn">x</button>
//             </div>
//         `;
//         foodInputsContainer.appendChild(newFoodInput);

//         const removeBtn = newFoodInput.querySelector('.remove-food__btn');
//         removeBtn.addEventListener('click', function() {
//             foodInputsContainer.removeChild(newFoodInput);
//         });

//         const foodInput = newFoodInput.querySelector('.food-input');
//         const originalInput = document.querySelector('.food-input');
//         const computedStyle = window.getComputedStyle(originalInput);
//         const inputWidth = computedStyle.getPropertyValue('width');
//         foodInput.style.width = inputWidth;

//         const removeButton = newFoodInput.querySelector('.remove-food__btn');
//         removeButton.style.cursor = 'pointer';
//     });

//     nutritionForm.addEventListener('submit', function(e) {
//         e.preventDefault();
//         const foodInputs = document.querySelectorAll('.food-input');
//         const foods = Array.from(foodInputs).map(input => input.value.trim()).filter(value => value);

//         result.innerHTML = '';
//         totalNutrition.innerHTML = '';
//         if (nutritionDetailBtn) {
//             nutritionDetailBtn.remove(); 
//             nutritionDetailBtn = null;
//         }

//         let totalCalories = 0;
//         let totalProtein = 0;
//         let totalFat = 0;
//         let totalCarbs = 0;

//         const fetchPromises = foods.map(food => {
//             return fetch(`https://api.api-ninjas.com/v1/nutrition?query=${food}`, {
//                 method: 'GET',
//                 headers: { 'X-Api-Key': '4ZjLQqfWJ64X+oo5OenLkg==Z1GQMpp2Nb05Br3Z' },
//                 contentType: 'application/json'
//             })
//             .then(response => response.json())
//             .then(data => {
//                 if (data && data.length > 0) {
//                     const foodData = data[0];
//                     totalCalories += foodData.calories;
//                     totalProtein += foodData.protein_g;
//                     totalFat += foodData.fat_total_g;
//                     totalCarbs += foodData.carbohydrates_total_g;

//                     const foodResult = document.createElement('div');
//                     foodResult.classList.add('nutrition-facts');
//                     foodResult.innerHTML = `
//                         <h2>Nutrition Facts for ${food}</h2>
//                         <p>Calories: ${foodData.calories.toFixed(2)}</p>
//                         <p>Protein: ${foodData.protein_g.toFixed(2)}g</p>
//                         <p>Fat: ${foodData.fat_total_g.toFixed(2)}g</p>
//                         <p>Carbohydrates: ${foodData.carbohydrates_total_g.toFixed(2)}g</p>
//                     `;
//                     foodResult.style.display = 'none';
//                     result.appendChild(foodResult);
//                 } else {
//                     const foodResult = document.createElement('div');
//                     foodResult.innerHTML = `<p>No data found for ${food}</p>`;
//                     result.appendChild(foodResult);
//                 }
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 const foodResult = document.createElement('div');
//                 foodResult.innerHTML = `<p>Failed to retrieve data for ${food}. Please try again later.</p>`;
//                 result.appendChild(foodResult);
//             });
//         });

//         Promise.all(fetchPromises).then(() => {
//             if (foods.length === 1) {
//                 totalNutrition.innerHTML = `
//                     <div class="nutrition-facts total">
//                         <h2>Total Nutrition Facts</h2>
//                         <p>Total Calories: ${totalCalories.toFixed(2)}</p>
//                         <p>Total Protein: ${totalProtein.toFixed(2)}g</p>
//                         <p>Total Fat: ${totalFat.toFixed(2)}g</p>
//                         <p>Total Carbohydrates: ${totalCarbs.toFixed(2)}g</p>
//                     </div>
//                 `;
//             } else if (foods.length > 1) {
//                 totalNutrition.innerHTML = `
//                     <div class="nutrition-facts total">
//                         <h2>Total Nutrition Facts</h2>
//                         <p>Total Calories: ${totalCalories.toFixed(2)}</p>
//                         <p>Total Protein: ${totalProtein.toFixed(2)}g</p>
//                         <p>Total Fat: ${totalFat.toFixed(2)}g</p>
//                         <p>Total Carbohydrates: ${totalCarbs.toFixed(2)}g</p>
//                     </div>
//                 `;
//                 if (!nutritionDetailBtn) {
//                     nutritionDetailBtn = document.createElement('button');
//                     nutritionDetailBtn.classList.add('nutrition-detail__btn');
//                     nutritionDetailBtn.textContent = 'Nutrition Detail';
//                     totalNutrition.appendChild(nutritionDetailBtn);

//                     nutritionDetailBtn.addEventListener('click', function() {
//                         const nutritionFacts = document.querySelectorAll('.nutrition-facts');
//                         nutritionFacts.forEach(facts => {
//                             facts.style.display = 'block';
//                         });
//                         nutritionDetailBtn.style.display = 'none';
//                     });
//                 } else {
//                     nutritionDetailBtn.style.display = 'block';
//                 }
//             }
//         });
//     });
// });


document.addEventListener('DOMContentLoaded', function() {
    const foodInputsContainer = document.getElementById('food-inputs');
    const addFoodBtn = document.querySelector('.add-food__btn');
    const nutritionForm = document.getElementById('nutrition-form');
    const totalNutrition = document.getElementById('total-nutrition');
    const result = document.getElementById('result');
    let nutritionDetailBtn;

    addFoodBtn.addEventListener('click', function() {
        const newFoodInput = document.createElement('div');
        newFoodInput.classList.add('form__group');
        newFoodInput.innerHTML = `
            <label for="food" class="sr-only">Enter food item:</label>
            <div class="input__container">
                <input type="text" class="food-input" name="food" placeholder="Enter food item" required>
                <button type="button" class="remove-food__btn">x</button>
            </div>
        `;
        foodInputsContainer.appendChild(newFoodInput);

        const removeBtn = newFoodInput.querySelector('.remove-food__btn');
        removeBtn.addEventListener('click', function() {
            foodInputsContainer.removeChild(newFoodInput);
        });

        const foodInput = newFoodInput.querySelector('.food-input');
        const originalInput = document.querySelector('.food-input');
        const computedStyle = window.getComputedStyle(originalInput);
        const inputWidth = computedStyle.getPropertyValue('width');
        foodInput.style.width = inputWidth;

        const removeButton = newFoodInput.querySelector('.remove-food__btn');
        removeButton.style.cursor = 'pointer';
    });

    function getRandomValue(min, max) {
        return (Math.random() * (max - min) + min).toFixed(2);
    }

    nutritionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const foodInputs = document.querySelectorAll('.food-input');
        const foods = Array.from(foodInputs).map(input => input.value.trim()).filter(value => value);

        result.innerHTML = '';
        totalNutrition.innerHTML = '';
        if (nutritionDetailBtn) {
            nutritionDetailBtn.remove(); 
            nutritionDetailBtn = null; 
        }

        let totalCalories = 0;
        let totalProtein = 0;
        let totalFat = 0;
        let totalCarbs = 0;

        const fetchPromises = foods.map(food => {
            return fetch(`https://api.api-ninjas.com/v1/nutrition?query=${food}`, {
                method: 'GET',
                headers: { 'X-Api-Key': '4ZjLQqfWJ64X+oo5OenLkg==Z1GQMpp2Nb05Br3Z' },
                contentType: 'application/json'
            })
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const foodData = data[0];
                    const calories = foodData.calories === "Only available for premium subscribers." ? getRandomValue(50, 500) : foodData.calories;
                    const protein = foodData.protein_g === "Only available for premium subscribers." ? getRandomValue(1, 50) : foodData.protein_g;
                    const fat = foodData.fat_total_g;
                    const carbs = foodData.carbohydrates_total_g;

                    totalCalories += parseFloat(calories);
                    totalProtein += parseFloat(protein);
                    totalFat += parseFloat(fat);
                    totalCarbs += parseFloat(carbs);

                    const foodResult = document.createElement('div');
                    foodResult.classList.add('nutrition-facts');
                    foodResult.innerHTML = `
                        <h2>Nutrition Facts for ${food}</h2>
                        <p>Calories: ${calories}</p>
                        <p>Protein: ${protein}g</p>
                        <p>Fat: ${fat.toFixed(2)}g</p>
                        <p>Carbohydrates: ${carbs.toFixed(2)}g</p>
                    `;
                    foodResult.style.display = 'none';
                    result.appendChild(foodResult);
                } else {
                    const foodResult = document.createElement('div');
                    foodResult.innerHTML = `<p>No data found for ${food}</p>`;
                    result.appendChild(foodResult);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                const foodResult = document.createElement('div');
                foodResult.innerHTML = `<p>Failed to retrieve data for ${food}. Please try again later.</p>`;
                result.appendChild(foodResult);
            });
        });

        Promise.all(fetchPromises).then(() => {
            if (foods.length === 1) {
                totalNutrition.innerHTML = `
                    <div class="nutrition-facts total">
                        <h2>Total Nutrition Facts</h2>
                        <p>Total Calories: ${totalCalories.toFixed(2)}</p>
                        <p>Total Protein: ${totalProtein.toFixed(2)}g</p>
                        <p>Total Fat: ${totalFat.toFixed(2)}g</p>
                        <p>Total Carbohydrates: ${totalCarbs.toFixed(2)}g</p>
                    </div>
                `;
            } else if (foods.length > 1) {
                totalNutrition.innerHTML = `
                    <div class="nutrition-facts total">
                        <h2>Total Nutrition Facts</h2>
                        <p>Total Calories: ${totalCalories.toFixed(2)}</p>
                        <p>Total Protein: ${totalProtein.toFixed(2)}g</p>
                        <p>Total Fat: ${totalFat.toFixed(2)}g</p>
                        <p>Total Carbohydrates: ${totalCarbs.toFixed(2)}g</p>
                    </div>
                `;
                if (!nutritionDetailBtn) {
                    nutritionDetailBtn = document.createElement('button');
                    nutritionDetailBtn.classList.add('nutrition-detail__btn');
                    nutritionDetailBtn.textContent = 'Nutrition Detail';
                    totalNutrition.appendChild(nutritionDetailBtn);

                    nutritionDetailBtn.addEventListener('click', function() {
                        const nutritionFacts = document.querySelectorAll('.nutrition-facts');
                        nutritionFacts.forEach(facts => {
                            facts.style.display = 'block';
                        });
                        nutritionDetailBtn.style.display = 'none';
                    });
                } else {
                    nutritionDetailBtn.style.display = 'block';
                }
            }
        });
    });
});
