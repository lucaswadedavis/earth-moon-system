$(document).ready(function(){

/////////////////////////////////////

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(100, window.innerWidth/window.innerHeight, 0.1, 1000);
	camera.position.z = 66;

	var renderer = new THREE.CanvasRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

//////////////////////////////////////

	var Body=function(b){
		var width=b.width || 1;
		var color = b.color || davis.randomColor();

		var geometry=new THREE.IcosahedronGeometry(width,2);
		var material=new THREE.MeshBasicMaterial({color:color});
		var body=new THREE.Mesh(geometry,material);
		body.position.x=b.x || 0;
		body.position.z=b.z || 0;
		body.position.y=b.y || 0;
		body.theta=b.theta || 0;
		body.thetaStep=b.thetaStep || 0.000;
		body.orbitalRadius=b.orbitalRadius || 0;
		body.orbit=function(){
			body.theta+=body.thetaStep;
			body.position.x=body.orbitalRadius*Math.sin(body.theta);
			body.position.z=body.orbitalRadius*Math.cos(body.theta);
		};

		return body;
	};
	
/////////////////////////////////////

	var earth=Body({
		color:"#9bf"
	});
	scene.add(earth);

	var moon=Body({
		width:0.27287,
		color:"#fff",
		thetaStep:0.004,
		orbitalRadius:59.45
	});
	scene.add(moon);

////////////////////////////////////////

	var render = function () {
		requestAnimationFrame(render);
		moon.orbit();
		earth.orbit();
		renderer.render(scene, camera);
	};

	render();

///////////////////////////////////////////

	davis.style("body",{
		"background":"#111",
		"padding":"0px",
		"margin":"0px"
	});
});