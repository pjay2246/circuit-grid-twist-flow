
import React, { useState, useEffect } from 'react';
import GameGrid from '../components/GameGrid';
import GameScore from '../components/GameScore';
import { TileType } from '../components/CircuitTile';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [tiles, setTiles] = useState<TileType[]>([
    { id: 1, rotation: 0, connections: [true, false, true, false] },
    { id: 2, rotation: 90, connections: [true, true, false, false] },
    { id: 3, rotation: 180, connections: [false, true, true, false] },
    { id: 4, rotation: 0, connections: [false, true, false, true] },
    { id: 5, rotation: 90, connections: [true, false, false, true] },
    { id: 6, rotation: 270, connections: [true, true, false, false] },
    { id: 7, rotation: 0, connections: [false, true, true, false] },
    { id: 8, rotation: 90, connections: [true, false, true, false] },
    { id: 9, rotation: 180, connections: [true, false, false, true] },
  ]);

  const handleTileRotate = (index: number) => {
    const newTiles = [...tiles];
    newTiles[index] = {
      ...newTiles[index],
      rotation: (newTiles[index].rotation + 90) % 360
    };
    setTiles(newTiles);
    setMoves(moves + 1);
    checkConnections(newTiles);
  };

  const checkConnections = (currentTiles: TileType[]) => {
    const newTiles = currentTiles.map(tile => ({ ...tile, isConnected: false }));
    let isAnyConnected = false;

    // Simple connection check for adjacent tiles
    for (let i = 0; i < 9; i++) {
      const tile = newTiles[i];
      const rotation = tile.rotation / 90;
      
      // Check right connection
      if (i % 3 < 2) {
        const rightTile = newTiles[i + 1];
        const rightRotation = rightTile.rotation / 90;
        if (tile.connections[(2 - rotation) % 4] && rightTile.connections[(0 - rightRotation) % 4]) {
          tile.isConnected = true;
          rightTile.isConnected = true;
          isAnyConnected = true;
        }
      }

      // Check bottom connection
      if (i < 6) {
        const bottomTile = newTiles[i + 3];
        const bottomRotation = bottomTile.rotation / 90;
        if (tile.connections[(3 - rotation) % 4] && bottomTile.connections[(1 - bottomRotation) % 4]) {
          tile.isConnected = true;
          bottomTile.isConnected = true;
          isAnyConnected = true;
        }
      }
    }

    if (isAnyConnected) {
      setScore(score + 10);
      toast({
        title: "Circuit Connected!",
        description: "+10 points",
      });
    }

    setTiles(newTiles);
  };

  useEffect(() => {
    checkConnections(tiles);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-primary mb-8">Circuit Connect</h1>
      <GameScore score={score} moves={moves} />
      <GameGrid tiles={tiles} onTileRotate={handleTileRotate} />
      <p className="mt-8 text-primary/70 text-sm">
        Rotate tiles to connect the circuits!
      </p>
    </div>
  );
};

export default Index;
