import { useMemo, useRef, useEffect, useState } from 'react';
import './BackgroundHearts.css';

const HEART = '♥';

function BackgroundHearts({ count = 50 }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(max-width: 600px)').matches
  ));
  const [isTablet, setIsTablet] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches
  ));

  const hearts = useMemo(() => {
    if (isMobile) {
      return [];
    }

    const effectiveCount = isTablet ? Math.min(count, 90) : count;

    return Array.from({ length: effectiveCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 12 + Math.random() * 20,
      opacity: 0.08 + Math.random() * 0.12,
      rotation: (Math.random() - 0.5) * 30,
      delay: Math.random() * 2,
    }));
  }, [count, isMobile, isTablet]);

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 600px)');
    const tabletMq = window.matchMedia('(max-width: 1024px)');

    const update = () => {
      setIsMobile(mobileMq.matches);
      setIsTablet(tabletMq.matches);
    };

    update();
    if (mobileMq.addEventListener) {
      mobileMq.addEventListener('change', update);
      tabletMq.addEventListener('change', update);
    } else {
      mobileMq.addListener(update);
      tabletMq.addListener(update);
    }

    return () => {
      if (mobileMq.removeEventListener) {
        mobileMq.removeEventListener('change', update);
        tabletMq.removeEventListener('change', update);
      } else {
        mobileMq.removeListener(update);
        tabletMq.removeListener(update);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobile) return undefined;

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
  }, [isMobile]);

  if (isMobile) {
    return null;
  }

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
