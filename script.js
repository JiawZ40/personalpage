// scripts.min.js
document.addEventListener('DOMContentLoaded', () => {
    // 主题切换优化
    const themeToggle = document.createElement('button');
    themeToggle.className = 'btn btn-sm position-fixed bottom-0 end-0 m-3';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
        document.documentElement.setAttribute('data-bs-theme', isDark ? 'light' : 'dark');
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // 网络背景优化（性能提升）
    function initNetwork() {
        const nodes = Array.from({length: 80}, (_, i) => ({id: i}));
        const links = Array.from({length: 120}, () => ({
            source: Math.floor(Math.random() * 80),
            target: Math.floor(Math.random() * 80)
        }));

        const simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(-30))
            .force("link", d3.forceLink(links).distance(50));

        const svg = d3.select("#network-bg")
            .append("svg")
            .attr("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);

        svg.selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke", "currentColor")
            .attr("stroke-opacity", 0.1);

        svg.selectAll("circle")
            .data(nodes)
            .enter().append("circle")
            .attr("r", 2)
            .attr("fill", "currentColor")
            .attr("opacity", 0.3);

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

    initNetwork();
});
