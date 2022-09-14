// Arrays of numbers, lowercase letters, uppercase letters and symbols for password
const numbers = [1,2,3,4,5,6,7,8,9,0];
const upperCaseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const lowerCaseLetters = upperCaseLetters.map(element => {
  return element.toLowerCase();
});
const symbols = ["!", "£","€", "$", "€", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "[", "]", "}", "{", ":", ";", "@", "~", "#", "<", ">", ",", ".", "?", "/", "`", "¬","'", '"' ];

// Password containers
var passwordText = document.getElementsByClassName('password-text')[0];
var passwordStrength = document.getElementById("password-strength");

// --------------Range Slider pushing current password length and changing styling using linear gradient------------------
var range = document.getElementById("slider");
var passwordLength = document.getElementById("password-length");
var strengthIndicator1 = document.getElementById("strength-icon-1");
var strengthIndicator2 = document.getElementById("strength-icon-2");
var strengthIndicator3 = document.getElementById("strength-icon-3");
var strengthIndicator4 = document.getElementById("strength-icon-4");
var strengthIndicator5 = document.getElementById("strength-icon-5");
passwordLength.innerHTML = range.value;

range.oninput = function () {
  passwordLength.innerHTML = this.value;
  return this.value;
}

// function for changing gradient of slider
range.addEventListener("input", function(){
  var x = this.value;
  if (x>0) {
    var y=x*4.8;
  }
  var color = "linear-gradient(90deg, #A3FFAB " + y + "%, #18171F " + y + "%)";
  this.style.background = color;
  passwordStrengthChecker (x);
});


// ------------Query selecting all of the checkboxes for validation--------------------------
var numberId = document.getElementById("numbers")
var lowerLettersId = document.getElementById("lowercase-letters")
var upperLettersId = document.getElementById("uppercase-letters");
var symbolsId = document.getElementById("symbols")


// ----------Function to generate password------------------
function generatePassword () {
  let password = [];
  var passwordWithoutCommas = "";
  for (var i = 0; i<range.value;i++) {

    var currentCharacter = [];
    // Generate random uppercase letter
      if (upperLettersId.checked) {
        var randomUpperChar = upperCaseLetters[(Math.floor(Math.random()*upperCaseLetters.length))];
        currentCharacter.push(randomUpperChar);
      }

    // Generate random lowercase letter
      if (lowerLettersId.checked) {
        var randomlowerChar = lowerCaseLetters[(Math.floor(Math.random()*upperCaseLetters.length))];
         currentCharacter.push(randomlowerChar);
      }

    // Generate random number
          if (numberId.checked) {
        var randomNumber = numbers[(Math.floor(Math.random()*numbers.length))];
         currentCharacter.push(randomNumber);
      }

    // Generate random symbol
      if (symbolsId.checked) {
        var randomSymbol = symbols[(Math.floor(Math.random()*symbols.length))];
        currentCharacter.push(randomSymbol);
      }

    password.push(currentCharacter[Math.floor(Math.random()*currentCharacter.length)]);
    passwordWithoutCommas += password[i];
    passwordText.innerHTML = passwordWithoutCommas;
  }

  document.getElementById("password-generate").classList.toggle('generate-password-clicked');
}

// ---------Functions to push checked boxes to an array-------------
var checkboxContainer = [];
function pushUppercase() {
  if (upperLettersId.checked === true) {
    checkboxContainer.push(1)
  }else {checkboxContainer.pop()}
}

function pushLowercase() {
  if (lowerLettersId.checked === true) {
    checkboxContainer.push(1)
  }else {checkboxContainer.pop()}
}

function pushNumbers() {
  if (numberId.checked === true) {
    checkboxContainer.push(1)
  }else {checkboxContainer.pop()}
}

function pushSymbols() {
  if (symbolsId.checked === true) {
    checkboxContainer.push(1)
  }else {checkboxContainer.pop()}
}

// ---------------------Checking Password Strength --------------------------

