import './PlusText.css';

function PlusText({
  line1 = '',
  line2 = '',
  heartSrc = `${process.env.PUBLIC_URL || ''}/image/heart.png`,
}) {
  const renderedLine1 = typeof line1 === 'string'
    ? line1.split('+').reduce((acc, part, index, arr) => {
      acc.push(part);
      if (index < arr.length - 1) {
        acc.push(
          <span
            key={`plus-${index}`}
            className="plus-text__line-plus"
            aria-hidden="true"
          >
            {' + '}
          </span>,
        );
      }
      return acc;
    }, [])
    : line1;

  return (
    <section className="plus-text">
      <div className="plus-text__line plus-text__line--names">
        {renderedLine1}
      </div>
      <div className="plus-text__line plus-text__line--equals">
        {line2}
      </div>
      <div className="plus-text__line plus-text__line--heart">
        <img
          className="plus-text__heart-image"
          src={heartSrc}
          alt=""
          aria-hidden="true"
          draggable={false}
        />
      </div>
    </section>
  );
}

export default PlusText;
