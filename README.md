# Game Of Life: React edition

Custom version of Conway's Game of Life implemented using React features.

## Demo

Visit [link](https://raam337.github.io/GameOfLife/) to open demo and explore available features.

## Project Features
The project has following features and techniques:

- **Simulation Speed Control**: Allows to adjust the speed of the simulation dynamically using a slider.  
- **Pre-defined Shapes Library**: Choose from a list of pre-defined shapes, eliminating the need to manually draw shapes.  
- **Clear Functionality**: Includes a clear button to clear all cells from the grid.  
- **Render Optimization**: Utilizes React-specific optimisation techniques such as:
  - `useMemo()` for memoizing computed values.  
  - `useCallback()` for memoizing functions.  
  - `useImperativeHandle()` for customizing refs and reducing unnecessary re-renders.  
- **React-Only Implementation**: Built entirely using React without reliance on other rendering libraries.  
- **Efficient Matrix Operations**: Handles grid-based operations using mathematical calculations on a 2D array matrix.  

## License

[MIT](https://choosealicense.com/licenses/mit/)
