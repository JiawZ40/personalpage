gsap.from('.card', {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    ease: 'power2.out'
});
// 获取提交数据（示例数据，替换为你的真实数据）
const contributions = [
  0, 1, 2, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4,
  3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0,
  2, 4, 3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3,
  1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 0, 4, 2,
  5, 3, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 0,
  4, 2, 5, 3, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3,
  1, 0, 4, 2, 5, 3, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4, 3, 1, 0, 2,
  5, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4, 3, 1,
  0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4,
  3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0, 2, 4, 3, 1, 0, 2, 5, 3, 1, 0, 4, 2, 5, 3, 1, 0,
];

// 初始化Three.js场景
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('3d-canvas') });

// 加载STL模型（需先用gh-skyline生成）
const loader = new THREE.STLLoader();
loader.load('path/to/your-model.stl', function (geometry) {
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  
  // 设置光照
  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(10, 10, 10);
  scene.add(light);
  
  // 相机位置调整
  camera.position.z = 50;
});

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// 添加灯光
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// 创建 3D 提交日历
contributions.forEach((count, index) => {
  const geometry = new THREE.BoxGeometry(0.8, count * 0.2, 0.8);
  const material = new THREE.MeshPhongMaterial({ color: getColor(count) });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = (index % 30) - 15;
  cube.position.z = Math.floor(index / 30) - 7;
  scene.add(cube);
});

// 设置相机位置
camera.position.set(0, 15, 30);
camera.lookAt(0, 0, 0);

// 渲染循环
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// 根据提交次数获取颜色
function getColor(count) {
  if (count === 0) return 0x161b22; // 无提交
  if (count <= 2) return 0x0e4429; // 少量提交
  if (count <= 4) return 0x006d32; // 中等提交
  return 0x26a641; // 大量提交
}
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
