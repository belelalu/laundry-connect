window.loadDashboard = async function () {

  const r = await gas("getDashboard");

  if (!r || !r.data) return;

  let masuk = 0;
  let proses = 0;
  let selesai = 0;
  let pendapatan = 0;

  let selesaiHtml = "";

  r.data.latest.forEach((t) => {

    if (t.status === "Masuk") masuk++;

    if (t.status === "Proses") proses++;

    if (t.status === "Selesai") {
      selesai++;

      pendapatan += Number(t.total || 0);

      selesaiHtml += `
        <div class="flex justify-between items-center border-b py-3">

          <div>
            <div class="font-semibold">
              ${t.nama}
            </div>

            <div class="text-sm text-gray-500">
              ${t.kode}
            </div>
          </div>

          <div class="text-right">
            <div class="font-bold">
              Rp ${Number(t.total || 0).toLocaleString("id-ID")}
            </div>

            <div class="text-green-600 text-sm">
              ${t.status}
            </div>
          </div>

        </div>
      `;
    }

  });

  // CARD STATISTIK

  document.getElementById("statMasuk").innerText =
    masuk;

  document.getElementById("statProses").innerText =
    proses;

  document.getElementById("statSelesai").innerText =
    selesai;

  document.getElementById("statPendapatan").innerText =
    "Rp " + pendapatan.toLocaleString("id-ID");

  // CUCIAN SELESAI

  document.getElementById("recentFinished").innerHTML =
    selesaiHtml || `
      <div class="text-gray-500">
        Belum ada data selesai
      </div>
    `;

  // CHART

  // renderIncomeChart();

};

function renderIncomeChart() {

  const canvas = document.getElementById("incomeChart");

  if (!canvas) return;

  if (window.dashboardChart) {
    window.dashboardChart.destroy();
  }

  window.dashboardChart = new Chart(canvas, {

    type: "line",

    data: {

      labels: [
        "Min",
        "Sen",
        "Sel",
        "Rab",
        "Kam",
        "Jum",
        "Sab"
      ],

      datasets: [
        {
          label: "Pendapatan",

          data: [
            120000,
            80000,
            150000,
            110000,
            200000,
            160000,
            220000
          ],

          borderColor: "#0f766e",

          backgroundColor: "rgba(15,118,110,0.1)",

          fill: true,

          tension: 0.4
        }
      ]
    },

    options: {

      responsive: true,

      plugins: {
        legend: {
          display: false
        }
      }

    }

  });

}
