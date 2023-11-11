console.log(document.cookie)

function getCookie(username) {
  let cookieArr = document.cookie.split("; ");
  
  for(let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    
    if(username == cookiePair[0]) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  
  // Return null if the cookie wasn't found
  return null;
}

console.log(getCookie('username'));  // Replace 'username' with the name of your cookie


fetchData(getCookie("username"));

async function fetchData(username) {
    
        const response = await fetch("http://localhost:4000/api/students");

        const data = await response.json();

        const foundUser = data.find((element) => {
            return username === element.username;
        });

        if (foundUser) {
            // Set a cookie
            document.querySelector(".profile").innerHTML = `
            <h2>${foundUser.name} ${foundUser.surname}</h2>
            <p><strong>Username:</strong> ${foundUser.username}</p>
            <p><strong>Email:</strong> ${foundUser.email}</p>
                `;
    } else {
        console.log("USERNAME NOT FOUND");
        }
    }
  