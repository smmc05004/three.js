import * as THREE from "three";
import Card from "./Card";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "lil-gui";

window.addEventListener("load", function () {
  init();
});

function init() {
  const gui = new GUI();

  const COLORS = ["#ff6e6e", "#31e0c1", "#006fff", "#ffd732"];

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    500
  );

  camera.position.z = 25;

  const control = new OrbitControls(camera, renderer.domElement);
  control.autoRotate = true;
  control.autoRotateSpeed = 2.5;
  control.rotateSpeed = 0.75;
  control.enableDamping = true;
  control.enableZoom = false;
  // control.minPolarAngle = Math.PI / 2 - Math.PI / 3;
  // control.minPolarAngle = (Math.PI / 180) * 30;
  control.minPolarAngle = Math.PI / 6;
  control.maxPolarAngle = Math.PI / 2 + Math.PI / 3;

  const card = new Card({
    width: 10,
    height: 15,
    radius: 0.5,
    color: COLORS[0],
  });

  card.mesh.rotation.z = Math.PI * 0.1;

  scene.add(card.mesh);

  const cardFold = gui.addFolder("Card");

  cardFold
    .add(card.mesh.material, "roughness")
    .min(0)
    .max(1)
    .step(0.01)
    .name("material.roughness");

  cardFold
    .add(card.mesh.material, "metalness")
    .min(0)
    .max(1)
    .step(0.01)
    .name("material.metalness");

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  ambientLight.position.set(-5, -5, -5);
  scene.add(ambientLight);

  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
  const directionalLight2 = directionalLight1.clone();

  directionalLight1.position.set(1, 1, 3);
  directionalLight2.position.set(-1, 1, -3);

  scene.add(directionalLight1, directionalLight2);

  render();

  function render() {
    control.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  }

  window.addEventListener("resize", handleResize);

  const container = document.querySelector(".container");

  COLORS.forEach((color) => {
    const button = document.createElement("button");

    button.style.backgroundColor = color;

    button.addEventListener("click", () => {
      card.mesh.material.color = new THREE.Color(color);
    });

    container.appendChild(button);
  });
}
