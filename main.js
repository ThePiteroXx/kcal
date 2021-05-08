const maleInput = document.querySelector('#male');
const femaleInput = document.querySelector('#female');
const age = document.querySelector('#age');
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const activity = document.querySelector('#activity');

const countBtn = document.querySelector('.save');

const kcal = document.querySelector('.kcal');
const protein = document.querySelector('.protein');
const fat = document.querySelector('.fat');
const carbo = document.querySelector('.carbo');

let root = document.documentElement;
let factorActivity = 0;
let demandKcal;


const countKcal = () => {
    const formulaMen = (10 * parseInt(weight.value)) + (6.25 * parseInt(height.value)) - (5 * parseInt(age.value)) + 5;
    
    const formulaWomen = (10 * parseInt(weight.value)) + (6.25 * parseInt(height.value)) - (5 * parseInt(age.value)) - 161;

    categoryActivity(activity.value);

    if(age.value !== '' && weight.value !== '' && height.value !== ''){

        if(maleInput.checked === true) {
            demandKcal = Math.floor(formulaMen * factorActivity);
            kcal.textContent = `${demandKcal} kcal`;
            macroElement();
        }else {
            demandKcal = Math.floor(formulaWomen * factorActivity);
            kcal.textContent = `${demandKcal} kcal`;
            macroElement();
        }

    }else {
        alert('Uzupełnij wszystkie pola');
    }
}

const macroElement = () => {
    const newDemandKcal = demandKcal;
    protein.textContent = Math.floor(parseInt(weight.value) * 1.5) + '-' + Math.floor(parseInt(weight.value) * 2) + 'g';

    fat.textContent = Math.floor(newDemandKcal * 0.2 / 9) + '-' + Math.floor(newDemandKcal * 0.3 / 9) + 'g';

    const countCarbo = Math.floor( newDemandKcal - ((parseInt(weight.value) * 1.5 * 4) + (newDemandKcal * 0.2)));

    const countCarbo2 = Math.floor( newDemandKcal - ((parseInt(weight.value) * 2 * 4) + (newDemandKcal * 0.3)));

    carbo.textContent = Math.floor(countCarbo2 / 4) + '-' + Math.floor(countCarbo / 4) + 'g';

   

    
}

const categoryActivity = activity => {
    switch (activity) {
        case 'lower':
            factorActivity = 1.2;
            break;
        case 'low':
            factorActivity = 1.375;
            break;
        case 'medium':
            factorActivity = 1.55;
            break;
        case 'high':
            factorActivity = 1.725;
            break;
        case 'big':
            factorActivity = 1.9;
            break;
    }
}

const colorWoman = () => {
    countInput();
    root.style.setProperty('--first-color', 'rgb(253, 243, 185)');
    root.style.setProperty('--second-color', 'rgb(250, 126, 244)');
    root.style.setProperty('--third-color', 'rgb(250, 126, 244)');
    root.style.setProperty('--fourth-color', 'rgb(253, 94, 245)');
}

const colorMen = () => {
    countInput();
    root.style.setProperty('--first-color', 'rgb(253, 243, 185)');
    root.style.setProperty('--second-color', '#01cc65');
    root.style.setProperty('--third-color', '#01cc65');
    root.style.setProperty('--fourth-color', 'rgb(3, 185, 12)');
}

const countInput = () => {
    if(kcal.textContent !== '') {
        countKcal();
    }
}

const enterCheck = () => {
    if (event.code === 'Enter') {
        countKcal();
    }
}


countBtn.addEventListener('click', countKcal)
document.addEventListener('keydown', enterCheck);
femaleInput.addEventListener('click', colorWoman);
maleInput.addEventListener('click', colorMen);
activity.addEventListener('change', countInput);
