let schools = [];

let compareList = JSON.parse(localStorage.getItem("compareList")) || [];
let savedList = JSON.parse(localStorage.getItem("savedList")) || [];

document.addEventListener("DOMContentLoaded", () => {
  loadStudent();
  loadSchools();
});

async function loadSchools() {
  try {
    const response = await fetch(
      "http://localhost:8080/api/compareschool/schools"
    );

    if (!response.ok) {
      throw new Error("Failed to load schools");
    }

    let data = await response.json();

    schools = data.map((s) => ({
      id: s.dsID,
      name: s.schoolName,
      loc: s.address + ", " + s.city + ",",
      loc2: s.state + " Province " + " " + s.code,
      phone: s.phoneNo,
      image: "drivingschool.png",
      banner: "#0d6efd",
      desc: s.description,
      trans: s.transmission,
      avail: s.time,
      packages: [],
      manager: s.manager,
      managerphone: s.directPhone,
      city: s.city,
    }));

    populateCityFilter();
    renderCards(schools);
  } catch (error) {
    console.error("Error loading schools:", error);

    document.getElementById("schoolGrid").innerHTML = `
            <p class="text-danger">
                Failed to load driving schools.
            </p>
        `;
  }
}

function renderCards(list) {
  const grid = document.getElementById("schoolGrid");

  if (list.length === 0) {
    grid.innerHTML = `
            <p class="text-muted">
                No driving schools found.
            </p>
        `;

    return;
  }

  grid.innerHTML = list.map((s) => cardHTML(s)).join("");
}

function cardHTML(s) {
  const inCmp = compareList.includes(String(s.id));
  const inSaved = savedList.includes(String(s.id));

  return `
    <div class="sc" id="card-${s.id}">

        <div class="sc-banner">
            <img src="${s.image}" class="school-image"alt="${s.name}">
        </div>

        <div class="sc-body">
            <div class="sc-name">
                ${s.name}
            </div>

            <div class="sc-loc">
                <p><i class="bi bi-geo-alt-fill"></i>
                <span>${s.loc}<br>${s.loc2}</span></p>
            </div>

            <div class="sc-foot">
               <button class="btn-view-detail"onclick="openDrawer('${s.id}')">
                        View Details
               </button>
            </div>
        </div>
    </div>
    `;
}

async function openDrawer(id) {
  drawerSchool = schools.find((s) => s.id == id);

  await loadCourses(id);

  if (!drawerSchool) return;

  document.getElementById("dName").textContent = drawerSchool.name;

  drawerTab = "details";

  document.querySelectorAll(".dtab").forEach((btn, index) => {
    btn.classList.toggle("active", index === 0);
  });

  renderDrawerBody("details");

  document.getElementById("dOverlay").classList.add("show");

  document.getElementById("drawer").classList.add("open");
}

function switchDTab(tab) {
  drawerTab = tab;

  document.querySelectorAll(".dtab").forEach((btn) => {
    btn.classList.remove("active");
  });

  event.target.classList.add("active");

  renderDrawerBody(tab);
}

function renderDrawerBody(tab) {
  const s = drawerSchool;

  const body = document.getElementById("dBody");

  if (tab === "details") {
    body.innerHTML = `
    <div class="school-profile">

        <div class="sc-banner">
            <img src="${s.image}" class="school-image" alt="${s.name}">
        </div>

        <div class="school-description">
            ${
              s.desc ||
              "Professional driving school providing quality driving training."
            }
        </div>

        <div class="school-info">

            <div class="info-row">
                <span class="label">
                    <i class="bi bi-telephone"></i> Contact
                </span>
                <span>${s.phone || "Not available"}</span>
            </div>

            <div class="info-row">
                <span class="label">
                    <i class="bi bi-geo-alt"></i> Location
                </span>
                <span>${s.loc}<br>${s.loc2}</span>
            </div>

            <div class="info-row">
                <span class="label">
                    <i class="bi bi-car-front"></i> Vehicle
                </span>
                <span>${formatTransmission(s.trans)}</span>
            </div>

            <div class="info-row">
                <span class="label">
                    <i class="bi bi-clock"></i> Hours
                </span>
                <span>${formatAvailability(s.avail)}</span>
            </div>

            <div class="info-row">
                <span class="label">
                    <i class="bi bi-person"></i> Manager
                </span>
                <span>
                    ${s.manager || "N/A"}
                    <br>
                    ${s.managerphone || ""}
                </span>
            </div>
        </div>
    </div>
  `;
  } else if (tab === "packages") {
    body.innerHTML = `

        <h6>Select a package</h6>
        ${s.packages
          .map(
            (p, index) => `
            <div class="package-card">
                <h6>${p.name}</h6>
                <p>${p.desc}</p>
                <div class="package-info">
                    Total Sessions: ${p.lessons}
                </div>
                <b>${p.price}</b>
                <button class="btn btn-primary w-100 mt-2"onclick="openPayment('${s.id}',${index})">Enrol Now</button>
            </div>
            `
          )
          .join("")}
        `;
  }
}

