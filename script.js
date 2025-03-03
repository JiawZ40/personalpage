const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});
// 在Bootstrap JS后添加以下代码
function initNetwork() {
    const width = window.innerWidth,
          height = window.innerHeight;

    // 创建力导向图
    const simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-50))
        .force("center", d3.forceCenter(width/2, height/2));

    // 创建SVG画布
    const svg = d3.select("#network-bg")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // 生成随机网络数据（示例）
    const nodes = Array.from({length: 150}, (_, i) => ({ id: i }));
    const links = Array.from({length: 300}, () => ({
        source: Math.floor(Math.random() * 100),
        target: Math.floor(Math.random() * 100)
    }));

    // 绘制边
    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "#eee")
        .attr("stroke-width", 0.5);

    // 绘制节点
    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 3)
        .attr("fill", "#007bff")
        .call(d3.drag()  // 拖拽交互
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // 物理模拟更新
    simulation.nodes(nodes).on("tick", () => {
        link.attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        node.attr("cx", d => d.x)
            .attr("cy", d => d.y);
    });

    // 拖拽事件处理
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }
    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }
    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }
}

// 初始化网络
window.addEventListener('DOMContentLoaded', initNetwork);
