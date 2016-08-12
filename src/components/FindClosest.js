//--------------------------------------------
//
// Finds closest video size to display
// based on screensize
//
//--------------------------------------------


const FindClosest = (self) => {

	let i = 0;
	let minDiff = self.winWidth;
	let arr = self.sizes;
	let num = self.winWidth;
	let ans;

	for (i in arr){
		let m = Math.abs(num - arr[i]);

		if (m < minDiff){
			minDiff = m;
			ans = arr[i];
		}
	}

	return ans;

}

export default FindClosest;