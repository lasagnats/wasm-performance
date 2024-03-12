use wasm_bindgen::prelude::*;
use wasm_bindgen::JsValue;
use num_complex::Complex;
use serde::{Deserialize, Serialize};


#[wasm_bindgen]
pub fn julia_set(width: u32, height: u32, real: f32, imaginary: f32) -> JsValue {
    let data = generate_julia_set(width, height, real, imaginary);

    let wrapped: Result<JsValue, serde_wasm_bindgen::Error> =
    serde_wasm_bindgen::to_value(&data).into();
    wrapped.unwrap()
}

fn generate_julia_set(width: u32, height: u32, real: f32, imaginary: f32) -> Vec<u8> {
    // c = imaginary * i + real

    let scale_x = 3.0 / width as f32;
    let scale_y = 3.0 / height as f32;
    // 2.0 border + 2
    let mut data = Vec::new();
    let c = Complex::new(real, imaginary);
    // initial value of z
    let param_i = 1.5;
    let param_r = 1.5;
    // let scale = 0.005;

    for y in 0..height {
        for x in 0..width {
            let z = Complex::new( x as f32 * scale_x - param_r, y as f32 * scale_y - param_i);
            let iter_index = get_iter_index(z, c);
            data.push((iter_index) as u8);
        }
    }

    data
}

fn get_iter_index(z: Complex<f32>, c: Complex<f32>) -> u32 {
    let mut iter_index: u32 = 0;
    let mut z = z;
    while iter_index < 255 {
        if z.norm() > 2.0 {
            break;
        }
        z = z * z + c;
        iter_index += 1;
    }
    iter_index
}