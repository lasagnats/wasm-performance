export function getInputValues() {
  const width = document.getElementById("width");
  const height = document.getElementById("height");
  const real = document.getElementById("real");
  const imaginary = document.getElementById("imaginary");
  if (!width.value || !height.value || !real.value || !imaginary.value) return;
  return {
    width: +width.value,
    height: +height.value,
    real: +real.value,
    imaginary: +imaginary.value,
  };
}
