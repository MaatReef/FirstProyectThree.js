import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/jsm/geometries/TextGeometry.js'; // to step 11
import * as TWEEN  from 'https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.6.4/tween.esm.js';

let ambiente = new Howl({
  src: "music/ambiente.mp3",
  volume: 0.2,
});
let disparo = new Howl({
  src: "music/disparo.mp3",
  volume: 0.2,
});
let explosionSound = new Howl({
  src: "music/explosion.mp3",
  volume: 0.3,
});

ambiente.play();

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.01, 100);
var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#webgl'),
  antialias: true,
});
renderer.setClearColor(0x000000);
renderer.setSize(WIDTH, HEIGHT);
var scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = true;
controls.enableZoom = true;


// Configurar las luces de la escena
const ambientLight2 = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight2);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3);
directionalLight2.position.set(0, 20, 20);
directionalLight2.castShadow = true;
scene.add(directionalLight2);


// Configurar la sombra de la luz direccional
directionalLight2.shadow.mapSize.width = 2;
directionalLight2.shadow.mapSize.height = 2;
directionalLight2.shadow.camera.near = 100;
directionalLight2.shadow.camera.far = 50;
directionalLight2.shadow.camera.left = -10;
directionalLight2.shadow.camera.right = 10;
directionalLight2.shadow.camera.top = 10;
directionalLight2.shadow.camera.bottom = -10;
directionalLight2.shadow.bias = -0.001;

// // Crea una geometría esférica para el fondo
// const skyGeometry = new THREE.SphereGeometry(500, 60, 40);
// // Carga una textura equirectangular
// const loader = new THREE.TextureLoader();
// const skyTexture = loader.load('img/ fondo.jpg');
// // Crea un material básico y aplica la textura
// const skyMaterial = new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide });
// // Crea una malla con la geometría y el material
// const sky = new THREE.Mesh(skyGeometry, skyMaterial);
// // Agrega la malla al escenario
// scene.add(sky);


// Crea un cubo
const colors2 = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff69b4, 0xffa500];
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
const cubeMaterials1 = [];
for (let i = 0; i < 6; i++) {
  cubeMaterials1.push(new THREE.MeshLambertMaterial({ color: colors2[i] }));
}
const cube = new THREE.Mesh(cubeGeometry, cubeMaterials1);
scene.add(cube);
cube.position.x = 2;
cube.position.y = -2;
let cubePosYRojo = 0;

// Esfera Central
const circleGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const circleMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff });
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
scene.add(circle);
circle.position.x = 0;
let circlePosY = 0;

// Crea una esfera derecha
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const sphereRight = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereRight.receiveShadow = true;
sphereRight.castShadow = true;
scene.add(sphereRight);
sphereRight.position.x = 2;
let spherePosDerecha1Y = 0;

// Crea una segunda esfera derecha
const sphereGeometryRightTop = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterialRightTop = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const sphere2Right = new THREE.Mesh(sphereGeometryRightTop, sphereMaterialRightTop);
scene.add(sphere2Right);
sphere2Right.position.x = 4;
let spherePosDerecha2Y = -4;

// Esfera izquierda primera
const sphereGeometry2 = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial2 = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const sphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
scene.add(sphere2);
sphere2.position.x = -2;
let spherePosY2 = 0;


// Esfera izquierda tercera, aislada.. Para darle el click
const sphereGeometry3 = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial3 = new THREE.MeshLambertMaterial({ color: 0xffff });
const sphere3 = new THREE.Mesh(sphereGeometry3, sphereMaterial3);
scene.add(sphere3);
sphere3.position.x = -8;
let spherePosY3 = 0;

const sphereGeometry5 = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial5 = new THREE.MeshLambertMaterial({ color: 0xffff });
const sphere5 = new THREE.Mesh(sphereGeometry5, sphereMaterial5);
scene.add(sphere5);
sphere5.position.x = 8;
let spherePosY4 = 0;


// sphere3.cursor = 'pointer';
// sphere3.addEventListener('click', function(ev) {
//    console.log("click esfera");
//    alert("click esfera");
//  });

var raycaster = new THREE.Raycaster(); 
var mouse = new THREE.Vector2(); 

