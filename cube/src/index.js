import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

window.addEventListener('load', function() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.append(renderer.domElement);
  
  const scene = new THREE.Scene();
  
  const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000)
  
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // MeshStandardMateria은 조명이 있어야만 물체가 보임
  const material = new THREE.MeshStandardMaterial({color: 0x00ff00});
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // camera.position.z = 5;
  camera.position.set(3, 4, 5);
  
  camera.lookAt(cube.position);

  // DirectionalLight - 조명, MeshStandardMaterial 사용시 꼭 필요!
  const directionalLight = new THREE.DirectionalLight(0xf0f0f0, 1);
  directionalLight.position.set(-1, 2, 3);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  ambientLight.position.set(3, 2, 1);
  scene.add(ambientLight);
  
  renderer.render( scene, camera );
});