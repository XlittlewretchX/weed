import './PlusText.css';

function PlusText({
  line1 = '',
  line2 = '',
  heartSrc = '/image/heart.png',
}) {
  return (
    <section className="plus-text">
      <div className="plus-text__line plus-text__line--names">
        {line1}
      </div>
      <div className="plus-text__line plus-text__line--equals">
        {line2}
      </div>
      <div className="plus-text__line plus-text__line--heart">
        <img
          className="plus-text__heart-image"
          src={heartSrc}
          alt="heart"
        />
      </div>
    </section>
  );
}

export default PlusText;

