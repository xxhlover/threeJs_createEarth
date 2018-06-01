const container = document.getElementById('container');
var width,height,scene,camera,renderer,ambientLight,paralLight;
window.onload = init();
function init(){
	//创建舞台
	createScene();
	//创建光源
	createLight();
	//创建背景
	createBg();
	//创建地球地表
	createEarch();
	//创建云层
	createCloud();
	//操作
	action_fun();
}
var axes;
function createScene(){
	width = window.innerWidth;
	height = window.innerHeight;
	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera(45,width/height,.1,1000);
	camera.position.x = 3.55;
    camera.position.z = -128;
	camera.lookAt(new THREE.Vector3(0,0,0));
	
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(width,height);
	container.appendChild(renderer.domElement);
	
//	axes = new THREE.AxisHelper(2000);
//  scene.add(axes);
}

function createLight(){
	let spotLight = new THREE.SpotLight(0xffffff);
	spotLight.intensity = .1;
	spotLight.position.x = -46;
    spotLight.position.y = 35;
    spotLight.position.z = -44;
    spotLight.angle = 0.3;
    spotLight.castShadow = false;
    spotLight.penumbra = 0.4;
    spotLight.distance = 124;
    spotLight.decay = 1;
    spotLight.shadowCameraNear = 50;
    spotLight.shadowCameraFar = 200;
    spotLight.shadowCameraFov = 35;
    spotLight.shadowMapSizeHeight = 1024;
    spotLight.shadowMapSizeWidth = 1024;
    
    let ambientLight = new THREE.AmbientLight(0x393939, 0.5);
    
    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.x = 500;
    directionalLight.position.y = 0;
    directionalLight.position.z = -1000;
    directionalLight.intensity = 1;
    
    scene.add(spotLight,ambientLight,directionalLight)
}
var bgMesh;
function createBg(){
	let bgGeometry = new THREE.SphereGeometry(200, 50, 50);
	let texture = THREE.ImageUtils.loadTexture('./img/bg_stars.jpg', {}, function() {
	    renderer.render(scene, camera);
	});
	let material = new THREE.MeshLambertMaterial({
	    map: texture
	});
	bgMesh = new THREE.Mesh(bgGeometry,material);
	material.side = THREE.BackSide;
	scene.add(bgMesh);
	renderer.render(scene, camera);
}

var earchMesh;
function createEarch(){
	let earchGeometry = new THREE.SphereGeometry(25, 40, 40);
	let texture = THREE.ImageUtils.loadTexture('./img/earth4.jpg', {}, function() {
	    renderer.render(scene, camera);
	});
	
	let bumpTexture = new THREE.TextureLoader().load('./img/earth_bump.jpg');
    let specTexture = new THREE.TextureLoader().load('./img/earth_spec.jpg');

    let material = new THREE.MeshPhongMaterial();
    material.transparent = true;
    material.map = texture;

    material.bumpMap = bumpTexture;
    material.bumpScale = 0.15;

    material.specularMap = specTexture;
    material.specular = new THREE.Color('#909090');

    material.shininess = 5;	
	
	earchMesh = new THREE.Mesh(earchGeometry,material);
	scene.add(earchMesh);
	renderer.render(scene, camera);
}

var cloudMesh;
function createCloud(){
	let cloudGeometry = new THREE.SphereGeometry(25.5, 40, 40);
	let texture = THREE.ImageUtils.loadTexture('./img/earth_cloud.png', {}, function() {
	    renderer.render(scene, camera);
	});
	let material = new THREE.MeshLambertMaterial({
	    map: texture
	});
	cloudMesh = new THREE.Mesh(cloudGeometry,material);
	material.transparent = true;
    material.opacity = 1;
	scene.add(cloudMesh);
	renderer.render(scene, camera);
}

function action_fun(){
	requestAnimationFrame( action_fun );
	earchMesh.rotation.y += 0.01;
	cloudMesh.rotation.y +=0.010001;
	cloudMesh.rotation.x +=0.000001;
	bgMesh.rotation.y += .001;
	renderer.render(scene, camera);
}

