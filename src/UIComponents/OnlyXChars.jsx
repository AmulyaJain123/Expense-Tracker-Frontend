export default function OnlyXChars({ x, text }) {
  return <span>{text.length > x ? `${text.substr(0, x)}.....` : text}</span>;
}
