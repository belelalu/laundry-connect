window.loadDashboard = async function () {
  const r = await gas("getDashboard");

  if (!r || !r.data) return;

  let masuk = 0;
  let proses = 0;
  let selesai = 0;

  let html = "";

  r.data.latest.forEach((t) => {
    if (t.status === "Masuk") masuk++;
    if (t.status === "Proses") proses++;
    if (t.status === "Selesai") selesai++;

    if (t.status === "Selesai") {
      html += `
        <div class="flex justify-between border-b py-2">
          <div>
            <p class="font-bold">${t.kode}</p>
            <p class="text-xs text-gray-500">${t.nama}</p>
          </div>
          <div class="text-right">
            <p class="text-green-600 font-semibold">${t.status}</p>
            <p class="font-bold">Rp ${t.total}</p>
          </div>
        </div>
      `;
    }
  });

  const el = document.getElementById("dashboardContent");

  if (!el) return;

  el.innerHTML = `
    <div class="grid grid-cols-3 gap-4 mb-4">
      <div class="bg-white p-4 rounded-xl shadow">
        <p class="text-gray-500">Masuk</p>
        <p class="text-2xl font-bold">${masuk}</p>
      </div>

      <div class="bg-white p-4 rounded-xl shadow">
        <p class="text-gray-500">Proses</p>
        <p class="text-2xl font-bold">${proses}</p>
      </div>

      <div class="bg-white p-4 rounded-xl shadow">
        <p class="text-gray-500">Selesai</p>
        <p class="text-2xl font-bold">${selesai}</p>
      </div>
    </div>

    <div class="bg-white p-4 rounded-xl shadow">
      <h3 class="font-bold mb-2">Cucian Selesai Terbaru</h3>
      ${html || "<p class='text-gray-500'>Belum ada data</p>"}
    </div>
  `;
};
