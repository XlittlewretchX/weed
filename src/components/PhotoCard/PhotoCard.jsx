import './PhotoCard.css';

function PhotoCard({
  photoSrc,
  photoAlt = '',
  title,
  description,
  frameSrc = `${process.env.PUBLIC_URL || ''}/image/card_frame.png`,
  isLandscape = false,
  loading = 'lazy',
  decoding = 'async',
}) {
  return (
    <div className="card photo-card">
      <div className={`photo-card__frame-wrapper ${isLandscape ? 'photo-card--landscape' : ''}`}>
        <img
          className="photo-card__frame"
          src={frameSrc}
          alt=""
          aria-hidden="true"
          loading={loading}
          decoding={decoding}
        />
        <img
          className="photo-card__photo"
          src={photoSrc}
          alt={photoAlt}
          loading={loading}
          decoding={decoding}
        />
        {(title || description) && (
          <div className="photo-card__caption">
            {title && <div className="photo-card__title">{title}</div>}
            {description && (
              <div className="photo-card__description">{description}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PhotoCard;
