package main

import (
	"math/cmplx"
	"syscall/js"
)

func main() {
	done := make(chan struct{}, 0)
	global := js.Global()
	global.Set("wasmGenerateJulia", js.FuncOf(generateJulia))
	<-done
}

func generateJulia(this js.Value, args []js.Value) interface{} {
	width := args[0].Int()
	height := args[1].Int()
	real := float64(args[2].Float())
	imaginary := float64(args[3].Float())
	scaleX := 3.0 / float64(width)
	scaleY := 3.0 / float64(height)
	paramI := 1.5
	paramR := 1.5

	data := make([]interface{}, 0, width*height)

	c := complex(real, imaginary)

	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			z := complex(float64(x)*scaleX-paramR, float64(y)*scaleY-paramI)
			iterIndex := getIterIndex(z, c)
			data = append(data, iterIndex)
		}
	}

	return data
}

func getIterIndex(z complex128, c complex128) uint8 {
	var iterIndex uint8 = 0
	for iterIndex < 255 {
		if cmplx.Abs(z) > 2.0 {
			break
		}
		z = z*z + c
		iterIndex++
	}
	return iterIndex
}
