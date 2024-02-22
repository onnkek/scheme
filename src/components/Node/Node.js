import Circle from "../Shapes/Circle/Circle";
import Line from "../Shapes/Line/Line";
import Text from "../Shapes/Text/Text";

function Node(props) {

  let cpOffset = 50;
  let cpRadius = 8;
  let { point, width, height } = props;
  let number = 1;

  let cp = [];
  for (let i = 0; i < width / cpOffset - 1; i++) {
    cp.push({ "x": point.x - width / 2 + (i + 1) * cpOffset, "y": point.y });
  }

  return (
    <>
      <Line p1={{ "x": point.x - width / 2, "y": point.y }} p2={{ "x": point.x + width / 2, "y": point.y }} stroke="darkred" strokeWidth={height} />
      {cp.map(p => <Circle center={p} radius={cpRadius} fill="white" />)}
      <Text point={{ "x": point.x - width / 2 - 20, "y": point.y + 7 }} fill="white" fontSize={20}>{number}</Text>
    </>
  );
}

export default Node;