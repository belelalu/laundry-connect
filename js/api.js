const API_URL =
  "https://script.google.com/macros/s/AKfycbxZVQxpqUvh-T7yBjhwH1XATE50c67hOaU9StNZBvMvUfd4kK-MAVSbNa1CY65PS8Q/exec";

async function gas(f, d = {}) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({ func: f, ...d })
  });

  return await res.json();
}
