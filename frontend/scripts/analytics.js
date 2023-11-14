const correctnessElement = document.querySelector('.linear-search');

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
          correctnessElement.innerHTML = `
              <div class="LSCORRECT">
                CORRECT: ${foundUser.LSCORRECT}
            </div>
            <div class="LSINCORRECT">
                INCORRECT: ${foundUser.LSINCORRECT}
            </div>
            <div class="LSCORRECT">
                Total: ${foundUser.LSINCORRECT + foundUser.LSCORRECT}
            </div>
`;
    } else {
        console.log("USERNAME NOT FOUND");
        }
    }
  