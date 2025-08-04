import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { GLTFLoader } from './gltfLoader.js';

let model; // <-- Declaración aquí para poder usarlo después

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({alpha: true});

const container = document.getElementById('scientist');
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
renderer.setSize(container.clientWidth, container.clientHeight);

camera.position.z = 2;

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

    model.position.set(-0.1, -1.5, 0);
    model.scale.set(1, 1, 1);
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

window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});