@JsExport
fun generateJuliaSet(width: Int, height: Int, real: Float, imaginary: Float): JsAny {
    val pixelArray = generateJulia(width, height, real, imaginary);
    val numArr = JsArray<JsNumber>()
    for (n in pixelArray.indices) {
        numArr[n] = pixelArray[n].toJsNumber()
    }


    return numArr;
}

fun generateJulia(width: Int, height: Int, real: Float, imaginary: Float): IntArray {
    val pixelArray = IntArray(width * height)
    val scaleX = 3.0f / width
    val scaleY = 3.0f / height
    val c = Complex(imaginary, real)
    val paramImaginary = 1.5f
    val paramReal = 1.5f

    for (y in 0 until height) {
        for (x in 0 until width) {
            val z = Complex(y.toFloat() * scaleY - paramImaginary, x.toFloat() * scaleX - paramReal)
            val iterIndex = getIterIndex(z, c)
            pixelArray[y * width + x] = iterIndex
        }
    }
    return pixelArray
}


fun getIterIndex(z: Complex, c: Complex): Int {
    var iterIndex = 0
    var z = z
    while (iterIndex < 255) {
        if (z.norm() > 2.0) {
            break
        }
        z = z.multiplyBy(z).add(c)
        iterIndex++
    }
    return iterIndex
}