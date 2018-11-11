if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
//var colors = ["#f0f8ff","#faebd7","#00ffff","#7fffd4","#f0ffff","#f5f5dc","#ffe4c4","#000000","#ffebcd","#0000ff","#8a2be2","#a52a2a","#deb887","#5f9ea0","#7fff00","#d2691e","#ff7f50","#6495ed","#fff8dc","#dc143c","#00ffff","#00008b","#008b8b","#b8860b","#a9a9a9","#006400","#a9a9a9","#bdb76b","#8b008b","#556b2f","#ff8c00","#9932cc","#8b0000","#e9967a","#8fbc8f","#483d8b","#2f4f4f","#2f4f4f","#00ced1","#9400d3","#ff1493","#00bfff","#696969","#696969","#1e90ff","#b22222","#fffaf0","#228b22","#ff00ff","#dcdcdc","#f8f8ff","#ffd700","#daa520","#808080","#008000","#adff2f","#808080","#f0fff0","#ff69b4","#cd5c5c","#4b0082","#fffff0","#f0e68c","#e6e6fa","#fff0f5","#7cfc00","#fffacd","#add8e6","#f08080","#e0ffff","#fafad2","#d3d3d3","#90ee90","#d3d3d3","#ffb6c1","#ffa07a","#20b2aa","#87cefa","#778899","#778899","#b0c4de","#ffffe0","#00ff00","#32cd32","#faf0e6","#ff00ff","#800000","#66cdaa","#0000cd","#ba55d3","#9370db","#3cb371","#7b68ee","#00fa9a","#48d1cc","#c71585","#191970","#f5fffa","#ffe4e1","#ffe4b5","#ffdead","#000080","#fdf5e6","#808000","#6b8e23","#ffa500","#ff4500","#da70d6","#eee8aa","#98fb98","#afeeee","#db7093","#ffefd5","#ffdab9","#cd853f","#ffc0cb","#dda0dd","#b0e0e6","#800080","#663399","#ff0000","#bc8f8f","#4169e1","#8b4513","#fa8072","#f4a460","#2e8b57","#fff5ee","#a0522d","#c0c0c0","#87ceeb","#6a5acd","#708090","#708090","#fffafa","#00ff7f","#4682b4","#d2b48c","#008080","#d8bfd8","#ff6347","#40e0d0","#ee82ee","#f5deb3","#ffffff","#f5f5f5","#ffff00","#9acd32"];
var colors = ["#0000ff", "#a52a2a", "#7fff00", "#d2691e", "#00008b", "#9932cc", "#ffd700", "#ff69b4", "#ff1493", "#ffd700", "#00ff00", "#0000cd", "#800000", "#808000", "#000080", "#0000cd", "#ffb6c1", "#ff00ff", "#ffd700", "#f0f8ff","#008b8b","#b8860b","#a9a9a9","#006400","#a9a9a9","#bdb76b","#8b008b","#556b2f","#ff8c00","#9932cc","#8b0000","#e9967a","#8fbc8f","#483d8b","#2f4f4f","#2f4f4f","#00ced1","#9400d3","#ff1493"];

var fonts = ['Abril Fatface','Advent Pro','Arvo','Bahiana','Baloo Da','Bigshot One','Bowlby One','Bungee','Bungee Hairline','Bungee Outline','Bungee Shade','Codystar','Coiny','Creepster','Emblema One','Erica One','Expletus Sans','Fascinate','Finger Paint','Goblin One','Graduate','Iceberg','Impact','Jolly Lodger','Keania One','Kumar One','Kumar One Outline','Krona One','Lalezar','Londrina Solid','Metamorphous','Mogra','Mr Dafoe','Nosifer','Overlock SC','Piedra','Pirata One','Plaster','Rakkas','Raleway','Revalia','Roboto','Ruslan Display','Rye','Sancreek','Sarina','Sedgwick Ave Display','Slackey','Smokum','Sonsie One','Space Mono','Trade Winds','UnifrakturCook','UnifrakturMaguntia','Unlock','Vampiro One','Vibur','Viga','VT323','Wallpoet','Warnes','Wire One','Work Sans'];

