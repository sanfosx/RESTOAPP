
const API_URL = "/api/proxy";
function postAPI(endpoint, action, data = {}) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ endpoint, action, data })
  }).then(res => res.json());
}
