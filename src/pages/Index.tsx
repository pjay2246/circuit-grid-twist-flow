
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

  // Corrected connection checking function
  const checkConnections = (currentTiles: TileType[]) => {
    const newTiles = currentTiles.map(tile => ({ ...tile, isConnected: false }));
    let isAnyConnected = false;

    // Check connections between adjacent tiles
    for (let i = 0; i < 9; i++) {
      const tile = newTiles[i];
      // Calculate actual connection points based on rotation
      const tileConnections = getRotatedConnections(tile);
      
      // Check right connection
      if (i % 3 < 2) {
        const rightTile = newTiles[i + 1];
        const rightConnections = getRotatedConnections(rightTile);
        
        // East of current tile (index 2) connects with West of right tile (index 0)
        if (tileConnections[2] && rightConnections[0]) {
          tile.isConnected = true;
          rightTile.isConnected = true;
          isAnyConnected = true;
        }
      }

      // Check bottom connection
      if (i < 6) {
        const bottomTile = newTiles[i + 3];
        const bottomConnections = getRotatedConnections(bottomTile);
        
        // South of current tile (index 3) connects with North of bottom tile (index 1)
        if (tileConnections[3] && bottomConnections[1]) {
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

  // Helper function to get connections based on rotation
  const getRotatedConnections = (tile: TileType) => {
    const { connections, rotation } = tile;
    const rotationSteps = (rotation / 90) % 4;
    const rotatedConnections = [...connections];
    
    // Rotate the connections array based on rotation
    for (let i = 0; i < rotationSteps; i++) {
      rotatedConnections.unshift(rotatedConnections.pop()!);
    }
    
    return rotatedConnections;
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
