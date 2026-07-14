function resetDate() {
  const dateInput = document.getElementById("dateFilter");

  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;

  renderTable(today);
}

let selectedLessonRow = null;
let selectedLessonId = null;

window.deleteLesson = function (button, id) {
  selectedLessonRow = button.closest("tr");
  selectedLessonId = id;

  const modalEl = document.getElementById("deleteLessonModal");

  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);
  modal.show();
};

window.confirmDeleteLesson = function () {
  if (selectedLessonRow) {
    selectedLessonRow.remove();
  }

  const modalEl = document.getElementById("deleteLessonModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  const toastEl = document.getElementById("deleteToast");

  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

  console.log("Deleted Lesson ID:", selectedLessonId);

  selectedLessonRow = null;
  selectedLessonId = null;
};

function initAddLessonForm() {
  const form = document.getElementById("addLesson");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const stuID = document.getElementById("stuID").value;
    const insID = document.getElementById("insID").value;
    const time = document.getElementById("time").value;
    const type = document.getElementById("type").value;

    console.log({ stuID, insID, time, type });

    form.reset();

    const toastEl = document.getElementById("lessonToast");
    new bootstrap.Toast(toastEl).show();

    loadPage("DisplaySchedule.html", "schedule");
  });
}
