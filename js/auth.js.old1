window.doLogin = async function () {
  const r = await gas("login", {
    email: email.value,
    password: password.value,
  });

  if (r.success) {
    localStorage.setItem("u", JSON.stringify(r.data));
    showApp();
  } else {
    alert("Email / Password salah");
  }
};
