window.showApp = function () {
  document.getElementById("loginView").classList.add("hidden");
  document.getElementById("appView").classList.remove("hidden");

  loadDashboard();
  loadCustomers();
};
