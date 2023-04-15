// $("#register").click(function(event) {
//     console.log(event);
    
// });
$("#link-login").click(function(event) {
    console.log(event);
    $("#animate").fadeTo("slow",0.5);
});

function animateFade(){
    $("#animate").fadeTo("slow",0.5);
} 

function register(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;

  const data = { name: name, email: email, password: password, phone: phone };

  fetch("https://vaidhya-backend.onrender.com/newpatient", {
  method: "POST",
  body: JSON.stringify(data),
  headers: { "Content-Type": "application/json" }
  })
  .then((response) => {
  if (response.ok) {
  return response.json();
  } else if (response.status === 403) {
  throw new Error("Forbidden");
  } else if (response.status === 401) {
  throw new Error("Unauthorized");
  } else if (response.status === 500) {
  throw new Error("Internal Server Error");
  } else {
  throw new Error("Error in registration");
  }
  })
  .then((_) => {
      {
      fetch("https://vaidhya-backend.onrender.com/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Incorrect email or password");
          }
        })
        .then((data) => {
          localStorage.setItem('jwt', data);
          window.location = "/index.html";
        })
        .catch((error) => {
          console.error("Error:", error);
          // show an error message
        });
      }
  })
  .catch((error) => {
  console.error("Error:", error);
  // show an error message
  });
  }
