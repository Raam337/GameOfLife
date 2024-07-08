const includesArray = (arr:[][], target:string) => {
    // Check each sub-array in 'arr' to see if it matches 'target'
    return arr.some(subArray => 
      // Ensure the sub-array has the same length as the target array
      subArray.length === target.length && 
      // Check if every element in the sub-array matches the corresponding element in the target array
      subArray.every((value, index) => value === target[index])
    );
  };

export default includesArray