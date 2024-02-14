
// Check for existing token on app initialization
// const token = getCookie('authToken');
// if (token) {
//   // User is authenticated, perform auto-login
//   // Make a request to validate the token and log the user in
// } else {
//   // User is not authenticated, redirect to login page
// }

function setCookie(key,value,expirydate){
    document.cookie = key +"="+ value + '; expires=' + expirydate.toUTCString() + '; path=/';
}

// Helper function to get cookie value by name
function getCookie(name) {
  const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}

module.exports = {setCookie,getCookie}
