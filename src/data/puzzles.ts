import puzzle1 from "../assets/puzzles/puzzle2.jpg";
import puzzle2 from "../assets/puzzles/puzzle1.jpg";
import puzzle3 from "../assets/puzzles/puzzle3.jpg";
import puzzle4 from "../assets/puzzles/puzzle4.jpg";

export type Puzzle = {
  id: number;
  name: string;
  gridSize: number;
  imageUrl: string;
};

export const puzzles: Puzzle[] = [
  { id: 1, name: "Puzzle 1", gridSize: 3, imageUrl:puzzle2},
  { id: 2, name: "Puzzle 2", gridSize: 3, imageUrl:puzzle1},
  { id: 3, name: "Puzzle 3", gridSize: 3, imageUrl:puzzle3},
  { id: 3, name: "Puzzle 3", gridSize: 3, imageUrl:puzzle4},
];