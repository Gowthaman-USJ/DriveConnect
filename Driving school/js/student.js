const students = {
  1: {
    stuID: "STU-1001",
    firstName: "Nimal",
    lastName: "Kumar",
    email: "nimal@example.com",
    password: "Vesta@2709",
    phone: "077 123 4567",
    dob: "2000-05-10",
    gender: "Male",
    street: "Vanderwart Place",
    city: "Dehiwala",
    state: "Western",
    zip: "10350",
    licenseType: ["Motorcycle", "Light Vehicle"],
    transmission: "Automatic",
    experience: "Beginner",
    lessonTime: "8 AM – 12 PM",
    notes: "Nothing",
  },
};

function initAddStudentForm() {
  const form = document.getElementById("addStudentForm");
  if (!form) return;

  const formTitle = document.getElementById("formTitle");
  const formTitleIcon = document.getElementById("formTitleIcon");

  const submitIcon = document.getElementById("submitIcon");
  const submitText = document.getElementById("submitText");

  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const dob = document.getElementById("dob");
  const gender = document.getElementById("gender");
  const street = document.getElementById("street");
  const password = document.getElementById("password");

  const motorcycle = document.getElementById("motorcycle");
  const lightVehicle = document.getElementById("lightVehicle");
  const heavyVehicle = document.getElementById("heavyVehicle");

  const editData = JSON.parse(localStorage.getItem("editStudent"));

  form.reset();

  formTitle.innerText = "Add Student";
  formTitleIcon.className = "bi bi-person-plus text-primary fs-5";

  submitText.innerText = "Add Student";
  submitIcon.className = "bi bi-person-plus me-2";

  motorcycle.checked = false;
  lightVehicle.checked = false;
  heavyVehicle.checked = false;


  if (editData && editData.student) {
    const s = editData.student;

    firstName.value = s.firstName || "";
    lastName.value = s.lastName || "";
    email.value = s.email || "";
    phone.value = s.phone || "";
    dob.value = s.dob || "";
    gender.value = s.gender || "";
    street.value = s.street || "";

    if (s.licenseType?.includes("Motorcycle")) motorcycle.checked = true;

    if (s.licenseType?.includes("Light Vehicle")) lightVehicle.checked = true;

    if (s.licenseType?.includes("Heavy Vehicle")) heavyVehicle.checked = true;

    password.value = "**********";
    password.readOnly = true;

    formTitle.innerText = "Update Student";
    formTitleIcon.className = "bi bi-pencil-square text-primary fs-5";

    submitText.innerText = "Update Student";
    submitIcon.className = "bi bi-pencil-square me-2";
  }

  form.onsubmit = function (e) {
    e.preventDefault();

    const licenseType = [];

    if (motorcycle.checked) licenseType.push("Motorcycle");

    if (lightVehicle.checked) licenseType.push("Light Vehicle");

    if (heavyVehicle.checked) licenseType.push("Heavy Vehicle");

    const student = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phone: phone.value,
      dob: dob.value,
      gender: gender.value,
      street: street.value,
      licenseType: licenseType,
    };

    const editData = JSON.parse(localStorage.getItem("editStudent"));

    if (editData) {
      students[editData.id] = student;

      localStorage.removeItem("editStudent");
      localStorage.setItem("toastMessage", "Student updated successfully!");
    } else {
      localStorage.setItem("toastMessage", "Student added successfully!");
    }

    loadPage("DisplayStudents.html", "students");
  };
}
function showStudentToast() {
  const message = localStorage.getItem("toastMessage");

  if (!message) return;

  const toastEl = document.getElementById("studentToast");
  const messageEl = document.getElementById("studentToastMessage");

  if (!toastEl || !messageEl) return;

  messageEl.textContent = message;

  const toast = new bootstrap.Toast(toastEl, {
    delay: 3000,
  });

  toast.show();

  localStorage.removeItem("toastMessage");
}

window.viewStudent = function (id) {
  const s = students[id];

  if (!s) {
    alert("Student not found");
    return;
  }

  document.getElementById("m_stuID").value = s.stuID;
  document.getElementById("m_firstName").value = s.firstName;
  document.getElementById("m_lastName").value = s.lastName;
  document.getElementById("m_email").value = s.email;
  document.getElementById("m_phone").value = s.phone;
  document.getElementById("m_dob").value = s.dob;
  document.getElementById("m_gender").value = s.gender;
  document.getElementById("m_street").value = s.street;
  document.getElementById("m_city").value = s.city;
  document.getElementById("m_state").value = s.state;
  document.getElementById("m_zip").value = s.zip;
  document.getElementById("m_licenseType").value = s.licenseType;
  document.getElementById("m_transmission").value = s.transmission;
  document.getElementById("m_experience").value = s.experience;
  document.getElementById("m_lessonTime").value = s.lessonTime;
  document.getElementById("m_notes").value = s.notes;

  const modalEl = document.getElementById("studentModal");

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};

let selectedStudentRow = null;
let selectedStudentId = null;

window.deleteStudent = function (button, id) {
  selectedStudentRow = button.closest("tr");
  selectedStudentId = id;

  const modal = new bootstrap.Modal(
    document.getElementById("deleteStudentModal")
  );

  modal.show();
};

window.confirmDeleteStudent = function () {
  if (selectedStudentRow) {
    selectedStudentRow.remove();
  }

  const modalEl = document.getElementById("deleteStudentModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  const toastEl = document.getElementById("deleteToast");
  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  selectedStudentRow = null;
  selectedStudentId = null;
};

function editStudent(id) {
  const student = students[id];

  localStorage.setItem(
    "editStudent",
    JSON.stringify({
      id: id,
      student: student,
    })
  );

  loadPage("AddStudent.html", "students");
}

window.assignInstructor = function (button, id) {
  selectedRow = button.closest("tr");
  selectedId = id;

  const modalEl = document.getElementById("assignInstructorModal");

  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};

window.confirmAssignInstructor = function () {
  const instructor = document.getElementById("instructorSelect").value;

  if (!instructor) {
    alert("Please select an instructor!");
    return;
  }

  console.log("Assigned Instructor:", instructor);

  const modalEl = document.getElementById("assignInstructorModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();

  const toastEl = document.getElementById("assignToast");
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
};
