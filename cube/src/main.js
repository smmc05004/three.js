import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import GUI from "lil-gui";

window.addEventListener("load", function () {
  init();
});

function init() {
  const options = {
    color: 0x00ffff,
  };

  const renderer = new THREE.WebGLRenderer({
    // alpha: true, // 검은 배경 제거
    antialias: true, // 선을 매끄럽게 처리
  });

  // canvas 사이즈 세팅
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  // 씬 생성 (그림 그릴 도화지)
  const scene = new THREE.Scene();

  // 카메라 생성
  const camera = new THREE.PerspectiveCamera(
    75, //시야각 field of view - fov
    window.innerWidth / window.innerHeight, // 종횡비
    1, // near
    500 // far
  );

  // 물질 - 사이즈 세팅
  const cubeGeometry = new THREE.IcosahedronGeometry(1);
  // 물질 - 박스 질감 세팅
  // MeshBasicMaterial - 조명에 의한 영향 없음
  // const material = new THREE.MeshBasicMaterial({ color: 0xcc99ff });
  const cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ffff,
    emissive: 0x111111,
    //  transparent: true,
    //  opacity: 0.8,

    //  wireframe: true,
    // side: THREE.DoubleSide,
  });

  // 큐브 생성
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  const skeletonGeometry = new THREE.IcosahedronGeometry(2);
  const skeletonMaterial = new THREE.MeshBasicMaterial({
    wireframe: true,
    transparent: true,
    opacity: 0.2,
    color: 0xaaaaaa,
  });

  const skeleton = new THREE.Mesh(skeletonGeometry, skeletonMaterial);

  // 씬에 큐브 추가
  scene.add(cube, skeleton);

  // 카메라 위치 세팅
  camera.position.z = 5;
  // camera.position.set(3, 4, 5);

  // 카메라 시선 세팅
  // camera.lookAt(cube.position);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // directionalLight.position.set(-1, 2, 3);
  scene.add(directionalLight);

  // const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  // ambientLight.position.set(3, 2, 1);
  // scene.add(ambientLight);

  const clock = new THREE.Clock();

  render();

  function render() {
    const elapsedTime = clock.getElapsedTime();
    // cube.rotation.x = THREE.MathUtils.degToRad(45);
    // cube.rotation.x  = elapsedTime;
    // cube.rotation.y  = elapsedTime;

    // skeleton.rotation.x = elapsedTime * 1.5;
    // skeleton.rotation.y = elapsedTime * 1.5;
    // cube.position.y = Math.sin(cube.rotation.x);
    // cube.scale.x = Math.cos(cube.rotation.x)

    // 렌더링
    renderer.render(scene, camera);

    controls.update();

    requestAnimationFrame(render);
  }

  // resize handler
  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);

    controls.update();
  }

  window.addEventListener("resize", handleResize);

  const gui = new GUI();

  gui.add(cube.position, "y").min(-3).max(3).step(0.1);

  gui.add(cube, "visible");

  gui.addColor(options, "color").onChange((value) => {
    cube.material.color.set(value);
  });
}
