window.showApp = function () {
  document.getElementById("loginView").classList.add("hidden");
  document.getElementById("appView").classList.remove("hidden");

  loadDashboard();
  loadCustomers();
  loadTransactions();
};

window.doLogin = async function () {
  const r = await gas("login", {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  });

  if (r.success) {
    localStorage.setItem("u", JSON.stringify(r.data));
    showApp();
  } else {
    alert("Email / Password salah");
  }
};

window.logout = function () {
  localStorage.clear();
  location.reload();
};
