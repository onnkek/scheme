import './App.css';
import Node from './components/Node/Node';
import SVGPanel from './components/SVGPanel/SVGPanel';
import Circle from './components/Shapes/Circle/Circle';
import Line from './components/Shapes/Line/Line';
import Polyline from './components/Shapes/Polyline/Polyline';
import Rectangle from './components/Shapes/Rectangle/Rectangle';
import Text from './components/Shapes/Text/Text';

function App() {
  
  let pointsTest = [
    { "x": 100, "y": 200 },
    { "x": 200, "y": 200 },
    { "x": 200, "y": 100 },
    { "x": 100, "y": 100 }
  ]
  
  return (
    <SVGPanel>
      <Node point={{ "x": 500, "y": 500 }} width="300" height="30"/>
      {/* <Circle center={{ "x": 100, "y": 200 }} radius={10} fill="red"/>
      <Line p1={{ "x": 100, "y": 200 }} p2={{ "x": 150, "y": 200 }} stroke="blue" strokeWidth={4}/>
      <Polyline points={pointsTest} stroke="white" strokeWidth={2}/>
      <Rectangle point={{ "x": 400, "y": 400 }} width={50} height={20} stroke="green" strokeWidth={4} fill="coral"/>
      <Text point={{ "x": 600, "y": 200 }} fill="red" fontSize={30}>Test</Text> */}
    </SVGPanel>
  );
}

export default App;
