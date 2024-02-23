import { useCallback, useContext, useRef, useState } from "react";
import Circle from "../Shapes/Circle/Circle";
import Line from "../Shapes/Line/Line";
import Text from "../Shapes/Text/Text";
import { SVGContext } from "../../context/SVGContext";

function Node(props) {
  const cpOffset = 50;
  const cpRadius = 8;
  const height = 30;
  
  const SVGRef = useContext(SVGContext)
  const [coord, setCoord] = useState(props.point);
  const lastCursor = useRef({ x: 0, y: 0 });
  const coordRef = useRef(props.point);
  
  let { point, width, number } = props;

  let cp = [];
  for (let i = 0; i < width / cpOffset - 1; i++) {
    cp.push({ x: coord.x - width / 2 + (i + 1) * cpOffset, y: coord.y });
  }


  let nodeMD = (e) => {
    lastCursor.current = { x: e.clientX, y: e.clientY }
    coordRef.current = coord;
    SVGRef.current.addEventListener('mousemove', handleSVGMouseMove)
  }

  const handleSVGMouseMove = useCallback(e => {
    setCoord({
      x: coordRef.current.x + e.clientX - lastCursor.current.x,
      y: coordRef.current.y + e.clientY - lastCursor.current.y,
    });
  }, [])

  let nodeMU = (e) => {
    lastCursor.current = { x: 0, y: 0 }
    SVGRef.current.removeEventListener('mousemove', handleSVGMouseMove)
  }

  return (
    <>
      <Line p1={{ x: coord.x - width / 2, y: coord.y }} p2={{ x: coord.x + width / 2, y: coord.y }} stroke="darkred"
        strokeWidth={height} onMD={nodeMD} onMU={nodeMU} />
      {cp.map(p => <Circle center={p} radius={cpRadius} fill="white" />)}
      <Text point={{ x: coord.x - width / 2 - 20, y: coord.y + 7 }} fill="white" fontSize={20}>{number}</Text>
    </>
  );
}

export default Node;