var container, stats, controls;
var camera, scene, renderer, light, material,materialCount;
var selectedMaterial = 'ZONE(base)';
var selectedText = "TEXT(team-name)";
var animations = [];

var manager = new THREE.LoadingManager();

var mixers = [];
var object;
var operand1, operand2, operator1, operator2, solution, question, answer;
var textureLoader, map, textureMaterial;
var mesh;
var materials = [];
var geometries = [];

var width = window.innerWidth;
var height = window.innerHeight;
//var width = 480;
//var height = 480;
var pixelRatio = window.devicePixelRatio;
console.log('pixelRatio',pixelRatio);
init();

function init() {

	container = document.createElement( 'div' );
	document.getElementById('container').appendChild( container );

	scene = new THREE.Scene();
	var screen_rate = width / height;

	camera = new THREE.PerspectiveCamera( 30, screen_rate, 1, 1000 );
	camera.position.set( 500, 0, 0 );
	scene.add(camera);
	controls = new THREE.OrbitControls( camera,container );
	controls.update();
	var light, materials;
	//scene.add(new THREE.AmbientLight(0xffffff));
	scene.add(new THREE.AmbientLight(0x666666));
	
	var lights = [
	{color:0xffffff,intensity: 0.63,position:{x: -500, y: 320, z: 500},lookAt: {x: 0, y: 0, z: 0}},
	{color:0xffffff,intensity: 0.63,position:{x: 200, y: 50, z: 500},lookAt: {x: 0, y: 0, z: 0}},
	{color:0xffffff,intensity: 0.8,position:{x: 0, y: 100, z: -500},lookAt:  {x: 0, y: 0, z: 0}},
	{color:0xffffff,intensity: 0.3,position:{x: 1, y: 0, z: 0},lookAt:  {x: 0, y: 0, z: 0}},
	{color:0xffffff,intensity: 0.15,position:{x: -1, y: 0, z: 0},lookAt:  {x: 0, y: 0, z: 0}}
	]
    //{color:0xffffbb,intensity: 0.5,position:{x: 0, y: 0, z: 4},lookAt:  {x: 0, y: 0, z: 0},angle:0.5,distance:6}
	lights.forEach(function(light){
	
	  var dlight = new THREE.DirectionalLight(light.color,light.intensity);
	  var p = light.position;
	  var l = light.lookAt;
	  dlight.position.set(p.x, p.y, p.z);
	  dlight.lookAt(l.x,l.y,l.z);
	  if(light.angle){
	  }
	  scene.add(dlight);
	
	})
	
	var slight = new THREE.SpotLight(0xffffbb,0.5);
	slight.position.set(0,0,4);
	slight.lookAt(0,0,0);
	//slight.angle(0.5);
	slight.distance = 6;
	//scene.add(slight);
	
	//light = new THREE.DirectionalLight(0xffffff, 1.75);
	light = new THREE.DirectionalLight(0xdfebff, 1.75);
	light.position.set(50, 100, 80);
	
	
	light.castShadow = true;

	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;

	var d = 300;

	light.shadow.camera.left = -d;
	light.shadow.camera.right = d;
	light.shadow.camera.top = d;
	light.shadow.camera.bottom = -d;

	light.shadow.camera.far = 100;
	light.shadowDarkness = 0.5;
	light.shadowCameraVisible = true;
	scene.add(light);
	
	textureLoader = new THREE.TextureLoader();
	changeProduct();
	renderer = new THREE.WebGLRenderer({antialias: true,alpha: true});
	renderer.setPixelRatio( pixelRatio );
	renderer.setSize( width, height );
	renderer.setClearColor(0x000000, 0);

	container.appendChild( renderer.domElement );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.soft = true;

	window.addEventListener( 'resize', onWindowResize, false );

	animate();

}

function onWindowResize() {
     width = window.innerWidth;
	 height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	
	renderer.setSize( width , height );

}

