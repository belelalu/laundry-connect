let customers = [];

window.loadCustomers = async function loadCustomers() {

  const r = await gas("getCustomers");

  customers = r.data || [];

  // =====================
  // DROPDOWN CUCIAN
  // =====================

  const select =
    document.getElementById("customerSelect");

  if (select) {

    select.innerHTML =
      `<option value="">Pilih Pelanggan</option>` +
      customers.map(c =>
        `<option value="${c.id}">
          ${c.nama} (${c.no_wa})
        </option>`
      ).join("");
  }

  // =====================
  // TABEL PELANGGAN
  // =====================

  const tbody =
    document.getElementById("tbodyCustomer");

  if (tbody) {
    
    tbody.innerHTML = customers.map(c => `
    
    <tr class="border-b hover:bg-gray-50">
    
    <td class="p-4 font-medium">
    ${c.nama}
    </td>
    
    <td class="p-4">
    ${c.no_wa || "-"}
    </td>
    
    <td class="p-4">
    ${c.alamat || "-"}
    </td>
    
    <td class="p-4">
    ${c.created_at || "-"}
    </td>
    
    <td class="p-4">
    <button
    onclick="detailCustomer('${c.id}')"
    class="text-blue-600 mr-3">
    Detail
    </button>
    
    </td>
    
    </tr>
    
    `).join("");

  }

};
