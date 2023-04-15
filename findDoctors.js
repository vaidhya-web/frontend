// Fetch appointment types and cities and populate dropdown menus
let Token = false;
let Appointment = false;
// const jwt = localStorage.getItem("jwt");
fetch("https://vaidhya-backend.onrender.com/apptypes")
  .then((response) => response.json())
  .then((data) => {
    // const appointmentTypeSelect = document.getElementById('appointment-type');
    data.forEach((type) => {
      const option = document.createElement("option");
      option.value = type.name;
      option.text = type.name;
      // appointmentTypeSelect.add(option);
      document.getElementById("appointmenttype").appendChild(option);
    });
  });

fetch("https://vaidhya-backend.onrender.com/cities")
  .then((response) => response.json())
  .then((data) => {
    const citySelect = document.getElementById("city");
    data.forEach((city) => {
      const option = document.createElement("option");
      option.value = city.city;
      option.text = city.city;
      citySelect.add(option);
    });
  });
// function parseJwt(token) {
//   var base64Url = token.split(".")[1];
//   var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//   var jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split("")
//       .map(function (c) {
//         return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//       })
//       .join("")
//   );

//   return JSON.parse(jsonPayload);
// }
// if (!jwt) {
//   const logoutButton = document.getElementById("navLogout");
//   logoutButton.parentNode.removeChild(logoutButton);
// } else {
//   const loginButton = document.getElementById("navLogin");
//   loginButton.parentNode.removeChild(loginButton);
// }

function token() {
  Token = true;
  Appointment = false;
}

function appointment() {
  Token = false;
  Appointment = true;
}
//Find Doctors
function findDoctors() {
  let appointmentType = document.getElementById("appointmenttype").value;
  let city = document.getElementById("city").value;
  if (appointmentType == "Select an appointment type") {
    appointmentType = "";
  }
  if (city == "Select a city") {
    city = "";
  }
  let url = new URL("https://vaidhya-backend.onrender.com/find");
  url.searchParams.set("city", city);
  url.searchParams.set("apptype", appointmentType);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Display results in table
      const table = document.getElementById("result-table");
      table.innerHTML = "";
      data.forEach((result) => {
        const row = document.createElement("tr");
        row.classList.add("border-b");
        row.addEventListener("click", function () {
          let arr = new Array();
          for (i in row.getElementsByTagName("td")) {
            let x = row.getElementsByTagName("td")[i].innerHTML;
            if (typeof x != "undefined") {
              arr.push(x);
            }
          }
          //0 to 6
          //doc id, docname, city, address, appoint type, price, appid
          localStorage.setItem("docid", arr[0]);
          localStorage.setItem("docname", arr[1]);
          localStorage.setItem("city", arr[2]);
          localStorage.setItem("address", arr[3]);
          localStorage.setItem("appname", arr[4]);
          localStorage.setItem("price", arr[5]);
          localStorage.setItem("apptype", arr[6]);
          if (Token === false && Appointment === false) {
            alert("Please select the Booking type");
          } else if (Token === false && Appointment === true) {
            window.location = "appointment.html";
          } else {
            window.location = "token.html";
          }
        });
        const docid = document.createElement("td");
        docid.classList.add("hidden");
        docid.innerText = result.docid;
        row.append(docid);
        const docname = document.createElement("td");
        docname.classList.add(
          "px-6",
          "py-4",
          "font-medium",
          "text-gray-900",
          "whitespace-nowrap"
        );
        docname.innerText = result.docname;
        row.appendChild(docname);
        const city = document.createElement("td");
        city.innerText = result.city;
        row.appendChild(city);
        const address = document.createElement("td");
        address.innerText = result.address;
        row.appendChild(address);
        const apptype = document.createElement("td");
        apptype.innerText = result.apptype;
        row.appendChild(apptype);
        const price = document.createElement("td");
        price.innerText = result.price;
        price.classList.add(
          "font-medium",
          "text-gray-900",
          "whitespace-nowrap"
        );
        row.appendChild(price);
        const appid = document.createElement("td");
        appid.classList.add("hidden");
        appid.innerText = result.appid;
        row.appendChild(appid);
        table.appendChild(row);
      });
      const results = document.getElementById("appointment-results");
      results.classList.remove("hidden");
    });
}

findDoctors();

// Handle form submission
document.getElementById("appointment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  findDoctors();
  // Make GET request to API
});
