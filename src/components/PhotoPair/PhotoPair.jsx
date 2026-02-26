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
          isLandscape={leftPhoto.isLandscape}
          loading={leftPhoto.loading}
          decoding={leftPhoto.decoding}
        />
      </div>
      <div className="photo-pair__item photo-pair__item--right">
        <PhotoCard
          photoSrc={rightPhoto.src}
          photoAlt={rightPhoto.alt}
          title={rightPhoto.title}
          description={rightPhoto.description}
          isLandscape={rightPhoto.isLandscape}
          loading={rightPhoto.loading}
          decoding={rightPhoto.decoding}
        />
      </div>
    </div>
  );
}

export default PhotoPair;
