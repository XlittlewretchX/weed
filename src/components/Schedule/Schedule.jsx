import './Schedule.css';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

function Schedule({
  title = 'Расписание дня',
  items = [],
}) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="schedule">
      {title && (
        <ScrollReveal direction="top" className="schedule__reveal">
          <h2 className="schedule__title">{title}</h2>
        </ScrollReveal>
      )}
      <div className="schedule__table">
        {items.map((item, index) => (
          <ScrollReveal
            key={`${item.time}-${item.title}-${index}`}
            className="schedule__reveal"
            direction={index % 2 === 0 ? 'left' : 'right'}
            delay={90 * index}
          >
            <div className="schedule__row">
              {item.iconSrc ? (
                <img
                  className="schedule__icon"
                  src={item.iconSrc}
                  alt={item.iconAlt || ''}
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
              <div className="schedule__time">
                {item.time}
              </div>
              <div className="schedule__event">
                <div className="schedule__event-title">
                  {item.title}
                </div>
                <div className="schedule__event-description">
                  {item.description}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

export default Schedule;
