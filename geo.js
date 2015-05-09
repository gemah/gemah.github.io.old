var map;
var homePos = new google.maps.LatLng(-19.862532, -44.001766), visitorPos;
var directionsDisplay, directionsService = new google.maps.DirectionsService();

function initialize() {
	
	directionsDisplay = new google.maps.DirectionsRenderer();

  var mapOptions = {
  	draggable: true,
    zoom: 15,
    center: homePos
  };
  map = new google.maps.Map(document.getElementById('mapa'), mapOptions);
  
  /* GEOLOCATOR */
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      visitorPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: visitorPos,
        content: 'Sua localização.'
      });

      map.setCenter(visitorPos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
  
  /* ROUTING */
  var req = {origin: visitorPos, destination: homePos, travelMode: google.maps.TravelMode.DRIVING};
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
    } else {
      alert("couldn't get directions:" + status);
    }
  });
  
}

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Serviço de Geolocalização falhou.';
  } else {
    var content = 'Seu navegador não suporta geolocalização.';
  }

  var options = {
    map: map,
    position: homePos,
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);