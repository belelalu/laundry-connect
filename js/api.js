const API_URL =
  "https://script.google.com/macros/s/AKfycbxZVQxpqUvh-T7yBjhwH1XATE50c67hOaU9StNZBvMvUfd4kK-MAVSbNa1CY65PS8Q/exec";

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