//
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	render();
}


function render() {
	renderer.render( scene, camera );
}

var onProgress = function( xhr ) {
	if ( xhr.lengthComputable ) {
	var percentComplete = xhr.loaded / xhr.total * 100;
	console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
	}
};

var onError = function( xhr ) {
	console.error( xhr );
};


function obj2_model_load(model){
var loader = new THREE.OBJLoader2(manager); 
loader.load('assets/'+model+'.obj', function ( data ) {
		if(object != null){
		scene.remove(object);
		}
		object = null;
		object = data.detail.loaderRootNode	;
		console.log(object);
		materials =[];
		object.traverse( function ( node ) {
			if ( node.isMesh ) {
				node.material = textureMaterial
				node.geometry.uvsNeedUpdate = true;	
				//object = node;
			}
		}); 
		var scale = height/3;
		object.scale.set(scale, scale, scale);
		object.position.set(0,-scale*1.5, 0);
		object.rotation.set(0, Math.PI / 2, 0);
		object.receiveShadow = true;
		object.castShadow = true;
		scene.add(object);
 });
}



function selectMaterial(id){
	selectedMaterial = id;
	load_materials();
}

var selectedColors = [];

function setColorBk(color){
	selectedColors.push(color);
	object.traverse( function ( node ) {
				if ( node.isMesh ) {
					node.material[selectedMaterial].color.set( color );	
				}
	});  
	render();
	console.log('color',selectedColors);
}

