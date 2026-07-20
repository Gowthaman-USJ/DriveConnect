const schoolProfile = {
  schoolName: "SafeDrive Driving Academy",
  businessReg: "BR-2021-45879",
  drivingLicenseNo: "DSL-458921",
  yearEstablished: "2015",

  website: "www.safedriveacademy.lk",
  schoolEmail: "info@safedriveacademy.lk",
  schoolPhone: "077 456 7890",

  description:
    "SafeDrive Driving Academy provides professional driving lessons with experienced instructors, modern training vehicles, and flexible schedules for beginners and advanced learners.",

  contactFullName: "Nimal Perera",
  contactPhone: "071 234 5678",
  contactEmail: "nimal@safedriveacademy.lk",

  street: "125 Main Street",
  city: "Colombo",
  state: "Western Province",
  zip: "00100",

  coursesPackages: [
    {
      type: "Package",
      name: "Beginner Driving Package",
      description:
        "Complete beginner training with practical lessons, theory guidance, and test preparation.",
      TotalSessions: 20,
      price: 50000,
    },

    {
      type: "Package",
      name: "Full License Preparation Package",
      description:
        "Complete package including driving lessons, mock tests, and assistance for the driving test.",
      TotalSessions: 30,
      price: 75000,
    },
    {
      type: "Package",
      name: "Licenxse Preparation Package",
      description:
        "Complete package including driving lessons, mock tests, and assistance for the driving test.",
      TotalSessions: 30,
      price: 75000,
    },
  ],

  transmission: "both",
  operatingHours: "weekday-weekend",
  insuranceProvider: "Ceylinco Insurance PLC",
  insurancePolicy: "POL-2025-785412",
  password: "SafeDrive@123",
};

