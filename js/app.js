// MODAL CUCIAN
function openCucian() {
  document
    .getElementById("modalCucian")
    .classList.remove("hidden");
}

function closeCucian() {
  document
    .getElementById("modalCucian")
    .classList.add("hidden");
}

// MODAL CUSTOMER
function openCustomer() {
  document
    .getElementById("modalCustomer")
    .classList.remove("hidden");
}

function closeCustomer() {
  document
    .getElementById("modalCustomer")
    .classList.add("hidden");
}

function renderFormCucian() {
  return `
    <div class="card shadow-sm border-0">
      <div class="card-header bg-primary text-white">
        <h5 class="mb-0">Tambah Cucian Baru</h5>
      </div>

      <div class="card-body">
        <form id="formCucian">
          
          <div class="mb-3">
            <label class="form-label">Nama Pelanggan</label>
            <input type="text" class="form-control" id="nama" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Jenis Cucian</label>
            <select class="form-select" id="jenis">
              <option>Reguler</option>
              <option>Express</option>
              <option>VIP</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label">Berat (Kg)</label>
            <input type="number" class="form-control" id="berat" required>
          </div>

          <div class="mb-3">
            <label class="form-label">Catatan</label>
            <textarea class="form-control" id="catatan"></textarea>
          </div>

          <button type="submit" class="btn btn-success w-100">
            Simpan Cucian
          </button>

        </form>
      </div>
    </div>
  `;
}

function renderDashboard() {
  document.getElementById("app").innerHTML = `
    <h3>Dashboard</h3>

    ${renderFormCucian()}

    <hr>
  `;

  initFormCucian();
}

function renderDataCucian() {
  document.getElementById("app").innerHTML = `
    <h3>Data Cucian</h3>

    ${renderFormCucian()}

    <hr>
  `;

  initFormCucian();
}

function initFormCucian() {
  const form = document.getElementById("formCucian");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {
      nama: document.getElementById("nama").value,
      jenis: document.getElementById("jenis").value,
      berat: document.getElementById("berat").value,
      catatan: document.getElementById("catatan").value
    };

    console.log("DATA CUCIAN:", data);

    alert("Cucian berhasil disimpan!");
    
    form.reset();
  });
}

// URL APPS SCRIPT
const API_URL =
  "https://script.google.com/macros/s/AKfycbxZVQxpqUvh-T7yBjhwH1XATE50c67hOaU9StNZBvMvUfd4kK-MAVSbNa1CY65PS8Q/exec";

// HELPER APPS SCRIPT
async function gas(func, data = {}) {

  const res = await fetch(
    API_URL,
    {
      method: "POST",
      body: JSON.stringify({
        func,
        ...data
      })
    }
  );

  return await res.json();
}

// LOAD DATA TRANSAKSI
async function loadTransactions() {

  const tbody =
    document.getElementById(
      "tbodyTransaksi"
    );

  if (!tbody) return;

  try {

    const r =
      await gas(
        "getAllTransactions"
      );

    console.log(r);

    if (!r.success) return;

    tbody.innerHTML = "";

    r.data
      .reverse()
      .forEach(item => {

        tbody.innerHTML += `
          <tr class="border-t">

            <td class="p-3 font-semibold">
              ${item.kode}
            </td>

            <td class="p-3">
              ${item.nama}
            </td>

            <td class="p-3">
              <span class="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs">
                ${item.status}
              </span>
            </td>

            <td class="p-3">
              Rp ${Number(item.total).toLocaleString("id-ID")}
            </td>

            <td class="p-3 flex gap-2">
              <button class="bg-gray-200 px-2 py-1 rounded">
                🖨
              </button>

              <button class="bg-blue-200 px-2 py-1 rounded">
                ✏
              </button>

              <button class="bg-red-200 px-2 py-1 rounded">
                🗑
              </button>
            </td>

          </tr>
        `;

      });

  } catch(err) {

    console.error(err);

  }

}

// JALANKAN OTOMATIS
document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadTransactions();

  }
);
