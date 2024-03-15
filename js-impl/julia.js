export function generateJulia(width, height, real, imaginary) {
    const scaleX = 3.0 / width;
    const scaleY = 3.0 / height;
    const paramI = 1.5;
    const paramR = 1.5;

    const data = new Uint8ClampedArray(width * height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let zx = x * scaleX - paramR;
        let zy = y * scaleY - paramI;
        let iterIndex = getIterIndex(zx, zy, real, imaginary);
        data[y * width + x] = iterIndex;
      }
    }

    return data;
  }

  function getIterIndex(x, y, real, imaginary) {
    let zx = x;
    let zy = y;
    let iterIndex = 0;

    while (iterIndex < 255) {
      const xtemp = zx * zx - zy * zy + real;
      zy = 2 * zx * zy + imaginary;
      zx = xtemp;
      if (zx * zx + zy * zy > 4) {
        // Pythagoras theorem in complex plane
        break;
      }
      iterIndex++;
    }

    return iterIndex;
  }
