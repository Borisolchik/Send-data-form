"use strict"

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
        let formData = new FormData(form);
        if (error === 0) {
            form.classList.add('sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('sending');
            } else {
                alert('Ошибка');
                form.classList.remove('sending');
            }
        } else {
            alert('Необходимо заполнить все поля!');
        }
    }

    function formValidate(form) {
        let error = 0;
        let formRequired = document.querySelectorAll('.required');

        for (let i = 0; i < formRequired.length; i++) {
            const input = formRequired[i];
            formRemoveError(input);

            if (input.classList.contains('email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
               if ( input.value === '') {
                   formAddError(input);
                   error++;
               }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add('error');
        input.classList.add('error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('error');
        input.classList.remove('error');
    }

    function emailTest(input) {
        return !/^\S+@\S+\.[a-zA-Z]+$/.test(input.value);
    }
})
