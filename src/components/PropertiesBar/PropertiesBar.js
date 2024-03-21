import React from "react";
import "./PropertiesBar.css"
import { Node } from "../../models/Elements/Node";
import { Branch } from "../../models/Elements/Branch";

const PropertiesBar = ({ selected }) => {

  //console.log(`render PropertiesBar`)

  return (
    <div className="prop-bar">

      {/* BETA */}
      <div style={{ color: "red", fontWeight: 900, padding: "20px 0px", display: "flex", justifyContent: "center", fontSize: "20px" }}>
        <div style={{ border: "1px solid red", padding: "5px 15px", borderRadius: "4px", backgroundColor: "#fdafaf" }}>BETA</div>
      </div>
      {/* BETA */}

      {selected[0] && !(selected[0] instanceof Branch) &&
        <div className="prop-bar__section">
          <div className="prop-bar__title">Frame</div>

          <div className="frame-bar__list">
            <div className="frame-bar__list-col">
              <div className="frame-bar__list-item">
                <div className="frame-bar__list-item-frame">X</div>
                <input className="frame-bar__list-item-value" value={selected[0].position.x} onChange={() => { }} />
              </div>
              <div className="frame-bar__list-item">
                <div className="frame-bar__list-item-frame">Y</div>
                <input className="frame-bar__list-item-value" value={selected[0].position.y} onChange={() => { }} />
              </div>
            </div>
            {selected[0] instanceof Node &&
              <div className="frame-bar__list-col">
                <div className="frame-bar__list-item">
                  <div className="frame-bar__list-item-frame">WidthRight</div>
                  <input className="frame-bar__list-item-value" value={selected[0].widthRight} onChange={() => { }} />
                </div>
                <div className="frame-bar__list-item">
                  <div className="frame-bar__list-item-frame">WidthLeft</div>
                  <input className="frame-bar__list-item-value" value={selected[0].widthLeft} onChange={() => { }} />
                </div>
              </div>
            }
          </div>
        </div>
      }


      {selected[0] &&
        <div className="prop-bar__section">
          <div className="prop-bar__title">Object properties</div>
          <div className="prop-bar__main">
            <div className="prop-bar__main-name">{selected[0].name}</div>
            <div className="prop-bar__main-type">{selected[0].constructor.name}</div>
            <input className="prop-bar__main-uid" value={selected[0].id} onChange={() => { }} />
          </div>
          <div className="prop-bar__list">
            <div className="prop-bar__list-item">
              <div className="prop-bar__list-item-prop">Name</div>
              <input className="prop-bar__list-item-value" value={selected[0].name} onChange={() => { }} />
            </div>
            <div className="prop-bar__list-item">
              <div className="prop-bar__list-item-prop">Voltage</div>
              <input className="prop-bar__list-item-value" value={selected[0].voltage} onChange={() => { }} />
            </div>
            <div className="prop-bar__list-item">
              <div className="prop-bar__list-item-prop">Test Prop</div>
              <input className="prop-bar__list-item-value" value="???" onChange={() => { }} />
            </div>
            <div className="prop-bar__list-item">
              <div className="prop-bar__list-item-prop">Test Prop</div>
              <input className="prop-bar__list-item-value" value="???" onChange={() => { }} />
            </div>
            <div className="prop-bar__list-item">
              <div className="prop-bar__list-item-prop">Test Prop</div>
              <input className="prop-bar__list-item-value" value="???" onChange={() => { }} />
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default PropertiesBar;