/* /api/proxy.js */

export default async function handler(req, res) {
  const scriptUrl = "https://script.google.com/macros/s/AKfycbyIg1CJcOv933dY-slRuyTrBlBeQsU33ziKqZSfeOWyW6gnuaabicAdtxezvNeOynRLuA/exec"; // 🔁 Reemplaza con TU URL del Web App Apps Script

  try {
    const fetchOptions = {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (req.method === "POST") {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const response = await fetch(scriptUrl, fetchOptions);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
