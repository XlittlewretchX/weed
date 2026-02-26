import { useEffect, useRef, useState } from 'react';
import './ScrollReveal.css';

const DIRECTIONS = new Set(['top', 'bottom', 'left', 'right']);

function ScrollReveal({
  children,
  className = '',
  direction = 'bottom',
  delay = 0,
  duration,
  distance,
  cascade = false,
  cascadeStep = 100,
  once = true,
  threshold = 0.14,
  rootMargin = '0px 0px -10% 0px',
}) {
  const elementRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const normalizedDirection = DIRECTIONS.has(direction) ? direction : 'bottom';
  const shouldShow = once ? hasShown : isInView;

  useEffect(() => {
    const node = elementRef.current;

    if (!node) {
      return undefined;
    }

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      setHasShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsInView(visible);

        if (visible) {
          setHasShown(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [once, rootMargin, threshold]);

  const style = {
    '--delay': `${Math.max(0, Number(delay) || 0)}ms`,
    ...(duration ? { '--duration': `${Math.max(120, Number(duration) || 0)}ms` } : {}),
    ...(distance ? { '--distance': typeof distance === 'number' ? `${distance}px` : distance } : {}),
    ...(cascade ? { '--cascade-step': `${Math.max(40, Number(cascadeStep) || 0)}ms` } : {}),
  };

  return (
    <div
      ref={elementRef}
      className={[
        'scroll-reveal',
        `scroll-reveal--from-${normalizedDirection}`,
        cascade ? 'scroll-reveal--cascade' : '',
        shouldShow ? 'scroll-reveal--visible' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
