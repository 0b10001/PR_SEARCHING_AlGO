// Array of image sources
var images = [
  "../images/image1.jpeg",
  "../images/image2.jpeg",
  "../images/image3.jpeg",
  "../images/image4.jpeg",
  "../images/image5.jpeg",
  "../images/image6.jpeg",
  "../images/image7.jpeg",
  "../images/image8.jpeg",
  "../images/image9.jpeg",
  "../images/image10.jpeg"
];

// Get the img tag
var imgTag = document.getElementById("randomImage");

// Generate a random index
var randomIndex = Math.floor(Math.random() * images.length);

// Assign a random image source to the img tag
imgTag.src = images[randomIndex];



console.log(document.cookie);

function getCookie(username) {
  let cookieArr = document.cookie.split("; ");

  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");

    if (username == cookiePair[0]) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  // Return null if the cookie wasn't found
  return null;
}

console.log(getCookie("username")); // Replace 'username' with the name of your cookie

fetchData(getCookie("username"));

async function fetchData(username) {
  const response = await fetch("http://localhost:4000/api/students");

  const data = await response.json();

  const foundUser = data.find((element) => {
    return username === element.username;
  });

  if (foundUser) {
    // Set a cookie
    document.querySelector(".nav-item").innerHTML = `
    <p style="color: #45c7d3">Hello<p> <p>${foundUser.name}</p>
                `;
  } else {
    console.log("USERNAME NOT FOUND");
  }
}
  
