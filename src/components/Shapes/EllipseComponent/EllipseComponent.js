function EllipseComponent({ center, radius, fill, stroke, strokeWidth, opacity = 1 }) {
  
  return (
    <ellipse
      cx={center.x + radius.x / 2}
      cy={center.y + radius.y / 2}
      rx={radius.x}
      ry={radius.y}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
    />
  );
}

export default EllipseComponent;