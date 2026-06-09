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
  return `<h1 style="color:red">FORM BARU SUDAH DIPAKAI</h1>`;
}

// function renderFormCucian() {
//   console.log("🔥 FORM BARU DIPAKAI");

//   return `
//     <div style="border:2px solid red; padding:10px; margin:10px;">
//       FORM BARU AKTIF
//     </div>

//     <form id="formCucian">
//       <input id="nama" placeholder="Nama">
//       <select id="jenis">
//         <option>Reguler</option>
//         <option>Express</option>
//       </select>
//       <input id="berat" type="number">
//       <textarea id="catatan"></textarea>

//       <button type="submit">Simpan</button>
//     </form>
//   `;
// }

function renderDashboard() {
  document.getElementById("app").innerHTML = `
    <h3>Dashboard</h3>
    ${renderFormCucian()}
  `;

  initFormCucian();
}

function renderDataCucian() {
  document.getElementById("pageTransaksi").classList.remove("hidden");
  document.getElementById("pageDashboard").classList.add("hidden");

  document.getElementById("transaksiContainer").innerHTML =
    renderFormCucian();

  initFormCucian();
}

  initFormCucian();
}

function initFormCucian() {
  const form = document.getElementById("formCucian");

  if (!form) return;

  // HAPUS listener lama dulu (anti double trigger)
  form.onsubmit = function (e) {
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
  };
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
