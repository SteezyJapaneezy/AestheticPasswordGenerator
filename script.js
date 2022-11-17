const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const output = document.getElementById("value");
output.innerHTML = lengthEl.value;
lengthEl.oninput = function () {
  output.innerHTML = this.value;
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//String.fromCharCode() method returns a string created from the specified sequence of UTF-16 code units (ASCII)
//ex. ASCII: 65=A,66=B,67=C,97=a,98=b,99=c,90=Z,122=z,48=0, etc.
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generatePassword(lower, upper, number, symbol, length) {
  //password is empty by default
  let generatedPassword = "";
  //typescount = counts what is checked (4 if everything is checked)
  const typesCount = lower + upper + number + symbol;
  //if nothing is checked, we don't want to return anything/nothing
  if (typesCount === 0) {
    return "";
  }
  //typesarray will give us an array of whatever is checked
  //.filter will filter out unchecked objects in the array (and only return checked)
  const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  //to actually create the password: the forLoop will generate a pw until it reaches given length (default is 20)
  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach((type) => {
      //object.keys()method returns an array of a given objects own property names(lower,upper,number,symbol /check randomFunc)
      const funcName = Object.keys(type);
      //we want to append on generatedPassword and take our randomFunc object, and get the function result (the alphabet/number/symbols the function will pass.)
      generatedPassword += randomFunc[funcName]();
    });
  }

  //whatever is returned here gets put in the resultEl.innerText (see above)
  //use slice to get the exact number set by user (default is 20)
  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
generateEl.addEventListener("click", () => {
  //+ will convert the string into a number
  const length = +lengthEl.value;
  //if box is checked=true, if unchecked=false (boolean)
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  //function generatePassword is going to take in all the variables mentioned above
  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
clipboardEl.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }
  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
