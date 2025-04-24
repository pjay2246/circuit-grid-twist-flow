
import { TileType } from "@/components/CircuitTile";

export interface LevelConfig {
  id: number;
  moveLimit: number;
  tiles: TileType[];
}

export const levels: LevelConfig[] = [
  {
    id: 1,
    moveLimit: 5,
    tiles: [
      { id: 1, rotation: 0, connections: [true, false, true, false], isStart: true },
      { id: 2, rotation: 90, connections: [true, true, false, false] },
      { id: 3, rotation: 0, connections: [false, true, false, true] },
      { id: 4, rotation: 180, connections: [true, false, false, true], isEnd: true },
    ],
  },
  {
    id: 2,
    moveLimit: 8,
    tiles: [
      { id: 1, rotation: 0, connections: [true, false, true, false], isStart: true },
      { id: 2, rotation: 90, connections: [true, true, false, false] },
      { id: 3, rotation: 180, connections: [false, true, true, false] },
      { id: 4, rotation: 0, connections: [false, true, false, true] },
      { id: 5, rotation: 90, connections: [true, false, false, true] },
      { id: 6, rotation: 270, connections: [true, true, false, false], isEnd: true },
    ],
  },
  {
    id: 3,
    moveLimit: 10,
    tiles: [
      { id: 1, rotation: 0, connections: [true, false, true, false], isStart: true },
      { id: 2, rotation: 90, connections: [true, true, false, false] },
      { id: 3, rotation: 180, connections: [false, true, true, false] },
      { id: 4, rotation: 0, connections: [false, true, false, true] },
      { id: 5, rotation: 90, connections: [true, false, false, true] },
      { id: 6, rotation: 270, connections: [true, true, false, false] },
      { id: 7, rotation: 0, connections: [false, true, true, false] },
      { id: 8, rotation: 90, connections: [true, false, true, false] },
      { id: 9, rotation: 180, connections: [true, false, false, true], isEnd: true },
    ],
  },
  // ... Add more levels with increasing complexity
];
