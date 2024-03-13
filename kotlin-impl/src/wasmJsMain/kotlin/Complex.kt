import kotlin.math.hypot;

data class Complex(val imaginary: Float, val real: Float) {


    fun add(summand2: Complex): Complex {
        val summand1 = this;
        val resultImaginary = summand1.imaginary + summand2.imaginary;
        val resultReal = summand1.real + summand2.real;

        return Complex(resultImaginary, resultReal);
    }

    fun subtract(subtrahend: Complex): Complex {
        val minuend = this;
        val resultImaginary = minuend.imaginary - subtrahend.imaginary;
        val resultReal = minuend.real - subtrahend.real;

        return Complex(resultImaginary, resultReal);
    }

    fun multiplyBy(multiplicand: Complex): Complex {
        // (a + bi) * (c + di) = (ad + bc) * i + (ac-bd)
        val multiplier = this;
        //                                a   *   d                    +                 b    *   c
        val resultImaginary = multiplier.real * multiplicand.imaginary + multiplier.imaginary * multiplicand.real;
        //                                a   *   c          -                 b    *   d
        val resultReal = multiplier.real * multiplicand.real - multiplier.imaginary * multiplicand.imaginary;

        return Complex(resultImaginary, resultReal);
    }

    // Returns the magnitude of the vector in the complex plane
    fun norm(): Float {
        return hypot(real, imaginary)
    }

}