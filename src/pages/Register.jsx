import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Auth.css';

const Register = () => {
  const [captcha, setCaptcha] = useState('1234'); // 模拟验证码
  const [form] = Form.useForm();
  const { register, currentUser, loading, error } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 如果用户已登录，重定向到首页
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    // 显示错误信息
    if (error) {
      message.error(error);
    }
  }, [error]);

  const refreshCaptcha = () => {
    // 生成随机验证码
    const newCaptcha = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptcha(newCaptcha);
  };

  const onFinish = async (values) => {
    if (values.captcha !== captcha) {
      message.error('验证码错误');
      return;
    }
    
    const success = await register({
      username: values.username,
      password: values.password,
      email: values.email,
      phone: values.phone
    });
    
    if (success) {
      message.success('注册成功！');
      navigate('/login');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>加入爪聚</h2>
          <p>创建您的账户，开启宠物健康之旅</p>
        </div>
        
        <Form
          form={form}
          name="register"
          className="register-form"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入您的用户名!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="用户名" 
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="phone"
            rules={[
              { required: true, message: '请输入您的手机号!' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码!' }
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="手机号"
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入您的邮箱!' },
              { type: 'email', message: '请输入有效的邮箱地址!' }
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="邮箱"
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入您的密码!' },
              { min: 6, message: '密码长度不能少于6个字符!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            name="confirm"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认您的密码!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="确认密码"
              size="large"
            />
          </Form.Item>
          
          <Form.Item name="captcha" rules={[{ required: true, message: '请输入验证码!' }]}>
            <Row gutter={8}>
              <Col span={16}>
                <Input placeholder="验证码" size="large" />
              </Col>
              <Col span={8}>
                <Button 
                  className="captcha-button" 
                  onClick={refreshCaptcha}
                  size="large"
                >
                  {captcha}
                </Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="register-form-button" size="large">
              注册
            </Button>
            已有账号? <Link to="/login">立即登录!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register; 