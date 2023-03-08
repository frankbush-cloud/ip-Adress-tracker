 const secretApi = "ENTER YOUR API";
 const bypassCorsUrl = "https://cors-anywhere.herokuapp.com/";
 const apiUrl = "https://leafletjs.com/";
 let currentVersion = "V1";

//  form elements
 const eneterdIp = document.querySelector(".input-bar");
 const searchBtn = document.querySelector(".icon-arrow");

 //elemts to update
 let currentIp = document.getElementById("ipadress");
 let currentTown = document.getElementById("location");
 let currentZone = document.getElementById("time-zone");
 let currentIsp = document.getElementById("isp");

 const headersOption ={
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
 }

 const map = L.map('map', {
    "center": [0, 0],
    "zoom": 0,
    "layers": [
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    ]
 });
  
 //update the location icon according to the lattitude and the longitude of the geo-point
function updateMarker(update_marker = [42, 42]){
    map.setView(update_marker, 13)
    L.marker(update_marker).addTo(map)
}


//function get ip details
getIpDetails = (default_ip) =>{
    if(default_ip == undefined){
        var apiUrl = `${bypassCorsUrl}${apiUrl}${currentVersion}?apiKey=${secretApi}`
    }else{
        var apiUrl = `${bypassCorsUrl}${apiUrl}${currentVersion}?apiKey=${secretApi}&ipAdress=${default_ip}`
    }

    fetch(apiUrl, headersOption)
    .then(results => results.json())
    .then(data =>{
        currentIp.innerText = data.ip
        currentTown.innerText = data.location.city + "" + data.location.country
        currentZone.innerText = data.location.timezone
        currentIsp.innerText = data.isp
        updateMarker(data.location.lat, data.location.lng)
    })
    .catch(error =>alert("oops something went wrong"))
}

getIpDetails()

document.addEventListener("load", updateMarker());

searchBtn.addEventListener("click", e =>{
    e.preventDefault()
    if(eneterdIp.value != "" && eneterdIp.value !== null){
        getIpDetails();
    }else{
        alert("please enter a valid Ipaddress")
    }
})

