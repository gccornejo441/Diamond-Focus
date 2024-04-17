import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { Menu, Item, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

// Correctly typed styles
const styles = {
  collapsible: {
    backgroundColor: '#777',
    color: 'white',
    cursor: 'pointer',
    padding: '18px',
    width: '100%',
    border: 'none',
    textAlign: 'left',
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
  } as CSSProperties,
  input: {
    padding: '10px',
    width: '95%',
    marginBottom: '10px',
    fontSize: '15px'
  } as CSSProperties,
};

const MENU_ID = 'collapsible-context-menu';

interface CollapsibleItem {
  id: number;
  content: string;
  isActive: boolean;
}

const Collapsible: React.FC = () => {
  const [items, setItems] = useState<CollapsibleItem[]>([]);
  const [newItemContent, setNewItemContent] = useState('');
  const { show } = useContextMenu({ id: MENU_ID });
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('collapsibleItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('collapsibleItems', JSON.stringify(items));
  }, [items]);

  const toggleCollapsible = (index: number) => {
    const newItems = items.map((item, i) => {
      if (i === index) {
        item.isActive = !item.isActive;
      }
      return item;
    });
    setItems(newItems);

    const content = contentRefs.current[index];
    if (content) {
      content.style.maxHeight = newItems[index].isActive ? `${content.scrollHeight}px` : '0px';
    }
  };

  const handleContextMenu = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    show({
      id: MENU_ID,
      event,
      props: {
        index
      }
    });
  };

  const addItem = () => {
    if (newItemContent.trim()) {
      const newItem = { id: Date.now(), content: newItemContent, isActive: false };
      setItems([...items, newItem]);
      setNewItemContent('');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItemContent(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addItem();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a new task..."
        value={newItemContent}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={styles.input}
      />
      {items.map((item, index) => (
        <div key={item.id}>
          <button
            style={{ ...styles.collapsible, ...(item.isActive ? styles.active : {}) }}
            onClick={() => toggleCollapsible(index)}
            onContextMenu={(e) => handleContextMenu(e, index)}
          >
            {item.content}
          </button>
          <div ref={(el) => contentRefs.current[index] = el} style={styles.content}>
            {item.content}
          </div>
        </div>
      ))}
      <Menu id={MENU_ID}>
        <Item onClick={() => console.log('Edit item')}>Edit</Item>
        <Item onClick={() => console.log('Delete item')}>Delete</Item>
      </Menu>
    </div>
  );
};

export default Collapsible;
