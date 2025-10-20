import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';
import botfatherAvatar from '@/assets/images/botfather-avatar.png';

// 机器人数据类型
interface Bot {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  // 模拟机器人数据
  const [bots] = useState<Bot[]>([
    {
      id: '8345592241',
      name: 'Test',
      username: '@Hhhhhhhhhhh111_bot',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyNuUnfPU_blsXA3mLGVNMMTrDfuLyBSK6og&s',
    },
    {
      id: '8354954521',
      name: 'Test',
      username: '@Testttttttttt1111_bot',
    },
    {
      id: '8324717925',
      name: 'Test',
      username: '@Zzzzzkol_bot',
    },
    {
      id: '7386725013',
      name: 'goodBot',
      username: '@good84377_bot',
    },
  ]);

  const [searchValue, setSearchValue] = useState('');

  // 过滤机器人列表
  const filteredBots = bots.filter(
    (bot) =>
      bot.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      bot.username.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleCreateBot = () => {
    navigate('/create-bot');
  };

  const handleBotClick = (botId: string) => {
    navigate(`/botfather/bot/${botId}`);
  };

  // 生成头像渐变色
  const getAvatarGradient = (name: string) => {
    const gradients = [
      { from: '#53edd6', to: '#28c9b7' },
      { from: '#e0a2f3', to: '#d669ed' },
      { from: '#a0de7e', to: '#54cb68' },
      { from: '#ffa85c', to: '#ff7c3d' },
    ];
    const index = name.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  // 获取首字母
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div id="aj_content">
      <main className="tm-main">
        {/* 头部介绍区域 */}
        <section className="tm-main-intro">
          <img src={botfatherAvatar} className="tm-main-intro-picture" alt="BotFather" />
          <h1 className="tm-main-intro-header">BotFather</h1>
          <p className="tm-main-intro-text" style={{ maxWidth: '312px' }}>
            BotFather is the one bot to rule them all. Use it to create new bot accounts and manage your existing bots.{' '}
            <a href="https://core.telegram.org/bots" target="_blank" rel="noopener">
              Learn more
            </a>
          </p>
        </section>

        {/* 搜索表单 */}
        <form action="/" className="tm-section tm-main-search-form">
          <div className="icon-before icon-search tm-field tm-search-field js-main-search-field">
            <input 
              type="search" 
              className="form-control tm-input tm-search-input" 
              name="query" 
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search" 
              autoComplete="off" 
              spellCheck="false"
            />
            <span className="icon-before icon-search-clear tm-search-clear js-form-clear"></span>
          </div>
        </form>

        {/* 机器人列表区域 */}
        <section className="tm-section">
          <div className="tm-section-header">
            <h2 className="tm-section-header-text">My bots</h2>
          </div>
          
          <div className="tm-table-wrap js-results">
            {/* 创建新机器人按钮 */}
            <a className="tm-row tm-row-add" href="/create-bot" onClick={(e) => {
              e.preventDefault();
              handleCreateBot();
            }}>
              <span className="tm-icon"></span>
              <span>Create a New Bot</span>
            </a>

            {/* 机器人列表 */}
            {filteredBots.map((bot) => {
              const gradient = getAvatarGradient(bot.name);
              return (
                <a 
                  key={bot.id}
                  className="tm-row tm-row-link" 
                  href={`/botfather/bot/${bot.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleBotClick(bot.id);
                  }}
                >
                  {bot.avatar ? (
                    <img 
                      className="tm-row-pic tm-row-pic-user" 
                      src={bot.avatar} 
                      alt={bot.name}
                    />
                  ) : (
                    <img 
                      className="tm-row-pic tm-row-pic-user" 
                      src={`data:image/svg+xml;base64,${btoa(`
                        <svg width="160" height="160" preserveAspectRatio="none" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="g" x1="0%" x2="0%" y1="0%" y2="100%">
                              <stop offset="0%" stop-color="${gradient.from}"/>
                              <stop offset="100%" stop-color="${gradient.to}"/>
                            </linearGradient>
                          </defs>
                          <style>text{font:600 44px -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';-webkit-user-select:none;user-select:none}</style>
                          <rect width="100" height="100" fill="url(#g)"/>
                          <text text-anchor="middle" x="50" y="66" fill="#fff">${getInitial(bot.name)}</text>
                        </svg>
                      `)}`}
                      alt={bot.name}
                    />
                  )}
                  <div>
                    <div className="tm-row-value">{bot.name}</div>
                    <div className="tm-row-description">{bot.username}</div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* 空结果状态 */}
          {filteredBots.length === 0 && searchValue && (
            <div className="tm-table-wrap hidden js-results-empty">
              <div className="tm-row-container tm-row-results-empty">
                <img src="/img/no-result.png" width="56" height="56" alt="No results" />
                <b>No Results</b>
                <div className="js-results-empty-help"></div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
