import React from 'react';

const Loader = ({ text = 'Loading system data...', fullPage = false }) => {
  const content = (
    <div className="loader-container">
      <div className="spinner" />
      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{text}</p>
    </div>
  );

  if (fullPage) {
    return (
      <div
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
