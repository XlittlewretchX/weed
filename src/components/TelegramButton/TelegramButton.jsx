import './TelegramButton.css';

function TelegramButton({
  href,
  children = 'Написать во ВКонтакте',
}) {
  const normalizedHref = typeof href === 'string' ? href.trim() : '';
  const url = normalizedHref.startsWith('http')
    ? normalizedHref
    : `https://vk.me/${normalizedHref.replace(/^@/, '')}`;
  const ariaLabel = typeof children === 'string'
    ? `${children} (откроется в новой вкладке)`
    : 'Открыть чат во ВКонтакте (откроется в новой вкладке)';

  if (!normalizedHref || url === 'https://vk.me/') {
    return null;
  }

  return (
    <div className="telegram-button-wrap">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="telegram-button"
        aria-label={ariaLabel}
      >
        <span className="telegram-button__icon" aria-hidden>
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#2787F5" />
            <text
              x="12"
              y="15.4"
              textAnchor="middle"
              fontSize="8.5"
              fontWeight="700"
              fill="#FFFFFF"
              fontFamily="Arial, sans-serif"
            >
              VK
            </text>
          </svg>
        </span>
        <span className="telegram-button__text">{children}</span>
      </a>
    </div>
  );
}

export default TelegramButton;
