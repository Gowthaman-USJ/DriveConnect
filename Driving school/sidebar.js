window.addEventListener("load", () => {
  localStorage.removeItem("editStudent");

  const savedPage = localStorage.getItem("page");
  const savedMenu = localStorage.getItem("menu");

  if (savedPage && savedMenu) {
    loadPage(savedPage, savedMenu, false);
  } else {
    loadPage("Dashboard.html", "dashboard", false);
  }
});

function loadPage(page, menu, addHistory = true) {
  fetch("pages/" + page + "?v=" + Date.now())
    .then((res) => res.text())
    .then((html) => {
      const container = document.getElementById("contentArea");
      if (!container) return;

      container.innerHTML = html;

      container.scrollTop = 0;
      window.scrollTo(0, 0);

      setActive(menu);

      localStorage.setItem("page", page);
      localStorage.setItem("menu", menu);

      if (page !== "AddStudent.html") {
        localStorage.removeItem("editStudent");
      }

      if (addHistory) {
        history.pushState({ page, menu }, "", "#" + page);
      }

      initPage(page);
    });
}

window.addEventListener("popstate", (event) => {
  if (event.state) {
    loadPage(event.state.page, event.state.menu, false);
  }
});
function initPage(page) {
  if (page === "AddStudent.html") {
    initAddStudentForm();
  }

  if (page === "AddInstructor.html") {
    initAddInstructorForm();
  }

  if (page == "AddVehicle.html") {
    initVehicleForm();
  }

  if (page == "AddPayment.html") {
    initPaymentForm();
  }
  if (page == "BookLesson.html") {
    initAddLessonForm();
  }
  if (page == "DisplayStudents.html") {
    showStudentToast();
  }
  if (page == "Editprofile.html") {
    initEditSchoolProfileForm();
    initPackageButtons();
  }
  if (page == "DisplayInstructors.html") {
    showInstructorToast();
  }
  if (page == "DisplayVehicles.html") {
    showVehicleToast();
  }
  if (page == "DisplayProfile.html") {
    showSchoolToast();
  }
}

function setActive(menu) {
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = document.querySelector(`[onclick*="${menu}"]`);

  if (activeLink) {
    activeLink.classList.add("active");
  }
}
