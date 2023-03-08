
"use strict"
const appContainer = document.querySelector(".app-container")
const searchBtn = document.getElementById("search-btn")
const displayContainer = document.querySelector(".display-container")
let currentAdress = document.getElementById("current-ip")
let currentLocation = document.getElementById("current-town")
let currentZone = document.getElementById("current-zone")
let currentIsp = document.getElementById("current-isp")
const inputIp = document.getElementById("ip-adress")


//ipurl details
const ipUrl = 'https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=at_VZAf27J07ijq1T2TCq4Tq7AYsV3mN'//&ipAddress='


//add mapleaflet

var map = L.map('map').setView([0, 0], 1);
L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=DpJuA1RpUtMFW8a2tTPo', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);
//function set marker



function getipinfo(default_ip){
    if(default_ip == undefined){
        var ip_url = `${ipUrl}`;
    }else{
        var ip_url = `${ipUrl}&ipAddress=${default_ip}`;
    }
    fetch(ip_url)
    .then(response => response.json())
    .then(data => {
        console.log("success :", data)
        currentAdress.innerHTML = data.ip
        currentLocation.innerHTML = data.location.city
        currentZone.innerHTML = data.location.timezone
        currentIsp.innerHTML = data.isp
        L.marker([data.location.lat, data.location.lng]).addTo(map)
    })
    .catch(error => alert("oops! Something went wrong"))

}

getipinfo()

searchBtn.addEventListener("click", e =>{
    e.preventDefault()
    if(inputIp.value != "" && inputIp.value != null){
        getipinfo(inputIp.value)
        return
    }
    alert("enter a valid IP adress")
})
