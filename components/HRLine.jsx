// components/HRLine.js
export default function HRLine({
  margin = '40px',
  thickness = '1px',
  color = '#D1D1D1',
  opacity = 0.4,
  width = '50%',
}) {
  return (
    <hr
      style={{
        margin: `${margin} auto`,
        border: 'none',
        borderTop: `${thickness} solid ${color}`,
        opacity: opacity,
        width: width,
      }}
    />
  );
}
