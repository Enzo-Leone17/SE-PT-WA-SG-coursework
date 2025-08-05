//variables -> token
let accessToken = null;
let refreshToken = localStorage.getItem("refreshToken");
//-> DOM element
const resultOutput = document.getElementById("output");
//API
const API_BASE_URL = "http://localhost:8000";

//#region login
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  accessToken = data.accessToken;
  refreshToken = data.refreshToken;
  localStorage.setItem("refreshToken", refreshToken);
  resultOutput.textContent = `Logged in as: ${data.user.username}`;
});
//#endregion

//#region refresh
async function refreshAccessToken() {
  const res = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    resultOutput.textContent =
      "Session expired. Please log in again.";
    throw new Error("Token expired");
  }

  const data = await res.json();
  accessToken = data.accessToken;
}
//#endregion

//#region API call with Auth enabled
async function fetchWithAuth(url, options = {}) {
  if (!accessToken) await refreshAccessToken();

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    await refreshAccessToken();
    return fetchWithAuth(url, options); // Retry after refreshing
  }

  return res;
}
//#endregion


//#region get appointments
async function getAppointments() {
  try {
    const res = await fetchWithAuth(
      `${API_BASE_URL}/api/clinic/patients/1/appointments`
    );
    const data = await res.json();
    resultOutput.textContent = JSON.stringify(
      data,
      null,
      2
    );
  } catch (err) {
    resultOutput.textContent = `Error: ${err.message}`;
  }
}
//#endregion

//#region get all services in specific appointment
async function getServicesByAppointmentID() {
  try {
    let id = document.getElementById("servicesByAppointID").value;
    if(!id || isNaN(id) || id.includes(".") || id < 0) throw new Error("Valid appointment ID is required");
    const res = await fetchWithAuth(
      `${API_BASE_URL}/api/clinic/appointments/${id}/services`
    );
    const data = await res.json();
    resultOutput.textContent = JSON.stringify(
      data,
      null,
      2
    );
  } catch (err) {
    resultOutput.textContent = `Error: ${err.message}`;
  }
}
//#endregion

//#region get invoice for specific appointment
async function getInvoiceByAppointmentID() {
  try {
    let id = document.getElementById("invoiceByAppointID").value;
    if(!id || isNaN(id) || id.includes(".") || id < 0) throw new Error("Valid appointment ID is required");
    const res = await fetchWithAuth(
      `${API_BASE_URL}/api/clinic/appointments/${id}/invoice`
    );
    const data = await res.json();
    resultOutput.textContent = JSON.stringify(
      data,
      null,
      2
    );
  } catch (err) {
    resultOutput.textContent = `Error: ${err.message}`;
  }
}
//#endregion

//#region auto refresh token every 2.5 minutes
setInterval(() => {
  if (refreshToken) refreshAccessToken();
}, 2.5 * 60 * 1000);
//#endregion