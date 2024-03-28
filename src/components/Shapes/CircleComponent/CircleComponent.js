function CircleComponent({ center, radius, fill, stroke, strokeWidth, opacity = 1 }) {

  return (
    <circle
      cx={center.x}
      cy={center.y}
      r={radius}
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      opacity={opacity}
    />
  );
}

export default CircleComponent;