function passwordStrengthChecker (passwordLength) {
  // Password Strength 5
  if ((checkboxContainer.length ===4) && passwordLength>=15) {
    strengthIndicator1.src = "images/rounded-rectangle-active.png";
    strengthIndicator2.src = "images/rounded-rectangle-active.png";
    strengthIndicator3.src = "images/rounded-rectangle-active.png";
    strengthIndicator4.src = "images/rounded-rectangle-active.png";
    strengthIndicator5.src = "images/rounded-rectangle-active.png";
    passwordStrength.innerHTML="Excellent";
    passwordStrength.style.color="#A3FFAB";
  }
  // Password Strength 4
  else if ((checkboxContainer.length ===3) && (passwordLength >=15)  || ((checkboxContainer.length ===4) && (passwordLength >=10 && passwordLength < 15))) {
    strengthIndicator1.src = "images/rounded-rectangle-active.png";
    strengthIndicator2.src = "images/rounded-rectangle-active.png";
    strengthIndicator3.src = "images/rounded-rectangle-active.png";
    strengthIndicator4.src = "images/rounded-rectangle-active.png";
    strengthIndicator5.src="images/rounded-rectangle.png";
    passwordStrength.innerHTML="High";
    passwordStrength.style.color="#A3FFAB";
  }
  // Password Strength 3
  else if (((checkboxContainer.length ===2) && (passwordLength >14))|| ((checkboxContainer.length ===3) && (passwordLength >10)) || ((checkboxContainer.length ===4) && (passwordLength >=8 && passwordLength<10))) {
    strengthIndicator1.src = "images/rounded-rectangle-active.png";
    strengthIndicator2.src = "images/rounded-rectangle-active.png";
    strengthIndicator3.src = "images/rounded-rectangle-active.png";
    strengthIndicator4.src="images/rounded-rectangle.png";
    strengthIndicator5.src="images/rounded-rectangle.png";
    passwordStrength.innerHTML="Medium";
    passwordStrength.style.color="#e68027";
  }
  // Password Strength 2
  else if (((checkboxContainer.length ===1) && (passwordLength>14)) || ((checkboxContainer.length ===2) && (passwordLength>5 && passwordLength<=14)) || ((checkboxContainer.length ===3) && (passwordLength>5 && passwordLength<=11))|| ((checkboxContainer.length ===4) && (passwordLength>5&&passwordLength<8) )) {
    strengthIndicator1.src = "images/rounded-rectangle-active.png";
    strengthIndicator2.src = "images/rounded-rectangle-active.png";
    strengthIndicator3.src="images/rounded-rectangle.png";
    strengthIndicator4.src="images/rounded-rectangle.png";
    strengthIndicator5.src="images/rounded-rectangle.png";
    passwordStrength.innerHTML="Medium";
    passwordStrength.style.color="#e68027";
  }
  // Password Strength 1
  else if (((checkboxContainer.length ===1) && passwordLength<=20)|| ((checkboxContainer.length ===2) && (passwordLength<=5)) || ((checkboxContainer.length ===3) && (passwordLength<=5))|| ((checkboxContainer.length ===4) && (passwordLength<=5) )) {
    strengthIndicator1.src = "images/rounded-rectangle-active.png";
    strengthIndicator2.src="images/rounded-rectangle.png";
    strengthIndicator3.src="images/rounded-rectangle.png";
    strengthIndicator4.src="images/rounded-rectangle.png";
    strengthIndicator5.src="images/rounded-rectangle.png";
    passwordStrength.innerHTML="Low";
    passwordStrength.style.color="#cc211f";
  }
  else {strengthIndicator1.src="images/rounded-rectangle.png";
    strengthIndicator2.src="images/rounded-rectangle.png";
    strengthIndicator3.src="images/rounded-rectangle.png";
    strengthIndicator4.src="images/rounded-rectangle.png";
    strengthIndicator5.src="images/rounded-rectangle.png";}

}
// -----------------Copying Password---------------------------
function copyPassword() {

  var range = document.createRange();
  range.selectNode(passwordText);
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  window.getSelection().removeAllRanges();// to deselect

  // Alert the copied text
document.getElementById("custom-tooltip").style.display = "inline";
setTimeout( function() {
    document.getElementById("custom-tooltip").style.display = "none";
}, 2000);
document.getElementById("copy-icon").classList.toggle('copy-symbol-clicked');

}



