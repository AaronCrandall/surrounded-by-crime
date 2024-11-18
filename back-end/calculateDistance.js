function calculateDistance(coordsStart, coordsEnd) {
    function degreesToRadians(deg) {
        return deg * Math.PI / 180;
    }

    const earthRadius = 6371;
    const dLat = degreesToRadians(coordsEnd.latitude - coordsStart.latitude);
    const dLong = degreesToRadians(coordsEnd.longitude - coordsStart.longitude);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degreesToRadians(coordsStart.latitude)) * Math.cos(degreesToRadians(coordsEnd.latitude))
                * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = (earthRadius * c) * 0.6214;

    return distance;
}

export default calculateDistance;