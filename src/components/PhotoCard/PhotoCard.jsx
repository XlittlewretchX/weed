import './PhotoCard.css';

function PhotoCard({
  photoSrc,
  photoAlt = '',
  title,
  description,
  frameSrc = `${process.env.PUBLIC_URL || ''}/image/image.png`,
  isLandscape = false,
}) {
  return (
    <div className={`photo-card ${isLandscape ? 'photo-card--landscape' : ''}`}>
      <div className="photo-card__frame-wrapper">
        <img className="photo-card__frame" src={frameSrc} alt="" />
        <img
          className="photo-card__photo"
          src={photoSrc}
          alt={photoAlt}
        />
      </div>
      {(title || description) && (
        <div className="photo-card__caption">
          {title && <div className="photo-card__title">{title}</div>}
          {description && (
            <div className="photo-card__description">{description}</div>
          )}
        </div>
      )}
    </div>
  );
}

export default PhotoCard;
