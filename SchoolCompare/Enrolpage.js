let drawerSchool = null;
let drawerTab = "details";

function openDrawer(id) {
  drawerSchool = schools.find((s) => s.id == id);

  if (!drawerSchool) return;

  document.getElementById("dName").textContent = drawerSchool.name;

  document.getElementById("dLoc").innerHTML = `
    <i class="bi bi-geo-alt-fill"></i>
    ${drawerSchool.loc} · ${drawerSchool.dist} km
    `;

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

        <div class="drawer-banner"
        style="background:${s.banner}">
            ${s.emoji}
        </div>


        <div class="stars">
            ${stars(s.rating)}
            <b>${s.rating}</b>
            (${s.reviews})
        </div>


        <p>
        ${
          s.desc ||
          "Professional driving school providing quality driving training."
        }
        </p>


        <hr>


        <p>
        🚗 Transmission:
        ${s.tx.join(", ")}
        </p>


        <p>
        🕒 Availability:
        ${s.avail}
        </p>


        <p>
        💰 Price:
        LKR ${s.price.toLocaleString()}
        / lesson
        </p>

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

                <b>
                ${p.price}
                </b>


                <button 
                class="btn btn-primary w-100 mt-2"
                onclick="enrol('${s.id}',${index})">

                Enrol Now

                </button>


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
let drawerSchool = null;
let drawerTab = "overview";

function openDrawer(id) {
  drawerSchool = schools.find((s) => s.id == id);

  if (!drawerSchool) {
    console.log("School not found");
    return;
  }

  document.getElementById("dName").textContent = drawerSchool.name;

  document.getElementById("dLoc").innerHTML = `
    <i class="bi bi-geo-alt-fill"></i>
    ${drawerSchool.loc}
    `;

  document.querySelectorAll(".dtab").forEach((t, i) => {
    t.classList.toggle("active", i === 0);
  });

  renderDrawerBody("overview");

  document.getElementById("dOverlay").classList.add("show");

  document.getElementById("drawer").classList.add("open");
}

function closeDrawer() {
  document.getElementById("dOverlay").classList.remove("show");

  document.getElementById("drawer").classList.remove("open");
}

function switchDTab(tab, event) {
  document.querySelectorAll(".dtab").forEach((t) => {
    t.classList.remove("active");
  });

  event.target.classList.add("active");

  drawerTab = tab;

  renderDrawerBody(tab);
}

function renderDrawerBody(tab) {
  const s = drawerSchool;

  const body = document.getElementById("dBody");

  // DETAILS TAB

  if (tab === "overview") {
    body.innerHTML = `

        <div class="drawer-banner"
        style="background:${s.banner}">

            🚗

        </div>



        <div class="sc-tags">

        ${s.tx
          .map(
            (t) =>
              `<span class="tag">
            ${t}
            </span>`
          )
          .join("")}

        </div>



        <p>
        ${s.desc || "Driving school provides professional training."}
        </p>



        <hr>



        <p>
        🕒 Operating Time:
        ${s.avail}
        </p>



        <p>
        🚘 Transmission:
        ${s.tx.join(",")}
        </p>



        `;
  }

  // PACKAGE TAB
  else if (tab === "packages") {
    if (!s.packages || s.packages.length === 0) {
      body.innerHTML = `
            <p class="text-muted">
            No packages available
            </p>
            `;

      return;
    }

    body.innerHTML = `

        <p>
        Select a package
        </p>


        ${s.packages
          .map(
            (p, index) =>
              `

        <div class="package-card">


            <h6>
            ${p.name}
            </h6>


            <p>
            ${p.description || ""}
            </p>


            <h5>
            LKR ${p.price}
            </h5>



            <button 
            class="btn btn-primary"
            onclick="startEnrol(${s.id},${index})">

            Enrol Now

            </button>


        </div>


        `
          )
          .join("")}


        `;
  }
}

function startEnrol(id, index) {
  const school = schools.find((s) => s.id == id);

  const selectedPackage = school.packages[index];

  console.log("School:", school.name);

  console.log("Package:", selectedPackage);

  alert(
    `
    Enrolment Started

    School:
    ${school.name}

    Package:
    ${selectedPackage.name}
    `
  );
}
