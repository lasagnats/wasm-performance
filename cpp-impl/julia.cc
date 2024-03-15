#include <iostream>
#include <string>
#include <complex>
#include <vector>

#include "julia.h"
#include "emscripten/bind.h"

using namespace emscripten;
using namespace std;


Julia::Julia() {}

std::vector<int> Julia::generateJuliaSet(unsigned int width, unsigned int height, float real, float imaginary) {
    // c = imaginary * i + real

    float scale_x = 3.0 / width;
    float scale_y = 3.0 / height;
    // 2.0 border + 2
    // int* data = new int[width * height];
    std::vector<int> data;
    data.resize(width * height);
    complex<float> c(real, imaginary);
    // initial value of z
    float param_i = 1.5;
    float param_r = 1.5;

    for (unsigned int y = 0; y < height; ++y) {
        for (unsigned int x = 0; x < width; ++x) {
            complex<float> z(x * scale_x - param_r, y * scale_y - param_i);
            unsigned int iter_index = Julia::get_iter_index(z, c);
            data[y * width + x] = static_cast<int>(iter_index);
        }
    }

    return data;
}

unsigned int Julia::get_iter_index(complex<float> z, complex<float> c) {
    unsigned int iter_index = 0;
    while (iter_index < 255) {
        if (norm(z) > 2.0) {
            break;
        }
        z = z * z + c;
        iter_index++;
    }
    return iter_index;

}

EMSCRIPTEN_BINDINGS (c) {
  register_vector<int>("VectorInt");

  class_<Julia>("Julia")
    .constructor()
    .function("generateJuliaSet", &Julia::generateJuliaSet);
}
