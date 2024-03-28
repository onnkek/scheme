import React, { useState } from "react";
import "./PropertiesBar.css"
import { Node } from "../../models/Elements/Node";
import { Branch } from "../../models/Elements/Branch";
import { Badge, Button, Input, InputGroup, InputGroupText, Label } from "reactstrap";
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
import { Ellipse } from "../../models/Elements/Shapes/Ellipse";
import { Rectangle } from "../../models/Elements/Shapes/Rectangle";
import { Polyline } from "../../models/Elements/Shapes/Polyline";
import AddButton from "../Controls/AddButton/AddButton";
import { Polygon } from "../../models/Elements/Shapes/Polygon";
import { Line } from "../../models/Elements/Shapes/Line";

const PropertiesBar = (({ selected, add, connectModeHandler, width, editor, polyline }) => {

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
      <InputGroup size="sm" className="mb-2" key={Math.random()}>
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

                <AddButton
                  onClick={connectModeHandler}
                  icon={branchIcon}
                  borderColor="secondary"
                  text="Branch"
                />
                <AddButton
                  onClick={(e) => add(e, Editor.AddModes.Node)}
                  icon={nodeIcon}
                  borderColor="secondary"
                  text="Node"
                />
                <AddButton
                  onClick={(e) => add(e, Editor.AddModes.Switch)}
                  icon={switchIcon}
                  borderColor="secondary"
                  text="Switch"
                />
                <AddButton
                  onClick={(e) => add(e, Editor.AddModes.Transformer)}
                  icon={transIcon}
                  borderColor="secondary"
                  text="Transformer"
                />
                <AddButton
                  onClick={(e) => add(e, Editor.AddModes.Load)}
                  icon={loadIcon}
                  borderColor="secondary"
                  text="Load"
                />
                <AddButton
                  onClick={(e) => add(e, Editor.AddModes.Generation)}
                  icon={genIcon}
                  borderColor="secondary"
                  text="Generation"
                />


                <Label className="d-block">Base shapes</Label>
                <AddButton
                  onClick={(e) => add(e, Editor.AddModes.TextBlock)}
                  icon={textIcon}
                  borderColor="secondary"
                  text="Text Block"
                />
                <AddButton
                  onClick={(e) => polyline(e, Editor.AddModes.Line)}
                  icon={lineIcon}
                  borderColor="secondary"
                  text="Line"
                >
                  <Badge
                    color="primary"
                    className="ms-2"
                    style={{ display: "block", top: 0 }}
                  >New</Badge>
                </AddButton>
                <AddButton
                  onClick={(e) => polyline(e, Editor.AddModes.Circle)}
                  icon={circleIcon}
                  borderColor="secondary"
                  text="Ellipse"
                >
                  <Badge
                    color="primary"
                    className="ms-2"
                    style={{ display: "block", top: 0 }}
                  >New</Badge>
                </AddButton>
                <AddButton
                  onClick={(e) => polyline(e, Editor.AddModes.Rectangle)}
                  icon={rectangleIcon}
                  borderColor="secondary"
                  text="Rectangle"
                >
                  <Badge
                    color="primary"
                    className="ms-2"
                    style={{ display: "block", top: 0 }}
                  >New</Badge>
                </AddButton>
                <AddButton
                  onClick={(e) => polyline(e, Editor.AddModes.Polyline)}
                  icon={polylineIcon}
                  borderColor="secondary"
                  text="Polyline"
                >
                  <Badge
                    color="primary"
                    className="ms-2"
                    style={{ display: "block", top: 0 }}
                  >New</Badge>
                </AddButton>
                <AddButton
                  onClick={(e) => polyline(e, Editor.AddModes.Polygon)}
                  icon={polygonIcon}
                  borderColor="secondary"
                  text="Polygon"
                >
                  <Badge
                    color="primary"
                    className="ms-2"
                    style={{ display: "block", top: 0 }}
                  >New</Badge>
                </AddButton>
                <AddButton
                  onClick={(e) => polyline(e, Editor.AddModes.Path)}
                  icon={pathIcon}
                  borderColor="danger"
                  text="Path"
                >
                  <Badge
                    color="danger"
                    className="ms-2"
                    style={{ display: "block", top: 0, color: "black" }}
                  >Doesnt work</Badge>
                </AddButton>

              </div>

            </div>
          </div>
          <div className="right-bar__section section">
            <Label className="section__title p-3 pt-1 pb-1 m-0">Editor settings
              <Badge color="primary" className="ms-2 green" style={{ top: 0 }}>New</Badge>
            </Label>
            <div className="m-3">
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "27%" }}><img src={fillIcon} alt="" /></InputGroupText>
                <Input type="color" placeholder="Y" value={editor.backgroundColor} onChange={(e) => {
                  setValue(e.target.value);
                  editor.backgroundColor = e.target.value;
                }} />
              </InputGroup>
            </div>
          </div>
          <div className="right-bar__section section">
            <Label className="section__title p-3 pt-1 pb-1 m-0">Grid settings
              <Badge color="primary" className="ms-2 green" style={{ top: 0 }}>New</Badge>
            </Label>
            <div className="m-3">
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "27%" }}>Step X</InputGroupText>
                <Input type="number" placeholder="px" value={editor.grid.stepX} onChange={(e) => {
                  setValue(e.target.value);
                  editor.grid.stepX = e.target.value;
                }} />
              </InputGroup>
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "27%" }}>Step Y</InputGroupText>
                <Input type="number" placeholder="px" value={editor.grid.stepY} onChange={(e) => {
                  setValue(e.target.value);
                  editor.grid.stepY = e.target.value;
                }} />
              </InputGroup>
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "27%" }}><img src={widthIcon} alt="" /></InputGroupText>
                <Input type="number" placeholder="px" value={editor.grid.strokeWidth} onChange={(e) => {
                  setValue(e.target.value);
                  editor.grid.strokeWidth = e.target.value;
                }} />
              </InputGroup>
              <InputGroup size="sm mb-2">
                <InputGroupText style={{ width: "27%" }}><img src={fillIcon} alt="" /></InputGroupText>
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
              {!(selected[0] instanceof Branch) && !(selected[0] instanceof Polyline) && !(selected[0] instanceof Polygon) && !(selected[0] instanceof Line) && <>
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

              {(selected[0] instanceof Polyline || selected[0] instanceof Polygon || selected[0] instanceof Line) &&
                <>
                  {!(selected[0] instanceof Line) &&
                    <InputGroup size="sm mb-2">
                      <InputGroupText style={{ width: "27%" }}>Fill</InputGroupText>
                      <Input type="color" style={{ height: "31px" }} placeholder="Y" value={selected[0].fill} onChange={(e) => {
                        setValue(e.target.value);
                        selected[0].fill = e.target.value;
                      }} />
                    </InputGroup>
                  }
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "27%" }}><img src={widthIcon} alt="" /></InputGroupText>
                    <Input type="number" placeholder="px" value={selected[0].strokeWidth} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].strokeWidth = e.target.value;
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "27%" }}>Stroke</InputGroupText>
                    <Input type="color" style={{ height: "31px" }} value={selected[0].stroke} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].stroke = e.target.value;
                    }} />
                  </InputGroup>



                  <div className="points mb-2">

                    <div className="points__title">
                      <Label className="mb-0">Points</Label>
                    </div>

                    <div className="points__body">
                      {selected[0].points.map(point =>
                        <div className="d-flex mb-2" key={Math.random()}>
                          <InputGroup className="me-2" size="sm" style={{ width: "26px" }}>
                            <InputGroupText>{selected[0].points.findIndex(x => x === point)}</InputGroupText>

                          </InputGroup>
                          <InputGroup className="me-2" size="sm">
                            <InputGroupText style={{ width: "26px" }}>X</InputGroupText>
                            <Input type="number" placeholder="X" value={point.x} onChange={(e) => {
                              setValue(e.target.value);
                              point.x = Number(e.target.value);
                            }} />
                          </InputGroup>
                          <InputGroup size="sm">
                            <InputGroupText style={{ width: "26px" }}>Y</InputGroupText>
                            <Input type="number" placeholder="Y" value={point.y} onChange={(e) => {
                              setValue(e.target.value);
                              point.y = Number(e.target.value);
                            }} />
                          </InputGroup>
                        </div>
                      )}
                    </div>
                  </div>

                </>
              }
              {selected[0] instanceof Ellipse &&
                <>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "27%" }}>Rx</InputGroupText>
                    <Input type="number" placeholder="px" value={selected[0].radius.x} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].radius.x = Number(e.target.value);
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "27%" }}>Ry</InputGroupText>
                    <Input type="number" placeholder="px" value={selected[0].radius.y} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].radius.y = Number(e.target.value);
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "27%" }}>Fill</InputGroupText>
                    <Input type="color" style={{ height: "31px" }} placeholder="Y" value={selected[0].fill} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].fill = e.target.value;
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "27%" }}><img src={widthIcon} alt="" /></InputGroupText>
                    <Input type="number" placeholder="px" value={selected[0].strokeWidth} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].strokeWidth = e.target.value;
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "27%" }}>Stroke</InputGroupText>
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
                        selected[0].width = Number(e.target.value);
                      }} />
                    </InputGroup>
                    <InputGroup size="sm">
                      <InputGroupText style={{ width: "30px" }}>H</InputGroupText>
                      <Input type="number" placeholder="px" value={selected[0].height} onChange={(e) => {
                        setValue(e.target.value);
                        selected[0].height = Number(e.target.value);
                      }} />
                    </InputGroup>
                  </div>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "27%" }}>Fill</InputGroupText>
                    <Input type="color" style={{ height: "31px" }} placeholder="Y" value={selected[0].fill} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].fill = e.target.value;
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "27%" }}><img src={widthIcon} alt="" /></InputGroupText>
                    <Input type="number" placeholder="px" value={selected[0].strokeWidth} onChange={(e) => {
                      setValue(e.target.value);
                      selected[0].strokeWidth = e.target.value;
                    }} />
                  </InputGroup>
                  <InputGroup size="sm mb-2">
                    <InputGroupText style={{ width: "27%" }}>Stroke</InputGroupText>
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

                  <div className="container-box">
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
            <div className="mb-1" style={{ display: "flex", "justifyContent": "space-between" }}>
              <div>
                <div style={{ fontWeight: 700 }}>{selected[0].name}</div>
                <div>{getType(selected[0])}</div>

              </div>
              <div style={{ border: "1px solid #686868", borderRadius: "4px", width: "48px", height: "48px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={selected[0].icon} width="40px" height="40px" alt="" className="p-1"></img>
              </div>
            </div>
            <Input bsSize="sm" className="mb-3" value={selected[0].id} onChange={() => { }} />

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