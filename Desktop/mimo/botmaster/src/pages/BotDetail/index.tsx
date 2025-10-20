import React, { useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './styles.scss';

// 机器人数据类型
interface BotData {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  token: string;
}

const BotDetail: React.FC = () => {
  const navigate = useNavigate();
  const { botId } = useParams<{ botId: string }>();

  // 模拟机器人数据
  const [botData] = useState<BotData>({
    id: botId || '8345592241',
    name: 'Test',
    username: '@Hhhhhhhhhhhhh111_bot',
    avatar:
      'https://cdn5.telesco.pe/file/sO5uwSIJ4E1gU3KbZcysNNLG-WIAdU5eFmjvOgIrqRuF507ULwzeaZSUh8_dQOsiojaRp3UUu-BDPSWd77KSmyRT4x1uJqYEtN0-_lIz2lVcdcrosZ7Yu-iuQxh62srVZ5o26VBHx8SN2v1dhWvVbQWjiboJujW0NVqC5gtWEQXmLk71_UTWp1lwLqqbru45jWluoJwLd_3qB2NtwXYiGSsMS5sRiA2ceTC6_D2V_aVt27rpG4FN1K_XcNa3iq4gY5PDgZZ3o72gooVBp_AJ0-USdTJ-aJS_U2b3f1LO-yDfnAZN9C3Fs2NI_PaTVO_iG0jkbl3MLt_nVLLfZ_OR9Q.jpg',
    token: '8345592241:AAGrPdBIUrJpQkJMRPQqFmADb3dZje8D7Sg',
  });

  const [toast, setToast] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 复制 Token
  const handleCopyToken = async () => {
    try {
      await navigator.clipboard.writeText(botData.token);
      setToast({ type: 'success', text: 'Copied' });
      setTimeout(() => setToast(null), 1600);
    } catch (e) {
      setToast({ type: 'error', text: 'Copy failed' });
      setTimeout(() => setToast(null), 1600);
    }
  };

  // 简易确认
  const confirm = (message: string) => {
    // 使用原生 confirm 以避免 UI 依赖
    return Promise.resolve(window.confirm(message));
  };

  // 撤销 Token
  const handleRevokeToken = async () => {
    const ok = await confirm('Are you sure you want to revoke this token? This action cannot be undone.');
    if (ok) {
      setToast({ type: 'success', text: 'Token revoked successfully' });
      setTimeout(() => setToast(null), 1600);
    }
  };

  // 删除机器人
  const handleDeleteBot = async () => {
    const ok = await confirm('Are you sure you want to delete this bot? This action cannot be undone.');
    if (ok) {
      setToast({ type: 'success', text: 'Bot deleted successfully' });
      setTimeout(() => {
        setToast(null);
        navigate('/');
      }, 900);
    }
  };

  // Token 显示（默认明文展示，UI 点击复制/撤销）
  const tokenMasked = useMemo(() => botData.token.replace(/./g, '•'), [botData.token]);

  return (
    <div id="aj_content">
      <main className="tm-main">
        <section className="tm-main-intro">
          <div className="tr-bot-anchor">
            <img src={botData.avatar} className="tm-main-intro-picture tr-bot-avatar" />
            <h1 className="tm-main-intro-header tr-bot-name">{botData.name}</h1>
          </div>
          <p
            className="tm-main-intro-text tm-username-link js-usernames"
            data-href={`https://t.me/${botData.username.replace('@', '')}?profile`}
            style={{ maxWidth: '312px' }}
          >
            {botData.username}
          </p>
        </section>

        <section className="tm-section tm-menu-items">
          <div className="tm-api-token-wrap">
            <div className="tm-api-token">
              <div className="js-spoiler js-spoiler-revealed" style={{ position: 'relative' }}>{botData.token}</div>
            </div>
            <div className="tm-api-token-actions">
              <div className="tm-active-button" onClick={handleCopyToken}>Copy</div>
              <div className="tm-revoke-button" onClick={handleRevokeToken}>Revoke</div>
            </div>
          </div>
          <p className="help-text link-chevrons">
            Access the API using this token. Keep your token secure and store it safely, anyone can use it to control your bot.{' '}
            <a href="https://core.telegram.org/bots/api#authorizing-your-bot" target="_blank" rel="noopener">Read more</a>
          </p>
        </section>

        <section className="tm-section  tm-menu-items">
          <div className="tm-section-header">
            <h2 className="tm-section-header-text">Settings</h2>
          </div>
          <div className="tm-table-wrap">
            <Link className="tm-row tm-row-link" to={`/botfather/bot/${botData.id}/profile`}>
              <span className="tm-icon" style={{ ['--icon-s' as any]: 'var(--image-url-bot-info)' }}></span>
              <span>Edit Info</span>
            </Link>
            <Link className="tm-row tm-row-link" to={`/botfather/bot/${botData.id}/commands`}>
              <span className="tm-icon" style={{ ['--icon-s' as any]: 'var(--image-url-bot-commands)' }}></span>
              <span>Commands</span>
            </Link>
            <Link className="tm-row tm-row-link" to={`/botfather/bot/${botData.id}/apps`}>
              <span className="tm-icon" style={{ ['--icon-s' as any]: 'var(--image-url-mini-apps)' }}></span>
              <span>Mini Apps</span>
            </Link>
            <Link className="tm-row tm-row-link" to={`/botfather/bot/${botData.id}/settings`}>
              <span className="tm-icon" style={{ ['--icon-s' as any]: 'var(--image-url-bot)' }}></span>
              <span>Bot Settings</span>
            </Link>
            <Link className="tm-row tm-row-link" to={`/botfather/bot/${botData.id}/games`}>
              <span className="tm-icon" style={{ ['--icon-s' as any]: 'var(--image-url-games)' }}></span>
              <span>Games</span>
            </Link>
          </div>
        </section>

        <section className="tm-section  tm-menu-items">
          <div className="tm-section-header">
            <h2 className="tm-section-header-text">Monetization</h2>
          </div>
          <div className="tm-table-wrap">
            <Link className="tm-row tm-row-link" to={`/botfather/bot/${botData.id}/payments`}>
              <span className="tm-icon" style={{ ['--icon-s' as any]: 'var(--image-url-payments)' }}></span>
              <span>Payments</span>
            </Link>
            <Link className="tm-row tm-row-link" to={`/botfather/bot/${botData.id}/stars`}>
              <span className="tm-icon" style={{ ['--icon-s' as any]: 'var(--image-url-stars-outline)' }}></span>
              <span>Telegram Stars</span>
            </Link>
          </div>
          <p className="help-text link-chevrons">
            Telegram Stars are designed for digital content and in-app items. If you want to sell physical goods, use Payments instead. <a href="https://core.telegram.org/bots/payments" target="_blank" rel="noopener">Read more</a>
          </p>
        </section>

        <section className="tm-section tm-menu-items">
          <div className="tm-section-header">
            <h2 className="tm-section-header-text">Actions</h2>
          </div>
          <div className="tm-table-wrap">
            <Link className="tm-row tm-row-add" to={`/botfather/bot/${botData.id}/transfer`}>
              <span className="tm-icon" style={{ ['--icon-s' as any]: 'var(--image-url-transfer-ownership)' }}></span>
              <span>Transfer Ownership</span>
            </Link>
            <a className="tm-row tm-row-destructive js-delete-button" onClick={handleDeleteBot}>
              <span className="tm-icon" style={{ ['--icon-s' as any]: 'var(--image-url-trash)' }}></span>
              <span>Delete Bot</span>
            </a>
          </div>
        </section>

        <section className="tm-section">
          <p className="help-text" style={{ textAlign: 'center' }}>
            By publishing this bot, you agree to the <a href="https://telegram.org/tos/bot-developers" target="_blank" rel="noopener">Telegram Terms of Service for Developers</a>.
          </p>
        </section>
      </main>

      {/* 轻量 Toast */}
      <div className="tm-toast-container">
        <div className={[
          'tm-toast',
          toast ? 'tm-toast-show' : '',
          toast?.type === 'error' ? 'tm-toast-error' : toast?.type === 'success' ? 'tm-toast-success' : '',
        ].join(' ')}>
          {toast?.text}
        </div>
      </div>
    </div>
  );
};

export default BotDetail;