// function onMouseMove( event ) { 
//   mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1; 
//   mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1; 
//   console.log("click")
//   console.log(mouse.x)
//   console.log(mouse.y)
// } 

// window.addEventListener( 'click', onMouseMove, false );    

// Esfera izquierda segunda
const sphereGeometry4 = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial4 = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const sphere4 = new THREE.Mesh(sphereGeometry4, sphereMaterial4);
scene.add(sphere4);
sphere4.position.x = -4;
let spherePosIzquierda2Y = 0;

// Segundo cubo, superior
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff69b4, 0xffa500];
const cubeGeometry2 = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
const cubeMaterials2 = [];
for (let i = 0; i < 6; i++) {
  cubeMaterials2.push(new THREE.MeshBasicMaterial({ color: colors[i] }));
}
const cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterials2);
scene.add(cube2);
cube2.position.x = 0;
cube2.position.y = 2;
let cubePosYAmarillo = 0;

// Objetos que recibirán sombras, recordar el tipo de material de los objetos
cube2.receiveShadow = true;
sphere2.receiveShadow = true;
sphere2Right.receiveShadow = true;
circle.receiveShadow = true;

// Objetos que emitirán sombras
cube.castShadow = true;
sphere2.castShadow = true;
sphere2Right.castShadow = true;


// Permitir el uso de sombras
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Posiciona la cámara
camera.position.z = 12;

// Textos
const textMesh = new THREE.Group( );
const fontLoader = new FontLoader( );							
fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', createText );
textMesh.scale.set( 0.1, 0.1, 0.1 );
textMesh.rotation.y = 0 
textMesh.position.set( 0, 8, -10 );
scene.add( textMesh );

const textMesh2 = new THREE.Group( );
const fontLoader2 = new FontLoader( );							
fontLoader2.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', createText );
textMesh2.scale.set( 0.07, 0.07, 0.07 );
textMesh2.rotation.y = 0 
textMesh2.position.set( 0, -8, -10 );
scene.add( textMesh2 );

function createText( loadedFont ) {
	const textMaterial = new THREE.MeshPhongMaterial( { color: 0xffff, specular: 0x111111, shininess: 1 } );
	const textGeometry = new TextGeometry( 'Apunta.. Y Dispara!', {
		font: loadedFont,
		size: 20,
		height: 3,
		curveSegments: 10,
		bevelEnabled: true,
		bevelThickness: 0,  // Alargada de manera "tubular"
		bevelSize: 0.1,     // Grosor de Letra
		bevelSegments: 20
	});
	const textGeometry2 = new TextGeometry( 'Barra Espaciadora para disparar \n        Apuntar con el Raton', {
		font: loadedFont,
		size: 20,
		height: 3,
		curveSegments: 10,
		bevelEnabled: true,
		bevelThickness: 0, 
		bevelSize: 0.1,  
		bevelSegments: 20

	});

	textGeometry.center(); 
	textGeometry2.center(); 

	const tMesh = new THREE.Mesh( textGeometry, textMaterial );
	const tMesh2 = new THREE.Mesh( textGeometry2, textMaterial );

	textMesh.add( tMesh );
	textMesh2.add( tMesh2 );
}


// Textura de Explosión
const explosionTexture = new THREE.TextureLoader().load('img/explosion1.png');
const explosionMaterial = new THREE.SpriteMaterial({
  map: explosionTexture,
  blending: THREE.AdditiveBlending,
  color: 0xffffff,
  transparent: true,
  opacity: 1,
  depthTest: false
});


// cube2.addEventListener('mousedown', onSphereMouseDown );
// function onSphereMouseDown(event) {
//   cube2.material.color.set(0xaabbcc);
//   cube.material.color.set(0xaabbcc);
// }

// Mira de Disparo
const shootPoint = new THREE.Object3D();
shootPoint.position.set(0, 0, 4); 

const shootPointHelper = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffdd00 })
);
shootPointHelper.position.copy(shootPoint.position); // Copiamos la posicion
scene.add(shootPointHelper); 


const direction = new THREE.Vector3();
direction.subVectors(cube.position, shootPoint.position);

