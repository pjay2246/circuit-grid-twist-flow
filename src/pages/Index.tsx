import React, { useState, useEffect } from 'react';
import GameGrid from '../components/GameGrid';
import GameScore from '../components/GameScore';
import { TileType } from '../components/CircuitTile';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CircleArrowRight } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [tiles, setTiles] = useState<TileType[]>([
    { id: 1, rotation: 0, connections: [true, false, true, false], isStart: true },
    { id: 2, rotation: 90, connections: [true, true, false, false] },
    { id: 3, rotation: 180, connections: [false, true, true, false] },
    { id: 4, rotation: 0, connections: [false, true, false, true] },
    { id: 5, rotation: 90, connections: [true, false, false, true] },
    { id: 6, rotation: 270, connections: [true, true, false, false] },
    { id: 7, rotation: 0, connections: [false, true, true, false] },
    { id: 8, rotation: 90, connections: [true, false, true, false] },
    { id: 9, rotation: 180, connections: [true, false, false, true], isEnd: true },
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

    for (let i = 0; i < 9; i++) {
      const tile = newTiles[i];
      const tileConnections = getRotatedConnections(tile);
      
      if (i % 3 < 2) {
        const rightTile = newTiles[i + 1];
        const rightConnections = getRotatedConnections(rightTile);
        
        if (tileConnections[1] && rightConnections[3]) {
          tile.isConnected = true;
          rightTile.isConnected = true;
          isAnyConnected = true;
        }
      }

      if (i < 6) {
        const bottomTile = newTiles[i + 3];
        const bottomConnections = getRotatedConnections(bottomTile);
        
        if (tileConnections[2] && bottomConnections[0]) {
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

  const getRotatedConnections = (tile: TileType) => {
    const { connections, rotation } = tile;
    const rotationSteps = (rotation / 90) % 4;
    const rotatedConnections = [...connections];
    
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
      
      <Alert className="mb-4 max-w-md">
        <CircleArrowRight className="h-4 w-4" />
        <AlertDescription>
          Connect the green start point to the red end point by rotating tiles to create a complete circuit path.
        </AlertDescription>
      </Alert>
      
      <GameScore score={score} moves={moves} />
      <GameGrid tiles={tiles} onTileRotate={handleTileRotate} />
      <p className="mt-8 text-primary/70 text-sm">
        Rotate tiles to connect the circuits from green to red!
      </p>
    </div>
  );
};

export default Index;
