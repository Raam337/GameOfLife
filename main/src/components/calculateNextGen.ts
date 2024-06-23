export default function calculateNextGen(currentGen:number[][]):number[][]{
    const nextGen: number[][] = [];
  
    for (let i = 0; i < currentGen.length; i++) {
      nextGen[i] = [];
      for (let j = 0; j < currentGen[0].length; j++) {
        nextGen[i][j] = 0
      }
    }

    for (let y=0; y < currentGen.length;y++){
        for (let x=0; x < currentGen[0].length;x++){
            let numCellsArround = cellsArround(currentGen,x,y)
            if(numCellsArround <=1) nextGen[y][x]=0
            if(numCellsArround == 2) nextGen[y][x]=currentGen[y][x]
            if(numCellsArround == 3) nextGen[y][x]=1
            if(numCellsArround >= 4) nextGen[y][x]=0
        }
    }
    console.log("nextgen:")
    console.log(nextGen)
    return nextGen

}

function cellsArround(matrix:number[][],x:number,y:number):number{
    let total=0;
    var temp
    for (let dy=-1;dy<=1;dy++){
        for (let dx=-1;dx<=1;dx++){
            if(dx == 0 && dy ==0 ) continue
            try {
                temp = matrix[y+dy][x+dx]
            } catch { 
                continue 
            }
            temp? total += matrix[y+dy][x+dx]: null;
        }    
    }

    return total
}

