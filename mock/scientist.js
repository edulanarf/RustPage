import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from './orbitControls.js';
import { GLTFLoader } from './gltfLoader.js';

let model; // <-- Declaración aquí para poder usarlo después

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({alpha: true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


camera.position.z = 2;

// Controles de órbita
const controls = new OrbitControls(camera, renderer.domElement);

loader.load('../mock/rust_scientist_blue.glb', function (gltf) {
    model = gltf.scene;

    model.traverse((child) => {
        if (child.isMesh) {
            const oldMat = child.material;
            child.material = new THREE.MeshBasicMaterial({
                map: oldMat.map || null,
                color: oldMat.color || new THREE.Color(0xffffff)
            });
        }
    });

    model.position.set(0, 0, 0);
    model.scale.set(0.5, 0.5, 0.5);
    scene.add(model);
});

function animate() {
    requestAnimationFrame(animate);

    if (model) {
        model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

animate();