import './BuilderText.scss';

export default function BuilderSubtitle({
  text = 'Supporting subtitle text goes here.',
  align = 'left',
}) {
  return (
    <p className={`builder-subtitle builder-subtitle--${align}`}>
      {text}
    </p>
  );
}
