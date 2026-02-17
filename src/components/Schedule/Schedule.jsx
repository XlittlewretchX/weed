import './Schedule.css';

function Schedule({
  title = 'Расписание дня',
  items = [],
}) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="schedule">
      {title && <h2 className="schedule__title">{title}</h2>}
      <ul className="schedule__list">
        {items.map((item, index) => (
          <li key={index} className="schedule__item">
            <span className="schedule__time">{item.time}</span>
            <span className="schedule__description">{item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Schedule;
