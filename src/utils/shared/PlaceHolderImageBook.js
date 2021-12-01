export default function PlaceHolderImageBook(text) {
  const image = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="300"
      height="150"
      viewBox="0 0 300 150"
    >
      <rect fill="rgba(0,0,0,1)" width="300" height="150" />
      <text
        fill="#ffffff"
        font-family="sans-serif"
        font-size="6"
        dy="10.5"
        font-weight="bold"
        x="50%"
        y="50%"
        text-anchor="middle"
      >
        ${text}
      </text>
    </svg>`;
  const cleaned = image
    .replace(/[\t\n\r]/gim, "") // Strip newlines and tabs
    .replace(/\s\s+/g, " ") // Condense multiple spaces
    .replace(/'/gim, "\\i"); // Normalize quotes

  const encoded = encodeURIComponent(cleaned)
    .replace(/\(/g, "%28") // Encode brackets
    .replace(/\)/g, "%29");

  // return `data:image/svg+xml;charset=UTF-8,${encoded}`;
  return `data:image/svg+xml;charset=UTF-8,${encoded}`;
}
