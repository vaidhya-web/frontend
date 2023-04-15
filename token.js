// Get variables from local storage
// const jwt = localStorage.getItem('jwt');
const docid = localStorage.getItem("docid");
const apptype = localStorage.getItem("appname");
const docname = localStorage.getItem("docname");
const city = localStorage.getItem("city");
const address = localStorage.getItem("address");
const price = localStorage.getItem("price");
const appname = localStorage.getItem("appname");
const appid = localStorage.getItem("apptype");
document.getElementById("firstName").value = docname;
document.getElementById("firstName").readOnly = true;
document.getElementById("address").value = address;
document.getElementById("address").readOnly = true;
document.getElementById("price").value = price;
document.getElementById("price").readOnly = true;
document.getElementById("city").value = city;
document.getElementById("app-type").value = apptype;

// create a new date object
const today = new Date();
// set the time zone offset to IST (UTC+5:30)
today.setUTCHours(today.getUTCHours() + 5);
today.setUTCMinutes(today.getUTCMinutes() + 30);
// format the date to "YYYY-MM-DD"
const year = today.getUTCFullYear();
const month = String(today.getUTCMonth() + 1).padStart(2, '0');
const day = String(today.getUTCDate()).padStart(2, '0');
const date = `${year}-${month}-${day}`;

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// Check if user is logged in
if (!jwt) {
  document.getElementById("login").classList.remove("hidden");
} else {
  // Decode JWT to get patid and is_doctor
  const decoded = parseJwt(jwt);
  const patid = decoded.id;
  const is_doctor = decoded.isdoctor;
  fetch("https://vaidhya-backend.onrender.com/doctor/newtoken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      doctor_id: docid,
      date: date,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      document.getElementById("yourTkn").innerHTML = response.num;
    })
    .catch((e) => {
      console.log(e);
    });

  fetch("https://vaidhya-backend.onrender.com/doctor/curtoken", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: jwt,
    },
    body: JSON.stringify({
      doctor_id: docid,
      date: date,
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      document.getElementById("currTkn").innerHTML = response.num;
    })
    .catch((e) => {
      console.log(e);
    });

  function bookToken() {
    // e.preventDef
    console.log("booktoken clicked")
    fetch("https://vaidhya-backend.onrender.com/newtoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt,
      },
      body: JSON.stringify({
        doctor_id: docid,
        patient_id: patid,
        apptype: appid,
        date: date,
        symptom: "",
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response == "Inserted") {
          window.location = "/confirmationToken.html";
        }
        else {
          alert(response);
        }
      })
      .catch((e) => {
        alert("Error: " + e);
      });
  }
}
