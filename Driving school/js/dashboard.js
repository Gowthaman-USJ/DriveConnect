window.handleInquiry = function (btn, action, name) {
  let message = "";

  if (action === "accept") {
    message = name + " inquiry accepted";
  } else {
    message = name + " inquiry declined";
  }


  document.getElementById("toastMsg").innerText = message;

  const toastEl = document.getElementById("inquiryToast");

  toastEl.classList.remove("text-bg-success", "text-bg-danger");

  if (action === "accept") {
    toastEl.classList.add("text-bg-success");
  } else {
    toastEl.classList.add("text-bg-danger");
  }

  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  const item = btn.closest(".inquiry-item");

  item.style.transition = "0.3s ease";
  item.style.opacity = "0";

  setTimeout(() => {
    item.remove();
  }, 300);
};
