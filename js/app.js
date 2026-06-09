// ================= MODAL CUCIAN =================
function openCucian() {
  const modal = document.getElementById("modalCucian");
  if (modal) modal.classList.remove("hidden");
}

function closeCucian() {
  const modal = document.getElementById("modalCucian");
  if (modal) modal.classList.add("hidden");
}

// ================= MODAL CUSTOMER =================
function openCustomer() {
  const modal = document.getElementById("modalCustomer");
  if (modal) modal.classList.remove("hidden");
}

function closeCustomer() {
  const modal = document.getElementById("modalCustomer");
  if (modal) modal.classList.add("hidden");
}

// ================= LOAD TRANSAKSI (DATA CUCIAN) =================
async function loadTransactions() {
  const tbody = document.getElementById("tbodyTransaksi");
  if (!tbody) return;

  try {
    const r = await gas("getAllTransactions");

    if (!r || !r.success) return;

    tbody.innerHTML = "";

    r.data
      .slice()
      .reverse()
      .forEach((item) => {
        tbody.innerHTML += `
          <tr class="border-t">
            <td class="p-3 font-semibold">${item.kode}</td>
            <td class="p-3">${item.nama}</td>
            <td class="p-3">
              <span class="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">
                ${item.status}
              </span>
            </td>
            <td class="p-3">
              Rp ${Number(item.total || 0).toLocaleString("id-ID")}
            </td>
            <td class="p-3 flex gap-2">
              <button class="bg-gray-200 px-2 py-1 rounded">🖨</button>
              <button class="bg-blue-200 px-2 py-1 rounded">✏</button>
              <button class="bg-red-200 px-2 py-1 rounded">🗑</button>
            </td>
          </tr>
        `;
      });
  } catch (err) {
    console.error("loadTransactions error:", err);
  }
}

// ================= AUTO LOAD =================
document.addEventListener("DOMContentLoaded", () => {
  loadTransactions();
});
