async function addPreferences(preferences, userCoords) {
    if (localStorage.getItem('jwt-token') !== null) {
      preferences.location = userCoords;
      const token = localStorage.getItem('jwt-token');
      try {
        await fetch("http://localhost:5050/crime/add-preferences", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'jwt-token': token
            },
            body: JSON.stringify(preferences)
        })
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem('jwt-token', data.newToken);
        });
      } catch(err) {
        console.log(err);
      }
  }
}
  export default addPreferences;