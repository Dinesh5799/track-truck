var map;
var infowindow;
var geocoder;
var co_Ordinates = {lat: 17.385044, lng: 78.486671};
var reponse_Object = [{"truck_no":"T-A01","coOrdinates":{"lat":"17.385044","lng":"78.486671"}},{"truck_no":"T-B01","coOrdinates":{"lat":"12.971599","lng":"77.594566"}},
{"truck_no":"T-C01","coOrdinates":{"lat":"19.075983","lng":"72.877655"}},{"truck_no":"T-D01","coOrdinates":{"lat":"28.704060","lng":"77.102493"}}];
window.onscroll = function() {
    console.log("Top2: "+document.documentElement.scrollTop);
    if(document.documentElement.scrollTop >= 500){
        document.getElementById('toTop').style.visibility = 'visible';
    }
    else{
        document.getElementById('toTop').style.visibility = 'hidden';
    }
};
function startTracking(){    
    var searchText = document.getElementById("fetch-truck").value;
    console.log("Start Searching with truck no: "+searchText);
    if(searchText !== undefined && searchText !== "" && searchText.length >= 1 && searchText !== null){
        co_Ordinates = "";
        var found = false;
        console.log("reponse_Object: "+JSON.stringify(reponse_Object));
        for(var i=0;i<reponse_Object.length;i++){
            console.log("reponse_Object[i].truck_no: "+reponse_Object[i].truck_no);
            if(reponse_Object[i].truck_no === searchText){
                co_Ordinates = reponse_Object[i].coOrdinates;
                found = true;
            }
        }
        if(found){
            geocodeLatLng(geocoder, map, infowindow);           
        }
        else{
            alert("The details of truck no you are searching for are not available.");
        }
    }
    else{
        alert("Please enter valid truck no.");
    }
}
function initMap() {
    var pyrmont = co_Ordinates;    
    map = new google.maps.Map(document.getElementById('show-map'), {
        center: pyrmont,
        zoom: 15
    });
    geocoder = new google.maps.Geocoder;
    infowindow = new google.maps.InfoWindow();
    geocodeLatLng(geocoder, map, infowindow);
}
function geocodeLatLng(geocoder, map, infowindow) {
    var latStr = co_Ordinates.lat;
    var lonStr = co_Ordinates.lng;
    var latlng = {lat: parseFloat(latStr), lng: parseFloat(lonStr)};
    console.log("latlng: "+JSON.stringify(latlng));
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[0].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
}