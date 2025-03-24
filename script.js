gsap.from('.card', {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.2,
    ease: 'power2.out'
});
// 前端调用示例（chat-window.html）
async function sendMessage() {
  const response = await fetch('https://your-proxy-domain.com/ali-api-proxy', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ 
      user_input: document.getElementById('user-input').value 
    })
  });
  const data = await response.json();
  // 处理返回数据...
}

// 代理服务器示例（Node.js）
app.post('/ali-api-proxy', async (req, res) => {
  const aliResponse = await axios.post('https://aliyun-api-endpoint', {
    app_id: process.env.ALI_APP_ID, // 从环境变量读取
    app_key: process.env.ALI_APP_KEY,
    query: req.body.user_input
  });
  res.json(aliResponse.data);
});
