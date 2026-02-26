import { useEffect, useState } from 'react';
import './CountdownTimer.css';

const EVENT_DATE_MS = new Date('2026-07-25T16:30:00+03:00').getTime();

const getTimeLeft = () => {
  const totalSeconds = Math.max(0, Math.floor((EVENT_DATE_MS - Date.now()) / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const formatValue = (value, minimumLength = 2) => String(value).padStart(minimumLength, '0');

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setTimeLeft(getTimeLeft);
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  const units = [
    { key: 'days', value: timeLeft.days, label: 'дней', length: 2 },
    { key: 'hours', value: timeLeft.hours, label: 'часов', length: 2 },
    { key: 'minutes', value: timeLeft.minutes, label: 'минут', length: 2 },
    { key: 'seconds', value: timeLeft.seconds, label: 'секунд', length: 2 },
  ];

  return (
    <section className="countdown-timer" aria-label="Обратный отсчёт до праздника">
      <div className="countdown-timer__row countdown-timer__row--values">
        {units.map((unit) => (
          <div key={`${unit.key}-value`} className="countdown-timer__cell countdown-timer__value">
            {formatValue(unit.value, unit.length)}
          </div>
        ))}
      </div>
      <div className="countdown-timer__row countdown-timer__row--labels">
        {units.map((unit) => (
          <div key={`${unit.key}-label`} className="countdown-timer__cell countdown-timer__label">
            {unit.label}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CountdownTimer;