const speed = 0.1; 

addEventListener('keydown', (event) => {
  if (event.key == " ") {  // Con la barra espaciadora, disparamos
    disparo.play();
    spaceDisparar();
  }
});

const objectsToRemove = [];
let bullets = [];

function spaceDisparar(event) {
  const bulletGeometry = new THREE.SphereGeometry(0.5, 8, 8);
  const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

  bullet.collided = false;
  bullet.visible = true;
  bullet.position.copy(shootPoint.position);
  scene.add(bullet);

  const shootDirection = new THREE.Vector3();
  shootDirection.subVectors(shootPoint.position, camera.position).normalize();
  bullet.velocity = shootDirection.multiplyScalar(2);

  bullets.push(bullet);
}

const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });


// Movimiento de los objetos
let directionCircle = 1;    // 1 significa que el círculo está subiendo, -1 significa que está bajando
let directionCube = -1; 

const objects = [cube, cube2, circle, sphere2Right, sphere2, sphere4, sphereRight];
var intersects = raycaster.intersectObjects( sphere2);

function animate() {
  requestAnimationFrame(animate);

  const objectsToRemove = [];
  for (let i = 0; i < bullets.length; i++) {
    const bullet = bullets[i];
    for (let j = 0; j < objects.length; j++) {
      const object = objects[j];

      // Comprueba si la bala ha chocado con el objeto
      if (bullet.position.distanceTo(object.position) < object.geometry.boundingSphere.radius) {
        objectsToRemove.push(object);
        scene.remove(object);
        scene.remove(bullet);
        const explosion = new THREE.Sprite(explosionMaterial);
        explosion.position.copy(object.position); 
        explosionSound.play();     
        scene.add(explosion);
        objectsToRemove.push(explosion); 

        setTimeout(() => {
          scene.remove(explosion);
        }, 500); // Ocultar después de medio segundo
        bullets.splice(i, 1); 
        i--;
        break;
      }
    }
  }


  // Recorre todos los proyectiles en el arreglo bullets
  bullets.forEach(bullet => {
    // Si el proyectil ha colisionado, lo elimina de la escena
    if (bullet.collided) {
      bullet.visible = false;
      scene.remove(bullet);
      return;
    }

    // Actualiza la posición del proyectil en base a su velocidad
    bullet.position.add(bullet.velocity);

    // Verifica la colisión con cada objeto en el arreglo objects
    objects.forEach(object => {
      if (object === bullet) return; // Evita la colisión consigo mismo
      // Calcula la distancia entre el centro del objeto y la posición del proyectil
      const distance = bullet.position.distanceTo(object.position);
      // Si la distancia es menor al radio del objeto más el radio del proyectil, hay colisión
      if (distance < object.geometry.parameters.radius + 0.05) {
        // Establece la bandera de colisión en true
        bullet.collided = true;
        // Elimina el objeto de la escena
        scene.remove(object);
      }
    });
  });

  circlePosY += 0.01 * directionCircle; 
  circle.position.y = circlePosY;

  spherePosDerecha2Y += 0.01 * directionCircle; 
  sphere2Right.position.y = circlePosY;

  cubePosYRojo += 0.01 * directionCube; 
  cube.position.x = cubePosYRojo;
  cube.rotation.y += 0.01;
  cube.rotation.x += 0.01;

  cubePosYAmarillo += 0.01 * directionCircle; 
  cube2.position.x = cubePosYAmarillo;

  spherePosIzquierda2Y += 0.01 * directionCircle; 
  sphere4.position.y = circlePosY;
  cube2.rotation.y += 0.01;
  cube2.rotation.x += 0.01;


  if (circlePosY >= 2) { 
    directionCircle = -1;
    directionCube = 1;
  } else if (circlePosY <= -2) { 
    directionCircle = 1;
    directionCube = -1;
  }


  raycaster.setFromCamera( mouse, camera ); 
  raycaster.intersectObjects( scene.children ); 
  for ( var i = 0; i < intersects.length; i++ ) { 
    intersects[ i ].sphere2.material.color.set( 0xaaaaaa ); 
  }
  renderer.render(scene, camera);
}

animate();