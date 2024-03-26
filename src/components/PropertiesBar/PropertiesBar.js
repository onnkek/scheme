import React, { useState } from "react";
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
import textIcon from '../../assets/icons/text.svg'
import tIcon from '../../assets/icons/t.svg'
import textSizeIcon from '../../assets/icons/textSize.svg'
import fillIcon from '../../assets/icons/fill.svg'
import widthIcon from '../../assets/icons/width.svg'

import lineIcon from '../../assets/icons/Shapes/line.svg'
import circleIcon from '../../assets/icons/Shapes/circle.svg'
import polylineIcon from '../../assets/icons/Shapes/polyline.svg'
import polygonIcon from '../../assets/icons/Shapes/polygon.svg'
import pathIcon from '../../assets/icons/Shapes/path.svg'
import rectangleIcon from '../../assets/icons/Shapes/rectangle.svg'

import { Editor } from "../../models/Editor";
import { TextBlock } from "../../models/Elements/TextBlock";
import { Circle } from "../../models/Elements/Shapes/Circle";
import { Rectangle } from "../../models/Elements/Shapes/Rectangle";

const PropertiesBar = (({ selected, add, connectModeHandler, width, editor }) => {

  //console.log(`render PropertiesBar`)
  // ICONS REFERENCE
  // https://www.figma.com/file/aJ3FeScFac5PBDGItqKdTJ/4%2C000-Free-Icons---Open-Source-Icon-set-(Community)?type=design&node-id=1222-42013&mode=design&t=YwsKMp7PjaN0wOen-0
  // https://www.figma.com/file/TihLVvaNPtbiw1b1NOhZ62/Pelaicon---1300%2B-Customizable-Icons-(Community)?type=design&node-id=0-1&mode=design&t=FRjXzcGt0EnQJgRV-0
  // Color https://www.figma.com/file/irkplOWgc3nkTYHXZQNGBI/React-Color-(Community)?type=design&node-id=0-1&mode=design&t=AzuZiMWVxoA0a3kv-0
  // https://www.figma.com/file/SouYAEBgkSyTg6QE0UyBLZ/WYSIWYG-Toolbars-(Community)?type=design&node-id=16-147&mode=design&t=WQ4kxciRD2p8PO9O-0
  // https://www.figma.com/file/uIzfhvNiHR5OVC23tZN8cB/Quill-Rich-Text-Editor-(Community)?type=design&node-id=15-236&mode=design&t=PhLyURVAaQfno0fw-0
  // https://www.figma.com/file/js0aFD7lgjUyVHeK3bundO/Rich-Text-Editor-Component-Kit-(Community)?type=design&node-id=24567-36451&mode=design&t=N6kRpQIMQnGkQuzA-0

  const [value, setValue] = useState(0);
  let frame = [];
  let objectProperties = "";
  if (selected && selected.length > 0) {
    frame = selected[0].getFrame()

    const props = selected[0].getObjectProperties();
    objectProperties = props.map(x =>
      <InputGroup size="sm" className="mb-2">
        <InputGroupText className="w-50">{x}</InputGroupText>
        {x.includes("voltage") || x.includes("state") ? <Input type="number" placeholder="Y" value={selected[0][x]} onChange={(e) => {
          setValue(e.target.value);
          selected[0][x] = Number(e.target.value);
        }} /> :
          <Input placeholder="Y" value={selected[0][x]} onChange={(e) => {
            setValue(e.target.value);
            selected[0][x] = e.target.value;
          }} />
        }

      </InputGroup>
    );
  }

  return (
    <div className="right-bar" style={{ width: width }}>


      {selected[0] ? <></> :
        <>
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
                  className='add-btn p-0 mb-3'
                  onClick={(e) => add(e, Editor.AddModes.Generation)}
                >
                  <div className="add-btn">
                    <img className='add-btn__icon' src={genIcon} alt="Connect"></img>
                    <div>Generation</div>
                  </div>
                </Button>
                <Label className="d-block">Base shapes</Label>
                <Button
                  secondary
                  outline
                  // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Generation ? "edit-panel__button_active" : ""}`}
                  className='add-btn p-0 mb-1'
                  onClick={(e) => add(e, Editor.AddModes.TextBlock)}
                >
                  <div className="add-btn">
                    <img className='add-btn__icon' src={textIcon} alt="Connect"></img>
                    <div>Text Block</div>
                  </div>
                </Button>
                <Button
                  secondary
                  outline
                  // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Generation ? "edit-panel__button_active" : ""}`}
                  className='add-btn p-0 mb-1'
                  style={{ border: "1px solid red", borderRadius: "4px" }}
                  onClick={(e) => add(e, Editor.AddModes.Line)}
                >
                  <div className="add-btn">
                    <img className='add-btn__icon' src={lineIcon} alt="Connect"></img>
                    <div>Line</div>
                  </div>
                </Button>
                <Button
                  secondary
                  outline
                  // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Generation ? "edit-panel__button_active" : ""}`}
                  className='add-btn p-0 mb-1'
                  onClick={(e) => add(e, Editor.AddModes.Circle)}
                >
                  <div className="add-btn">
                    <img className='add-btn__icon' src={circleIcon} alt="Connect"></img>
                    <div>Circle</div>
                  </div>
                </Button>
                <Button
                  secondary
                  outline
                  // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Generation ? "edit-panel__button_active" : ""}`}
                  className='add-btn p-0 mb-1'
                  onClick={(e) => add(e, Editor.AddModes.Rectangle)}
                >
                  <div className="add-btn">
                    <img className='add-btn__icon' src={rectangleIcon} alt="Connect"></img>
                    <div>Rectangle</div>
                  </div>
                </Button>
                <Button
                  secondary
                  outline
                  // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Generation ? "edit-panel__button_active" : ""}`}
                  className='add-btn p-0 mb-1'
                  style={{ border: "1px solid red", borderRadius: "4px" }}
                  onClick={(e) => add(e, Editor.AddModes.Polyline)}
                >
                  <div className="add-btn">
                    <img className='add-btn__icon' src={polylineIcon} alt="Connect"></img>
                    <div>Polyline</div>
                  </div>
                </Button>
                <Button
                  secondary
                  outline
                  // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Generation ? "edit-panel__button_active" : ""}`}
                  className='add-btn p-0 mb-1'
                  style={{ border: "1px solid red", borderRadius: "4px" }}
                  onClick={(e) => add(e, Editor.AddModes.Polygon)}
                >
                  <div className="add-btn">
                    <img className='add-btn__icon' src={polygonIcon} alt="Connect"></img>
                    <div>Polygon</div>
                  </div>
                </Button>
                <Button
                  secondary
                  outline
                  // className={`edit-panel__button ${editor.addMode === Editor.AddModes.Generation ? "edit-panel__button_active" : ""}`}
                  className='add-btn p-0 mb-1'
                  style={{ border: "1px solid red", borderRadius: "4px" }}
                  onClick={(e) => add(e, Editor.AddModes.Path)}
                >
                  <div className="add-btn">
                    <img className='add-btn__icon' src={pathIcon} alt="Connect"></img>
                    <div>Path</div>
                  </div>
                </Button>
              </div>

            </div>
          </div>
          <div className="right-bar__section section">
            <Label className="section__title p-3 pt-1 pb-1 m-0">Editor settings</Label>
            <div className="m-3">
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "60px" }}><img src={fillIcon} alt="" /></InputGroupText>
                <Input type="color" placeholder="Y" value={editor.backgroundColor} onChange={(e) => {
                  setValue(e.target.value);
                  editor.backgroundColor = e.target.value;
                }} />
              </InputGroup>
            </div>
          </div>
          <div className="right-bar__section section">
            <Label className="section__title p-3 pt-1 pb-1 m-0">Grid settings</Label>
            <div className="m-3">
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "60px" }}>Step X</InputGroupText>
                <Input type="number" placeholder="px" value={editor.grid.stepX} onChange={(e) => {
                  setValue(e.target.value);
                  editor.grid.stepX = e.target.value;
                }} />
              </InputGroup>
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "60px" }}>Step Y</InputGroupText>
                <Input type="number" placeholder="px" value={editor.grid.stepY} onChange={(e) => {
                  setValue(e.target.value);
                  editor.grid.stepY = e.target.value;
                }} />
              </InputGroup>
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "60px" }}><img src={widthIcon} alt="" /></InputGroupText>
                <Input type="number" placeholder="px" value={editor.grid.strokeWidth} onChange={(e) => {
                  setValue(e.target.value);
                  editor.grid.strokeWidth = e.target.value;
                }} />
              </InputGroup>
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "60px" }}><img src={fillIcon} alt="" /></InputGroupText>
                <Input type="color" placeholder="Y" value={editor.grid.backgroundColor} onChange={(e) => {
                  setValue(e.target.value);
                  editor.grid.backgroundColor = e.target.value;
                }} />
              </InputGroup>
            </div>
          </div>
        </>

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
                    <Input type="number" placeholder="X" value={selected[0].position.x} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].position.x = Number(e.target.value);
                    }} />
                  </InputGroup>
                  <InputGroup size="sm">
                    <InputGroupText style={{ width: "30px" }}>Y</InputGroupText>
                    <Input type="number" placeholder="Y" value={selected[0].position.y} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].position.y = Number(e.target.value);
                    }} />
                  </InputGroup>
                </div>
                <div className="d-flex mb-2">
                  <InputGroup className="me-3" size="sm" style={{ border: "1px solid red", borderRadius: "4px" }}>
                    <InputGroupText style={{ width: "30px" }}>W</InputGroupText>
                    <Input placeholder="W" value={0} onChange={() => { }} />
                  </InputGroup>
                  <InputGroup size="sm" style={{ border: "1px solid red", borderRadius: "4px" }}>
                    <InputGroupText style={{ width: "30px" }}>H</InputGroupText>
                    <Input placeholder="H" value={0} onChange={() => { }} />
                  </InputGroup>
                </div>
              </>}
              {selected[0].canRotate &&
                <InputGroup size="sm mb-2">
                  <InputGroupText style={{ width: "30px" }}><img src={angleIcon} alt="" /></InputGroupText>
                  <Input type="number" placeholder="Y" value={selected[0].angle} onChange={(e) => {
                    setValue(e.target.value);
                    selected[0].angle = Number(e.target.value);
                  }} />
                </InputGroup>
              }
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "27%" }}>Opacity</InputGroupText>
                <div className="opacity-input">
                  <Input style={{}}
                    id="exampleRange"
                    name="range"
                    type="range"
                    value={selected[0].opacity * 100}
                    onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].opacity = Number(e.target.value) / 100;
                    }}
                  />
                </div>
                <Input type="number" placeholder="%" value={selected[0].opacity * 100} onChange={(e) => {
                  setValue(e.target.value);
                  selected[0].opacity = Number(e.target.value) / 100;
                }} />
              </InputGroup>
              {selected[0] instanceof Circle &&
                <>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "60px" }}>R</InputGroupText>
                    <Input type="number" placeholder="px" value={selected[0].radius} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].radius = Number(e.target.value);
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "60px" }}>Fill</InputGroupText>
                    <Input type="color" style={{ height: "31px" }} placeholder="Y" value={selected[0].fill} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].fill = e.target.value;
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "60px" }}><img src={widthIcon} alt="" /></InputGroupText>
                    <Input type="number" placeholder="px" value={selected[0].strokeWidth} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].strokeWidth = e.target.value;
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "60px" }}>Stroke</InputGroupText>
                    <Input type="color" style={{ height: "31px" }} value={selected[0].stroke} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].stroke = e.target.value;
                    }} />
                  </InputGroup>
                </>
              }
              {selected[0] instanceof Rectangle &&
                <>
                  <div className="d-flex mb-2">
                    <InputGroup className="me-3" size="sm">
                      <InputGroupText style={{ width: "30px" }}>W</InputGroupText>
                      <Input type="number" placeholder="px" value={selected[0].width} onChange={(e) => {
                        setValue(e.target.value);
                        selected[0].width = e.target.value;
                      }} />
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputGroupText style={{ width: "30px" }}>H</InputGroupText>
                      <Input type="number" placeholder="px" value={selected[0].height} onChange={(e) => {
                        setValue(e.target.value);
                        selected[0].height = e.target.value;
                      }} />
                    </InputGroup>
                  </div>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "60px" }}>Fill</InputGroupText>
                    <Input type="color" style={{ height: "31px" }} placeholder="Y" value={selected[0].fill} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].fill = e.target.value;
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "60px" }}><img src={widthIcon} alt="" /></InputGroupText>
                    <Input type="number" placeholder="px" value={selected[0].strokeWidth} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].strokeWidth = e.target.value;
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "60px" }}>Stroke</InputGroupText>
                    <Input type="color" style={{ height: "31px" }} value={selected[0].stroke} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].stroke = e.target.value;
                    }} />
                  </InputGroup>
                </>
              }
              {selected[0] instanceof TextBlock &&
                <>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "30px" }}><img src={tIcon} alt="" /></InputGroupText>
                    <Input type="text" placeholder="Y" value={selected[0].text} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].text = e.target.value;
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "30px" }}><img src={textSizeIcon} alt="" /></InputGroupText>
                    <Input type="number" placeholder="Y" value={selected[0].fontSize} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].fontSize = e.target.value;
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "30px" }}><img src={fillIcon} alt="" /></InputGroupText>
                    <Input type="color" placeholder="Y" value={selected[0].color} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].color = e.target.value;
                    }} />
                  </InputGroup>
                </>
              }

              {selected[0] instanceof Node &&
                <>
                  <InputGroup className="me-3 mb-2" size="sm">
                    <InputGroupText className="w-50">Width right</InputGroupText>
                    <Input type="number" placeholder="X" value={selected[0].widthRight} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].widthRight = Number(e.target.value);
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText className="w-50">Width left</InputGroupText>
                    <Input type="number" placeholder="Y" value={selected[0].widthLeft} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].widthLeft = Number(e.target.value);
                    }} />
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

            {objectProperties}
            {/* <InputGroup size="sm" className="mb-2">
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
            </InputGroup> */}
          </div>
        </div>
      }
    </div>
  );
})

export default PropertiesBar;