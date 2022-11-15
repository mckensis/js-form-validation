const submitButton = document.querySelector('button');
const email = document.querySelector('#user-email');
const country = document.querySelector('#user-country');
const postcode = document.querySelector('#user-postcode');
const password = document.querySelector('#user-password');
const confirmPassword = document.querySelector('#user-password-confirm');

email.addEventListener('input', validateEmail);
country.addEventListener('change', validateCountry);
postcode.addEventListener('input', validatePostCode);
password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', confirmPasswordMatch);

function validateEmail() {
  //Is the email valid, or is the field is empty.
  if (email.validity.typeMismatch || email.validity.valueMissing) {
    email.setCustomValidity('Please enter a valid email address e.g: example@example.com');
    email.reportValidity();
    email.focus();
    return false;  
  } else {
    email.setCustomValidity('');
  }

  return true;
}

function validateCountry() {
  //Has an option not been chosen from the dropdown
  if (country.validity.valueMissing) {
    country.setCustomValidity('Please select your country.')
    country.reportValidity();
    return false;
  } else {
    country.setCustomValidity('');
  }
  
  return true;
}

function validatePostCode() {
  //Pattern is set on the HTML element
  //Is the input a valid postcode, or is the field empty
  if (postcode.validity.valueMissing || postcode.validity.patternMismatch) {
    postcode.setCustomValidity('Please enter a valid postcode with or without a space.');
    postcode.reportValidity();
    postcode.focus();
    return false;
  } else {
    postcode.setCustomValidity('');
  }
  
  return true;
}

function validatePassword() {
  //Pattern is set on the HTML element
  //Is the password valid, or is the field empty
  if (password.validity.patternMismatch || password.validity.valueMissing) {
    password.setCustomValidity(
      'Password must be between 4 and 12 characters, and include at least one upper case letter, one lower case letter, and one numeric digit.'
    );
    password.reportValidity();
    password.focus();
    return false;
  } else {
    password.setCustomValidity('');
  }

  return true;
}

function confirmPasswordMatch() {
  //Checks that the password in the 'confirm password' input matches the 'password' input
  if (confirmPassword.value !== password.value || confirmPassword.patternMismatch || confirmPassword.valueMissing) {
    confirmPassword.setCustomValidity('Passwords must match.');
    confirmPassword.reportValidity();
    confirmPassword.focus();
    return false;
  } else {
    confirmPassword.setCustomValidity('');
  }

  return true;
}

function submitForm(form) {

  removeChildren(form);

  //Create a message and display it on the page to let the user know the form was submitted
  const submitted = document.createElement("p");
  submitted.classList.add("submitted");
  submitted.textContent = "Form Submitted!";

  form.appendChild(submitted);
}

//Removes input fields and the submit button if submission is successful
function removeChildren(form) {
  while (form.children.length > 1) {
    form.removeChild(form.lastChild);
  }
}

//Checks every input field again before submitting the form
function validateAllData() {
  if (!validateEmail()) {
    return false;
  };

  if (!validateCountry()) {
    return false;
  }

  if (!validatePostCode()) {
    return false;
  }

  if (!validatePassword()) {
    return false;
  }

  if (!confirmPasswordMatch()) {
    return false;
  }

  return true;
}

//Deals with the submitting of the form
submitButton.addEventListener("click", (e) => {
  //Prevent the form from submitting on button click
  e.preventDefault();

  const form = document.querySelector('form');
  
  //If all data is valid, then submit the form
  if (validateAllData()) {
    submitForm(form);
  };
});