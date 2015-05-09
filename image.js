var thumb, win, sourceImg;

function init(){
	thumb = [document.getElementById('t0'), document.getElementById('t1')];
	win = document.getElementById('window');
	sourceImg = ['img/art_00.png', 'img/art_01.png'];
}

function showImg(){
	
	thumb[0].addEventListener('click', function(){
		win.src = sourceImg[0];
	});
	
	thumb[1].addEventListener('click', function(){
		win.src = sourceImg[1];
	});
	
}

window.onload = init();
showImg();