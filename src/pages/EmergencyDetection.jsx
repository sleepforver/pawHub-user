import React, { useState, useRef, useEffect } from 'react';
import { Card, Upload, Button, Spin, Result, Steps, Collapse, Alert, message, Typography, Row, Col, Divider } from 'antd';
import { InboxOutlined, CheckCircleOutlined, LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import * as tf from '@tensorflow/tfjs';
import PageLayout from '../components/PageLayout';
import '../styles/EmergencyDetection.css';

const { Step } = Steps;
const { Panel } = Collapse;
const { Title, Paragraph, Text } = Typography;

// 模拟疾病数据库
const diseasesDatabase = {
  'skin_infection': {
    name: '皮肤感染',
    description: '皮肤感染是宠物常见的健康问题，可能由细菌、真菌或寄生虫引起。',
    symptoms: ['皮肤发红', '瘙痒', '脱毛', '皮肤结痂或鳞片状', '异味'],
    firstAid: [
      '避免宠物舔舐或抓挠感染区域，必要时使用伊丽莎白圈',
      '使用温和的宠物专用洗浴产品清洁感染区域',
      '保持感染区域干燥',
      '尽快就医，医生可能会开具抗生素或抗真菌药物'
    ],
    severity: 'medium',
    needVet: true
  },
  'eye_infection': {
    name: '眼部感染',
    description: '眼部感染可能由细菌、病毒或异物引起，需要及时处理以避免视力损伤。',
    symptoms: ['眼睛发红', '分泌物增多', '眼睛周围肿胀', '频繁眨眼或揉眼', '畏光'],
    firstAid: [
      '使用温水轻轻清洁眼睛周围区域',
      '避免使用人用眼药水',
      '防止宠物用爪子抓挠眼睛',
      '尽快就医，医生可能会开具抗生素眼药水或眼膏'
    ],
    severity: 'high',
    needVet: true
  },
  'digestive_issue': {
    name: '消化系统问题',
    description: '消化系统问题包括腹泻、呕吐等，可能由食物不耐受、感染或异物摄入引起。',
    symptoms: ['腹泻', '呕吐', '食欲不振', '腹部不适或疼痛', '精神萎靡'],
    firstAid: [
      '暂时禁食6-12小时（仅适用于成年宠物）',
      '确保宠物有充足的清水',
      '之后提供少量易消化的食物（如煮熟的鸡肉和白米饭）',
      '如症状持续超过24小时或宠物出现脱水迹象，立即就医'
    ],
    severity: 'medium',
    needVet: true
  },
  'paw_injury': {
    name: '爪部受伤',
    description: '爪部受伤可能包括割伤、擦伤、刺伤或爪子断裂等。',
    symptoms: ['跛行', '舔舐或咬爪子', '爪子出血', '爪子肿胀或变形', '不愿意让人触碰爪子'],
    firstAid: [
      '轻轻清洁伤口，使用温水和温和的肥皂',
      '使用宠物安全的消毒剂',
      '如有出血，使用干净的纱布或毛巾施压止血',
      '包扎伤口防止感染和进一步伤害',
      '限制宠物活动，防止伤口恶化',
      '如伤口严重或爪子断裂，立即就医'
    ],
    severity: 'medium',
    needVet: false
  },
  'ear_problem': {
    name: '耳部问题',
    description: '耳部问题包括耳螨、耳部感染等，常见于长耳朵的犬种和猫。',
    symptoms: ['频繁摇头或抓耳朵', '耳朵发红或肿胀', '耳道内有异味或分泌物', '耳朵周围脱毛', '平衡问题'],
    firstAid: [
      '不要使用棉签清洁宠物耳道深处',
      '可以使用兽医推荐的宠物专用耳部清洁液',
      '轻轻按摩耳朵底部帮助清洁液渗透',
      '让宠物甩头以帮助清洁液和碎屑排出',
      '如症状持续或严重，尽快就医'
    ],
    severity: 'medium',
    needVet: true
  },
  'healthy': {
    name: '健康状态',
    description: '您的宠物看起来很健康！定期检查和预防性护理对维持宠物健康至关重要。',
    symptoms: [],
    firstAid: [
      '继续提供均衡的饮食和充足的运动',
      '定期洗澡和梳理',
      '保持疫苗接种和驱虫处理的最新状态',
      '定期进行健康检查'
    ],
    severity: 'low',
    needVet: false
  }
};

const EmergencyDetection = () => {
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState(null);
  const [modelLoading, setModelLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const imageRef = useRef(null);

  // 模拟模型加载
  useEffect(() => {
    const loadModel = async () => {
      try {
        // 在实际应用中，这里应该加载真实的TensorFlow.js模型
        // const loadedModel = await tf.loadLayersModel('path/to/your/model.json');
        // setModel(loadedModel);
        
        // 模拟模型加载
        setTimeout(() => {
          setModel({});
          setModelLoading(false);
        }, 2000);
      } catch (error) {
        console.error('加载模型失败:', error);
        message.error('模型加载失败，请刷新页面重试');
      }
    };

    loadModel();
  }, []);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只能上传JPG/PNG格式的图片!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('图片必须小于5MB!');
    }
    return isJpgOrPng && isLt5M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // 获取上传的图片
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageUrl(reader.result);
        setLoading(false);
        // 上传完成后自动进行分析
        setTimeout(() => {
          analyzeImage(reader.result);
        }, 500);
      });
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const analyzeImage = async (imageData) => {
    setLoading(true);
    setCurrentStep(1);

    try {
      // 在实际应用中，这里应该使用加载的模型进行图像分析
      // const img = tf.browser.fromPixels(imageRef.current);
      // const resized = tf.image.resizeBilinear(img, [224, 224]);
      // const expanded = resized.expandDims(0);
      // const normalized = expanded.div(255.0);
      // const prediction = await model.predict(normalized);
      // const probabilities = await prediction.data();
      // const topProbability = Math.max(...probabilities);
      // const topIndex = probabilities.indexOf(topProbability);
      
      // 模拟分析过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 随机选择一个疾病作为结果
      const diseases = Object.keys(diseasesDatabase);
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      
      setResult({
        disease: randomDisease,
        confidence: Math.random() * 0.5 + 0.5, // 50%-100%的置信度
        details: diseasesDatabase[randomDisease]
      });
      
      setCurrentStep(2);
    } catch (error) {
      console.error('分析图像失败:', error);
      message.error('分析失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const resetDetection = () => {
    setImageUrl(null);
    setResult(null);
    setCurrentStep(0);
  };

  const renderUploader = () => (
    <Upload.Dragger
      name="file"
      listType="picture"
      className="uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76" // 模拟上传地址
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="上传的图片" style={{ width: '100%' }} ref={imageRef} />
      ) : (
        <>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽图片到此区域上传</p>
          <p className="ant-upload-hint">
            上传您宠物的清晰照片，我们的AI系统将帮助识别可能的健康问题
          </p>
        </>
      )}
    </Upload.Dragger>
  );

  const renderResult = () => {
    if (!result) return null;

    const { disease, confidence, details } = result;
    const confidencePercent = Math.round(confidence * 100);
    
    const severityColor = {
      low: 'green',
      medium: 'orange',
      high: 'red'
    };

    return (
      <div className="result-container">
        <Result
          status={details.severity === 'high' ? 'warning' : 'success'}
          title={details.name}
          subTitle={`识别置信度: ${confidencePercent}%`}
        />
        
        <div className="result-details">
          <Alert
            message={
              details.needVet 
                ? "建议尽快咨询兽医" 
                : "可以在家中进行初步处理，但如症状加重请咨询兽医"
            }
            type={details.needVet ? "warning" : "info"}
            showIcon
            style={{ marginBottom: 16 }}
          />
          
          <Card className="detail-card">
            <Typography>
              <Title level={4}>问题描述</Title>
              <Paragraph>{details.description}</Paragraph>
              
              {details.symptoms.length > 0 && (
                <>
                  <Title level={4}>常见症状</Title>
                  <ul>
                    {details.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </>
              )}
              
              <Title level={4}>应急处理</Title>
              <ol>
                {details.firstAid.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              
              <Divider />
              
              <Alert
                message="免责声明"
                description="本检测结果仅供参考，不构成医疗建议。如宠物情况严重，请立即就医。"
                type="warning"
                showIcon
              />
            </Typography>
          </Card>
        </div>
        
        <div className="action-buttons">
          <Button type="primary" onClick={resetDetection}>
            重新检测
          </Button>
          <Button>
            保存结果
          </Button>
          <Button type="dashed">
            查找附近兽医
          </Button>
        </div>
      </div>
    );
  };

  return (
    <PageLayout>
      <div className="page-header">
        <h1>宠物急病检测</h1>
        <p>上传宠物照片，AI辅助识别可能的健康问题</p>
      </div>
      
      <Row gutter={[24, 24]} className="detection-container">
        <Col xs={24} md={8}>
          <Card title="使用指南" className="guide-card">
            <Steps direction="vertical" current={currentStep}>
              <Step title="上传照片" description="上传您宠物的清晰照片" />
              <Step title="AI分析" description="系统分析照片识别可能的健康问题" />
              <Step title="查看结果" description="获取初步诊断和应急处理建议" />
            </Steps>
            
            <Divider />
            
            <Collapse defaultActiveKey={['1']} ghost>
              <Panel header="拍摄技巧" key="1">
                <ul className="tips-list">
                  <li>确保光线充足，避免过暗或过亮</li>
                  <li>尽量拍摄问题区域的清晰特写</li>
                  <li>多角度拍摄以展示完整症状</li>
                  <li>避免使用滤镜或过度编辑图片</li>
                </ul>
              </Panel>
              <Panel header="注意事项" key="2">
                <Alert
                  message="AI检测仅供参考"
                  description="本功能不能替代专业兽医诊断。如宠物出现严重症状，请立即就医。"
                  type="warning"
                  showIcon
                />
              </Panel>
            </Collapse>
          </Card>
        </Col>
        
        <Col xs={24} md={16}>
          <Card className="detection-card">
            {modelLoading ? (
              <div className="loading-container">
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                <p>正在加载AI模型，请稍候...</p>
              </div>
            ) : (
              <>
                {currentStep < 2 ? (
                  <div className="upload-section">
                    {renderUploader()}
                    {loading && (
                      <div className="analyzing-overlay">
                        <Spin size="large" />
                        <p>正在分析图像...</p>
                      </div>
                    )}
                  </div>
                ) : (
                  renderResult()
                )}
              </>
            )}
          </Card>
        </Col>
      </Row>
      
      <div className="emergency-contacts">
        <Card title="紧急联系方式" className="contacts-card">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
              <Card type="inner" title="24小时宠物急诊">
                <p><strong>电话:</strong> 400-123-4567</p>
                <Button type="primary" danger block>
                  紧急呼叫
                </Button>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card type="inner" title="在线兽医咨询">
                <p><strong>服务时间:</strong> 8:00-22:00</p>
                <Button type="primary" block>
                  在线咨询
                </Button>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card type="inner" title="附近宠物医院">
                <p><strong>查找距离您最近的宠物医院</strong></p>
                <Button block>
                  查看地图
                </Button>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </PageLayout>
  );
};

export default EmergencyDetection;
