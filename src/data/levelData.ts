
import { TileType } from "@/components/CircuitTile";

export interface LevelConfig {
  id: number;
  moveLimit: number;
  tiles: TileType[];
}

export const levels: LevelConfig[] = [
  {
    id: 1,
    moveLimit: 6,
    tiles: [
      { id: 1, rotation: 0, connections: [true, false, true, false], isStart: true },
      { id: 2, rotation: 0, connections: [true, false, true, false] },
      { id: 3, rotation: 0, connections: [false, true, true, false] },
      { id: 4, rotation: 90, connections: [true, false, true, false] },
      { id: 5, rotation: 180, connections: [false, true, false, true] },
      { id: 6, rotation: 270, connections: [true, false, false, true], isEnd: true },
    ],
  },
  {
    id: 2,
    moveLimit: 10,
    tiles: [
      { id: 1, rotation: 0, connections: [true, false, true, false], isStart: true },
      { id: 2, rotation: 90, connections: [true, true, false, false] },
      { id: 3, rotation: 0, connections: [false, true, true, false] },
      { id: 4, rotation: 270, connections: [true, true, false, false] },
      { id: 5, rotation: 0, connections: [false, true, false, true] },
      { id: 6, rotation: 90, connections: [true, false, true, false] },
      { id: 7, rotation: 180, connections: [true, true, false, false] },
      { id: 8, rotation: 0, connections: [false, true, false, true] },
      { id: 9, rotation: 270, connections: [true, false, false, true], isEnd: true },
    ],
  },
  {
    id: 3,
    moveLimit: 12,
    tiles: [
      { id: 1, rotation: 0, connections: [true, false, true, false], isStart: true },
      { id: 2, rotation: 90, connections: [true, true, true, false] },
      { id: 3, rotation: 180, connections: [false, true, true, true] },
      { id: 4, rotation: 0, connections: [true, true, false, true] },
      { id: 5, rotation: 270, connections: [true, false, true, true] },
      { id: 6, rotation: 0, connections: [true, true, true, false] },
      { id: 7, rotation: 90, connections: [false, true, true, true] },
      { id: 8, rotation: 180, connections: [true, false, true, false] },
      { id: 9, rotation: 0, connections: [true, true, false, true] },
      { id: 10, rotation: 270, connections: [true, false, false, true], isEnd: true },
    ],
  }
];
