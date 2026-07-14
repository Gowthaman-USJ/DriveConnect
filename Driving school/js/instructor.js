let instructors = [
  {
    id: 1,
    insID: "INS-1001",
    fullname: "Mark Stevens",
    nic: "200416100340",
    email: "mark@example.com",
    password: "Vesta@2709",
    phone: "077 163 4567",
    dob: "2000-05-10",
    gender: "Male",
    address: "Vanderwart Place",
    licenseType: ["Motorcycle", "Light Vehicle"],
    experience: "5",
    availability: "Fulltime",
    password: "Vesta@2709",
  },
];

function initAddInstructorForm() {
  const form = document.getElementById("addInstructorForm");
  if (!form) return;

  const formTitle = document.getElementById("formTitle");
  const formTitleIcon = document.getElementById("formTitleIcon");

  const submitIcon = document.getElementById("submitIcon");
  const submitText = document.getElementById("submitText");

  const fullName = document.getElementById("fullname");
  const phone = document.getElementById("phone");
  const nic = document.getElementById("nic");
  const dob = document.getElementById("dob");
  const gender = document.getElementById("gender");
  const address = document.getElementById("address");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const experience = document.getElementById("experience");
  const availability = document.getElementById("availability");

  const motorcycle = document.getElementById("motorcycle");
  const lightVehicle = document.getElementById("lightVehicle");
  const heavyVehicle = document.getElementById("heavyVehicle");

  const editData = JSON.parse(localStorage.getItem("editInstructor"));


  form.reset();

  formTitle.innerText = "Add Instructor";
  formTitleIcon.className = "bi bi-person-badge text-primary fs-5";

  submitText.innerText = "Add Instructor";
  submitIcon.className = "bi bi-person-plus me-2";

  motorcycle.checked = false;
  lightVehicle.checked = false;
  heavyVehicle.checked = false;

  if (editData && editData.instructor) {
    const i = editData.instructor;

    fullName.value = i.fullname || "";
    phone.value = i.phone || "";
    nic.value = i.nic || "";
    dob.value = i.dob || "";
    gender.value = i.gender || "";
    address.value = i.address || "";
    email.value = i.email || "";
    experience.value = i.experience || "";
    availability.value = i.availability || "";
    password.value = i.password || "";

    motorcycle.checked = i.licenseType?.includes("Motorcycle") || false;
    lightVehicle.checked = i.licenseType?.includes("Light Vehicle") || false;
    heavyVehicle.checked = i.licenseType?.includes("Heavy Vehicle") || false;

    formTitle.innerText = "Update Instructor";
    formTitleIcon.className = "bi bi-pencil-square text-primary fs-5";

    submitText.innerText = "Update Instructor";
    submitIcon.className = "bi bi-pencil-square me-2";
  }

  form.onsubmit = function (e) {
    e.preventDefault();

    const licenseType = [];

    if (motorcycle.checked) {
      licenseType.push("Motorcycle");
    }

    if (lightVehicle.checked) {
      licenseType.push("Light Vehicle");
    }

    if (heavyVehicle.checked) {
      licenseType.push("Heavy Vehicle");
    }

    const instructor = {
      fullname: fullName.value,
      nic: nic.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      dob: dob.value,
      gender: gender.value,
      address: address.value,

      licenseType: licenseType,

      experience: experience.value,
      availability: availability.value,
    };

    if (editData && editData.instructor) {
      const index = instructors.findIndex((x) => x.id == editData.id);

      if (index !== -1) {
        instructor.id = instructors[index].id;
        instructor.insID = instructors[index].insID;

        instructors[index] = instructor;
      }

      localStorage.removeItem("editInstructor");

      localStorage.setItem("toastMessage", "Instructor updated successfully!");
    } else {

      instructor.id = instructors.length + 1;

      instructor.insID = "INS-" + String(1000 + instructor.id);

      instructors.push(instructor);

      localStorage.setItem("toastMessage", "Instructor added successfully!");
    }

    loadPage("DisplayInstructors.html", "instructors");
  };
}

function showInstructorToast() {
  const message = localStorage.getItem("toastMessage");

  if (!message) return;

  const toastEl = document.getElementById("instructorToast");
  const messageEl = document.getElementById("instructorToastMessage");

  if (!toastEl || !messageEl) return;

  messageEl.textContent = message;

  const toast = new bootstrap.Toast(toastEl, {
    delay: 3000,
  });

  toast.show();

  localStorage.removeItem("toastMessage");
  localStorage.removeItem("toastType");
}

window.viewInstructor = function (id) {
  const i = instructors.find((instructor) => instructor.id == id);

  if (!i) {
    alert("Instructor not found");
    return;
  }

  document.getElementById("m_fullname").value = i.fullname || "";
  document.getElementById("m_insID").value = i.insID || "";
  document.getElementById("m_nic").value = i.nic || "";
  document.getElementById("m_email").value = i.email || "";
  document.getElementById("m_password").value = i.password || "";
  document.getElementById("m_phone").value = i.phone || "";
  document.getElementById("m_dob").value = i.dob || "";
  document.getElementById("m_gender").value = i.gender || "";
  document.getElementById("m_address").value = i.address || "";
  document.getElementById("m_licenseType").value = i.licenseType || "";
  document.getElementById("m_experience").value = i.experience || "";
  document.getElementById("m_availability").value = i.availability || "";

  new bootstrap.Modal(document.getElementById("instructorModal")).show();
};

function openAddInstructor() {
  localStorage.removeItem("editInstructor");
  loadPage("AddInstructor.html", "instructors");
}

window.editInstructor = function (id) {
  const instructor = instructors.find((i) => i.id == id);

  if (!instructor) {
    alert("Instructor not found");
    return;
  }

  localStorage.setItem(
    "editInstructor",
    JSON.stringify({
      id: id,
      instructor: instructor,
    })
  );

  loadPage("AddInstructor.html", "instructors");
};

let selectedInstructorRow = null;
let selectedInstructorId = null;

window.deleteInstructor = function (button, id) {
  selectedInstructorRow = button.closest("tr");
  selectedInstructorId = id;

  const modalEl = document.getElementById("deleteInstructorModal");

  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};

window.confirmDeleteInstructor = function () {
  if (selectedInstructorRow) {
    selectedInstructorRow.remove();
  }

  const modalEl = document.getElementById("deleteInstructorModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl);

  if (modalInstance) modalInstance.hide();

  const toastEl = document.getElementById("deleteToast");

  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

  console.log("Deleted Instructor ID:", selectedInstructorId);

  selectedInstructorRow = null;
  selectedInstructorId = null;
};

window.assignVehicle = function (button, id) {
  selectedVehicleRow = button.closest("tr");
  selectedVehicleId = id;

  const modalEl = document.getElementById("assignVehicleModal");

  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};

window.confirmAssignVehicle = function () {
  const vehicle = document.getElementById("vehicleSelect").value;

  if (!vehicle) {
    alert("Please select a vehicle!");
    return;
  }

  const modalEl = document.getElementById("assignVehicleModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();

  const toast = new bootstrap.Toast(document.getElementById("assignToast"));
  toast.show();
};
