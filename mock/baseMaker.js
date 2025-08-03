import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from './orbitControls.js';

const scene = new THREE.Scene();

/* Color del fondo de la escena (propiedad de la escena) */
//scene.background = new THREE.Color(0x0099ff);

/*campo vision, anchura/altura y (tod-o lo que este a una distancia de 0.1 no se pinta y lo mismo para el 1000) */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/* objeto que se encarga de renderizar tod-o el 3D en el ordenador (hay varios pero se recomienda el Webgl que es el mas standarizado (2022) */
const renderer = new THREE.WebGLRenderer();

/* Fondo transparente (propiedad del renderizador) */
//const renderer = new THREE.WebGLRenderer({alpha: true});

/* darle tamaño (podria hacerse solo en una parte especifica de la pagina como un div o algo parecido) */
renderer.setSize(window.innerWidth, window.innerHeight);

/* activar las sombras del render */
renderer.shadowMap.enabled = true;

/*Al document de la web añadirle el renderer como hijo*/
document.body.appendChild(renderer.domElement);

/* CONTENIDO DEL RENDER */

/* Creacion de la geometria */
const geometry = new THREE.BoxGeometry(1,1,1); /* En este caso se crea una caja */

/* Creacion del material */
const material = new THREE.MeshStandardMaterial({color: 0x09f});

/* Creacion del objeto uniendo la geometria y el material */
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true; /* Para que el objeto pueda tener sobra */
cube.position.set(1, 2, 2);
/* Añadirlo a la escena */
scene.add(cube);

/* Creacion de la luz */
const light = new THREE.DirectionalLight(0xffffff, 5, 100);
light.position.set(5, 10,15);

/* Hay que asignar los objetos que pueden dar sombra para optimizar */
/*en primer lugar asignar que la luz pueda dar sombra */
light.castShadow = true;

scene.add(light);

/* Plano */
const planeGeometry= new THREE.PlaneGeometry(20,20,32,32);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
const plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.receiveShadow = true; /* Recive la sombra del cubo NO LA GENERA*/
plane.position.set(0,0,0);
scene.add(plane);


/* malla */
//const grid = new THREE.GridHelper(100,100); /* Dimension y numero de cuadrados de la malla */
//scene.add(grid);

/* Enfocar la camara para ver el cubo */
camera.position.z = 10;
camera.position.y = -2;
camera.position.x = 1;
camera.rotation.x = 0.2;

/* Control orbita */
const controls = new OrbitControls(camera, renderer.domElement);

/* activar o desactivar zoom */
//controls.enableZoom = false;

/* Limitar el zoom */
controls.minDistance = 1;
controls.maxDistance = 20;

/* Animar el cubo */
function render() {
    requestAnimationFrame(render);

    /* Antes de renderizar, se puede asignar al cubo una animacion como por ejemplo: */
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera); /* Renderiza una escena y la camara */
}

render();