function initEditSchoolProfileForm() {
  const form = document.getElementById("editSchoolProfileForm");

  if (!form) return;

  const schoolName = document.getElementById("schoolName");
  const businessReg = document.getElementById("businessReg");
  const drivingLicenseNo = document.getElementById("drivingLicenseNo");
  const yearEstablished = document.getElementById("yearEstablished");

  const website = document.getElementById("website");
  const schoolEmail = document.getElementById("schoolEmail");
  const schoolPhone = document.getElementById("schoolPhone");

  const description = document.getElementById("description");

  const contactFullName = document.getElementById("contactFullName");
  const contactPhone = document.getElementById("contactPhone");
  const contactEmail = document.getElementById("contactEmail");

  const street = document.getElementById("street");
  const city = document.getElementById("city");
  const state = document.getElementById("state");
  const zip = document.getElementById("zip");

  const transmission = document.getElementById("transmission");
  const operatingHours = document.getElementById("operatingHours");

  const insuranceProvider = document.getElementById("insuranceProvider");

  const insurancePolicy = document.getElementById("insurancePolicy");

  const password = document.getElementById("password");

  const editData = JSON.parse(localStorage.getItem("editSchool"));

  form.reset();

  if (editData && editData.school) {
    const s = editData.school;

    schoolName.value = s.schoolName || "";
    businessReg.value = s.businessReg || "";
    drivingLicenseNo.value = s.drivingLicenseNo || "";
    yearEstablished.value = s.yearEstablished || "";
    website.value = s.website || "";
    schoolEmail.value = s.schoolEmail || "";
    schoolPhone.value = s.schoolPhone || "";
    description.value = s.description || "";
    contactFullName.value = s.contactFullName || "";
    contactPhone.value = s.contactPhone || "";
    contactEmail.value = s.contactEmail || "";
    street.value = s.street || "";
    city.value = s.city || "";
    state.value = s.state || "";
    zip.value = s.zip || "";
    transmission.value = s.transmission || "";
    operatingHours.value = s.operatingHours || "";
    insuranceProvider.value = s.insuranceProvider || "";
    insurancePolicy.value = s.insurancePolicy || "";
    password.value = s.password || "";
    password.readOnly = false;

    const packageContainer = document.getElementById("packageContainer");

    if (packageContainer) {
      packageContainer.innerHTML = "";

      (s.coursesPackages || []).forEach((pkg) => {
        const div = document.createElement("div");

        div.className = "package-item border rounded p-3 mb-3";
        div.innerHTML = `
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
                <input type="text" 
                class="form-control packageName">
            </div>


            <div class="col-md-6">
                <label class="form-label">Total Sessions</label>
                <input type="number" 
                class="form-control packageDuration">
            </div>


            <div class="col-md-6">
                <label class="form-label">Price</label>
                <input type="number" 
                class="form-control packagePrice">
            </div>


            <div class="col-12">
                <label class="form-label">Description</label>
                <textarea class="form-control packageDescription"></textarea>
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

        packageContainer.appendChild(div);

        div.querySelector(".packageType").value = pkg.type || "";
        div.querySelector(".packageName").value = pkg.name || "";
        div.querySelector(".packageDescription").value = pkg.description || "";
        div.querySelector(".packageDuration").value = pkg.TotalSessions || "";
        div.querySelector(".packagePrice").value = pkg.price || "";
      });
    }
  }

  form.onsubmit = function (e) {
    e.preventDefault();

    let coursesPackages = [];

    document.querySelectorAll(".package-item").forEach((item) => {
      coursesPackages.push({
        type: item.querySelector(".packageType").value,
        name: item.querySelector(".packageName").value,
        description: item.querySelector(".packageDescription").value,
        duration: item.querySelector(".packageDuration").value,
        price: item.querySelector(".packagePrice").value,
      });
    });

    const school = {
      schoolName: schoolName.value,
      businessReg: businessReg.value,
      drivingLicenseNo: drivingLicenseNo.value,
      yearEstablished: yearEstablished.value,
      website: website.value,
      schoolEmail: schoolEmail.value,
      schoolPhone: schoolPhone.value,
      description: description.value,
      contactFullName: contactFullName.value,
      contactPhone: contactPhone.value,
      contactEmail: contactEmail.value,
      street: street.value,
      city: city.value,
      state: state.value,
      zip: zip.value,
      coursesPackages: coursesPackages,
      transmission: transmission.value,
      operatingHours: operatingHours.value,
      insuranceProvider: insuranceProvider.value,
      insurancePolicy: insurancePolicy.value,
      password: password.value,
    };

    localStorage.setItem("schoolProfile", JSON.stringify(school));
    localStorage.setItem(
      "toastMessage",
      "Driving School profile updated successfully !"
    );

    loadPage("DisplayProfile.html", "profile");
  };
}

function editSchoolProfile() {
  localStorage.setItem(
    "editSchool",

    JSON.stringify({
      school: schoolProfile,
    })
  );

  loadPage("Editprofile.html", "profile");
}

function initPackageButtons() {
  const addButton = document.getElementById("addPackage");
  const container = document.getElementById("packageContainer");

  if (!addButton || !container) {
    return;
  }

  addButton.onclick = function () {
    const newPackage = document.createElement("div");

    newPackage.className = "package-item border rounded p-3 mb-3";

    newPackage.innerHTML = `

        <div class="row g-3">
            <div class="col-md-4">
                <label class="form-label">
                    Type
                </label>

                <select class="form-select packageType">
                    <option value="Course">Course</option>
                    <option value="Package">Package</option>
                </select>

            </div>

            <div class="col-md-8">
                <label class="form-label">
                    Name
                </label>
                <input type="text" 
                class="form-control packageName">
            </div>

            <div class="col-md-6">
                <label class="form-label">
                    Total Sessions 
                </label>
                <input type="number"
                class="form-control packageDuration">
            </div>

            <div class="col-md-6">
                <label class="form-label">
                    Price
                </label>
                <div class="input-group">
                    <span class="input-group-text">
                        Rs.
                    </span>
                    <input type="number"
                    class="form-control packagePrice">
                </div>
            </div>

            <div class="col-12">
                <label class="form-label">
                    Description
                </label>

                <textarea class="form-control packageDescription"></textarea>
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
  };

  container.onclick = function (e) {
    if (e.target.closest(".removePackage")) {
      const packageItems = container.querySelectorAll(".package-item");
      if (packageItems.length <= 1) {
        alert("At least one course/package must be there.");
        return;
      }
      e.target.closest(".package-item").remove();
    }
  };
}

function showSchoolToast() {
  const message = localStorage.getItem("toastMessage");

  if (!message) return;

  const toastEl = document.getElementById("successToast");
  const messageEl = document.getElementById("successToastMessage");

  if (!toastEl || !messageEl) return;

  messageEl.textContent = message;

  const toast = new bootstrap.Toast(toastEl, {
    delay: 3000,
  });

  toast.show();

  localStorage.removeItem("toastMessage");
}
