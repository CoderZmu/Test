import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageUploader, Toast } from 'antd-mobile';
import type { ImageUploadItem } from 'antd-mobile/es/components/image-uploader';
import botfatherUploadAvatar from '@/assets/images/botfather-upload-avatar.png';
import './styles.scss';

interface FormData {
  title: string;
  about: string;
  username: string;
}

const CreateBot: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    about: '',
    username: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // 验证表单数据
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = '请输入机器人名称';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
    } else if (!formData.username.endsWith('bot')) {
      newErrors.username = '用户名必须以 bot 结尾';
    } else if (!/^[a-zA-Z][a-zA-Z0-9_]{4,}bot$/.test(formData.username)) {
      newErrors.username = '用户名格式不正确，至少5个字符，以字母开头';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 处理输入变化
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // 模拟图片上传
  const mockUpload = async (file: File): Promise<ImageUploadItem> => {
    // 验证文件类型
    if (!file.type.startsWith('image/')) {
      Toast.show({
        icon: 'fail',
        content: '请选择图片文件',
      });
      throw new Error('Invalid file type');
    }
    
    // 验证文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      Toast.show({
        icon: 'fail',
        content: '图片大小不能超过 5MB',
      });
      throw new Error('File too large');
    }

    // 生成预览 URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({
          url: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    });
  };

  // 提交表单
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    try {
      // 这里添加创建机器人的 API 调用
      console.log('创建机器人:', {
        ...formData,
        avatar: fileList[0]?.url
      });

      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      Toast.show({
        icon: 'success',
        content: '机器人创建成功！',
      });

      // 延迟跳转到首页
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('创建机器人失败:', error);
      Toast.show({
        icon: 'fail',
        content: '创建机器人失败，请重试',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="aj_content">
      <main className="tm-main">
        <section className="tm-main-intro">
          {/* 使用 antd-mobile ImageUploader */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ImageUploader
              value={fileList}
              onChange={setFileList}
              upload={mockUpload}
              maxCount={1}
              style={{
                '--cell-size': '80px',
              } as React.CSSProperties}
            >
              {fileList.length === 0 && (
                <img 
                  src={botfatherUploadAvatar} 
                  className="tm-main-intro-picture js-upload-button" 
                  data-target="bot_userpic"
                  alt="Upload avatar"
                />
              )}
            </ImageUploader>
          </div>
          <h1 className="tm-main-intro-header">New bot</h1>
          <p className="tm-main-intro-text" style={{ maxWidth: '312px' }}>
            Enter a name, description and username to&nbsp;create&nbsp;a&nbsp;new&nbsp;bot.
          </p>
        </section>

        {/* 使用原生表单 */}
        <form id="bot_form" className="tm-section">
          {/* Bot Name */}
          <div className="tm-field" style={{ borderRadius: '6px 6px 0 0', marginBottom: '1px' }}>
            <input 
              type="text" 
              maxLength={64} 
              className="form-control tm-input" 
              name="title" 
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Bot Name" 
              autoComplete="off" 
              spellCheck="false" 
              enterKeyHint="next"
            />
            <span className="tm-search-loading">
              <svg className="circle-progress-wrap" viewBox="0 0 22 22" width="22px" height="22px">
                <circle className="circle-progress" cx="50%" cy="50%" strokeDashoffset="62"></circle>
              </svg>
            </span>
            <span className="icon-before icon-search-clear tm-search-clear js-form-clear"></span>
          </div>

          {/* About (Optional) */}
          <div className="tm-field" style={{ borderRadius: '0 0 6px 6px' }}>
            <textarea 
              maxLength={120} 
              rows={1} 
              className="form-control tm-input" 
              name="about" 
              value={formData.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
              placeholder="About (Optional)" 
              autoComplete="off" 
              enterKeyHint="next" 
              style={{ height: '42px' }}
            />
            <span className="icon-before icon-search-clear tm-search-clear js-form-clear"></span>
          </div>

          {/* Username */}
          <div className="tm-field" style={{ marginTop: '16px' }}>
            <span className="tm-field-const-prefix">t.me/</span>
            <input 
              type="text" 
              className="form-control tm-input" 
              name="username" 
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="username_bot" 
              autoComplete="off" 
              spellCheck="false" 
              enterKeyHint="done"
            />
          </div>
          
          {/* 错误提示 */}
          {errors.username && (
            <p className="hint-text hint-text-error" data-for="username">
              {errors.username}
            </p>
          )}
          
          {/* 帮助文本 */}
          <p className="help-text">
            Choose a username for your bot. It must end in `bot`. 
            Like this, for example: TetrisBot or tetris_bot.
          </p>
        </form>
      </main>

      {/* 固定在底部的提交按钮 */}
      <div className="fixed-bottom-button">
        <button
          className="btn btn-primary"
          type="button"
          disabled={loading}
          onClick={handleSubmit}
          style={{ width: '100%', height: '48px', fontSize: '16px' }}
        >
          {loading ? 'Creating...' : 'Create Bot'}
        </button>
      </div>
    </div>
  );
};

export default CreateBot;

