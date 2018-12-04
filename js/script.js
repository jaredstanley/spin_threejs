//
var scene,camera,renderer,controls;
var count = 0;
var cameraPosTgt = -100;
var cameraPosZTgt = -150;
var light1, light2;
var subjMat, baseMat;
var earthbox;
var base;
var itmArr = [];
var vx, vy, vz;
var loader;
var curClickTgt;
var raycaster;
var motionActive = false;
var spinAmt = 0;
//
init();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 100000 );
    renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    controls = new THREE.OrbitControls(camera);

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  camera.position.set(100,900,100);
  //camera.up = new THREE.Vector3(0,1,0);
  raycaster = new THREE.Raycaster();
  initObjects();
  initTextures();
  initLights();
  //initInteraction();
  // render();
}


function initObjects(){
  var loader = new THREE.JSONLoader(); // init the loader util

  // loader.load('img/utah.js', function (geometry) {
    
  //     earthbox = new THREE.Mesh(geometry,subjMat);
  //     earthbox.name = "earthbox";
  //     earthbox.scale.set(4,4,4);
      // geometry.center();
  //     earthbox.position.y = -600;
  //     scene.add(earthbox);
  // });
  //
  loader.load('img/circle.js', function (geometry) {
    
      base = new THREE.Mesh(geometry,baseMat);
      // base.scale.set(4,4,4);
      geometry.center();
      scene.add(base);
      render();
  });
}

function initTextures(){
    baseMat = new THREE.MeshBasicMaterial({
    // color:0xffffff, 
    // shading: THREE.FlatShading,
    transparent: true,
    opacity: 0.9
    });
    baseMat.map = THREE.ImageUtils.loadTexture('img/circle_transp.png');
    // baseMat = new THREE.MeshPhongMaterial({
    // color:0xffffff, 
    // shading: THREE.FlatShading
    // });
    // baseMat.map = THREE.ImageUtils.loadTexture('img/map_texture.jpg');
  

}

function initLights(){
  light1 = new THREE.PointLight(0xffffff);
  light1.position.set(-2133,1111,5111);

  scene.add(light1);

  light2 = new THREE.PointLight(0xffffff);
  light2.position.set(1500,1470,2310);

  scene.add(light2);


}

//
function render() {
  requestAnimationFrame( render );

  update();

  renderer.render(scene, camera);
};

function initInteraction(){
    window.addEventListener('mousedown', function(e){
        e.preventDefault(); 
        var cx = e.clientX;
        var cy = e.clientY;
        mouseDown(e, cx, cy);
    }, false);

    window.addEventListener('mouseup', function(e){
        mouseUp(e);
    }, false);

    window.addEventListener('touchstart', function(e){
      e.preventDefault();
      var cx = e.targetTouches[0].pageX;
      var cy = e.targetTouches[0].pageY;
      mouseDown(e, cx, cy);
    }, false);


    window.addEventListener('touchend', function(e){
      e.preventDefault();
      mouseUp(e);
    }, false);
  

}

function mouseDown(e, cx, cy){
  // console.log("mouseDown", cx, cy);
  curClickTgt = getRaycastObj(cx, cy);
  if(curClickTgt){
    // console.log(curClickTgt);
    spinearthbox(curClickTgt);
  }
}

//
function mouseUp(e){
  if(curClickTgt){
    // deActivateItem(curClickTgt);
  }  
}

function spinearthbox(tgt){
  motionActive=true;
}

function update(){
  // base.rotation.y+=0.755699999999996;
  base.rotation.y+=count;
  count+=.0003;
  // count+=Math.PI;
  // controls.update();
  updateCamera();
}

function checkTarget(rot){
  var deg = Math.abs(Math.floor(toDeg(rot)%360));
  console.log((deg%12));
}

function updateCamera(){
      camera.lookAt(new THREE.Vector3(0,0,0));
}

function getRaycastObj(cx,cy){
  var mouseVect = {
  x: 2 * (cx / window.innerWidth) - 1,
  y: 1- 2 * (cy / window.innerHeight)};
  raycaster.setFromCamera(mouseVect, camera);
  var intersects = raycaster.intersectObjects([earthbox]);
    if(intersects.length>0){
      var obj = intersects[0].object;
      return obj;
    }else{
      return null;
    }
}

function toRad(deg){
  return deg*Math.PI/180;
}

function toDeg(rad){
  return rad*180/Math.PI;
}

function randNum(n){
  var p = ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
  return p*n;
}