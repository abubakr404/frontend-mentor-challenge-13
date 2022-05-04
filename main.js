let
inputsContainer = document.querySelectorAll('.input-container');
message = document.createElement('p');
email = document.querySelector('input[name="email"]');
emailMessage = document.createTextNode('Looks like this is not an email');
validEmail = /\w+@\w+.\w+/;

document.forms[0].onsubmit = function (e) { // Start check condition on submit
    inputsContainer.forEach(function (input) { // Loop through input fields to check if it's valid
        if (input.querySelector('input').value === '' || (email.value !== '' && !(validEmail.test(email.value)) ) ) { 
            // Choose the terms of acceptance of the form
            e.preventDefault();
            document.forms[0].classList.add('error');
            // Take field names to put in error messages
            getFieldName = input.querySelector('input').getAttribute('placeholder');
            if ( !(input.querySelector('input').hasAttribute('placeholdername')) ){
                input.querySelector('input').setAttribute('placeholdername', getFieldName);
                fieldName = input.querySelector('input').getAttribute('placeholdername');
            } 
            else {
                fieldName = input.querySelector('input').getAttribute('placeholdername');
            }
            if (input.querySelector('input').name != email.name && input.querySelector('input').value.length == 0 ) {
                input.querySelector('input').removeAttribute('placeholder');
            } else if (input.querySelector('input').name == email.name && (email.value == '')) {
                email.removeAttribute('placeholder');
            }
            // add error classess
            input.querySelector('img').classList.add('error');
            input.querySelector('input').classList.add('error');
            
            // errors actions
            // Put the error messages
            if (input.querySelector('p') == null || email.parentElement.querySelector('p') !== null) { // This check to prevent dupplicate in adding warning  message of empty fields
                if (message.textContent.length !== 0) message.textContent = '';
                emptyMessage = document.createTextNode( fieldName + ' cannot be empty');
                if (input.querySelector('input').name == email.name ){
                    if (email.value !== '' && !(validEmail.test(email.value))) email.setAttribute('placeholder' , 'email@example/com');
                    if (email.parentElement.querySelector('p') !== null) email.parentElement.querySelector('p').remove();
                    theMessage = (email.value !== '' && !(validEmail.test(email.value))) ? emailMessage : emptyMessage;
                    message.appendChild(theMessage);
                    input.appendChild(message.cloneNode(true));
                } else if (input.querySelector('p') == null) {
                    message.appendChild(emptyMessage);
                    input.appendChild(message.cloneNode(true));
                }
            }
        }
        if (input.querySelector('p') !== null && input.querySelector('input').value !== '') {
            // this check to prevent dupplicate in remove warning messages
            if (input.querySelector('input').name == email.name ){
                if (validEmail.test(email.value)) {
                    input.querySelector('img').classList.remove('error');
                    input.querySelector('input').classList.remove('error');
                    input.querySelector('p').remove();
                }
            } 
            else {
                input.querySelector('img').classList.remove('error');
                input.querySelector('input').classList.remove('error');
                input.querySelector('p').remove();
            }
        }
    })
    if (email.value !== '' && !(validEmail.test(email.value))) {
        email.value = '';
    }
}