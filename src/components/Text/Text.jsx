import './Text.css';

function Text({
  text = 'Тигран + Григорян',
}) {
  return (
    <section className="text">
      <div className="text__line text__line--names">
        {text}
      </div>
    </section>
  );
}

export default Text;

