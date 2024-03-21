import React from "react";
import "./PropertiesBar.css"
import { Node } from "../../models/Elements/Node";
import { Branch } from "../../models/Elements/Branch";
import { Input, InputGroup, InputGroupText, Label } from "reactstrap";

const PropertiesBar = ({ selected }) => {

  //console.log(`render PropertiesBar`)

  return (
    <div className="rbar">

      {/* BETA */}
      <div style={{ color: "red", fontWeight: 900, padding: "0px 0px 10px 0px", display: "flex", justifyContent: "center", fontSize: "20px" }}>
        <div style={{ width: "100%", border: "1px solid red", padding: "5px 15px", borderRadius: "4px", backgroundColor: "#fdafaf", textAlign: "center" }}>BETA PANEL</div>
      </div>
      {/* BETA */}

      {selected[0] &&
        <div className="sect">
          <div className="m-3">
            <Label>Frame</Label>

            {!(selected[0] instanceof Branch) && <>
              <div className="d-flex mb-3">
                <InputGroup className="me-3" size="sm">
                  <InputGroupText style={{ width: "30px" }}>X</InputGroupText>
                  <Input placeholder="X" value={selected[0].position.x} onChange={() => { }} />
                </InputGroup>
                <InputGroup size="sm">
                  <InputGroupText style={{ width: "30px" }}>Y</InputGroupText>
                  <Input placeholder="Y" value={selected[0].position.y} onChange={() => { }} />
                </InputGroup>
              </div>
              <div className="d-flex mb-3">
                <InputGroup className="me-3" size="sm">
                  <InputGroupText style={{ width: "30px" }}>W</InputGroupText>
                  <Input placeholder="W" value={0} onChange={() => { }} />
                </InputGroup>
                <InputGroup size="sm">
                  <InputGroupText style={{ width: "30px" }}>H</InputGroupText>
                  <Input placeholder="H" value={0} onChange={() => { }} />
                </InputGroup>
              </div>
            </>}

            {selected[0] instanceof Node &&
              <>
                <InputGroup className="me-3 mb-3" size="sm">
                  <InputGroupText style={{ width: "100px" }}>Width right</InputGroupText>
                  <Input placeholder="X" value={selected[0].widthRight} onChange={() => { }} />
                </InputGroup>
                <InputGroup size="sm">
                  <InputGroupText style={{ width: "100px" }}>Width left</InputGroupText>
                  <Input placeholder="Y" value={selected[0].widthLeft} onChange={() => { }} />
                </InputGroup>
              </>
            }
          </div>
        </div>
      }


      {selected[0] &&
        <div className="sect">

          <div className="m-3">
            <Label>Object properties</Label>
            <div className="prop-bar__main">
              <div className="prop-bar__main-name">{selected[0].name}</div>
              <div className="prop-bar__main-type">{selected[0].constructor.name}</div>
              <Input size="sm" value={selected[0].id} onChange={() => { }} />
            </div>

            <div className="prop-bar__list">

              <InputGroup size="sm" className="mb-2">
                <InputGroupText style={{ width: "100px" }}>Name</InputGroupText>
                <Input placeholder="Y" value={selected[0].name} onChange={() => { }} />
              </InputGroup>
              <InputGroup size="sm" className="mb-2">
                <InputGroupText style={{ width: "100px" }}>Voltage</InputGroupText>
                <Input placeholder="Y" value={selected[0].voltage} onChange={() => { }} />
              </InputGroup>
              <InputGroup size="sm" className="mb-2">
                <InputGroupText style={{ width: "100px" }}>Test Prop</InputGroupText>
                <Input placeholder="Y" value="???" onChange={() => { }} />
              </InputGroup>
              <InputGroup size="sm" className="mb-2">
                <InputGroupText style={{ width: "100px" }}>Test Prop</InputGroupText>
                <Input placeholder="Y" value="???" onChange={() => { }} />
              </InputGroup>
              <InputGroup size="sm" className="mb-2">
                <InputGroupText style={{ width: "100px" }}>Test Prop</InputGroupText>
                <Input placeholder="Y" value="???" onChange={() => { }} />
              </InputGroup>

            </div>



          </div>
        </div>

      }
    </div>
  );
}

export default PropertiesBar;