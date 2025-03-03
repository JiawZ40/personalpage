// 主题切换功能
const themeToggle = document.createElement('button');
themeToggle.className = 'btn btn-primary theme-toggle rounded-circle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    
    d3.selectAll("#network-bg line").attr("stroke", isDark ? "rgba(0,123,255,0.1)" : "rgba(255,255,255,0.1)");
});

// 动态网络背景
function initNetwork() {
    // 减少节点数量提升性能
    const nodes = Array.from({length: 40}, (_, i) => ({id: i}));
    const links = Array.from({length: 60}, () => ({
        source: Math.floor(Math.random() * 40),
        target: Math.floor(Math.random() * 40)
    }));

    // 调整物理参数
    const simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-20))
        .force("link", d3.forceLink(links).distance(80))
        .force("center", d3.forceCenter(width/2, height/2))
        .alphaDecay(0.02); // 减慢动画衰减速度

    // 添加自适应重绘
    window.addEventListener('resize', () => {
        svg.attr("width", window.innerWidth)
           .attr("height", window.innerHeight);
        simulation.force("center", d3.forceCenter(window.innerWidth/2, window.innerHeight/2));
        simulation.restart();
    });
}
// 初始化逻辑
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    initNetwork();
});
