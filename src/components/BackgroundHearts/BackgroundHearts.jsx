import { useMemo, useRef, useEffect } from 'react';
import './BackgroundHearts.css';

const HEART = '♥';

function BackgroundHearts({ count = 50 }) {
  const containerRef = useRef(null);

  const hearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 12 + Math.random() * 20,
      opacity: 0.08 + Math.random() * 0.12,
      rotation: (Math.random() - 0.5) * 30,
      delay: Math.random() * 2,
    }));
  }, [count]);

  useEffect(() => {
    const setHeight = () => {
      if (!containerRef.current) return;
      const content = document.querySelector('.app__content');
      const height = content ? content.scrollHeight : document.documentElement.scrollHeight;
      containerRef.current.style.height = `${height}px`;
    };
    setHeight();
    window.addEventListener('resize', setHeight);
    const content = document.querySelector('.app__content');
    const observer = new ResizeObserver(setHeight);
    if (content) observer.observe(content);
    const t = setTimeout(setHeight, 150);
    return () => {
      window.removeEventListener('resize', setHeight);
      observer.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <div ref={containerRef} className="background-hearts" aria-hidden="true">
      {hearts.map(({ id, left, top, size, opacity, rotation, delay }) => (
        <span
          key={id}
          className="background-hearts__heart"
          style={{
            '--left': `${left}%`,
            '--top': `${top}%`,
            '--size': `${size}px`,
            '--opacity': opacity,
            '--rotation': `${rotation}deg`,
            '--delay': `${delay}s`,
          }}
        >
          {HEART}
        </span>
      ))}
    </div>
  );
}

export default BackgroundHearts;
