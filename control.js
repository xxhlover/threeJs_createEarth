var controls = new function () {
    this.rotationSpeed = 0.01;
    this.directionalLightIntensity = .5;
    
};

var gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'directionalLightIntensity', 0, 10);