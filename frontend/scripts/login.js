// // method POST

// // const { json } = require("stream/consumers");

// // fetch("http://localhost:4000/api/students", {
// //   method: "POST",
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// //   body: JSON.stringify({
// //     username: "TEBOHOMOLISECANNY",
// //     name: "Teboho",
// //     surname: "Molise",
// //     email: "TEBOHOMOILSECANNY32@gmail.com",
// //     password: "tebomolise12345",
// //   }),
// // })
// //   .then((res) => {
// //     return res.json();
// //   })
// //   .then((data) => {
// //     console.log(data);
// //   });

// const data = fetch("http://localhost:4000/api/students")
//     .then((res) => {
//         if (res.ok) {
//             console.log('Successful');
//             return res.json();
//         }
//         else {
//             console.log('Not successful');
//         }
//     }).then((data) => {
//         data.forEach(element => {
//             if (element.username === 'tebohomolise' && element.password === 'tebohomolise123') {
//                 console.log("FOUND HIM")
//             }

//         });
//     });

// function getUsername() {
//   const inputUsername = document.querySelector(".js-username-input");
//   const inputPassword = document.querySelector(".js-password-input");

//   const username = inputUsername.value;
//   const password = inputPassword.value;

//   console.log(username);
//     console.log(password);
    
//     const data = fetch("http://localhost:4000/api/students")
//       .then((res) => {
//         if (res.ok) {
//           console.log("Successful");
//           return res.json();
//         } else {
//           console.log("Not successful");
//         }
//       })
//       .then((data) => {
//         data.forEach((element) => {
//             if (
//               username === element.username &&
//               password === element.password) {
//               // Update the URL without triggering a page reload
//               history.pushState({}, "", "../html/dashboard.html");

//               // Redirect to the dashboard
//               window.location.href = "../html/dashboard.html";
//             } else {
//               alert("Incorrect username or password. Please try again.");
//             }
//         });
//       });
// }

function getUsername() {

  const inputUsername = document.querySelector(".js-username-input");
  const inputPassword = document.querySelector(".js-password-input");

  const username = inputUsername.value;
  const password = inputPassword.value;

  // Validate input (you can add more validation if needed)
  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  console.log(username);
  console.log(password);

  // Call the fetchData function with the entered username and password
  fetchData(username, password);
}

async function fetchData(username, password) {
  try {
    const response = await fetch("http://localhost:4000/api/students");

    if (!response.ok) {
      console.log("Not successful");
      return;
    }

    const data = await response.json();

    const foundUser = data.find((element) => {
      return username === element.username && password === element.password;
    });

    if (foundUser) {
      // Set a cookie
      document.cookie = `username=${foundUser.username}`;

      // Update the URL without triggering a page reload
      history.pushState({}, "", "../html/dashboard.html");

      // Redirect to the dashboard
      window.location.href = "../html/dashboard.html";
    } else {
      alert("Incorrect username or password. Please try again.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}






