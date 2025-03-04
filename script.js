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

// 初始化 Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('3d-canvas') });
renderer.setSize(800, 600);

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
