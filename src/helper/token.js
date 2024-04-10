const addToken = (token) => {
  const now = new Date();
  const expiration = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 days expiration
  localStorage.setItem(
    "token",
    JSON.stringify({ value: token, expires: expiration.getTime() })
  );
};

const getToken = () => {
  const tokenData = JSON.parse(localStorage.getItem("token"));
  if (tokenData && new Date(tokenData.expires) > new Date()) {
    return tokenData.value;
  } else {
    removeToken(); // Token expired, remove it
    return null;
  }
};

const removeToken = () => {
  localStorage.removeItem("token");
};

module.exports = { addToken, getToken, removeToken };
