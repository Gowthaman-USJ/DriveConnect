let vehicles = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    makeyear: "2023",
    platenum: "CAA-1234",
    vehicletype: "Automatic",
    fueltype: "Petrol",
    mileage: "45000",
    status: "Maintenance",
    notes: "Well-maintained vehicle in excellent condition",
  },
];

function initVehicleForm() {
  const form = document.getElementById("addVehicleForm");
  if (!form) return;

  const formTitle = document.getElementById("formTitle");
  const formTitleIcon = document.getElementById("formTitleIcon");

  const submitIcon = document.getElementById("submitIcon");
  const submitText = document.getElementById("submitText");

  const brand = document.getElementById("brand");
  const model = document.getElementById("model");
  const makeyear = document.getElementById("makeyear");
  const platenum = document.getElementById("platenum");
  const vehicletype = document.getElementById("vehicletype");
  const fueltype = document.getElementById("fueltype");
  const mileage = document.getElementById("mileage");
  const status = document.getElementById("status");
  const notes = document.getElementById("notes");

  const stored = localStorage.getItem("editVehicle");
  const editData = stored ? JSON.parse(stored) : null;

  form.reset();

  formTitle.innerText = "Add Vehicle";
  formTitleIcon.className = "bi bi-car-front text-primary fs-5";
  submitText.innerText = "Add Vehicle";
  submitIcon.className = "bi bi-plus-circle me-2";

  if (editData && editData.vehicle) {
    const v = editData.vehicle;

    brand.value = v.brand || "";
    model.value = v.model || "";
    makeyear.value = v.makeyear || "";
    platenum.value = v.platenum || "";
    vehicletype.value = v.vehicletype || "";
    fueltype.value = v.fueltype || "";
    mileage.value = v.mileage || "";
    status.value = v.status || "";
    notes.value = v.notes || "";

    formTitle.innerText = "Update Vehicle";
    formTitleIcon.className = "bi bi-pencil-square text-primary fs-5";

    submitText.innerText = "Update Vehicle";
    submitIcon.className = "bi bi-pencil-square me-2";
  }

  form.onsubmit = function (e) {
    e.preventDefault();

    const stored = localStorage.getItem("editVehicle");
    const editData = stored ? JSON.parse(stored) : null;

    const vehicle = {
      id: editData ? editData.id : Date.now(),
      brand: brand.value,
      model: model.value,
      makeyear: makeyear.value,
      platenum: platenum.value,
      vehicletype: vehicletype.value,
      fueltype: fueltype.value,
      mileage: mileage.value,
      status: status.value,
      notes: notes.value,
    };

    if (editData && editData.vehicle) {
      const index = vehicles.findIndex((v) => v.id === editData.id);

      if (index !== -1) {
        vehicles[index] = vehicle;
      }

      localStorage.removeItem("editVehicle");

      localStorage.setItem("toastMessage", "Vehicle updated successfully !");
    } else {
      vehicles.push(vehicle);

      localStorage.setItem("toastMessage", "Vehicle added successfully !");
    }

    loadPage("DisplayVehicles.html", "vehicles");
  };
}

function showVehicleToast() {
  const message = localStorage.getItem("toastMessage");

  if (!message) return;

  const toastEl = document.getElementById("vehicleToast");
  const messageEl = document.getElementById("vehicleToastMessage");

  if (!toastEl || !messageEl) return;

  messageEl.textContent = message;

  const toast = new bootstrap.Toast(toastEl, {
    delay: 3000,
  });

  toast.show();

  localStorage.removeItem("toastMessage");
}

window.viewVehicle = function (id) {
  const v = vehicles.find((vehicle) => vehicle.id == id);

  if (!v) {
    alert("Vehicle not found");
    return;
  }

  document.getElementById("m_brand").value = v.brand;
  document.getElementById("m_model").value = v.model;
  document.getElementById("m_makeyear").value = v.makeyear;
  document.getElementById("m_platenum").value = v.platenum;
  document.getElementById("m_vehicletype").value = v.vehicletype;
  document.getElementById("m_fueltype").value = v.fueltype;
  document.getElementById("m_mileage").value = v.mileage;
  document.getElementById("m_status").value = v.status;
  document.getElementById("m_notes").value = v.notes;

  new bootstrap.Modal(document.getElementById("vehicleModal")).show();
};

let selectedVehicleRow = null;
let selectedVehicleId = null;

window.deleteVehicle = function (button, id) {
  selectedVehicleRow = button.closest("tr");
  selectedVehicleId = id;

  const modalEl = document.getElementById("deleteVehicleModal");

  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};

window.confirmDeleteVehicle = function () {
  if (selectedVehicleRow) {
    selectedVehicleRow.remove();
  }

  const modalEl = document.getElementById("deleteVehicleModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  const toastEl = document.getElementById("deleteToast");

  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

  selectedVehicleRow = null;
  selectedVehicleId = null;
};

window.editVehicle = function (id) {
  console.log("Edit clicked:", id);

  const vehicle = vehicles.find((v) => v.id === id);

  console.log("Vehicle found:", vehicle);

  localStorage.setItem(
    "editVehicle",
    JSON.stringify({
      id,
      vehicle,
    })
  );

  loadPage("AddVehicle.html", "vehicles");
};

function openAddVehicle() {
  localStorage.removeItem("editVehicle");
  loadPage("AddVehicle.html", "vehicles");
}
