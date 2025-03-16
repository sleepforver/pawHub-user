import React, { useState } from 'react';
import { Card, Avatar, Button, Input, Upload, Modal, Tabs, message, List, Comment } from 'antd';
import { 
  LikeOutlined, 
  MessageOutlined, 
  ShareAltOutlined,
  PictureOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import PageLayout from '../components/PageLayout';
import '../styles/Community.css';

const { TextArea } = Input;
const { TabPane } = Tabs;

// 模拟数据
const mockPosts = [
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
  // 更多模拟数据...
];

const Community = () => {
  const [postContent, setPostContent] = useState('');
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [posts, setPosts] = useState(mockPosts);

  const handlePostContentChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleSubmitPost = () => {
    if (!postContent.trim() && fileList.length === 0) {
      message.error('请输入内容或上传图片');
      return;
    }

    // 模拟发布帖子
    const newPost = {
      id: Date.now(),
      author: '当前用户',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: postContent,
      images: fileList.map(file => URL.createObjectURL(file.originFileObj)),
      likes: 0,
      comments: 0,
      shares: 0,
      time: '刚刚'
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
    setFileList([]);
    message.success('发布成功！');
  };

  return (
    <PageLayout>
      <div className="community-container">
        <div className="post-editor">
          <Card className="post-card">
            <div className="post-header">
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              <span className="post-prompt">分享您的宠物故事...</span>
            </div>
            
            <TextArea
              value={postContent}
              onChange={handlePostContentChange}
              placeholder="分享您的宠物健康经验、可爱照片或有趣故事..."
              autoSize={{ minRows: 3, maxRows: 6 }}
              className="post-textarea"
            />
            
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleFileChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 8 ? null : (
                <div>
                  <PictureOutlined />
                  <div style={{ marginTop: 8 }}>上传图片</div>
                </div>
              )}
            </Upload>
            
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={() => setPreviewVisible(false)}
            >
              <img alt="预览" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            
            <div className="post-actions">
              <Button icon={<PictureOutlined />}>图片</Button>
              <Button icon={<VideoCameraOutlined />}>视频</Button>
              <Button type="primary" onClick={handleSubmitPost}>
                发布
              </Button>
            </div>
          </Card>
        </div>
        
        <Tabs defaultActiveKey="all" className="community-tabs">
          <TabPane tab="全部动态" key="all">
            <List
              itemLayout="vertical"
              size="large"
              dataSource={posts}
              renderItem={post => (
                <Card className="feed-card" key={post.id}>
                  <div className="post-author">
                    <Avatar src={post.avatar} />
                    <div className="author-info">
                      <div className="author-name">{post.author}</div>
                      <div className="post-time">{post.time}</div>
                    </div>
                  </div>
                  
                  <div className="post-content">{post.content}</div>
                  
                  {post.images && post.images.length > 0 && (
                    <div className="post-images">
                      {post.images.map((image, index) => (
                        <img key={index} src={image} alt={`图片${index + 1}`} />
                      ))}
                    </div>
                  )}
                  
                  <div className="post-stats">
                    <span><LikeOutlined /> {post.likes}</span>
                    <span><MessageOutlined /> {post.comments}</span>
                    <span><ShareAltOutlined /> {post.shares}</span>
                  </div>
                  
                  <div className="post-actions">
                    <Button icon={<LikeOutlined />}>点赞</Button>
                    <Button icon={<MessageOutlined />}>评论</Button>
                    <Button icon={<ShareAltOutlined />}>分享</Button>
                  </div>
                  
                  <div className="post-comments">
                    <Input.Search
                      placeholder="写下您的评论..."
                      enterButton="发送"
                      onSearch={value => console.log(value)}
                    />
                    
                    {post.comments > 0 && (
                      <List
                        className="comment-list"
                        header={`${post.comments} 条评论`}
                        itemLayout="horizontal"
                        dataSource={[
                          {
                            author: '评论用户',
                            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                            content: '非常可爱的猫咪！',
                            datetime: '10分钟前'
                          }
                        ]}
                        renderItem={item => (
                          <Comment
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                          />
                        )}
                      />
                    )}
                  </div>
                </Card>
              )}
            />
          </TabPane>
          <TabPane tab="热门话题" key="hot">
            {/* 热门话题内容 */}
          </TabPane>
          <TabPane tab="健康经验" key="health">
            {/* 健康经验内容 */}
          </TabPane>
          <TabPane tab="我的关注" key="following">
            {/* 关注内容 */}
          </TabPane>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default Community; 