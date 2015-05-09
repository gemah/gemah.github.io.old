var homePos = new google.maps.LatLng(-19.862873, -44.00211);
var map, renderer, visitorPos, servicer = new google.maps.DirectionsService();

function init(){

	var mapOptions = {
    	draggable: true,
    	zoom: 15,
    	center: homePos
  	};

	map = new google.maps.Map(document.getElementById('mapa'), mapOptions);

  	/* Geolocalização */

  	if(navigator.geolocation){
  		navigator.geolocation.getCurrentPosition(function(position){
  			visitorPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  			var info = new google.maps.InfoWindow({
  				map: map, position: visitorPos, content: 'Sua localização'
  			});
  			map.setCenter(visitorPos);
  		}, function(){handleNoGeoLocation(true);});
  	} else {
  		handleNoGeoLocation(false);
  	}

  	/* Desenhador de rota */

  	renderer = new google.maps.DirectionsRenderer();
  	renderer.setMap(map);

}

function handleNoGeoLocation(errorFlag){

	var content, options, info;

	if(errorFlag){
		content = 'Erro: Serviço de Geolocalização falhou.';
	} else {
		content = 'Erro: Seu navegador não suporta Geolocalização!'
	}

	options = {map: map, position: homePos, content: content};

	info = new google.maps.InfoWindow(options);
	map.setCenter(info.position);

}

function calcRoute(){

	var start, end, req;

	start = visitorPos;
	end = homePos;
	req = {origin: start, desination:end, travelMode: google.maps.TravelMode.DRIVING};

	directionsService.route(req, function(){
		if(status == google.maps.DirectionStatus.OK){
			renderer.setDirections(response);
		}
	});

}

google.maps.event.addDomListener(window, 'load', init);