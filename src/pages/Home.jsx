import React from 'react';
import { Carousel, Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import PageLayout from '../components/PageLayout';
import '../styles/Home.css';

const Home = () => {
  return (
    <PageLayout>
      <Carousel autoplay className="banner">
        <div>
          <h3>关爱宠物健康，从爪聚开始</h3>
          <p>专业的宠物健康管理平台</p>
        </div>
        <div>
          <h3>分享宠物生活，连接爱宠人士</h3>
          <p>记录精彩瞬间，获取专业建议</p>
        </div>
        <div>
          <h3>紧急疾病识别，及时救助爱宠</h3>
          <p>AI辅助诊断，专业医师在线</p>
        </div>
      </Carousel>
      
      <div className="section">
        <h2>我们的服务</h2>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Card 
              hoverable 
              cover={<img alt="疫苗接种" src="/images/vaccine.jpg" />}
              className="service-card"
            >
              <Card.Meta title="疫苗接种" description="定期接种，预防疾病" />
              <Button type="primary" className="card-button">了解更多</Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Card 
              hoverable 
              cover={<img alt="基本护理" src="/images/care.jpg" />}
              className="service-card"
            >
              <Card.Meta title="基本护理" description="日常护理，健康成长" />
              <Button type="primary" className="card-button">了解更多</Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <Card 
              hoverable 
              cover={<img alt="紧急治疗" src="/images/emergency.jpg" />}
              className="service-card"
            >
              <Card.Meta title="紧急治疗" description="快速响应，专业救助" />
              <Button type="primary" className="card-button">了解更多</Button>
            </Card>
          </Col>
        </Row>
      </div>
      
      <div className="section">
        <h2>社区精选</h2>
        <Row gutter={[16, 16]}>
          {/* 这里可以放置社区动态的预览卡片 */}
        </Row>
        <Button type="primary" size="large" className="more-button">
          查看更多
        </Button>
      </div>
    </PageLayout>
  );
};

export default Home; 