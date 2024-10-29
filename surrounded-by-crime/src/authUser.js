async function getUserData() {
    if (localStorage.getItem('jwt-token') !== null) {
      const token = localStorage.getItem('jwt-token');
      let response = await fetch("http://localhost:5050/crime/auth-user", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              'jwt-token': token
          }
      })
      response = response.json();
      return response;
    } else {
      return;
    }
}

export default getUserData;