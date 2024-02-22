import './SVGPanel.css';

function SVGPanel(props) {
  return (
    <svg id='svg'>
      {props.children}
    </svg>
  );
}

export default SVGPanel;