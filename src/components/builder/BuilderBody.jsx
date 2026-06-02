import './BuilderText.scss';

export default function BuilderBody({
  text = 'Body text content goes here.',
  align = 'left',
}) {
  return (
    <p className={`builder-body builder-body--${align}`}>
      {text}
    </p>
  );
}
