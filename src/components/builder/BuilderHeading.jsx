import './BuilderText.scss';

export default function BuilderHeading({
  text = 'Section Heading',
  level = 'h2',
  align = 'left',
}) {
  const Tag = ['h1', 'h2', 'h3', 'h4'].includes(level) ? level : 'h2';
  return (
    <Tag className={`builder-heading builder-heading--${Tag} builder-heading--${align}`}>
      {text}
    </Tag>
  );
}
