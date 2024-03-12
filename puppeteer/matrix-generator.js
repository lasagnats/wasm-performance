// Matrix generation

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMatrix(row, col) {
  let matrix = [];
  for (let i = 0; i < row; i++) {
    matrix[i] = [];
    for (let j = 0; j < col; j++) {
      matrix[i][j] = getRandomInt(1, 100);
    }
  }
  return matrix;

}

function serializeMatrix(matrix) {
	return matrix.map(row => row.join(",")).join("\n");
}

function generateMatrixPairs(dim) {
    let dim2 = dim > 1 ? dim-1: dim;

    // In order to be able to perform matrix multiplication: col of matrix1 == row of matrix 2
    let matrix1 = generateMatrix(dim2, dim);
    let matrix2 = generateMatrix(dim, dim2);
    return {matrix1, matrix2};
}


module.exports = {
    getRandomInt,
    generateMatrix,
    serializeMatrix,
    generateMatrixPairs,
}