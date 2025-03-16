import axios from 'axios';
import { mockLogin, mockRegister, posts, services } from './mockData';

// 创建axios实例
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 响应拦截器
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && error.response.status === 401) {
      // 未授权，清除token并重定向到登录页
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 用户相关API
export const userApi = {
  login: async (username, password) => {
    // 在实际应用中，这里应该调用真实的API
    // return api.post('/auth/login', { username, password });
    
    // 使用模拟数据
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockLogin(username, password));
      }, 1000);
    });
  },
  
  register: async (userData) => {
    // 在实际应用中，这里应该调用真实的API
    // return api.post('/auth/register', userData);
    
    // 使用模拟数据
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockRegister(userData));
      }, 1000);
    });
  },
  
  getCurrentUser: async () => {
    // 在实际应用中，这里应该调用真实的API
    // return api.get('/user/profile');
    
    // 使用模拟数据
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: 1,
            username: 'demo',
            email: 'demo@example.com',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          }
        });
      }, 500);
    });
  }
};

// 社区相关API
export const communityApi = {
  getPosts: async () => {
    // 在实际应用中，这里应该调用真实的API
    // return api.get('/posts');
    
    // 使用模拟数据
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: posts
        });
      }, 500);
    });
  },
  
  createPost: async (postData) => {
    // 在实际应用中，这里应该调用真实的API
    // return api.post('/posts', postData);
    
    // 使用模拟数据
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: Date.now(),
            author: '当前用户',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: postData.content,
            images: postData.images || [],
            likes: 0,
            comments: 0,
            shares: 0,
            time: '刚刚'
          }
        });
      }, 1000);
    });
  }
};

// 服务相关API
export const servicesApi = {
  getServices: async () => {
    // 在实际应用中，这里应该调用真实的API
    // return api.get('/services');
    
    // 使用模拟数据
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          data: services
        });
      }, 500);
    });
  }
};

// 宠物健康检测API
export const healthDetectionApi = {
  analyzeImage: async (imageData) => {
    // 在实际应用中，这里应该调用真实的API
    // return api.post('/health/detect', { image: imageData });
    
    // 使用模拟数据
    return new Promise(resolve => {
      setTimeout(() => {
        // 随机返回一种健康状况
        const conditions = ['healthy', 'skin_infection', 'eye_infection', 'digestive_issue', 'paw_injury', 'ear_problem'];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        
        resolve({
          success: true,
          data: {
            condition: randomCondition,
            confidence: 0.85 + Math.random() * 0.1
          }
        });
      }, 2000);
    });
  }
};

export default api; 