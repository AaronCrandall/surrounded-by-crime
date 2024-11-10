function calculateDistance(coordsStart, coordsEnd) {
    function degreesToRadians(deg) {
        return deg * Math.PI / 180;
    }

    const earthRadius = 6371;
    const dLat = degreesToRadians(coordsEnd.lat - coordsStart.lat);
    const dLong = degreesToRadians(coordsEnd.long - coordsStart.long);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degreesToRadians(coordsStart.lat)) * Math.cos(degreesToRadians(coordsEnd.lat))
                * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = (earthRadius * c) * 0.6214;

    return distance;
}

export default calculateDistance;

// NY_COORDS = {lat: "40.7128", long: "-74.0060"};
// const test = getUserLatLong();
// test.then(function(result) {
//     let coords = {};
//     coords.lat = result.lat;
//     coords.long = result.long;
//     console.log(calculateDistance(coords, NY_COORDS));
// })