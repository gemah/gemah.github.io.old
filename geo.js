var mine = [-19.8634777, -44.001888199999996];
var markerH;

function init(){
	
	var mapProp = {
		center: new google.maps.LatLng(mine[0], mine[1]), 
		zoom: 14, 
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map =  new google.maps.Map(document.getElementById('mapa'), mapProp);
	
	markerH = new google.maps.Marker({
		position: new google.maps.LatLng(mine[0], mine[1]),
		map: map,
		title: "Texto"
	});
	
}

window.onload = google.maps.event.addDomListener(window, 'load', init);