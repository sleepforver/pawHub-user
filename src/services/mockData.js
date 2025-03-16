// 用户数据
export const users = [
  {
    id: 1,
    username: 'demo',
    password: 'password123',
    email: 'demo@example.com',
    phone: '13800138000',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  }
];

// 社区帖子数据
export const posts = [
  {
    id: 1,
    author: '猫咪爱好者',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: '今天带我家小橘猫去打疫苗啦，医生说她非常健康！分享一下我家猫咪的护理经验...',
    images: ['https://via.placeholder.com/300x200'],
    likes: 42,
    comments: 8,
    shares: 3,
    time: '2小时前'
  },
  {
    id: 2,
    author: '狗狗训练师',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: '分享一些训练狗狗的小技巧，希望对大家有帮助！1. 保持耐心和一致性...',
    images: ['https://via.placeholder.com/300x200', 'https://via.placeholder.com/300x200'],
    likes: 78,
    comments: 15,
    shares: 12,
    time: '5小时前'
  },
  {
    id: 3,
    author: '宠物医生',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content: '夏季来临，提醒各位宠物主人注意防暑降温。宠物中暑的症状包括：过度喘息、口水增多、精神萎靡等...',
    images: ['https://via.placeholder.com/300x200'],
    likes: 120,
    comments: 25,
    shares: 30,
    time: '1天前'
  }
];

// 服务数据
export const services = [
  {
    key: 'vaccine',
    title: '疫苗接种',
    icon: 'MedicineBoxOutlined',
    description: '为您的宠物提供全面的疫苗接种服务，预防各种常见疾病。',
    details: '我们提供猫咪和狗狗的核心疫苗和非核心疫苗接种，包括狂犬病、猫瘟、犬瘟等疫苗。专业兽医会根据您宠物的年龄、健康状况和生活环境制定个性化的接种计划。',
    price: '¥100-300/次',
    category: 'prevention'
  },
  // 其他服务数据...
];

// 模拟登录函数
export const mockLogin = (username, password) => {
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    const { password, ...userInfo } = user;
    return {
      success: true,
      data: userInfo,
      token: 'mock-jwt-token'
    };
  }
  return {
    success: false,
    message: '用户名或密码错误'
  };
};

// 模拟注册函数
export const mockRegister = (userData) => {
  if (users.some(u => u.username === userData.username)) {
    return {
      success: false,
      message: '用户名已存在'
    };
  }
  if (users.some(u => u.email === userData.email)) {
    return {
      success: false,
      message: '邮箱已被注册'
    };
  }
  if (users.some(u => u.phone === userData.phone)) {
    return {
      success: false,
      message: '手机号已被注册'
    };
  }
  
  return {
    success: true,
    message: '注册成功'
  };
}; 