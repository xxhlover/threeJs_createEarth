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
}
var directionalLight;
function createLight(){
	//聚光灯 特点：从一点发散出去，能显示阴影;
	let spotLight = new THREE.SpotLight(0xffffff);
	spotLight.intensity = .2;
	spotLight.position.x = -46;
    spotLight.position.y = 55;
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
    
    //环境光.特点：会为整个画布添加上颜色;
    let ambientLight = new THREE.AmbientLight(0x393939, 0.5);
    //方向光光源，类似于太阳光，特点：被照到的地方光强一致;
    directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.x = 0;
    directionalLight.position.y = 0;
    directionalLight.position.z = -100;
    directionalLight.intensity = controls.directionalLightIntensity;
    
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

var earthMesh;
function createEarch(){
	//地球贴图
	let earthGeometry = new THREE.SphereGeometry(25, 40, 40);
	let texture = THREE.ImageUtils.loadTexture('./img/earth4.jpg', {}, function() {
	    renderer.render(scene, camera);
	});
	let material = new THREE.MeshPhongMaterial();
	let bumpTexture = THREE.ImageUtils.loadTexture('./img/earth_bump.jpg') 
    let specTexture = THREE.ImageUtils.loadTexture('./img/earth_spec.jpg') 
    material.map = texture;
    material.bumpMap = bumpTexture;
    material.bumpScale = .8;
    material.specularMap = specTexture;
    material.specular = new THREE.Color('#909090');
    material.shininess = 3;	
	
	earthMesh = new THREE.Mesh(earthGeometry,material);
	scene.add(earthMesh);
	renderer.render(scene, camera);
}

var cloudMesh;
function createCloud(){
	let cloudGeometry = new THREE.SphereGeometry(25.8, 40, 40);
	let texture = THREE.ImageUtils.loadTexture('./img/earth_cloud.png', {}, function() {
	    renderer.render(scene, camera);
	});
	let material = new THREE.MeshLambertMaterial({
	    map: texture
	});
	cloudMesh = new THREE.Mesh(cloudGeometry,material);
	//设置贴图是否透明 transparent&opacity;
	material.transparent = true;
    material.opacity = 1;
    
	scene.add(cloudMesh);
	renderer.render(scene, camera);
}

function action_fun(){
	requestAnimationFrame( action_fun );
	earthMesh.rotation.y += controls.rotationSpeed
	cloudMesh.rotation.y +=controls.rotationSpeed+0.000001;
	cloudMesh.rotation.x +=0.000001;
	bgMesh.rotation.y += .001;
	directionalLight.intensity = controls.directionalLightIntensity;
	renderer.render(scene, camera);
}

