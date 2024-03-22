import React from "react";
import "./PropertiesBar.css"
import { Node } from "../../models/Elements/Node";
import { Branch } from "../../models/Elements/Branch";
import { Button, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import { getType } from "../Explorer/Explorer";
import angleIcon from "../../assets/icons/angle.svg"
import nodeIcon from '../../assets/icons/node.svg'
import branchIcon from '../../assets/icons/branch.svg'
import switchIcon from '../../assets/icons/switch.svg'
import transIcon from '../../assets/icons/trans.svg'
import genIcon from '../../assets/icons/gen.svg'
import loadIcon from '../../assets/icons/load.svg'
import { Editor } from "../../models/Editor";

const PropertiesBar = ({ selected, add, connectModeHandler }) => {

  //console.log(`render PropertiesBar`)
  // ICONS REFERENCE
  // https://www.figma.com/file/aJ3FeScFac5PBDGItqKdTJ/4%2C000-Free-Icons---Open-Source-Icon-set-(Community)?type=design&node-id=1222-42013&mode=design&t=YwsKMp7PjaN0wOen-0
  // https://www.figma.com/file/TihLVvaNPtbiw1b1NOhZ62/Pelaicon---1300%2B-Customizable-Icons-(Community)?type=design&node-id=0-1&mode=design&t=FRjXzcGt0EnQJgRV-0
  // Color https://www.figma.com/file/irkplOWgc3nkTYHXZQNGBI/React-Color-(Community)?type=design&node-id=0-1&mode=design&t=AzuZiMWVxoA0a3kv-0
  // https://www.figma.com/file/SouYAEBgkSyTg6QE0UyBLZ/WYSIWYG-Toolbars-(Community)?type=design&node-id=16-147&mode=design&t=WQ4kxciRD2p8PO9O-0
  // https://www.figma.com/file/uIzfhvNiHR5OVC23tZN8cB/Quill-Rich-Text-Editor-(Community)?type=design&node-id=15-236&mode=design&t=PhLyURVAaQfno0fw-0
  // https://www.figma.com/file/js0aFD7lgjUyVHeK3bundO/Rich-Text-Editor-Component-Kit-(Community)?type=design&node-id=24567-36451&mode=design&t=N6kRpQIMQnGkQuzA-0

  let frame = [];
  if (selected && selected.length > 0) {
    frame = selected[0].getFrame()
  }
  return (
    <div className="right-bar">


      {selected[0] ? <></> :
        <div className="right-bar__section section">
          <Label className="section__title p-3 pt-1 pb-1 m-0">Create element</Label>
          <div className="m-3">
            <Label className="d-block">Equipments</Label>

            <div className="btns">
              <Button
                secondary
                outline
                className='add-btn p-0 mb-1'
                // className={`edit-panel__button ${editor.mode === Editor.Modes.AddBranch ? "edit-panel__button_active" : ""}`}
                onClick={connectModeHandler}
              >
                <div className="add-btn">
                  <img className='add-btn__icon' src={branchIcon} alt="Connect"></img>
                  <div>Branch</div>
                </div>
              </Button>
              <Button
                secondary
                outline
                // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Node ? "edit-panel__button_active" : ""}`}
                className='add-btn p-0 mb-1'
                onClick={(e) => add(e, Editor.AddModes.Node)}
              >
                <div className="add-btn">
                  <img className='add-btn__icon' src={nodeIcon} alt="Connect"></img>
                  <div>Node</div>
                </div>
              </Button>
              <Button
                secondary
                outline
                // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Switch ? "edit-panel__button_active" : ""}`}
                className='add-btn p-0 mb-1'
                onClick={(e) => add(e, Editor.AddModes.Switch)}
              >
                <div className="add-btn">
                  <img className='add-btn__icon' src={switchIcon} alt="Connect"></img>
                  <div>Switch</div>
                </div>
              </Button>
              <Button
                secondary
                outline
                className='add-btn p-0 mb-1'
                // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Transformer ? "edit-panel__button_active" : ""}`}
                onClick={(e) => add(e, Editor.AddModes.Transformer)}
              >
                <div className="add-btn">
                  <img className='add-btn__icon' src={transIcon} alt="Connect"></img>
                  <div>Transformer</div>
                </div>
              </Button>
              <Button
                secondary
                outline
                className='add-btn p-0 mb-1'
                // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Load ? "edit-panel__button_active" : ""}`}

                onClick={(e) => add(e, Editor.AddModes.Load)}
              >
                <div className="add-btn">
                  <img className='add-btn__icon' src={loadIcon} alt="Connect"></img>
                  <div>Load</div>
                </div>
              </Button>
              <Button
                secondary
                outline
                // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Generation ? "edit-panel__button_active" : ""}`}
                className='add-btn p-0 mb-1'
                onClick={(e) => add(e, Editor.AddModes.Generation)}
              >
                <div className="add-btn">
                  <img className='add-btn__icon' src={genIcon} alt="Connect"></img>
                  <div>Generation</div>
                </div>
              </Button>
            </div>

          </div>
        </div>
      }
      {selected[0] &&
        <>
          {/* BETA */}
          <div style={{ color: "red", fontWeight: 900, padding: "0px 0px 10px 0px", display: "flex", justifyContent: "center", fontSize: "20px" }}>
            <div style={{ width: "100%", border: "1px solid red", padding: "5px 15px", borderRadius: "4px", backgroundColor: "#fdafaf", textAlign: "center" }}>BETA PANEL</div>
          </div>
          {/* BETA */}

          <div className="right-bar__section section">
            <Label className="section__title p-3 pt-1 pb-1 m-0">Frame</Label>
            <div className="m-3">
              {!(selected[0] instanceof Branch) && <>
                <div className="d-flex mb-2">
                  <InputGroup className="me-3" size="sm">
                    <InputGroupText style={{ width: "30px" }}>X</InputGroupText>
                    <Input placeholder="X" value={selected[0].position.x} onChange={() => { }} />
                  </InputGroup>
                  <InputGroup size="sm">
                    <InputGroupText style={{ width: "30px" }}>Y</InputGroupText>
                    <Input placeholder="Y" value={selected[0].position.y} onChange={() => { }} />
                  </InputGroup>
                </div>
                <div className="d-flex mb-2">
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
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "30px" }}><img src={angleIcon} alt="" /></InputGroupText>
                <Input placeholder="Y" value={selected[0].angle} onChange={() => { }} />
              </InputGroup>
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "27%" }}>Opacity</InputGroupText>
                <div className="opacity-input">
                  <Input style={{}}
                    id="exampleRange"
                    name="range"
                    type="range"
                  // value={100}
                  />
                </div>
                <Input placeholder="%" value="100%" onChange={() => { }} />
              </InputGroup>
              {selected[0] instanceof Node &&
                <>
                  <InputGroup className="me-3 mb-2" size="sm">
                    <InputGroupText className="w-50">Width right</InputGroupText>
                    <Input placeholder="X" value={selected[0].widthRight} onChange={() => { }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText className="w-50">Width left</InputGroupText>
                    <Input placeholder="Y" value={selected[0].widthLeft} onChange={() => { }} />
                  </InputGroup>
                </>
              }
              {frame.length > 3 &&
                <>
                  <Label>Container</Label>
                  <div className="container-row">
                    <InputGroup className="me-4" size="sm">
                      <Input placeholder="X" value={frame[0].x} onChange={() => { }} />
                      <Input placeholder="X" value={frame[0].y} onChange={() => { }} />
                    </InputGroup>
                    <InputGroup size="sm">
                      <Input placeholder="X" value={frame[1].x} onChange={() => { }} />
                      <Input placeholder="X" value={frame[1].y} onChange={() => { }} />
                    </InputGroup>
                  </div>

                  <div class="container-box">
                    <div className="container-box__corner container-box__corner_1"></div>
                    <div className="container-box__corner container-box__corner_2"></div>
                    <div className="container-box__corner container-box__corner_3"></div>
                    <div className="container-box__corner container-box__corner_4"></div>
                  </div>

                  <div className="container-row">
                    <InputGroup className="me-4" size="sm">
                      <Input placeholder="X" value={frame[3].x} onChange={() => { }} />
                      <Input placeholder="X" value={frame[3].y} onChange={() => { }} />
                    </InputGroup>
                    <InputGroup size="sm">
                      <Input placeholder="X" value={frame[2].x} onChange={() => { }} />
                      <Input placeholder="X" value={frame[2].y} onChange={() => { }} />
                    </InputGroup>
                  </div>
                </>
              }
            </div>
          </div>
        </>

      }


      {selected[0] &&
        <div className="right-bar__section section">
          <Label className="section__title p-3 pt-1 pb-1 m-0">Object properties</Label>
          <div className="m-3">
            <div style={{ fontWeight: 700 }}>{selected[0].name}</div>
            <div className="mb-1">{getType(selected[0])}</div>
            <Input size="sm" className="mb-3" value={selected[0].id} onChange={() => { }} />
            <InputGroup size="sm" className="mb-2">
              <InputGroupText className="w-50">Name</InputGroupText>
              <Input placeholder="Y" value={selected[0].name} onChange={() => { }} />
            </InputGroup>
            <InputGroup size="sm" className="mb-2">
              <InputGroupText className="w-50">Voltage</InputGroupText>
              <Input placeholder="Y" value={selected[0].voltage} onChange={() => { }} />
            </InputGroup>
            <InputGroup size="sm" className="mb-2">
              <InputGroupText className="w-50">Test Prop</InputGroupText>
              <Input placeholder="Y" value="???" onChange={() => { }} />
            </InputGroup>
            <InputGroup size="sm" className="mb-2">
              <InputGroupText className="w-50">Test Prop</InputGroupText>
              <Input placeholder="Y" value="???" onChange={() => { }} />
            </InputGroup>
            <InputGroup size="sm" className="mb-2">
              <InputGroupText className="w-50">Test Prop</InputGroupText>
              <Input placeholder="Y" value="???" onChange={() => { }} />
            </InputGroup>
          </div>
        </div>
      }
    </div>
  );
}

export default PropertiesBar;