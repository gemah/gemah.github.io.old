var mine = [-19.8634777, -44.001888199999996];
var map;
var posM, posV, pos = null;
var dd, ds;

function calcRoute(){
	
	var begin = pos;
	var end = posM;
	
	var req = {
		origin: begin, destination: end,
		travelMode: google.maps.TravelMode.DRIVING
	};
	
	ds.route(req, function(response, status){
		if(status == google.maps.DirectionsStatus.OK){
			dd.setDirections(response);
		}
	});
	
}

function init(){
	
	posM = new google.maps.LatLng(mine[0], mine[1]);
	ds = new google.maps.DirectionsService();
	
	var options = {
		draggable: true,
		zoom: 15,
		center: posM
	};
	
	map = new google.maps.Map(document.getElementById('mapa'), options);
	
	var watch = navigator.geolocation.watchPosition(function(position){
		
		navigator.geolocation.clearWatch(watch);
		
		posV = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		map.setCenter(posV);
		pos = posV;
		
		calcRoute();
		
	});
	
	dd = new google.maps.DirectionsRenderer();
	dd.setMap(map);
	
	
}

google.maps.event.addDomListener(window, 'load', init);