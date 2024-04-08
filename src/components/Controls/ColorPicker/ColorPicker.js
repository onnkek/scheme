import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./ColorPicker.css"
import pipetteIcon from "../../../assets/icons/pipette.svg"
import { Input, InputGroup } from "reactstrap";
import { Point } from "../../../utils/Point";
import { RGBStringToHSL, hexToHSL, hexToRGB, hsbToHsl, hsl2hsv, hslToHex, hslToRgb, rgbToHex } from "../../../utils/color";

const ColorPicker = React.memo(({ onChange, value = "rgba(0, 0, 0, 1)" }) => {

  const [selectPosition, setSelectPosition] = useState(new Point(240 - 6, -6));
  const [selectColorPosition, setSelectColorPosition] = useState(new Point(0, 0));
  const [selectMain, setSelectMain] = useState(RGBStringToHSL(value))
  const [selectColor, setSelectColor] = useState(RGBStringToHSL(value))

  const [selectAlpha, setSelectAlpha] = useState(100)
  const [selectAlphaPosition, setSelectAlphaPosition] = useState(new Point(0, 0));

  const [textType, setTextType] = useState("Hex");
  const [position, setPosition] = useState(new Point(0, 0))
  const ref = useRef();
  const [selectHex, setSelectHex] = useState("#000000")
  const [selectHSB, setSelectHSB] = useState({ H: 0, S: 100, B: 100 })
  const [selectHSL, setSelectHSL] = useState({ H: 0, S: 100, L: 50 })
  const [selectRGB, setSelectRGB] = useState({ R: 255, G: 0, B: 0 })
  const [offset, setOffset] = useState(new Point(-334, 0))

  const [visible, setVisible] = useState(false);

  const Modes = useMemo(() => ({
    Default: "Default",
    Main: "Main",
    Color: "Color",
    Alpha: "Alpha"
  }), [])

  const [mode, setMode] = useState(Modes.Default)



  const pointerMouseDownHandler = (e) => {
    e.stopPropagation();
    setMode(Modes.Main);

    let cursor = new Point(e.clientX, e.clientY);
    if (cursor.x <= position.x) {
      cursor.x = position.x;
    }
    if (cursor.x >= position.x + 240) {
      cursor.x = position.x + 240;
    }
    if (cursor.y <= position.y) {
      cursor.y = position.y;
    }
    if (cursor.y >= position.y + 240) {
      cursor.y = position.y + 240;
    }
    setSelectPosition(new Point(cursor.x - position.x - 6, cursor.y - position.y - 6));

    const S = 100 / 240 * (cursor.x - position.x);
    const L = 100 - 100 / 240 * (cursor.y - position.y);
    const LHSL = (L / 2) * (2 - (S / 100));
    const down = LHSL < 50 ? LHSL * 2 : 200 - LHSL * 2;
    const SHSL = (L * S) / down;
    const HSL = {
      H: selectColor.H,
      S: SHSL,
      L: LHSL
    }
    setSelectMain(HSL)

    setSelectHex(hslToHex(HSL.H, HSL.S, HSL.L))
    setSelectRGB(hexToRGB(hslToHex(HSL.H, HSL.S, HSL.L)))
    setSelectHSB(hsl2hsv(HSL))
    setSelectHSL(HSL);
    // onChange({ R: selectRGB.R, G: selectRGB.G, B: selectRGB.B, A: selectAlpha / 100 });
  }

  const linearPointerMouseDownHandler = (e) => {
    e.stopPropagation();
    setMode(Modes.Color);
    let cursor = new Point(e.clientX, e.clientY);
    if (cursor.x <= position.x + 60 + 6) {
      cursor.x = position.x + 60 + 6;
    }
    if (cursor.x >= position.x + 240 - 8 - 6) {
      cursor.x = position.x + 240 - 8 - 6;
    }
    setSelectColorPosition(new Point(cursor.x - position.x - 60 - 6, 0));

    const newH = 360 / (172 - 12) * (cursor.x - position.x - 60 - 6);
    setSelectColor({
      H: newH,
      S: 100,
      L: 50
    })
    const HSL = {
      H: newH,
      S: selectMain.S,
      L: selectMain.L
    }
    setSelectMain(HSL)

    setSelectHex(hslToHex(HSL.H, HSL.S, HSL.L))
    setSelectRGB(hexToRGB(hslToHex(HSL.H, HSL.S, HSL.L)))
    setSelectHSB(hsl2hsv(HSL))
    setSelectHSL(HSL);
    // onChange({ R: selectRGB.R, G: selectRGB.G, B: selectRGB.B, A: selectAlpha / 100 });
  }

  const alphaPointerMouseDownHandler = (e) => {
    e.stopPropagation();
    setMode(Modes.Alpha);
    let cursor = new Point(e.clientX, e.clientY);
    if (cursor.x <= position.x + 60 + 6) {
      cursor.x = position.x + 60 + 6;
    }
    if (cursor.x >= position.x + 240 - 8 - 6) {
      cursor.x = position.x + 240 - 8 - 6;
    }
    setSelectAlphaPosition(new Point(cursor.x - position.x - 60 - 6, 0));
    setSelectAlpha(100 - 100 / (172 - 12) * (cursor.x - position.x - 60 - 6));
    // onChange({ R: selectRGB.R, G: selectRGB.G, B: selectRGB.B, A: selectAlpha / 100 });
  }

  const pointerMouseMoveHandler = useCallback((e) => {
    if (mode === Modes.Main) {
      let cursor = new Point(e.clientX, e.clientY);
      if (cursor.x <= position.x) {
        cursor.x = position.x;
      }
      if (cursor.x >= position.x + 240) {
        cursor.x = position.x + 240;
      }
      if (cursor.y <= position.y) {
        cursor.y = position.y;
      }
      if (cursor.y >= position.y + 240) {
        cursor.y = position.y + 240;
      }
      setSelectPosition(new Point(cursor.x - position.x - 6, cursor.y - position.y - 6));

      const S = 100 / 240 * (cursor.x - position.x);
      const L = 100 - 100 / 240 * (cursor.y - position.y);
      const LHSL = (L / 2) * (2 - (S / 100));
      const down = LHSL < 50 ? LHSL * 2 : 200 - LHSL * 2;
      const SHSL = down === 0 ? 1 : (L * S) / down;
      const HSL = {
        H: selectColor.H,
        S: SHSL,
        L: LHSL
      }
      setSelectMain(HSL)

      setSelectHex(hslToHex(HSL.H, HSL.S, HSL.L))
      setSelectRGB(hexToRGB(hslToHex(HSL.H, HSL.S, HSL.L)))
      setSelectHSB(hsl2hsv(HSL))
      setSelectHSL(HSL);
    }
    if (mode === Modes.Color) {
      let cursor = new Point(e.clientX, e.clientY);
      if (cursor.x <= position.x + 60 + 6) {
        cursor.x = position.x + 60 + 6;
      }
      if (cursor.x >= position.x + 240 - 8 - 6) {
        cursor.x = position.x + 240 - 8 - 6;
      }
      setSelectColorPosition(new Point(cursor.x - position.x - 60 - 6, 0));

      const newH = 360 / (172 - 12) * (cursor.x - position.x - 60 - 6);
      setSelectColor({
        H: newH,
        S: 100,
        L: 50
      })
      const HSL = {
        H: newH,
        S: selectMain.S,
        L: selectMain.L
      }
      setSelectMain(HSL)

      setSelectHex(hslToHex(HSL.H, HSL.S, HSL.L))
      setSelectRGB(hexToRGB(hslToHex(HSL.H, HSL.S, HSL.L)))
      setSelectHSB(hsl2hsv(HSL))
      setSelectHSL(HSL);
    }
    if (mode === Modes.Alpha) {
      let cursor = new Point(e.clientX, e.clientY);
      if (cursor.x <= position.x + 60 + 6) {
        cursor.x = position.x + 60 + 6;
      }
      if (cursor.x >= position.x + 240 - 8 - 6) {
        cursor.x = position.x + 240 - 8 - 6;
      }
      setSelectAlphaPosition(new Point(cursor.x - position.x - 60 - 6, 0));
      setSelectAlpha(100 - 100 / (172 - 12) * (cursor.x - position.x - 60 - 6));
    }
    // onChange({ R: selectRGB.R, G: selectRGB.G, B: selectRGB.B, A: selectAlpha / 100 });
  }, [Modes, mode, selectColor, selectMain, selectRGB, selectAlpha, onChange, position])

  const pointerMouseUpHandler = useCallback((e) => {
    setMode(Modes.Default);
    if (e.clientX < position.x - 50 ||
      e.clientX > position.x + 240 + 50 ||
      e.clientY < position.y - 50 ||
      e.clientY > position.y + 348 + 50) {
      setVisible(false);
    }

  }, [Modes.Default, position])

  useEffect(() => {
    window.addEventListener("mouseup", pointerMouseUpHandler);
    window.addEventListener("mousemove", pointerMouseMoveHandler);
    return () => {
      window.removeEventListener("mouseup", pointerMouseUpHandler);
      window.removeEventListener("mousemove", pointerMouseMoveHandler);
    };
  }, [pointerMouseUpHandler, pointerMouseMoveHandler]);


  const changeTextTypeHandler = (e) => {
    setTextType(e.target.value);
  }

  const setHex = (hex) => {

    setSelectHex(hex)
    if (hex.length === 7) {
      const HSL = hexToHSL(hex);
      setSelectColor({ H: HSL.H, S: 100, L: 50 })
      setSelectMain(HSL)
      setSelectColorPosition(new Point(HSL.H * (172 - 12) / 360, selectColorPosition.y));

      const HSB = hsl2hsv(HSL)
      setSelectPosition(new Point(HSB.S * 240 / 100 - 5, (-HSB.B + 100) * 240 / 100 - 6));


      const RGB = hexToRGB(hex);
      setSelectHSL(HSL);
      setSelectRGB(RGB);
      setSelectHSB(HSB);
    }


  }
  const setRGB = (color, type) => {
    const newColor = { R: selectRGB.R, G: selectRGB.G, B: selectRGB.B }
    switch (type) {
      case "R":
        newColor.R = color;
        break;
      case "G":
        newColor.G = color;
        break;
      case "B":
        newColor.B = color;
        break;
      default:
        break;
    }
    setSelectRGB(newColor)
    const hex = rgbToHex(newColor);
    setSelectHex(hex)
    if (hex.length === 7) {
      const HSL = hexToHSL(hex);
      setSelectColor({ H: HSL.H, S: 100, L: 50 })
      setSelectMain(HSL)
      setSelectColorPosition(new Point(HSL.H * (172 - 12) / 360, selectColorPosition.y));

      const HSB = hsl2hsv(HSL)
      setSelectPosition(new Point(HSB.S * 240 / 100 - 5, (-HSB.B + 100) * 240 / 100 - 6));
      setSelectHSL(HSL);
      setSelectHSB(HSB);
    }


  }
  const setHSL = (value, type) => {
    const newColor = { H: selectMain.H, S: selectMain.S, L: selectMain.L }
    switch (type) {
      case "H":
        newColor.H = value;
        break;
      case "S":
        newColor.S = value;
        break;
      case "L":
        newColor.L = value;
        break;
      default:
        break;
    }
    setSelectHSL(newColor);
    const hex = hslToHex(newColor.H, newColor.S, newColor.L);
    setSelectHex(hex);
    const RGB = hexToRGB(hex);
    setSelectRGB(RGB);
    const HSB = hsl2hsv(newColor);
    setSelectHSB(HSB);

    if (hex.length === 7) {
      const HSL = hexToHSL(hex);
      setSelectColor({ H: HSL.H, S: 100, L: 50 })
      setSelectMain(HSL)
      setSelectColorPosition(new Point(HSL.H * (172 - 12) / 360, selectColorPosition.y));

      const HSB = hsl2hsv(HSL)
      setSelectPosition(new Point(HSB.S * 240 / 100 - 5, (-HSB.B + 100) * 240 / 100 - 6));

    }


  }
  const setHSB = (value, type) => {
    const newColor = { H: selectHSB.H, S: selectHSB.S, B: selectHSB.B }
    switch (type) {
      case "H":
        newColor.H = value;
        break;
      case "S":
        newColor.S = value;
        break;
      case "B":
        newColor.B = value;
        break;
      default:
        break;
    }
    setSelectHSB(newColor);
    const HSL = hsbToHsl(newColor);
    const hex = hslToHex(HSL.H, HSL.S, HSL.L)
    setSelectHex(hex);
    const RGB = hexToRGB(hex);
    setSelectRGB(RGB);
    setSelectHSL(HSL);
    if (hex.length === 7) {
      const HSL = hexToHSL(hex);
      setSelectColor({ H: HSL.H, S: 100, L: 50 })
      setSelectMain(HSL)
      setSelectColorPosition(new Point(HSL.H * (172 - 12) / 360, selectColorPosition.y));

      const HSB = hsl2hsv(HSL)
      setSelectPosition(new Point(HSB.S * 240 / 100 - 5, (-HSB.B + 100) * 240 / 100 - 6));

    }


  }


  let text = textType === "Hex" ? <>
    <Input type="text" placeholder="Y" style={{ fontSize: "12px" }} value={selectHex} onChange={(e) => { setHex(e.target.value) }} />
    <Input type="text" placeholder="Y" style={{ flexGrow: 0, minWidth: "53px", fontSize: "12px" }} value={`${Math.round(selectAlpha)}%`} onChange={() => { }} />
  </> : textType === "RGB" ? <>
    <Input type="text" placeholder="Y" style={{ fontSize: "12px" }} value={selectRGB.R} onChange={(e) => { setRGB(e.target.value, "R") }} />
    <Input type="text" placeholder="Y" style={{ fontSize: "12px" }} value={selectRGB.G} onChange={(e) => { setRGB(e.target.value, "G") }} />
    <Input type="text" placeholder="Y" style={{ fontSize: "12px" }} value={selectRGB.B} onChange={(e) => { setRGB(e.target.value, "B") }} />
    <Input type="text" placeholder="Y" style={{ flexGrow: 0, minWidth: "53px", fontSize: "12px" }} value={`${Math.round(selectAlpha)}%`} onChange={() => { }} />
  </> : textType === "HSL" ? <>
    <Input type="text" placeholder="Y" style={{ fontSize: "12px" }} value={selectHSL.H} onChange={(e) => { setHSL(e.target.value, "H") }} />
    <Input type="text" placeholder="Y" style={{ fontSize: "12px" }} value={selectHSL.S} onChange={(e) => { setHSL(e.target.value, "S") }} />
    <Input type="text" placeholder="Y" style={{ fontSize: "12px" }} value={selectHSL.L} onChange={(e) => { setHSL(e.target.value, "L") }} />
    <Input type="text" placeholder="Y" style={{ flexGrow: 0, minWidth: "53px", fontSize: "12px" }} value={`${Math.round(selectAlpha)}%`} onChange={() => { }} />
  </> : textType === "HSB" ? <>
    <Input type="text" placeholder="Y" style={{ fontSize: "12px" }} value={selectHSB.H} onChange={(e) => { setHSB(e.target.value, "H") }} />
    <Input type="text" placeholder="Y" style={{ fontSize: "12px" }} value={selectHSB.S} onChange={(e) => { setHSB(e.target.value, "S") }} />
    <Input type="text" placeholder="Y" style={{ fontSize: "12px" }} value={selectHSB.B} onChange={(e) => { setHSB(e.target.value, "B") }} />
    <Input type="text" placeholder="Y" style={{ flexGrow: 0, minWidth: "53px", fontSize: "12px" }} value={`${Math.round(selectAlpha)}%`} onChange={() => { }} />
  </> : <></>;

  useEffect(() => {
    const rect = ref.current.getBoundingClientRect();

    const windowOffset = window.innerHeight - rect.y - 388;

    let position = new Point(rect.x + offset.x, rect.y + offset.y);

    if (windowOffset < 0) {
      setOffset(new Point(offset.x, offset.y + windowOffset));
      position.y += windowOffset + 15;
    }

    setPosition(position)

  }, []);
  console.log(selectColor)
  return (
    <>

      <div
        ref={ref}

        className={`color-picker__form-control ${visible && "color-picker__form-control_focus"}`}
        onClick={() => setVisible(true)}
      >
        <div

          className="color-picker__input"
          style={{
            backgroundColor: `rgba(
              ${hexToRGB(hslToHex(selectMain.H, selectMain.S, selectMain.L)).R}, 
              ${hexToRGB(hslToHex(selectMain.H, selectMain.S, selectMain.L)).G}, 
              ${hexToRGB(hslToHex(selectMain.H, selectMain.S, selectMain.L)).B}, 
              ${selectAlpha / 100}
            )`
          }}
        />
        {visible && <div className="color-picker" style={{ left: offset.x, top: offset.y }}>
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
                style={{ paddingRight: "0", width: "60px", flexGrow: 0, fontSize: "12px" }}
                onChange={changeTextTypeHandler}
              >
                <option>Hex</option>
                <option>RGB</option>
                <option>HSL</option>
                <option>HSB</option>
              </Input>
              {text}
            </InputGroup>
          </div>
        </div>}
      </div >


    </>

  );
})

export default ColorPicker;