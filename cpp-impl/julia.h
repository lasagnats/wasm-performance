#ifndef JULIA_H
#define JULIA_H

#include <string>
#include <complex>
#include <vector>

using std::string;

class Julia {

  public:
    Julia ();
    std::vector<int> generateJuliaSet (unsigned int width, unsigned int height, float real, float imaginary);
    unsigned int get_iter_index(std::complex<float> z, std::complex<float> c);
};

#endif
