import React, { useState } from "react";
import "./ColorPicker.css"
import pipetteIcon from "../../../assets/icons/pipette.svg"
import { Input, InputGroup } from "reactstrap";
import { Point } from "../../../utils/Point";
import { hslToHex, hslToRgb } from "../../../utils/color";

const ColorPicker = ({ }) => {

  const [select, setSelect] = useState(false);
  const [selectPosition, setSelectPosition] = useState(new Point(240 - 6, -6));
  const [selectColorPosition, setSelectColorPosition] = useState(new Point(0, 0));
  const windowPosition = new Point(400, 400);
  const [selectMain, setSelectMain] = useState({ H: 0, S: 100, L: 50 })
  const [selectColor, setSelectColor] = useState({ H: 0, S: 100, L: 50 })

  const [selectAlpha, setSelectAlpha] = useState(0)
  const [selectAlphaPosition, setSelectAlphaPosition] = useState(new Point(0, 0));

  const Modes = {
    Default: "Default",
    Main: "Main",
    Color: "Color",
    Alpha: "Alpha"
  }

  const [mode, setMode] = useState(Modes.Default)
  const pointerMouseDownHandler = (e) => {
    console.log(new Point(e.clientX - windowPosition.x - 6, e.clientY - windowPosition.y - 6))
    setMode(Modes.Main);

    let position = new Point(e.clientX, e.clientY);
    if (position.x <= windowPosition.x) {
      position.x = windowPosition.x;
    }
    if (position.x >= windowPosition.x + 240) {
      position.x = windowPosition.x + 240;
    }
    if (position.y <= windowPosition.y) {
      position.y = windowPosition.y;
    }
    if (position.y >= windowPosition.y + 240) {
      position.y = windowPosition.y + 240;
    }
    setSelectPosition(new Point(position.x - windowPosition.x - 6, position.y - windowPosition.y - 6));

    console.log(position.x)
    const S = 100 / 240 * (position.x - windowPosition.x);
    const L = 100 - 100 / 240 * (position.y - windowPosition.y);
    const LHSL = (L / 2) * (2 - (S / 100));
    const down = LHSL < 50 ? LHSL * 2 : 200 - LHSL * 2;
    const SHSL = (L * S) / down;

    setSelectMain({
      H: selectColor.H,
      S: SHSL,
      L: LHSL
    })
  }

  const linearPointerMouseDownHandler = (e) => {
    setMode(Modes.Color);
    let position = new Point(e.clientX, e.clientY);
    if (position.x <= windowPosition.x + 60) {
      position.x = windowPosition.x + 60;
    }
    if (position.x >= windowPosition.x + 240 - 8) {
      position.x = windowPosition.x + 240 - 8;
    }
    setSelectColorPosition(new Point(position.x - windowPosition.x - 60 - 6, 0));
    setSelectColor({
      H: 360 / 172 * (position.x - windowPosition.x - 60),
      S: 100,
      L: 50
    })
    setSelectMain({
      H: 360 / 172 * (position.x - windowPosition.x - 60),
      S: selectMain.S,
      L: selectMain.L
    })
  }

  const alphaPointerMouseDownHandler = (e) => {
    setMode(Modes.Alpha);
    let position = new Point(e.clientX, e.clientY);
    if (position.x <= windowPosition.x + 60) {
      position.x = windowPosition.x + 60;
    }
    if (position.x >= windowPosition.x + 240 - 8) {
      position.x = windowPosition.x + 240 - 8;
    }
    setSelectAlphaPosition(new Point(position.x - windowPosition.x - 60 - 6, 0));
    setSelectAlpha(100 / 172 * (position.x - windowPosition.x - 60));
    console.log(selectAlpha);
  }
  const pointerMouseMoveHandler = (e) => {

    if (mode === Modes.Main) {
      let position = new Point(e.clientX, e.clientY);
      if (position.x <= windowPosition.x) {
        position.x = windowPosition.x;
      }
      if (position.x >= windowPosition.x + 240) {
        position.x = windowPosition.x + 240;
      }
      if (position.y <= windowPosition.y) {
        position.y = windowPosition.y;
      }
      if (position.y >= windowPosition.y + 240) {
        position.y = windowPosition.y + 240;
      }
      setSelectPosition(new Point(position.x - windowPosition.x - 6, position.y - windowPosition.y - 6));

      console.log(position.x)
      const S = 100 / 240 * (position.x - windowPosition.x);
      const L = 100 - 100 / 240 * (position.y - windowPosition.y);
      const LHSL = (L / 2) * (2 - (S / 100));
      const down = LHSL < 50 ? LHSL * 2 : 200 - LHSL * 2;
      const SHSL = (L * S) / down;

      setSelectMain({
        H: selectColor.H,
        S: SHSL,
        L: LHSL
      })
      console.log(selectMain)
    }
    if (mode === Modes.Color) {
      let position = new Point(e.clientX, e.clientY);
      if (position.x <= windowPosition.x + 60) {
        position.x = windowPosition.x + 60;
      }
      if (position.x >= windowPosition.x + 240 - 8) {
        position.x = windowPosition.x + 240 - 8;
      }
      setSelectColorPosition(new Point(position.x - windowPosition.x - 60 - 6, 0));

      setSelectColor({
        H: 360 / 172 * (position.x - windowPosition.x - 60),
        S: 100,
        L: 50
      })
      setSelectMain({
        H: selectColor.H,
        S: selectMain.S,
        L: selectMain.L
      })
    }
    if (mode === Modes.Alpha) {
      let position = new Point(e.clientX, e.clientY);
      if (position.x <= windowPosition.x + 60) {
        position.x = windowPosition.x + 60;
      }
      if (position.x >= windowPosition.x + 240 - 8) {
        position.x = windowPosition.x + 240 - 8;
      }
      setSelectAlphaPosition(new Point(position.x - windowPosition.x - 60 - 6, 0));
      setSelectAlpha(100 / 172 * (position.x - windowPosition.x - 60));
      console.log(selectAlpha);
    }
  }
  const pointerMouseUpHandler = (e) => {
    setMode(Modes.Default);
  }

  return (
    <div className="color-picker" onMouseMove={pointerMouseMoveHandler} onMouseUp={pointerMouseUpHandler}>
      <div className="color-picker__color" onMouseDown={pointerMouseDownHandler} style={{ backgroundColor: `hsl(${selectColor.H} ${selectColor.S}% ${selectColor.L}%)` }} >
        <div
          className="color-picker__color-pointer"
          style={{ top: selectPosition.y, left: selectPosition.x, backgroundColor: `hsl(${selectMain.H} ${selectMain.S}% ${selectMain.L}%)` }}
        />
        <div className="color-picker__color-bg1" />
        <div className="color-picker__color-bg2" />
      </div>
      <div className="color-picker__select">
        <div className="color-picker__select-pipette">
          <img className="color-picker__select-pipette-icon" src={pipetteIcon} alt=""></img>
        </div>
        <div className="color-picker__select-color">
          <div className="color-picker__select-rgb" onMouseDown={linearPointerMouseDownHandler}>
            <div className="color-picker__color-pointer" style={{ top: selectColorPosition.y, left: selectColorPosition.x, backgroundColor: `hsl(${selectColor.H} ${selectColor.S}% ${selectColor.L}%)` }} />
          </div>
          <div className="color-picker__select-rgba" onMouseDown={alphaPointerMouseDownHandler}>
            <div className="color-picker__color-pointer" style={{ top: selectAlphaPosition.y, left: selectAlphaPosition.x }} />
            <div className="color-picker__select-rgba-bg" />
          </div>
        </div>
      </div>
      <div className="color-picker__text">
        <InputGroup size="sm">
          <Input
            type="select"
            style={{ paddingRight: "0" }}
          >
            <option>Hex</option>
            <option>RGB</option>
            <option>HSL</option>
            <option>HSB</option>
          </Input>
          <Input type="text" placeholder="Y" value={hslToHex(selectMain.H, selectMain.S, selectMain.L)} onChange={() => { }} />
          <Input type="text" placeholder="Y" value={`${Math.round(100 - selectAlpha)}%`} onChange={() => { }} />
        </InputGroup>
      </div>
    </div>
  );
}

export default ColorPicker;