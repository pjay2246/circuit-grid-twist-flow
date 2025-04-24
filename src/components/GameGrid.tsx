
import React from 'react';
import CircuitTile, { TileType } from './CircuitTile';

interface GameGridProps {
  tiles: TileType[];
  onTileRotate: (index: number) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ tiles, onTileRotate }) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-background/5 rounded-xl">
      {tiles.map((tile, index) => (
        <CircuitTile
          key={tile.id}
          tile={tile}
          onRotate={() => onTileRotate(index)}
        />
      ))}
    </div>
  );
};

export default GameGrid;
