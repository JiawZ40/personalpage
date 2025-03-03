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
    const width = window.innerWidth;
    const height = window.innerHeight;
    const nodes = Array.from({length: 80}, (_, i) => ({id: i}));
    const links = Array.from({length: 120}, () => ({
        source: Math.floor(Math.random() * 80),
        target: Math.floor(Math.random() * 80)
    }));

    const simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-30))
        .force("link", d3.forceLink(links).distance(50))
        .force("center", d3.forceCenter(width/2, height/2));

    const svg = d3.select("#network-bg")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "var(--network-color)")
        .attr("stroke-width", 0.8);

    svg.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 2)
        .attr("fill", "var(--network-color)");

    simulation.on("tick", () => {
        svg.selectAll("line")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        svg.selectAll("circle")
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
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
