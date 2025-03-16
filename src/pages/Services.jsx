import React from 'react';
import { Card, Row, Col, Button, Tabs } from 'antd';
import { 
  MedicineBoxOutlined, 
  HeartOutlined, 
  CalendarOutlined,
  ShoppingOutlined,
  HomeOutlined,
  BugOutlined,
  AlertOutlined
} from '@ant-design/icons';
import PageLayout from '../components/PageLayout';
import '../styles/Services.css';

const { TabPane } = Tabs;

const serviceData = [
  {
    key: 'vaccine',
    title: '疫苗接种',
    icon: <MedicineBoxOutlined />,
    description: '为您的宠物提供全面的疫苗接种服务，预防各种常见疾病。',
    details: '我们提供猫咪和狗狗的核心疫苗和非核心疫苗接种，包括狂犬病、猫瘟、犬瘟等疫苗。专业兽医会根据您宠物的年龄、健康状况和生活环境制定个性化的接种计划。',
    price: '¥100-300/次'
  },
  {
    key: 'care',
    title: '基本护理',
    icon: <HeartOutlined />,
    description: '日常护理服务，包括洗澡、美容、指甲修剪等。',
    details: '专业的宠物美容师提供洗澡、毛发修剪、指甲修剪、耳道清洁、肛门腺挤压等服务。使用温和的宠物专用产品，让您的爱宠保持清洁健康。',
    price: '¥80-200/次'
  },
  {
    key: 'checkup',
    title: '定期体检',
    icon: <CalendarOutlined />,
    description: '定期健康检查，及早发现潜在健康问题。',
    details: '全面的健康检查包括体温、心率、呼吸、体重测量，以及眼、耳、口腔、皮肤检查。可选择进行血液检查、尿检、粪便检查等实验室检测。',
    price: '¥200-500/次'
  },
  {
    key: 'food',
    title: '宠物食品',
    icon: <ShoppingOutlined />,
    description: '提供优质宠物食品，满足不同年龄和健康需求。',
    details: '我们提供各种高品质的宠物食品，包括干粮、湿粮、处方粮等。针对幼犬/幼猫、成年、老年宠物，以及特殊健康需求的宠物提供专门的食品选择。',
    price: '¥50-300/包'
  },
  {
    key: 'boarding',
    title: '宠物住宿',
    icon: <HomeOutlined />,
    description: '安全舒适的宠物寄养服务，让您出行无忧。',
    details: '提供短期和长期的宠物寄养服务，配备舒适的住宿环境、定时喂食和遛狗服务。专业人员24小时照料，确保您的爱宠得到妥善照顾。',
    price: '¥80-150/天'
  },
  {
    key: 'parasite',
    title: '驱虫处理',
    icon: <BugOutlined />,
    description: '内外驱虫服务，保护宠物免受寄生虫侵害。',
    details: '提供内部驱虫（如蛔虫、绦虫、钩虫等）和外部驱虫（如跳蚤、蜱虫等）服务。根据宠物的体重和健康状况选择合适的驱虫药物，并制定定期驱虫计划。',
    price: '¥50-200/次'
  },
  {
    key: 'emergency',
    title: '紧急治疗',
    icon: <AlertOutlined />,
    description: '24小时紧急医疗服务，应对突发健康问题。',
    details: '提供全天候的紧急医疗服务，处理宠物意外伤害、急性疾病等紧急情况。配备先进的医疗设备和经验丰富的兽医团队，确保您的爱宠在紧急情况下得到及时救治。',
    price: '根据具体情况定价'
  }
];

const Services = () => {
  return (
    <PageLayout>
      <div className="page-header">
        <h1>我们的服务</h1>
        <p>为您的爱宠提供全方位的健康服务</p>
      </div>
      
      <Tabs defaultActiveKey="all" className="service-tabs">
        <TabPane tab="全部服务" key="all">
          <Row gutter={[24, 24]}>
            {serviceData.map(service => (
              <Col xs={24} sm={12} md={8} key={service.key}>
                <Card 
                  hoverable 
                  className="service-card"
                  actions={[
                    <Button type="primary">预约服务</Button>,
                    <Button>了解更多</Button>
                  ]}
                >
                  <div className="service-icon">{service.icon}</div>
                  <Card.Meta 
                    title={service.title} 
                    description={service.description} 
                  />
                  <div className="service-price">{service.price}</div>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="预防保健" key="prevention">
          {/* 筛选后的服务卡片 */}
        </TabPane>
        <TabPane tab="日常护理" key="daily">
          {/* 筛选后的服务卡片 */}
        </TabPane>
        <TabPane tab="紧急服务" key="emergency">
          {/* 筛选后的服务卡片 */}
        </TabPane>
      </Tabs>
      
      <div className="service-contact">
        <h2>需要帮助？</h2>
        <p>我们的客服团队随时为您提供咨询</p>
        <Button type="primary" size="large">联系我们</Button>
      </div>
    </PageLayout>
  );
};

export default Services; 