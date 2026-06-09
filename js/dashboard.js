window.loadDashboard = async function () {
  const incomeEl = document.getElementById("income");
  const masukEl = document.getElementById("masuk");
  const prosesEl = document.getElementById("proses");
  const selesaiEl = document.getElementById("selesai");
  const listEl = document.getElementById("list");

  // 🔥 STOP kalau bukan halaman dashboard
  if (!incomeEl || !masukEl || !prosesEl || !selesaiEl || !listEl) {
    return;
  }

  const r = await gas("getDashboard");

  if (!r || !r.data) return;

  incomeEl.innerText = "Rp " + r.data.summary.income;

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

  masukEl.innerText = masuk;
  prosesEl.innerText = proses;
  selesaiEl.innerText = selesai;

  listEl.innerHTML = html || "Belum ada data selesai";
};
