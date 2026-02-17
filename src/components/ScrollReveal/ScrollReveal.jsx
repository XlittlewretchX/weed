import { useRef, useEffect, useState } from 'react';
import './ScrollReveal.css';

function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directionClass = direction === 'left' ? 'scroll-reveal--from-left' : direction === 'right' ? 'scroll-reveal--from-right' : 'scroll-reveal--from-bottom';

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${directionClass} ${isVisible ? 'scroll-reveal--visible' : ''} ${className}`.trim()}
      style={{ '--delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
