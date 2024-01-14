
  //Merg function: 
  function merg(left, right) {
    let result = [];
    let rIndex = 0;
    let lIndex = 0;

    while(lIndex < left.length && rIndex < right.length) {
      if(new Date(left[lIndex].date) <= new Date(right[rIndex].date)) {
        result.push(left[lIndex]);
        lIndex++;
      }
      else {
        result.push(right[rIndex])
        rIndex++;
      }
    }
    return result.concat(left.slice(lIndex), right.slice(rIndex));
  }
  //MergSort function:
  function mergSort(data) {
    if(data.length <= 1) return data;
    const midIndex = Math.floor(data.length / 2);
    const left = data.slice(0, midIndex);
    const right = data.slice(midIndex);
    
    return merg(mergSort(left), mergSort(right))
  }

module.exports = {
  mergSort
}