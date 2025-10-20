import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.scss';

interface Command {
  command: string;
  description: string;
}

const CommandDetail: React.FC = () => {
  const navigate = useNavigate();
  const { botId } = useParams<{ botId: string }>();
  
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLang, setSelectedLang] = useState('');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [commands, setCommands] = useState<Command[]>([
    { command: 'test', description: '111111' },
    { command: 'help', description: 'Dddddddddddd' }
  ]);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleDeleteCommand = (command: string) => {
    if (window.confirm(`确定要删除命令 /${command} 吗？`)) {
      setCommands(commands.filter(cmd => cmd.command !== command));
    }
  };

  const handleAddCommand = () => {
    navigate(`/botfather/bot/${botId}/commandcreate?lang=${selectedLang}`);
  };

  const handleCommandClick = (command: string) => {
    if (!isEditing) {
      navigate(`/botfather/bot/${botId}/command/${command}?lang=${selectedLang}`);
    }
  };

  return (
    <div id="aj_content">
      <main className="tm-main">
        <section className="tm-main-intro">
          <div 
            style={{ 
              maskImage: 'var(--image-url-bot-commands)',
              WebkitMaskImage: 'var(--image-url-bot-commands)',
              maskSize: '100%',
              WebkitMaskSize: '100%',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat'
            }} 
            className="tm-main-intro-picture tm-accent-icon"
          />
          <h1 className="tm-main-intro-header">Commands</h1>
          <p className="tm-main-intro-text" style={{ maxWidth: '312px' }}>
            A command is a simple /keyword that tells the bot what to do.{' '}
            <a 
              href="https://core.telegram.org/bots/features#commands" 
              target="_blank" 
              rel="noopener"
            >
              Read more
            </a>
          </p>
        </section>

        <section className="tm-section tm-commands-page">
          <div className="tm-section-header js-commands-header">
            <h2 className="tm-section-header-text">List</h2>
            
            <div className="btn-group tm-dropdown" style={{ position: 'static' }}>
              <button 
                className="tm-lang-dropdown-btn tm-dropdown-highlight"
                onClick={() => setShowLangDropdown(!showLangDropdown)}
              >
                {selectedLang || 'Default'}
              </button>
              {showLangDropdown && (
                <>
                  <div 
                    className="dropdown-backdrop"
                    onClick={() => setShowLangDropdown(false)}
                  />
                  <ul className="dropdown-menu tm-lang-dropdown show">
                    <li>
                      <a 
                        href="?choose_lang" 
                        className="dropdown-menu-item tm-lang-add"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowLangDropdown(false);
                        }}
                      >
                        Add Localization
                      </a>
                    </li>
                    <li className="selected">
                      <a 
                        className="dropdown-menu-item js-set-lang"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedLang('');
                          setShowLangDropdown(false);
                        }}
                      >
                        Default Localization
                      </a>
                    </li>
                  </ul>
                </>
              )}
            </div>

            <div className="grow-1" />
            
            <div 
              className="tm-section-action edit-button"
              onClick={handleToggleEdit}
            >
              {isEditing ? 'Done' : 'Edit'}
            </div>
          </div>

          <div 
            className={`tm-menu-items js-edit-command-list tm-table-wrap ${
              !isEditing ? 'list-prevent-edit' : ''
            }`}
          >
            <a 
              className="tm-row tm-row-add"
              onClick={(e) => {
                e.preventDefault();
                handleAddCommand();
              }}
            >
              Add a Command
            </a>

            {commands.map((cmd) => (
              <div
                key={cmd.command}
                data-command={cmd.command}
                className="tm-row tm-row-link js-sortable"
                onClick={() => handleCommandClick(cmd.command)}
              >
                <span 
                  className="tm-icon" 
                  style={{ 
                    maskImage: 'var(--image-url-rearrange)',
                    WebkitMaskImage: 'var(--image-url-rearrange)'
                  }}
                />
                <span className="js-command-name">/{cmd.command}</span>
                <span className="tm-row-desc js-command-desc grow-1">
                  {cmd.description}
                </span>
                <span 
                  className="tm-row-close"
                  onClick={(e) => {
                    if (isEditing) {
                      e.stopPropagation();
                      handleDeleteCommand(cmd.command);
                    }
                  }}
                />
              </div>
            ))}
          </div>

          <p className="help-text link-chevrons">
            Explore more functionality with the API.{' '}
            <a 
              href="https://core.telegram.org/bots/api#setmycommands" 
              target="_blank" 
              rel="noopener"
            >
              Read More
            </a>
          </p>
        </section>
      </main>

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
    </div>
  );
};

export default CommandDetail;

