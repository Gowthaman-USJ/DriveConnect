let payments = [
  {
    id: 1,
    paymentId: "PAY-001",
    studentId: "ST-1001",
    studentName: "Kamal Perera",
    date: "2026-07-05",
    amount: 5000,
    method: "cash",
    status: "paid",
  },
  {
    id: 2,
    paymentId: "PAY-002",
    studentId: "ST-1002",
    studentName: "Nimal Perera",
    date: "2026-07-05",
    amount: 3000,
    method: "card",
    status: "pending",
  },
];

function showToast(message, type = "success") {
  const wrap = document.getElementById("toastWrap");
  if (!wrap) {
    alert(message);
    return;
  }

  const div = document.createElement("div");
  div.className = `toast-msg ${type}`;
  div.innerText = message;

  wrap.appendChild(div);

  setTimeout(() => div.remove(), 3000);
}

window.markAsPaid = function (button, id) {
  const row = button.closest("tr");
  const statusCell = row.querySelector(".status");

  if (statusCell) {
    statusCell.className = "status paid";
    statusCell.innerHTML = "Paid";
  }

  button.remove();

  const toastEl = document.getElementById("paymentToast");

  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }

  console.log("Payment marked as paid:", id);
};

let selectedPaymentRow = null;
let selectedPaymentId = null;

window.deletePayment = function (button, id) {
  selectedPaymentRow = button.closest("tr");
  selectedPaymentId = id;

  const modal = new bootstrap.Modal(
    document.getElementById("deletePaymentModal")
  );

  modal.show();
};

window.confirmDelete = function () {
  if (selectedPaymentRow) {
    selectedPaymentRow.remove();
  }

  const modalEl = document.getElementById("deletePaymentModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();

  const toastEl = document.getElementById("deleteToast");
  const toast = new bootstrap.Toast(toastEl);
  toast.show();

  selectedPaymentRow = null;
  selectedPaymentId = null;
};
