//
var scene,camera,renderer,controls;
var count = 0.05;
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
var active = true;
var spinAmt = 0;
//
init();

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth/window.innerHeight, 0.1, 100000 );
    renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    // controls = new THREE.OrbitControls(camera);

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  camera.position.set(100,900,100);
  //camera.up = new THREE.Vector3(0,1,0);
  // raycaster = new THREE.Raycaster();
  initObjects();
  initTextures();
  // initLights();
  initInteraction();
  // render();
}


function initObjects(){
  var loader = new THREE.JSONLoader(); // init the loader util


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
    side:THREE.DoubleSide,
    transparent: true,
    opacity: 0.9
    });
    baseMat.map = THREE.ImageUtils.loadTexture('img/circle_transp.png');

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
  active=false;
  console.log(active);
}

//
function mouseUp(e){

  active=true;
  console.log(active);
}



function update(){
  if(active){
    var inc = Math.PI*.00011
    // base.rotation.y+=0.755699999999996;
    base.rotation.y-=count;
    // base.rotation.x+=count/10;
    count+=inc;
  }

  updateCamera();
}


function updateCamera(){
      camera.lookAt(new THREE.Vector3(0,0,0));
}
