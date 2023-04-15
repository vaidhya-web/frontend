// Get variables from local storage
// const jwt = localStorage.getItem('jwt');
const docid = localStorage.getItem('docid');
const apptype = localStorage.getItem('appname');
const docname = localStorage.getItem('docname');
const city = localStorage.getItem('city');
const address = localStorage.getItem('address');
const price = localStorage.getItem('price');
const appname = localStorage.getItem('appname');
const appid = localStorage.getItem('apptype');

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

// Check if user is logged in
if (!jwt) {
  document.getElementById('login').classList.remove('hidden');
} else {
  // Decode JWT to get patid and is_doctor
  const decoded = parseJwt(jwt);
  const patid = decoded.id;
  const is_doctor = decoded.isdoctor;

  // Populate form fields with stored variables
  document.getElementById('doc-name').value = docname;
  document.getElementById('city').value = city;
  document.getElementById('address').value = address;
  document.getElementById('app-type').value = appname;
  document.getElementById('price').value = price;

  // Show form
  // document.getElementById('appointment-form').classList.remove('hidden');

  // Handle form submission
  document.getElementById('slotBtn').addEventListener('click', e => {
    e.preventDefault();

    // Get form data
    const date = document.getElementById('date').value;
    const interactionMethod = "physical";
    // const datetime = date + ' ' + time + ":00";

    fetch('https://vaidhya-backend.onrender.com/doctor/timeslots', {
      method: 'POST',
      headers: {

        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        doctor_id: docid,
        date: date
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        // Handle success/error
        // window.location = "/myappointments.html";
        let slotsAvailable = false;
        document.getElementById('button-container').innerHTML = "<h2>Available slots:</h2>";
        for (i in response) {
          if (response[i].available) {
            slotsAvailable = true;
            // console.log(response[i]);
            let newBtn = document.createElement('button');
            newBtn.classList.add('slotBtn');
            newBtn.value = response[i].slot_id;
            // newBtn.innerText = response[i].time_start;
            let time = response[i].time_start;
            String(time);
            let finalTime = "";
            String(finalTime);
            let counter = 0;
            for (const c of time) {
              if (c == ":") {
                counter++;
              }
              if (counter == 2) {
                counter = 0;
                break;
              }
              finalTime += c;
              // console.log(finalTime);
            }
            finalTime += " PM";
            newBtn.innerText = finalTime;
            if (response[i].available == false) {
              newBtn.disabled = true;
            } else {
              newBtn.addEventListener('click', e => makeApt(e, newBtn.value));
            }

            document.getElementById('button-container').classList.remove('hidden');
            document.getElementById('button-container').appendChild(newBtn);
          }
        }
        if(slotsAvailable === false) {
          alert("No slots available. Please try a different date.");
        }
      })
      .catch(error => {
        console.error(error);

      });
  });

  function makeApt(e, value) {
    const date = document.getElementById('date').value;
    // Make API call to https://vaidhya-backend.onrender.com/newappointment
    fetch('https://vaidhya-backend.onrender.com/newappointment', {
      method: 'POST',
      headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        doctor_id: docid,
        patient_id: patid,
        date: date,
        phyorvirt: "physical",
        status: "scheduled",
        symptom: "",
        slot_id: value,
        prescription: "",
        apptype: appid
      })
    })
      .then(response => {
        // Handle success/error
        window.location = "/confirmationApp.html";
      })
      .catch(error => {
        console.error(error);
      });

  }

}