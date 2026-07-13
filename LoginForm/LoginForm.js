function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  fetch("http://localhost:8080/api/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      console.log(data.userRole);
      if (data != null) {
        // store role
        localStorage.setItem("role", data.userRole);

        alert("Login Successful");

        // redirect according to role

        if (data.userRole === "DrivingSchool") {
          window.location.href = "../DrivingSchool/sidebar.html#Dashboard.html";
        } else if (data.userRole === "Instructor") {
          window.location.href = "../DrivingSchool/instructorDashboard.html";
        } else if (data.userRole === "Student") {
          window.location.href = "../DrivingSchool/studentDashboard.html";
        } else {
          alert("Invalid User Role");
        }
      } else {
        alert("Invalid Email or Password");
      }
    })

    .catch((error) => {
      console.log(error);
      alert("Server Error");
    });
}
