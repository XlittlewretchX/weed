import './MainText.css';

function MainText({
  text = '',
}) {
  return (
    <section className="main-text">
      <div className="main-text__line main-text__line--names">
        {text}
      </div>
    </section>
  );
}

export default MainText;

