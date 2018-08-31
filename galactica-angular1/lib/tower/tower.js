// Tower base script

Function.prototype.method = function(name, func) {
	this.prototype[name] = func;
	return this;
};

//Creates a vector of size "dimension" with cells set to 
//value "initial".
Array.vector = function(dimension, initial) {
	var a = [], i;
	for (i = 0; i < dimension; i++) {
		a[i] = initial;
	}
	return a;
};//Array.vector

//Creates a "m" x "n" matrix with cells set to
//value "initial".
Array.matrix = function(m, n, initial) {
	var a, i, j, mat = [];
	for (i = 0; i < m; i++) {
		a = [];
		for(j = 0; j < n; j++) {
			a[j] = initial;
		}
		mat[i] = a;
	}
	return mat;
};//Array.matrix

//Creates a n x n identity matrix
Array.identity = function(n) {
	var i, mat = Array.matrix(n,n,0);
	for(i = 0; i < n; i++) {
		mat[i][i] = 1;
	}
	return mat;
}; //identity