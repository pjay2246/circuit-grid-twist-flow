
import React from 'react';
import CircuitTile, { TileType } from './CircuitTile';

interface GameGridProps {
  tiles: TileType[];
  onTileRotate: (index: number) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ tiles, onTileRotate }) => {
  // Ensure tiles is a valid array before rendering
  if (!tiles || !Array.isArray(tiles) || tiles.length === 0) {
    console.error("Invalid tiles prop provided to GameGrid:", tiles);
    return <div className="p-4 text-red-500">Error: Invalid game data</div>;
  }

  return (
    <div className={`grid grid-cols-${Math.sqrt(tiles.length) || 3} gap-4 p-4 bg-background/5 rounded-xl`}>
      {tiles.map((tile, index) => (
        <CircuitTile
          key={tile?.id || `tile-${index}`}
          tile={tile || { id: -1, rotation: 0, connections: [false, false, false, false] }}
          onRotate={() => onTileRotate(index)}
        />
      ))}
    </div>
  );
};

export default GameGrid;
