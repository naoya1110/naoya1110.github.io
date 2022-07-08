var count = 0

function getGeoLocation(){
    //navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    navigator.geolocation.watchPosition(geoSuccess, geoError, {"enableHighAccuracy": true, "timeout": 20000, "maximumAge": 2000});
}


function geoSuccess(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const heading = Math.floor(position.coords.heading);
    const speed = Math.floor(position.coords.speed);
    const accuracy = Math.floor(position.coords.accuracy);
    console.log("lat", lat)
    console.log("lng", lng)
    document.getElementById("lat").innerHTML = "lat: " + lat;
    document.getElementById("lng").innerHTML = "lng: " + lng;
    document.getElementById("heading").innerHTML = "heading: " + heading;
    document.getElementById("speed").innerHTML = "speed: " + speed;
    document.getElementById("accuracy").innerHTML = "accuracy: "+accuracy;
    url = "https://www.google.com/maps?q="+lat+"+"+lng;
    var maplink = document.getElementById("maplink");
    maplink.href = url;
    count += 1;
    document.getElementById("count").innerHTML = "count: " + count;

}

function geoError(){
    alert("Geolocation Error")
}

getGeoLocation()
// setInterval('getGeoLocation()',1000);