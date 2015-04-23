var geocoder;
var map;
var markersArray = [];
var bounds;
var infowindow =  new google.maps.InfoWindow({
    content: ''
});

function initialize() {
    geocoder = new google.maps.Geocoder();
    bounds = new google.maps.LatLngBounds ();

    var mapOptions = {
        zoom: 2, 
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        }
    };
    map = new google.maps.Map(document.getElementById("map2"), mapOptions);
    plotMarkers();
}

var locationsArray = [
    ['ItalCol Albania</br>+355 (0) 4830 2555/2</br>Tirana, Albania','Ahmetaq, Tirana Albania'],
];

function plotMarkers(){
    var i;
    for(i = 0; i < locationsArray.length; i++){
        codeAddresses(locationsArray[i]);
    }
}

function codeAddresses(address){
    geocoder.geocode( { 'address': address[1]}, function(results, status) { 
        if (status == google.maps.GeocoderStatus.OK) {
            marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(address[0]);
                infowindow.open(map, this);
            });

            bounds.extend(results[0].geometry.location);

            markersArray.push(marker); 
        }
        else{
            alert("Geocode was not successful for the following reason: " + status);
        }

        map.fitBounds(bounds);
        map.setZoom(15);
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
