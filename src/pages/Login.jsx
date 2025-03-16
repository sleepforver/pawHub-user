import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const [captcha, setCaptcha] = useState('1234'); // 模拟验证码
  const [form] = Form.useForm();
  const { login, currentUser, loading, error } = useAuth();
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
    
    const success = await login(values.username, values.password);
    if (success) {
      message.success('登录成功！');
      navigate('/');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>欢迎回到爪聚</h2>
          <p>登录您的账户，开启宠物健康之旅</p>
        </div>
        
        <Form
          form={form}
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
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
            name="password"
            rules={[{ required: true, message: '请输入您的密码!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="密码"
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
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" size="large">
              登录
            </Button>
            或者 <Link to="/register">立即注册!</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login; 