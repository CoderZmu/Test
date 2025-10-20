import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './styles.scss';

const CommandEdit: React.FC = () => {
  const navigate = useNavigate();
  const { botId, commandName } = useParams<{ botId: string; commandName?: string }>();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang') || '';

  // 表单状态
  const [command, setCommand] = useState(commandName || '');
  const [description, setDescription] = useState('');
  
  // Scope 状态
  const [scopes, setScopes] = useState({
    users: true,
    chats: true,
    chatadmins: true,
  });

  const handleToggleScope = (scope: keyof typeof scopes) => {
    setScopes(prev => ({
      ...prev,
      [scope]: !prev[scope]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里处理保存逻辑
    console.log('Save command:', { command, description, scopes });
    // 保存后返回命令列表
    navigate(`/botfather/bot/${botId}/commands${lang ? `?lang=${lang}` : ''}`);
  };

  return (
    <div id="aj_content">
      <main className="tm-main">
        <form onSubmit={handleSubmit} className="tm-section">
          <div className="tm-section-header">
            <h2 className="tm-section-header-text">
              {commandName ? 'Edit command' : 'New command'}
            </h2>
          </div>
          
          <div className="tm-field" style={{ borderRadius: '6px 6px 0 0', marginBottom: '1px' }}>
            <span className="tm-field-const-prefix">/</span>
            <input
              maxLength={32}
              id="command"
              type="text"
              className="form-control tm-input"
              name="command"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="command"
              autoComplete="off"
              spellCheck={false}
              disabled={!!commandName} // 编辑时不能修改命令名
            />
          </div>
          
          <div className="tm-field" style={{ borderRadius: '0 0 6px 6px' }}>
            <input
              maxLength={256}
              id="desc"
              type="text"
              className="form-control tm-input"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />
          </div>

          {/* 添加保存按钮 */}
          <div className="tm-form-actions">
            <button type="submit" className="tm-btn tm-btn-primary" disabled={!command.trim()}>
              {commandName ? 'Save' : 'Add'}
            </button>
            <button 
              type="button" 
              className="tm-btn tm-btn-secondary"
              onClick={() => navigate(`/botfather/bot/${botId}/commands${lang ? `?lang=${lang}` : ''}`)}
            >
              Cancel
            </button>
          </div>
        </form>

        <section className="tm-section">
          <div className="tm-section-header">
            <h2 className="tm-section-header-text">Scope</h2>
          </div>
          
          <div className="tm-table-wrap">
            <div 
              className="tm-row tm-row-toggle" 
              onClick={() => handleToggleScope('users')}
            >
              <span>Direct Messages</span>
              <div style={{ flexGrow: 1 }} />
              <div className={`tm-toggle ${scopes.users ? 'tm-toggle-on' : ''}`}>
                <div className="tm-toggle-handle" />
              </div>
            </div>
            
            <div 
              className="tm-row tm-row-toggle"
              onClick={() => handleToggleScope('chats')}
            >
              <span>Group Chats</span>
              <div style={{ flexGrow: 1 }} />
              <div className={`tm-toggle ${scopes.chats ? 'tm-toggle-on' : ''}`}>
                <div className="tm-toggle-handle" />
              </div>
            </div>
            
            <div 
              className="tm-row tm-row-toggle"
              onClick={() => handleToggleScope('chatadmins')}
            >
              <span>Group Administrators</span>
              <div style={{ flexGrow: 1 }} />
              <div className={`tm-toggle ${scopes.chatadmins ? 'tm-toggle-on' : ''}`}>
                <div className="tm-toggle-handle" />
              </div>
            </div>
          </div>
          
          <p className="help-text link-chevrons">
            Choose who sees this command.&nbsp;You can set up more sophisticated logic through API.{' '}
            <a 
              href="https://core.telegram.org/bots/api#setmycommands" 
              target="_blank" 
              rel="noopener"
            >
              Read More
            </a>
          </p>
        </section>

        <a 
          className="tm-bot-anchor tr-bot-anchor"
          onClick={() => navigate(`/botfather/bot/${botId}`)}
        >
          <img 
            className="tr-bot-avatar" 
            src="https://cdn5.telesco.pe/file/sO5uwSIJ4E1gU3KbZcysNNLG-WIAdU5eFmjvOgIrqRuF507ULwzeaZSUh8_dQOsiojaRp3UUu-BDPSWd77KSmyRT4x1uJqYEtN0-_lIz2lVcdcrosZ7Yu-iuQxh62srVZ5o26VBHx8SN2v1dhWvVbQWjiboJujW0NVqC5gtWEQXmLk71_UTWp1lwLqqbru45jWluoJwLd_3qB2NtwXYiGSsMS5sRiA2ceTC6_D2V_aVt27rpG4FN1K_XcNa3iq4gY5PDgZZ3o72gooVBp_AJ0-USdTJ-aJS_U2b3f1LO-yDfnAZN9C3Fs2NI_PaTVO_iG0jkbl3MLt_nVLLfZ_OR9Q.jpg"
            alt="Bot Avatar"
          />
          <span className="tr-bot-name">Test</span>
        </a>
      </main>
    </div>
  );
};

export default CommandEdit;

