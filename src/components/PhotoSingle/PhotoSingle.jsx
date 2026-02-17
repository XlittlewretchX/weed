import PhotoCard from '../PhotoCard/PhotoCard';
import './PhotoSingle.css';

function PhotoSingle({
  photo,
  withFrame = true,
}) {
  if (!photo) {
    return null;
  }

  return (
    <div className="photo-single">
      {withFrame ? (
        <div className="photo-single__item">
          <PhotoCard
            photoSrc={photo.src}
            photoAlt={photo.alt}
            title={photo.title}
            description={photo.description}
          />
        </div>
      ) : (
        <div className="photo-single__simple">
          <img
            className="photo-single__image"
            src={photo.src}
            alt={photo.alt}
          />
          {(photo.title || photo.description) && (
            <div className="photo-single__caption">
              {photo.title && <div className="photo-single__title">{photo.title}</div>}
              {photo.description && (
                <div className="photo-single__description">{photo.description}</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PhotoSingle;

