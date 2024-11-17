async function getUserLatLong() {
    const apiUrl = "https://api.ipgeolocation.io/ipgeo";
    const API_KEY = "71d4bae10351465887eba1f166f1db9c";
    let userIp = "";
    let userCoords = {
        latitude: "",
        longitude: ""
    }

    await fetch("https://api.ipify.org?format=json", {mode: 'cors', method: "GET"})
        .then(response => response.json())
        .then(data => {
            userIp = data.ip;
        })
        .catch(error => {
            console.error("Error fetching IP address:", error);
        });

    await fetch(`${apiUrl}?apiKey=${API_KEY}&ip=${userIp}`, {mode: 'cors', method: "GET"})
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            userCoords.latitude = data.latitude;
            userCoords.longitude = data.longitude;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    
    return userCoords;
}

// NY_COORDS = {lat: "40.7128", long: "-74.0060"};
// const test = getUserLatLong();
// test.then(function(result) {
//     let coords = {};
//     coords.lat = result.lat;
//     coords.long = result.long;
//     console.log(calculateDistance(coords, NY_COORDS));
// })

export default getUserLatLong;