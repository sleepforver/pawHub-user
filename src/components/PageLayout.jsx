import React from 'react';
import { Layout, Menu, Dropdown, Avatar, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Header, Content, Footer } = Layout;

const PageLayout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        个人资料
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        账户设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">爪聚</div>
        <div className="nav-links">
          <Link to="/">首页</Link>
          <Link to="/services">服务</Link>
          <Link to="/community">社区</Link>
          <Link to="/emergency">急救检测</Link>
          
          {currentUser ? (
            <Dropdown overlay={userMenu} placement="bottomRight">
              <span className="user-dropdown">
                <Avatar src={currentUser.avatar} icon={<UserOutlined />} />
                <span className="username">{currentUser.username}</span>
              </span>
            </Dropdown>
          ) : (
            <>
              <Link to="/login">登录</Link>
              <Link to="/register">注册</Link>
            </>
          )}
        </div>
      </Header>
      
      <Content className="content">
        {children}
      </Content>
      
      <Footer className="footer">
        <p>爪聚 © {new Date().getFullYear()} - 关爱宠物健康的社区平台</p>
      </Footer>
    </Layout>
  );
};

export default PageLayout; 