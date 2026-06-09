async function gas(func, data = {}) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      func,
      ...data
    })
  });

  return await res.json();
}
