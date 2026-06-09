let customers = [];

window.gas = async function loadCustomers() {
  const r = await gas("getCustomers");

  customers = r.data || [];

  const select = document.getElementById("customerSelect");

  if (select) {
    select.innerHTML =
      `<option value="">Pilih Pelanggan</option>` +
      customers.map(c =>
        `<option value="${c.id}">${c.nama} (${c.no_wa})</option>`
      ).join("");
  }
}

function searchCustomer(keyword) {
  const box = document.getElementById("suggestBox");
  if (!keyword) return box.classList.add("hidden");

  const result = customers.filter(c =>
    c.nama.toLowerCase().includes(keyword.toLowerCase())
  );

  if (!result.length) {
    box.innerHTML = `<div class="p-2 text-gray-400">Tidak ditemukan</div>`;
    box.classList.remove("hidden");
    return;
  }

  box.innerHTML = result.map(c => `
    <div class="p-2 hover:bg-gray-100 cursor-pointer"
      onclick="selectCustomer('${c.id}')">
      <div class="font-semibold">${c.nama}</div>
      <div class="text-xs text-gray-500">${c.no_wa}</div>
    </div>
  `).join("");

  box.classList.remove("hidden");
}

function selectCustomer(id) {
  const c = customers.find(x => x.id == id);
  if (!c) return;

  nama_cucian.value = c.nama;
  hp_cucian.value = c.no_wa;

  document.getElementById("suggestBox").classList.add("hidden");
}
