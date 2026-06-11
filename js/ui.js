window.showApp = function () {

  document
    .getElementById("loginView")
    .classList.add("hidden");

  document
    .getElementById("appView")
    .classList.remove("hidden");

  loadUserInfo();

  showPage("dashboard");

};

window.showPage = function (page) {
  
  const pages = [
    "pageDashboard",
    "pageTransaksi",
    "pagePelanggan",
    "pageKeuangan",
    "pagePengaturan"
  ];

  pages.forEach(id => {

    const el = document.getElementById(id);

    if (el) {
      el.classList.add("hidden");
    }

  });

  switch (page) {

    case "dashboard":

      document
        .getElementById("pageDashboard")
        .classList.remove("hidden");

      loadDashboard();

      break;

    case "transaksi":

      document
        .getElementById("pageTransaksi")
        .classList.remove("hidden");

      if (typeof loadTransactions === "function") {
        loadTransactions();
      }

      break;

    case "pelanggan":
      document
        .getElementById("pagePelanggan")
        .classList.remove("hidden");
      
      if (typeof loadCustomers === "function") {
        loadCustomers();
      }
      
      break;

    case "keuangan":

      const keuangan =
        document.getElementById("pageKeuangan");

      if (keuangan)
        keuangan.classList.remove("hidden");

      break;

    case "pengaturan":

      const pengaturan =
        document.getElementById("pagePengaturan");

      if (pengaturan)
        pengaturan.classList.remove("hidden");

      break;
  }

};

window.loadUserInfo = function () {

  const raw =
    localStorage.getItem("u");

  if (!raw) return;

  const user =
    JSON.parse(raw);

  const nama =
    user.nama ||
    user.name ||
    user.username ||
    "Administrator";

  const role =
    user.role ||
    user.level ||
    "Administrator";

  const inisial =
    nama
      .split(" ")
      .map(x => x[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  const avatar =
    document.getElementById("userAvatar");

  const userName =
    document.getElementById("sidebarUserName");

  const userRole =
    document.getElementById("sidebarUserRole");

  if (avatar)
    avatar.innerText = inisial;

  if (userName)
    userName.innerText = nama;

  if (userRole)
    userRole.innerText = role;

};

window.logout = function () {

  localStorage.removeItem("u");

  location.reload();

};

window.toggleSidebar = function(force) {

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (!sidebar) return;

  const mobile = window.innerWidth < 1024;

  let open =
    !sidebar.classList.contains("-translate-x-full");

  if (typeof force === "boolean") {
    open = force;
  }

  if (mobile) {

    if (open) {
      sidebar.classList.add("-translate-x-full");
      overlay.classList.add("hidden");
    } else {
      sidebar.classList.remove("-translate-x-full");
      overlay.classList.remove("hidden");
    }

  } else {

    // mode desktop (collapse)
    if (open) {
      sidebar.style.width = "0px";
      sidebar.style.overflow = "hidden";
    } else {
      sidebar.style.width = "16rem";
      sidebar.style.overflow = "";
    }

  }

};
