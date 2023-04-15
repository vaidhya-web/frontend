const jwt = localStorage.getItem("jwt");
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
  if (!jwt) {
    const logoutButton = document.getElementById("navLogout");
    logoutButton.parentNode.removeChild(logoutButton);
  } else {
    const loginButton = document.getElementById("navLogin");
    loginButton.parentNode.removeChild(loginButton);
  }

function logout() {
    localStorage.removeItem("jwt");
    window.location = "/index.html";
}