// Slide Form Mobile

const form = document.getElementById("form");
const btn1 = document.querySelector("[btn1]");
const btn2 = document.querySelector("[btn2]");

console.log(form);
console.log(btn1);
console.log(btn2);

btn1.addEventListener("click", () => {
  form.style.display = "block";
});
btn2.addEventListener("click", () => {
  form.style.display = "block";
});

// Form Validation

// Get the form values and errors
const nameInput = document.getElementById("name");
const companyInput = document.getElementById("company");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
// Errors
const error_name = document.querySelector("[error_name]");
const error_company = document.querySelector("[error_company]");
const error_phone = document.querySelector("[error_phone]");
const error_message = document.querySelector("[error_message]");

// User Error & Success
const user_error = document.querySelector("[server_message_error]");
const user_success = document.querySelector("[server_message_success]");

function validationForm() {
  event.preventDefault();
  const values = [nameInput, companyInput, phoneInput, messageInput];

  values.forEach((value) => {
    try {
      if (!value.value && !value.parentElement.querySelector(".error")) {
        const errorMsgInput = document.createElement("span");
        errorMsgInput.classList.add("error");
        errorMsgInput.innerText = "Por Favor, preencha este campo.";
        value.parentElement.appendChild(errorMsgInput);
      } else if (!value.value && value.parentElement.querySelector(".error")) {
        value.parentElement.querySelector(".error").style.display = "block";
      } else if (value.value && value.parentElement.querySelector(".error")) {
        value.parentElement.querySelector(".error").remove();
      } else if (
        values[0].value &&
        values[1].value &&
        values[2].value &&
        values[3].value
      ) {
        sendEmail();
      }
    } catch (error) {
      console.log(error);
      user_error.innerHTML = /*html*/ `<span onclick="this.parentElement.style.display='none'">&times;</span>
            <p>Ops! Algo deu errado. Por favor, tente novamente</p>
          `;
      user_error.style.display = "block";
    }
  });
}

function sendEmail() {
  event.preventDefault();

  let path = "http://localhost/back-end/";

  const nameValue = nameInput.value;
  const companyValue = companyInput.value;
  const phoneValue = phoneInput.value;
  const messageValue = messageInput.value;

  console.log(nameValue, companyValue, phoneValue, messageValue);

  const body = {
    name: nameValue,
    company: companyValue,
    phone: phoneValue,
    message: messageValue,
  };

  sendJson(path, JSON.stringify(body));
}

async function sendJson(path, body) {
  console.log(body);

  const content = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: body,
  };

  const response = await fetch(path, content);

  if (!response.ok) {
    console.log(response);
    const message = await response.text();
    console.log(message);
    user_error.innerHTML = /*html*/ `<span onclick="this.parentElement.style.display='none'">&times;</span>
            <p>Ops! Algo deu errado. Por favor, tente novamente</p>
          `;
    user_error.style.display = "block";
    return JSON.stringify(responseParsed);

    return message;
  } else {
    const responseParsed = await response.json();
    console.log(responseParsed);
    user_success.innerHTML = /*html*/ `<span onclick="this.parentElement.style.display='none'">&times;</span>
            <p>Recebemos seu contato. Muito obrigado!</p>
          `;
    user_success.style.display = "block";
  }
}
