


function login(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const data = { email: email, password: password };

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
        // redirect to the home page or show a success message
      })
      .catch((error) => {
        console.error("Error:", error);
        // show an error message
      });
  }

