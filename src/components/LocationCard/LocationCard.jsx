import './LocationCard.css';

function LocationCard({
  imageSrc,
  imageAlt = '',
  address,
  addressLink,
}) {
  if (!imageSrc || !address) {
    return null;
  }

  return (
    <div className="location-card">
      <h2 className="location-card__title">Место проведения торжества</h2>
      <div className="location-card__image-wrapper">
        <img
          className="location-card__image"
          src={imageSrc}
          alt={imageAlt}
        />
      </div>
      <div className="location-card__address">
        Ждем вас по адресу{' '}
        {addressLink ? (
          <a
            href={addressLink}
            target="_blank"
            rel="noopener noreferrer"
            className="location-card__link"
          >
            {address}
          </a>
        ) : (
          <span className="location-card__address-text">{address}</span>
        )}
      </div>
    </div>
  );
}

export default LocationCard;
