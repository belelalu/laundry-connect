async function loadTransactions() {
  const tbody = document.getElementById("tbodyTransaksi");
  if (!tbody) return;

  try {
    const r = await gas("getAllTransactions");

    console.log("DEBUG TRANSAKSI:", r);

    if (!r || !r.success || !Array.isArray(r.data)) {
      tbody.innerHTML = "<tr><td colspan='4'>Data kosong</td></tr>";
      return;
    }

    tbody.innerHTML = "";

    r.data
      .slice() // copy array biar aman
      .reverse()
      .forEach(item => {

        tbody.innerHTML += `
          <tr>
            <td>${item.kode}</td>
            <td>${item.nama}</td>
            <td>${item.status}</td>
            <td>Rp ${Number(item.total).toLocaleString("id-ID")}</td>
          </tr>
        `;
      });

  } catch (err) {
    console.error("LOAD TRANSAKSI ERROR:", err);
  }
}

