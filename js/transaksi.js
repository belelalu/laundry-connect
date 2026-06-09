async function loadTransactions() {
  const tbody = document.getElementById("tbodyTransaksi");
  if (!tbody) return;

  const r = await gas("getAllTransactions");

  if (!r || !r.success) return;

  tbody.innerHTML = "";

  r.data.reverse().forEach((item) => {
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
      </tr>
    `;
  });
}

// tombol + cucian baru (modal sudah di index.html)
function openCucian() {
  document.getElementById("modalCucian").classList.remove("hidden");
}

function closeCucian() {
  document.getElementById("modalCucian").classList.add("hidden");
}

// simpan cucian dari modal dashboard
async function saveCucian() {
  const r = await gas("addTransaction", {
    nama: nama_cucian.value,
    no_wa: hp_cucian.value,
    berat: berat_cucian.value,
    harga: harga_cucian.value
  });

  alert("Cucian berhasil ditambahkan");

  closeCucian();
  loadDashboard();
}