// // Password Strength 1
// if ((upperLettersId.checked || lowerLettersId.checked || numberId.checked || symbolsId.checked) && passwordLength<=20) {
//   strengthIndicator1.src = "images/rounded-rectangle-active.png";
//   passwordStrength.innerHTML="Low";
//   passwordStrength.style.color="#cc211f";
// }
// else {strengthIndicator1.src="images/rounded-rectangle.png";}
// // Password Strength 2
// if (((upperLettersId.checked || lowerLettersId.checked) && (numberId.checked || symbolsId.checked)) && (((upperLettersId.checked || lowerLettersId.checked) ===false) && ((numberId.checked || symbolsId.checked)===false)) && (passwordLength>5 && passwordLength<=15) ) {
//   strengthIndicator1.src = "images/rounded-rectangle-active.png";
//   strengthIndicator2.src = "images/rounded-rectangle-active.png";
//   passwordStrength.innerHTML="Medium";
//   passwordStrength.style.color="#e68027";
// }
// else {
// strengthIndicator2.src="images/rounded-rectangle.png";
// }
// // Password Strength 3
// if (((upperLettersId.checked && lowerLettersId.checked && (numberId.checked || symbolsId.checked)) && ((symbolsId.checked || numberId.checked) ===false) && (passwordLength >=5 && passwordLength <=8)) || ((upperLettersId.checked && lowerLettersId.checked) && (((numberId.checked && symbolsId.checked)===false))) && (passwordLength >15)) {
//   strengthIndicator1.src = "images/rounded-rectangle-active.png";
//   strengthIndicator2.src = "images/rounded-rectangle-active.png";
//   strengthIndicator3.src = "images/rounded-rectangle-active.png";
//   passwordStrength.innerHTML="Medium";
//   passwordStrength.style.color="#e68027";
// }
// else {
// strengthIndicator3.src="images/rounded-rectangle.png";
// }
// // Password Strength 4
// if ((upperLettersId.checked && lowerLettersId.checked && numberId.checked && symbolsId.checked) && (passwordLength>=8 && passwordLength<=12) || ((upperLettersId.checked && lowerLettersId.checked && numberId.checked) && (symbolsId.checked===false) && (passwordLength>=11))) {
//   strengthIndicator1.src = "images/rounded-rectangle-active.png";
//   strengthIndicator2.src = "images/rounded-rectangle-active.png";
//   strengthIndicator3.src = "images/rounded-rectangle-active.png";
//   strengthIndicator4.src = "images/rounded-rectangle-active.png";
//   passwordStrength.innerHTML="High";
//   passwordStrength.style.color="#A3FFAB";
// }
// else {
// strengthIndicator4.src="images/rounded-rectangle.png";
// }
// // Password Strength 5
// if ((upperLettersId.checked && lowerLettersId.checked && numberId.checked && symbolsId.checked) && passwordLength>12) {
//   strengthIndicator1.src = "images/rounded-rectangle-active.png";
//   strengthIndicator2.src = "images/rounded-rectangle-active.png";
//   strengthIndicator3.src = "images/rounded-rectangle-active.png";
//   strengthIndicator4.src = "images/rounded-rectangle-active.png";
//   strengthIndicator5.src = "images/rounded-rectangle-active.png";
//   passwordStrength.innerHTML="Excellent";
//   passwordStrength.style.color="#A3FFAB";
// }
// else {
// strengthIndicator5.src="images/rounded-rectangle.png";
// }
