gsap.from('.card', {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    ease: 'power2.out'
});
layer.open({
  type: 2, // 使用iframe模式
  title: '<img src="avatar-url" class="ai-avatar"> AI助手',
  shadeClose: true,
  area: ['400px', '70%'],
  offset: 'rb', // 右下角定位
  content: 'https://your-github-io-url/chat-window.html', // 托管在GitHub Pages的页面
  success: function(layero){
    // 添加自定义交互逻辑
  }
});
