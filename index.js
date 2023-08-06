// step 1 ==> fetching all element using custom attribute

const inputslider = document.querySelector("[data-lengthslider]");
const lengthdisplay = document.querySelector("[data-lengthnumber]");
const passworddisplay = document.querySelector("[data-passworddisplay]");
const copybtn = document.querySelector("[data-copy]");
const copymsg = document.querySelector("[data-copymsg]");
const uppercasecheck = document.querySelector("#uppercase");
const lowercasecheck = document.querySelector("#lowercase");
const numberscheck = document.querySelector("#numbers");
const symbolcheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generatebnt = document.querySelector(".generatebutton");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");

// creating symbol string
const symbols = "~!@#$%^&*()_+-=|}{][:;',./*`";
// creating default value
let password = "";
let passwordlength = 10;
let checkcount = 0;
// set strength circle color to grey
setindicator("#ccc");
// function calling
handelslider();

// function creation

// set password length
function handelslider() {
  inputslider.value = passwordlength;
  lengthdisplay.innerText = passwordlength;
  const min = inputslider.min;
  const max = inputslider.max;
  inputslider.style.backgroundSize =
    ((passwordlength - min) * 100) / (max - min) + "% 100%";
}
function setindicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxshadow = "0px 0px 12px 1px ${color}";
}
function getrandominteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function generaterandomnumber() {
  return getrandominteger(0, 9);
}
function generatelowercase() {
  return String.fromCharCode(getrandominteger(97, 123));
}
function generateuppercase() {
  return String.fromCharCode(getrandominteger(65, 91));
}
function generatesymbol() {
  const randomnum = getrandominteger(0, symbols.length);
  return symbols.charAt(randomnum);
}

function calcstrength() {
  let hasupper = false;
  let haslower = false;
  let hasnum = false;
  let hassym = false;

  if (uppercasecheck.checked) {
    hasupper = true;
  }
  if (lowercasecheck.checked) {
    haslower = true;
  }
  if (numberscheck.checked) {
    hasnum = true;
  }
  if (symbolcheck.checked) {
    hassym = true;
  }

  if (hasupper && haslower && (hasnum || hassym) && passwordlength >= 8) {
    setindicator("#0f0");
  } else if (
    (haslower || hasupper) &&
    (hasnum || hassym) &&
    passwordlength >= 6
  ) {
    setindicator("#ff0");
  } else {
    setindicator("#f00");
  }
}

async function copycontent() {
  try {
    // for copying to clipboard we use this method
    await navigator.clipboard.writeText(passworddisplay.value);
    copymsg.innerText = "Copied";
  } catch (e) {
    copymsg.innerText = "Failed";
  }
  // to make copy bala span visible
  copymsg.classList.add("active");

  setTimeout(() => {
    copymsg.classList.remove("active");
  }, 2000);
}
function shufflepassword(Array) {
  // fisher yates method\
  for (let i = Array.length - 1; i > 0; i--) {
    // random j find out using random function
    const j = Math.floor(Math.random() * (i + 1));
    // swap number at i and j index
    const temp = Array[i];
    Array[i] = Array[j];
    Array[j] = temp;
  }
  let str = "";
  Array.forEach((el) => (str = str + el));
  return str;
}

// generate password
// adding even listener
inputslider.addEventListener("input", function (e) {
  passwordlength = e.target.value;
  handelslider();
});

copybtn.addEventListener("click", function () {
  if (passworddisplay.value) {
    copycontent();
  }
});
// applying event lister on checkbox
function handlecheckboxchange() {
  checkcount = 0;
  allcheckbox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkcount++;
    }
  });

  // special count
  if (passwordlength < checkcount) {
    passwordlength = checkcount;
    handelslider();
  }
}
allcheckbox.forEach((checkbox) => {
  checkbox.addEventListener("change", handlecheckboxchange);
});
generatebnt.addEventListener("click", function () {
  // none of the checkbox are selected
  if (checkcount <= 0) {
    return;
  }
  if (passwordlength < checkcount) {
    passwordlength = checkcount;
    handelslider();
  }

  //lets start the journey to find new password
  console.log("staring the journeuy");
  //remove old password\
  password = "";

  //let put the stuf mentioned by checkbox

  //  if(uppercasecheck.checked){
  //    password = password + generateuppercase();
  //  }
  //  if(lowercasecheck.checked){
  //    password=password+generatelowercase();
  //  }
  //  if(numberscheck.checked){
  //    password=password+generaterandomnumber();
  //  }
  //  if(symbolcheck.checked){
  //    password=password+generatesymbol();
  //  }

  let funcarr = [];

  if (uppercasecheck.checked) {
    funcarr.push(generateuppercase());
  }

  if (lowercasecheck.checked) {
    funcarr.push(generatelowercase());
  }

  if (numberscheck.checked) {
    funcarr.push(generaterandomnumber());
  }

  if (symbolcheck.checked) {
    funcarr.push(generatesymbol());
  }

  // complusary addition
  for (let i = 0; i < funcarr.length; i++) {
    password = password + funcarr[i];
  }
  console.log("complusary addition done");
  //remaning addition
  for (let i = 0; i < passwordlength - funcarr.length; i++) {
    let randindex = getrandominteger(0, funcarr.length);
    password = password + funcarr[randindex];
  }
  console.log("reamning addition done");
  //shuffel the password
  password = shufflepassword(Array.from(password));
  console.log("shuffling addition done");
  // show i ui
  passworddisplay.value = password;
  //calculate strength
  calcstrength();
});

