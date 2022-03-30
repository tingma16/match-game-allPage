let fieldsCheck;

function hasCharsCheck(dataToCheck){
	let pattern = /^[a-zA-Z]+$/;
	if (pattern.test(dataToCheck.field.value)){
		return true;
	}
	return false;
}

function hasNumsCheck(dataToCheck){
	let pattern = /^[0-9]+$/;
	if (pattern.test(dataToCheck.field.value)){
		return true;
	}
	return false;
	
}

function hasAddressCheck(dataToCheck) {
	let pattern = /^\s*\S+(?:\s+\S+){2}/;
	if (pattern.test(dataToCheck.field.value)){
		return true;
	}
	return false;
}

function hasEmailCheck(dataToCheck){
	let pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	if (pattern.test(dataToCheck.field.value)){
		return true;
	}
	return false;
}

function hasPhoneCheck(dataToCheck){
	let pattern = /(^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$)/;
	let secretPattern = /^[9]{1}[1]{1}[1]{1}$/
	if (pattern.test(dataToCheck.field.value)){
		return true;
	} else if (secretPattern.test(dataToCheck.field.value)) {
		return true
	}
	return false;
}

function secretTest(dataToCheck) {
	let pattern = /^[9]{1}[1]{1}[1]{1}$/
	if (pattern.test(dataToCheck)) {
		return true;
	} else {
		return false;
	}
}

function errorsReset() {
	fieldsCheck.forEach(field => {
		field.error.innerText = "";
	})

	document.querySelector('#chkbxError').innerText = "";
}

function formChecker(e) {
	
	let errorsDetected = 0;
	errorsReset()

	e.preventDefault;

	fieldsCheck.forEach(field => {
		if (field.checker(field) == false) {
			field.error.innerText = field.msg;

			errorsDetected += 1;
		}
	})

	if (errorsDetected > 0) {
		console.log('cannot submit yet')
	} else {
		if (document.querySelector('#chkRules').checked && document.querySelector('#chkOther').checked) {
			console.log("successful form, check for secret")
			
			let secretTextTest = secretTest(document.querySelector('#phone').value)
			
			if(secretTextTest) {
				console.log("You are not the emergency services!")
			}
		} else {
			console.log('check the boxes')

			document.querySelector('#chkbxError').innerText = "Please Check Both Boxes to Proceed.";
		}
	}
	
}


function initForm(){
	//*grabbing our input and error fields
	let firstName = document.querySelector("#first-name");
	let firstNameError = document.querySelector("#firstNameError");
	let lastName = document.querySelector("#last-name");
	let lastNameError = document.querySelector("#lastNameError");
	// let address = document.querySelector("#address");
	// let addressError = document.querySelector("#addressError");
	let phone = document.querySelector("#phone");
	let phoneError = document.querySelector("#phoneError");
	let email = document.querySelector("#email");
	let emailError = document.querySelector("#emailError");

	//* declaring our data object
	fieldsCheck = [
		{field: firstName, checker: hasCharsCheck, error: firstNameError, msg:"Please Enter a Valid First Name."},
		{field: lastName, checker: hasCharsCheck, error: lastNameError, msg:"Please Enter a Valid Last Name."},
		{field: address, checker: hasAddressCheck, error: addressError, msg:"Please Enter a Valid Address."},
		{field: phone, checker: hasPhoneCheck, error: phoneError, msg:"Please Enter a Valid Phone Number."},
		{field: email, checker: hasEmailCheck, error: emailError, msg:"Please Enter a Valid Email Address."}
	]
	
	let formSubmit = document.querySelector("#submitBtn");
	formSubmit.addEventListener("click", formChecker);
}

initForm();

function gamepage(){
	window.location.href='../game-page.html';
}