document
  .getElementById("studentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let licenseTypes = [];

    document
      .querySelectorAll('input[name="licenseTypes"]:checked')
      .forEach((checkbox) => {
        licenseTypes.push(checkbox.value);
      });

    let student = {
      fName: document.getElementById("firstName").value,
      lName: document.getElementById("lastName").value,
      nic: document.getElementById("nic").value,
      email: document.getElementById("email").value,
      phoneNo: document.getElementById("phone").value,
      dob: document.getElementById("dob").value,
      gender: document.getElementById("gender").value,
      street: document.getElementById("street").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      code: document.getElementById("zip").value,
      licenseTypes: licenseTypes,
      transPrefer: document.getElementById("transmission").value,
      driveExp: document.getElementById("experience").value,
      pref_time: document.getElementById("lessonTime").value,
      notes: document.getElementById("notes").value,
      password: document.getElementById("password").value,
    };

    fetch("/api/userregister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Registration failed");
        }

        window.location.href = "../LoginForm/LoginForm.html";
      })
      .catch((error) => {
        console.error(error);
        alert("Registration failed!");
      });
  });
