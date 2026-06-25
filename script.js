const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const historyList = document.getElementById("history");

let historyPasswords = [];

lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});

function secureRandom(max){
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
}

function generatePassword(){

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%&*()_+-=[]{}<>?";

    let chars = "";

    if(document.getElementById("uppercase").checked) chars += upper;
    if(document.getElementById("lowercase").checked) chars += lower;
    if(document.getElementById("numbers").checked) chars += numbers;
    if(document.getElementById("symbols").checked) chars += symbols;

    if(chars.length === 0){
        alert("Selecione ao menos uma opção.");
        return;
    }

    let password = "";

    for(let i=0;i<lengthSlider.value;i++){
        password += chars[secureRandom(chars.length)];
    }

    document.getElementById("password").value = password;

    updateStrength(password);

    historyPasswords.unshift(password);

    if(historyPasswords.length > 5){
        historyPasswords.pop();
    }

    renderHistory();
}

function updateStrength(password){

    let score = 0;

    if(password.length >= 12) score++;
    if(/[A-Z]/.test(password)) score++;
    if(/[0-9]/.test(password)) score++;
    if(/[^A-Za-z0-9]/.test(password)) score++;

    const bar = document.getElementById("bar");
    const text = document.getElementById("strengthText");

    if(score <= 2){
        bar.style.width = "33%";
        bar.style.background = "red";
        text.innerText = "Força: Fraca";
    }
    else if(score === 3){
        bar.style.width = "66%";
        bar.style.background = "orange";
        text.innerText = "Força: Média";
    }
    else{
        bar.style.width = "100%";
        bar.style.background = "limegreen";
        text.innerText = "Força: Forte";
    }
}

function copyPassword(){
    const pass = document.getElementById("password").value;

    navigator.clipboard.writeText(pass);

    alert("Senha copiada!");
}

function renderHistory(){
    historyList.innerHTML = "";

    historyPasswords.forEach(item=>{
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}