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
