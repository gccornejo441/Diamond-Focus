import React, { useState, useRef, CSSProperties } from 'react';

// Correctly typed styles
const styles = {
  collapsible: {
    backgroundColor: '#777',
    color: 'white',
    cursor: 'pointer' as const,
    padding: '18px',
    width: '100%',
    border: 'none',
    textAlign: 'left' as const,
    outline: 'none',
    fontSize: '15px'
  } as CSSProperties,
  active: {
    backgroundColor: '#555'
  } as CSSProperties,
  content: {
    padding: '0 18px',
    maxHeight: '0',
    overflow: 'hidden',
    transition: 'max-height 0.2s ease-out',
    backgroundColor: '#f1f1f1'
  } as CSSProperties
};

const Collapsible: React.FC = () => {
  const [isActive, setIsActive] = useState<boolean[]>([false, false, false]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleCollapsible = (index: number) => {
    const newIsActive = [...isActive];
    newIsActive[index] = !newIsActive[index];
    setIsActive(newIsActive);

    const content = contentRefs.current[index];
    if (content) {
      content.style.maxHeight = newIsActive[index] ? `${content.scrollHeight}px` : '0px';
    }
  };

  return (
    <div>
      <h2>Animated Collapsibles</h2>
      <p>A Collapsible:</p>
      {['Open Collapsible', 'Open Section 1', 'Open Section 2', 'Open Section 3'].map((label, index) => (
        <div key={index}>
          <button
            style={{...styles.collapsible, ...(isActive[index] ? styles.active : {})}}
            onClick={() => toggleCollapsible(index)}
          >
            {label}
          </button>
          <div
            ref={el => contentRefs.current[index] = el}
            style={styles.content}
          >
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Collapsible;
