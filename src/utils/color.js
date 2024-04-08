export const hslToRgb = (h, s, l) => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export const hueToRgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

export const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

export const hexToHSL = (hex) => {
  console.log(hex)
  hex = hex.substring(0, 7)
  console.log(hex)
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  console.log(result)
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  r /= 255;
  g /= 255;
  b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default:
        break;
    }
    h /= 6;
  }
  var HSL = {};
  HSL.H = h * 360;
  HSL.S = s * 100;
  HSL.L = l * 100;
  return HSL;
}



export const hsbToHsl = (HSB) => {
  const L = HSB.B / 100 - HSB.B / 100 * HSB.S / 100 / 2;
  const m = Math.min(L, 1 - L);
  return {
    H: +HSB.H,
    S: (m ? (HSB.B / 100 - L) / m : 0) * 100,
    L: L * 100
  }
}

export const hslToHsb = (HSL) => {
  const B = HSL.L + HSL.S * Math.min(HSL.L, 1 - HSL.L);
  return {
    H: HSL.H,
    S: B === 0 ? 0 : 2 * (1 - (HSL.L / B)),
    B: B
  }
}
export const hsl2hsv = (hsl) => {
  const hsv1 = hsl.S * (hsl.L < 50 ? hsl.L : 100 - hsl.L) / 100;
  const hsvS = hsv1 === 0 ? 0 : 2 * hsv1 / (hsl.L + hsv1) * 100;
  const hsvV = hsl.L + hsv1;
  return {
    H: hsl.H,
    S: hsvS,
    B: hsvV
  }
}

export const hexToRGB = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    R: parseInt(result[1], 16),
    G: parseInt(result[2], 16),
    B: parseInt(result[3], 16)
  } : null;
}

export const rgbToHex = (RGB) => {
  const rgb = (RGB.R << 16) | (RGB.G << 8) | (RGB.B << 0);
  return '#' + (0x1000000 + rgb).toString(16).slice(1).toUpperCase();
}


export const RGBStringToHSL = (string) => {
  console.log(string);
  const rgb = string.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d.\d|\d)\s*\)/i);
  console.log(rgb);
  const r = rgb[1] / 255;
  const g = rgb[2] / 255;
  const b = rgb[3] / 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d; break;
      case g: h = 2 + ((b - r) / d); break;
      case b: h = 4 + ((r - g) / d); break;
      default:
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  console.log({
    H: h,
    S: s,
    L: l
  })
  return {
    H: h,
    S: s,
    L: l
  }
}