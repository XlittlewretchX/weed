import PhotoCard from '../PhotoCard/PhotoCard';
import './PhotoPair.css';

function PhotoPair({
  leftPhoto,
  rightPhoto,
}) {
  return (
    <div className="photo-pair">
      <div className="photo-pair__item photo-pair__item--left">
        <PhotoCard
          photoSrc={leftPhoto.src}
          photoAlt={leftPhoto.alt}
          title={leftPhoto.title}
          description={leftPhoto.description}
        />
      </div>
      <div className="photo-pair__item photo-pair__item--right">
        <PhotoCard
          photoSrc={rightPhoto.src}
          photoAlt={rightPhoto.alt}
          title={rightPhoto.title}
          description={rightPhoto.description}
        />
      </div>
    </div>
  );
}

export default PhotoPair;

