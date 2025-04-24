
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
    // Top connection (North)
    if (tile.connections[0]) lines.push('top-0 left-1/2 w-[2px] h-1/2 -translate-x-1/2');
    // Right connection (East)
    if (tile.connections[1]) lines.push('top-1/2 right-0 h-[2px] w-1/2 -translate-y-1/2');
    // Bottom connection (South)
    if (tile.connections[2]) lines.push('bottom-0 left-1/2 w-[2px] h-1/2 -translate-x-1/2');
    // Left connection (West)
    if (tile.connections[3]) lines.push('top-1/2 left-0 h-[2px] w-1/2 -translate-y-1/2');
    return lines;
  };

  return (
    <div
      className={`circuit-tile relative group ${tile.isConnected ? 'border-primary' : ''}`}
      onClick={onRotate}
      style={{ transform: `rotate(${tile.rotation}deg)`, transition: 'transform 0.3s ease-in-out' }}
    >
      {getCircuitLines().map((position, index) => (
        <div
          key={index}
          className={`absolute ${position} ${tile.isConnected ? 'circuit-connected' : 'circuit-line'}`}
        />
      ))}
      <RotateCw className="absolute -top-2 -right-2 w-4 h-4 text-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};

export default CircuitTile;
