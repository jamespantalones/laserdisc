//--------------------------------------------
//
// Finds closest video size to display
// based on screensize
//
//--------------------------------------------

var FindClosest = function(self){

	var i = 0;
	var minDiff = self.winWidth;
	var num = self.winWidth;
	var arr = self.sizes;
	var ans;

	for (i in arr){
		var m = Math.abs(num - arr[i]);

		if (m < minDiff){
			minDiff = m;
			ans = arr[i];
		}
	}

	return ans;
};


module.exports = FindClosest;