function changeProduct(){
	loadSvg(function(resp){
	obj2_model_load(gender+'/cat'+category+'/model');
	
	});
	
}
function loadSvg(response){
$.get('assets/'+gender+'/cat'+category+'/prod'+product+'/pattern.svg', function(data) {  
	var svgData = new XMLSerializer().serializeToString(data.documentElement);
	$('#svgContainer').empty();
	$('#svgContainer').append(svgData).html();
	var svg = document.getElementById("svgContainer").querySelector("svg");
	var canvas = document.createElement("canvas");
	canvas.width = $(svg).width();
	canvas.height = $(svg).height();
	var ctx = canvas.getContext("2d");

	var img = document.createElement("img");
	var material;
	img.setAttribute("src", "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgData))) );

	img.onload = function() {
	  ctx.drawImage(img, 0, 0);
	  var texture = new THREE.Texture(canvas);
	  texture.needsUpdate = true;
	  map = texture;
	  textureMaterial = new THREE.MeshPhongMaterial({map: map});
	  load_materials();
	  response(true);
	};

	});
}

function load_materials()
{
	var paths = $('#svgContainer path');
	console.log('paths',paths.length);
	var materialContainer = '';
	for(var i=0; i< paths.length;i++){
	var bg = $(paths[i]).attr('fill');
	var id = $(paths[i]).attr('id');
	if(bg != undefined && id != undefined){		
	var data = id.split('(')[1].split(')')[0];	
	var selected = (selectedMaterial == id)?'active':'';	
	materialContainer += '<div id="mat_'+data+'" class="xixcust '+ selected +'" onclick="selectMaterial(\''+id+'\')"><span class="molids" style="background:'+bg+'"></span><span class="egseas">'+id+'</span></div>';
	}
	}
	load_texts();
	
  $('.materials').empty();
  $('.materials').append(materialContainer).html();
}

function load_texts(){
	var texts = $('#svgContainer text');
	console.log('texts',texts);
	var textContainer = '';
	for(var i = 0;i < texts.length; i++){
	 var id = $(texts[i]).attr('id');
	 var bg = $(texts[i]).css('fill');
	 var selected = (selectedText == id)?'active':'';
	 if(id != undefined){
	 textContainer += '<div id="txt_'+id+'" class="xixcust '+ selected +'" onclick="load_text_details(\''+id+'\')"><span class="molids" style="background:'+bg+'"></span><span class="egseas">'+id+'</span></div>';
	 }
	}
	$('.texts').empty();
	$('.texts').append(textContainer).html();
}

function load_text_details(idd){
	
selectedText = idd;
load_texts();
var id = document.getElementById(idd);
var text = $(id).html();
var ff = $(id).attr('font-family');
var sff = $(id).css('font-family');
var fs = $(id).css('font-size');
var textEditContainer = '<div class="text-editor-container"><h1>'+idd+'</h1>';
textEditContainer += '<div class="form-group"><input id="ftext" onchange="changeTeamName(event)" type="text" class="form-control" value="'+text+'"/></div>';
var fontFamilies = '<select id="ff" onchange="changeTeamName(event)" class="form-control"><option value="">choose font</option>';
     fonts.forEach(function(font){
		 var selected = (ff == font)?'selected':'';
	 fontFamilies += '<option '+selected+' value="'+font+'">'+font+'</option>';
	 })
	 fontFamilies +='</select>';
textEditContainer += '<div class="form-group"><label for="ff-list">Font-Family</label>'+fontFamilies+'</div>';
textEditContainer += '<div class="form-group"><label for="fs">Font-Family</label><input id="fs" type="text" onchange="changeTeamName(event)" class="form-control" value="'+fs+'"/></div></div>';
$('.text-editor').empty();
$('.text-editor').append(textEditContainer).html();
}

function changeTeamName(e){
	
	console.log('e',e.target.value);
update_svg(e.target.id,e.target.value);
}


function setGender(value){
		gender = value;
		$('#gender').html(value);
		changeProduct();
		render();
}

function setCategory(value){
		category = value;
		$('#category').html(value);
		changeProduct();
		render();
}
function setProduct(value){
		product = value;
		$('#product').html(value);
		changeProduct();
		render();
}
loadColors();
function loadColors(){
	var colorContainer="<h3>Colors</h3>";
  colors.forEach(function(color){
		colorContainer +='<div class="colaz" onClick="setColor(\''+color+'\')" style="background:'+color+';"></div>';
  });
  $('.color-palete').append(colorContainer).html();
}


function setColor(color){
  update_svg('color',color);
  
}

function update_svg(op,value){
	if(op == 'color'){
	document.getElementById(selectedMaterial).setAttribute("fill", value);
	}
	if(op == 'ftext'){
	document.getElementById(selectedText).innerHTML = value;
	}
	if(op == 'ff'){
	document.getElementById(selectedText).setAttribute('font-family',value);
	document.getElementById(selectedText).style.fontFamily = value;
	}
	if(op == 'fs'){
	document.getElementById(selectedText).style.fontSize = value;
	}
	
  var svg = document.getElementById("svgContainer").querySelector("svg");
  var svgData = (new XMLSerializer()).serializeToString(svg);
  var canvas = document.createElement("canvas");
	canvas.width = $(svg).width();
	canvas.height = $(svg).height();
	var ctx = canvas.getContext("2d");
	var img = document.createElement("img");
  img.setAttribute("src", "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgData))) );
  img.onload = function(){
  		ctx.drawImage(img, 0, 0);
  	  var texture = new THREE.Texture(canvas);
      textureMaterial.map = texture;
	  textureMaterial.map.minFilter = THREE.LinearFilter;
      textureMaterial.map.needsUpdate = true;
	  console.log(object);
	  object.children[0].material = textureMaterial;
	  render();
	  load_materials();
  }
}

function createCircleTexture(color, size,response) {
  var matCanvas = document.createElement('canvas');
  matCanvas.width = matCanvas.height = size;
  var matContext = matCanvas.getContext('2d');
  // create texture object from canvas.
  var texture = new THREE.Texture(matCanvas);
  // Draw a circle
  var center = size / 2;
  matContext.beginPath();
  matContext.arc(center, center, size/2, 0, 2 * Math.PI, false);
  matContext.closePath();
  matContext.fillStyle = color;
  matContext.fill();
  // need to set needsUpdate
  texture.needsUpdate = true;
  // return a texture made from the canvas
  response(texture);
}