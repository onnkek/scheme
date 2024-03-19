import React from "react";
import "./PropertiesBar.css"

const PropertiesBar = ({ }) => {

  //console.log(`render PropertiesBar`)

  return (
    <div className="prop-bar">

      {/* BETA */}
      <div style={{ color: "red", fontWeight: 900, padding: "50px 0px", display: "flex", justifyContent: "center", fontSize: "20px" }}>
        <div style={{ border: "1px solid red", padding: "5px 15px", borderRadius: "4px", backgroundColor: "#fdafaf" }}>BETA, DONT WORK</div>
      </div>
      {/* BETA */}
      
      <div className="prop-bar__section">
        <div className="prop-bar__title">Frame</div>

        <div className="frame-bar__list">
          <div className="frame-bar__list-col">
            <div className="frame-bar__list-item">
              <div className="frame-bar__list-item-frame">X</div>
              <input className="frame-bar__list-item-value" value="123.123" />
            </div>
            <div className="frame-bar__list-item">
              <div className="frame-bar__list-item-frame">Width</div>
              <input className="frame-bar__list-item-value" value="123.123" />
            </div>
          </div>
          <div className="frame-bar__list-col">
            <div className="frame-bar__list-item">
              <div className="frame-bar__list-item-frame">Y</div>
              <input className="frame-bar__list-item-value" value="123.123" />
            </div>
            <div className="frame-bar__list-item">
              <div className="frame-bar__list-item-frame">Height</div>
              <input className="frame-bar__list-item-value" value="123.123" />
            </div>
          </div>
        </div>
      </div>


      <div className="prop-bar__section">
        <div className="prop-bar__title">Object properties</div>
        <div className="prop-bar__main">
          <div className="prop-bar__main-name">Терминал 123</div>
          <div className="prop-bar__main-type">Terminal</div>
          <input className="prop-bar__main-uid" value="2.1234234535345" />
        </div>
        <div className="prop-bar__list">
          <div className="prop-bar__list-item">
            <div className="prop-bar__list-item-prop">Name</div>
            <input className="prop-bar__list-item-value" value="Терминал 123" />
          </div>
          <div className="prop-bar__list-item">
            <div className="prop-bar__list-item-prop">Voltage</div>
            <input className="prop-bar__list-item-value" value="500" />
          </div>
          <div className="prop-bar__list-item">
            <div className="prop-bar__list-item-prop">Test Prop</div>
            <input className="prop-bar__list-item-value" value="???" />
          </div>
          <div className="prop-bar__list-item">
            <div className="prop-bar__list-item-prop">Test Prop</div>
            <input className="prop-bar__list-item-value" value="???" />
          </div>
          <div className="prop-bar__list-item">
            <div className="prop-bar__list-item-prop">Test Prop</div>
            <input className="prop-bar__list-item-value" value="???" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesBar;