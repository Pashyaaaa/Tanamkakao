// ─── TanamKakao Auth Utility ───────────────────────────────────────────────
const AUTH_KEY = "tanamkakao_users";
const SESSION_KEY = "tanamkakao_session";

function getUsers() {
  return JSON.parse(localStorage.getItem(AUTH_KEY) || "[]");
}

function saveUsers(users) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(users));
}

function setSession(user) {
  const session = {
    name: user.name,
    email: user.email,
    loggedInAt: Date.now(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function getSession() {
  return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

function isLoggedIn() {
  return getSession() !== null;
}

function register(name, email, password) {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    return { success: false, message: "Email sudah terdaftar." };
  }
  users.push({ name, email, password });
  saveUsers(users);
  return { success: true };
}

function login(email, password) {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return { success: false, message: "Email atau password salah." };
  }
  setSession(user);
  return { success: true, user };
}

function logout() {
  clearSession();
  window.location.href = "../index.html";
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = "../auth/login.html?reason=auth";
  }
}

function redirectIfLoggedIn() {
  if (isLoggedIn()) {
    window.location.href = "../Dashboard/index.html";
  }
}
