async function signup() {
  const inputUsername = document.querySelector(".js-username-input");
  const inputName = document.querySelector(".js-name-input");
  const inputSurname = document.querySelector(".js-surname-input"); // Fixed the class name
  const inputEmail = document.querySelector(".js-email-input");
  const inputPassword = document.querySelector(".js-password-input");
  const inputPasswordConfirmation = document.querySelector(
    ".js-password-confirmation-input"
  );

  const username = inputUsername.value;
  const name = inputName.value;
  const surname = inputSurname.value;
  const email = inputEmail.value;
  const password = inputPassword.value;
  const passwordConfirmation = inputPasswordConfirmation.value;

  // Validate the input fields here
  if (
    username &&
    name &&
    surname &&
    email &&
    password &&
    passwordConfirmation
  ) {
    if (password === passwordConfirmation) {
      console.log(username);
      console.log(name);
      console.log(surname);
      console.log(email);
      console.log(password);
      console.log(passwordConfirmation);

      const response = await fetch("http://localhost:4000/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          name: name,
          surname: surname,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
          console.log(data);
          
        history.pushState({}, "", "login.html");
        // Redirect to the login page
        window.location.href = "login.html";
      } else {
        alert("Signup failed!");
      }
    } else {
      alert("Passwords do not match!");
    }
  } else {
    alert("Please fill in all fields!");
  }
}

