
import React from 'react';
import { RotateCw } from 'lucide-react';

export type TileType = {
  id: number;
  rotation: number;
  connections: boolean[];
  isConnected?: boolean;
};

interface CircuitTileProps {
  tile: TileType;
  onRotate: () => void;
}

const CircuitTile: React.FC<CircuitTileProps> = ({ tile, onRotate }) => {
  const getCircuitLines = () => {
    const lines = [];
    if (tile.connections[0]) lines.push('top-1/2 left-1/2 h-[2px] w-1/2 -translate-x-1/2 rotate-180');
    if (tile.connections[1]) lines.push('top-1/2 left-1/2 w-[2px] h-1/2 -translate-y-1/2');
    if (tile.connections[2]) lines.push('top-1/2 left-1/2 h-[2px] w-1/2 -translate-x-0');
    if (tile.connections[3]) lines.push('top-1/2 left-1/2 w-[2px] h-1/2 translate-y-0');
    return lines;
  };

  return (
    <div
      className="circuit-tile relative"
      onClick={onRotate}
      style={{ transform: `rotate(${tile.rotation}deg)` }}
    >
      {getCircuitLines().map((position, index) => (
        <div
          key={index}
          className={`circuit-line ${position} ${tile.isConnected ? 'circuit-connected' : ''}`}
        />
      ))}
      <RotateCw className="absolute -top-2 -right-2 w-4 h-4 text-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default CircuitTile;
