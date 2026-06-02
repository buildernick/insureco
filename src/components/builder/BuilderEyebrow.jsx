import './BuilderText.scss';

export default function BuilderEyebrow({
  text = 'Category Label',
  align = 'left',
}) {
  return (
    <span className={`builder-eyebrow builder-eyebrow--${align}`}>
      {text}
    </span>
  );
}
