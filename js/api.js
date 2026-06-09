const API_URL =
  "https://script.google.com/macros/s/AKfycbxZVQxpqUvh-T7yBjhwH1XATE50c67hOaU9StNZBvMvUfd4kK-MAVSbNa1CY65PS8Q/exec";

async function gas(func, data = {}) {
  const params = new URLSearchParams({
    func,
    ...data
  });

  const res = await fetch(API_URL + "?" + params.toString());

  return await res.json();
}
