document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addPackage");

  addNewPackage();

  addButton.onclick = function () {
    addNewPackage();
  };
});

document
  .getElementById("schoolForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let courses = [];
    document.querySelectorAll(".package-item").forEach((item) => {
      let course = {
        type: item.querySelector(".packageType").value,
        name: item.querySelector(".packageName").value,
        description: item.querySelector(".packageDescription").value,
        totalSessions: item.querySelector(".packageDuration").value,
        price: item.querySelector(".packagePrice").value,
      };

      courses.push(course);
    });

    let school = {
      schoolName: document.getElementById("schoolName").value,
      dsLicenseNo: document.getElementById("drivingLicenseNo").value,
      estYear: document.getElementById("yearEstablished").value,
      email: document.getElementById("schoolEmail").value,
      phoneNo: document.getElementById("schoolPhone").value,
      description: document.getElementById("description").value,
      manager: document.getElementById("contactFullName").value,
      directPhone: document.getElementById("contactPhone").value,
      address: document.getElementById("street").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      code: document.getElementById("zip").value,
      courses: courses,
      transmission: document.getElementById("transmission").value,
      time: document.getElementById("operatingHours").value,
      insName: document.getElementById("insuranceProvider").value,
      insNo: document.getElementById("insurancePolicy").value,
      password: document.getElementById("password").value,
    };

    console.log("Sending:", school);
    fetch("/api/dsregister", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(school),
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

function addNewPackage() {
  const container = document.getElementById("packageContainer");

  const newPackage = document.createElement("div");

  newPackage.className = "package-item border rounded p-3 mb-3";

  newPackage.innerHTML = `

    <div class="row g-3">

        <div class="col-md-4">
            <label class="form-label">Type</label>

            <select class="form-select packageType">
                <option value="Course">Course</option>
                <option value="Package">Package</option>
            </select>

        </div>


        <div class="col-md-8">
            <label class="form-label">Name</label>

            <input type="text" class="form-control packageName" placeholder="Beginner Driving Package">
        </div>


        <div class="col-md-6">
            <label class="form-label">Total Sessions</label>

            <input type="number" class="form-control packageDuration" placeholder="20"  >
        </div>


        <div class="col-md-6">
            <label class="form-label">Price</label>

            <div class="input-group">

                <span class="input-group-text">
                    Rs.
                </span>

                <input type="number" class="form-control packagePrice" placeholder="50000" >

            </div>

        </div>


        <div class="col-12">
            <label class="form-label">
                Description
            </label>

            <textarea class="form-control packageDescription"placeholder="Includes practical lessons, theory and test preparation"></textarea>
        </div>


        <div class="col-12 text-end">

            <button type="button" 
            class="btn btn-outline-danger removePackage">

                <i class="bi bi-trash"></i>
                Remove

            </button>

        </div>


    </div>

    `;

  container.appendChild(newPackage);
}

document
  .getElementById("packageContainer")
  .addEventListener("click", function (e) {
    if (e.target.closest(".removePackage")) {
      const packages = document.querySelectorAll(".package-item");

      if (packages.length <= 1) {
        alert("At least one course/package is required");
        return;
      }

      e.target.closest(".package-item").remove();
    }
  });
