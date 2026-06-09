const API_URL =
  "https://script.google.com/macros/s/AKfycbxZVQxpqUvh-T7yBjhwH1XATE50c67hOaU9StNZBvMvUfd4kK-MAVSbNa1CY65PS8Q/exec";

async function gas(f, d = {}) {
  const res = await fetch(API_URL, {   // ✅ FIX DI SINI
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({ func: f, ...d })
  });

  return await res.json();
}

window.showApp = function () {
  const loginView = document.getElementById("loginView");
  const appView = document.getElementById("appView");

  if (!loginView || !appView) return;

  loginView.classList.add("hidden");
  appView.classList.remove("hidden");

  if (typeof loadDashboard === "function") {
    loadDashboard();
  }

  if (typeof loadCustomers === "function") {
    loadCustomers();
  }
};
  loadDashboard();
  loadCustomers();
};
