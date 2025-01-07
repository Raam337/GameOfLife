
const ShapeCard = ({ onClick, coordinates, name, current }) => {
  const pxSize = 10

  if (name == "None") {
    coordinates = [[0,0]]
  }
    const minX = Math.min(...coordinates.map(([x]) => x));
    const minY = Math.min(...coordinates.map(([, y]) => y));
    const maxX = Math.max(...coordinates.map(([x]) => x));
    const maxY = Math.max(...coordinates.map(([, y]) => y));

    const gridWidth = maxX - minX + 1;
    const gridHeight = maxY - minY + 1;



  

  return (
    <div onClick={onClick} className={`w-fit h-fit border-2  ${current? "border-blue-700 scale-105" :"border-black"} bg-gray-200 rounded-[20px] p-4 justify-items-center hover:scale-110`}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridWidth}, ${pxSize}px)`,
          gridTemplateRows: `repeat(${gridHeight}, ${pxSize}px)`,
        }}
      >
        {Array.from({ length: gridWidth * gridHeight }).map((_, index) => {
          const row = Math.floor(index / gridWidth);
          const col = index % gridWidth;

          const adjustedX = col + minX;
          const adjustedY = row + minY;
          const isBlack = coordinates.some(
            ([x, y]) => x === adjustedX && y === adjustedY
          );

          return (
            <div
              key={index}
              className={`${isBlack ? "bg-black" : "bg-gray-200 border-[1px] border-gray-300"} `}
            />
          );
        })}
      </div>

      <div>{name}</div>
    </div>
  );
};

export default ShapeCard;
