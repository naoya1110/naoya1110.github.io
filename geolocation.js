navigator.geolocation.getCurrentPosition(geoSuccess, geoError);

function geoSuccess(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const accuracy = Math.floor(position.coords.accuracy);
    console.log("lat", lat)
    console.log("lng", lng)
}

function geoError(){
    alert("Geolocation Error")
}

