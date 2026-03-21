import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  background: 'rgba(255, 255, 255, 0.65)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  padding: '10px 20px',
  borderRadius: '999px',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  marginLeft: '16px',
  transition: 'all 0.3s ease',
};

const buttonsWrapStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  fontSize: '13px',
  fontWeight: '900',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
};

const dividerStyle = {
  color: '#cbd5e1',
};

const getButtonStyle = (isActive) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  color: isActive ? '#166534' : '#64748b',
  fontWeight: isActive ? '900' : '600',
  textDecoration: isActive ? 'underline' : 'none',
  textUnderlineOffset: '4px',
  transition: 'color 0.2s ease',
  fontSize: 'inherit',
  letterSpacing: 'inherit',
  textTransform: 'inherit',
});

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  const currentLanguage = i18n.language;
  const isEn = currentLanguage === 'en' || currentLanguage.startsWith('en');
  const isOr = currentLanguage === 'or';

  return (
    <div style={containerStyle} className="global-lang-switcher">
      <Globe size={20} style={{ color: '#059669', flexShrink: 0 }} />
      <div style={buttonsWrapStyle}>
        <button
          onClick={() => changeLanguage('en')}
          style={getButtonStyle(isEn)}
          onMouseEnter={e => { if (!isEn) e.target.style.color = '#059669'; }}
          onMouseLeave={e => { if (!isEn) e.target.style.color = '#64748b'; }}
        >
          EN
        </button>
        <span style={dividerStyle}>|</span>
        <button
          onClick={() => changeLanguage('or')}
          style={getButtonStyle(isOr)}
          onMouseEnter={e => { if (!isOr) e.target.style.color = '#059669'; }}
          onMouseLeave={e => { if (!isOr) e.target.style.color = '#64748b'; }}
        >
          ଓଡ଼ିଆ
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