function closeDrawer() {
  document.getElementById("dOverlay").classList.remove("show");
  document.getElementById("drawer").classList.remove("open");
}

function enrol(id, pkgIndex) {
  const school = schools.find((s) => s.id == id);
  const package = school.packages[pkgIndex];
  alert(
    `Enrolling in ${school.name}
Package: ${package.name}`
  );
}

async function loadCourses(dsID) {
  const response = await fetch(
    `http://localhost:8080/api/compareschool/courses/${dsID}`
  );

  const courses = await response.json();

  const school = schools.find((s) => s.id == dsID);

  school.packages = courses.map((c) => ({
    id: c.courseID,
    name: c.name,
    desc: c.description,
    price: `LKR ${c.price.toLocaleString()}`,
    lessons: c.totalSessions,
  }));
}

function formatTransmission(t) {
  if (t === "Auto") {
    return "Automatic";
  }
  if (t === "Both") {
    return "Automatic and Manual";
  }

  return t;
}

function formatAvailability(t) {
  if (t === "Weekday") {
    return "Only Weekdays";
  } else if (t === "Weekend") {
    return "Only Weekends";
  } else if (t === "Both") {
    return "Weekdays and Weekends";
  } else if (t === "Flex") {
    return "Flexible";
  }

  return t;
}

let selectedSchool;
let selectedPackage;

function openPayment(id, index) {
  selectedSchool = schools.find((s) => s.id == id);

  selectedPackage = selectedSchool.packages[index];

  document.getElementById(
    "paymentPackage"
  ).innerHTML = `${selectedSchool.name}<br>
        ${selectedPackage.name}`;

  document.getElementById("paymentAmount").innerHTML = selectedPackage.price;

  document.getElementById("paymentModal").classList.add("show");
}

function closePayment() {
  document.getElementById("paymentModal").classList.remove("show");
}

function makePayment() {
  const method = document.getElementById("paymentMethod").value;

  alert(
    `Payment Successful!

School: ${selectedSchool.name}
Package: ${selectedPackage.name}
Method: ${method}`
  );

  closePayment();
}

function makePayment() {
  const method = document.getElementById("paymentMethod").value;

  closePayment();

  const toast = document.getElementById("paymentToast");
  const title = toast.querySelector("strong");
  const msg = toast.querySelector("p");
  const okBtn = document.getElementById("toastOkBtn");

  if (method === "Cash") {
    title.innerHTML = "Enrollment Successful";
    msg.innerHTML = "Please pay the amount at the driving school.";
    okBtn.style.display = "inline-block";
  } else {
    title.innerHTML = "Payment Successful";
    msg.innerHTML = "Your payment has been completed.";
    okBtn.style.display = "none";

    setTimeout(() => {
      goStudentPortal();
    }, 2000);
  }

  toast.classList.add("show");
}

function goStudentPortal() {
  document.getElementById("paymentToast").classList.remove("show");
  window.location.href = "studentportal.html";
}
function filterCards() {
  const searchElement = document.getElementById("searchQ");
  const cityElement = document.getElementById("filterCity");
  const txElement = document.getElementById("filterTx");
  const search = searchElement ? searchElement.value.toLowerCase().trim() : "";
  const city = cityElement ? cityElement.value.toLowerCase().trim() : "";
  const transmission = txElement ? txElement.value : "";

  const filteredSchools = schools.filter((s) => {
    const schoolName = String(s.name || "").toLowerCase();
    const address = String(s.address || "").toLowerCase();
    const schoolCity = String(s.city || "").toLowerCase();

    const searchMatch =
      search === "" ||
      schoolName.includes(search) ||
      address.includes(search) ||
      schoolCity.includes(search);

    const cityMatch = city === "" || schoolCity === city;
    const txMatch = transmission === "" || s.trans === transmission;
    return searchMatch && cityMatch && txMatch;
  });
  renderCards(filteredSchools);
}

function populateCityFilter() {
  const citySelect = document.getElementById("filterCity");

  const cities = [
    ...new Set(
      schools.map((s) => s.city).filter((city) => city && city.trim() !== "")
    ),
  ];

  cities.sort((a, b) => a.localeCompare(b));
  citySelect.innerHTML = `
        <option value="">All areas</option>
    `;

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
}

function resetFilters() {
  document.getElementById("searchQ").value = "";
  document.getElementById("filterCity").value = "";
  document.getElementById("filterTx").value = "";
  document.getElementById("filterSort").value = "match";
  renderCards(schools);
}
