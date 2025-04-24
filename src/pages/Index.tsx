import React, { useState, useEffect } from 'react';
import GameGrid from '../components/GameGrid';
import GameScore from '../components/GameScore';
import CompletionDialog from '../components/CompletionDialog';
import { TileType } from '../components/CircuitTile';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CircleArrowRight } from 'lucide-react';
import { levels } from '@/data/levelData';

const Index = () => {
  const { toast } = useToast();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [tiles, setTiles] = useState<TileType[]>(levels[0].tiles);

  const handleNextLevel = () => {
    if (currentLevel < levels.length) {
      const nextLevel = currentLevel + 1;
      setCurrentLevel(nextLevel);
      setTiles(levels[nextLevel - 1].tiles);
      setMoves(0);
      setIsCompleted(false);
      
      toast({
        title: `Level ${nextLevel}`,
        description: "Get ready for the next challenge!",
      });
    } else {
      toast({
        title: "Game Complete!",
        description: "You've completed all levels! Final score: " + score,
      });
    }
  };

  const handleTileRotate = (index: number) => {
    const currentLevelConfig = levels[currentLevel - 1];
    if (moves >= currentLevelConfig.moveLimit) {
      toast({
        title: "Move Limit Reached",
        description: "You've used all available moves for this level!",
        variant: "destructive",
      });
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = {
      ...newTiles[index],
      rotation: (newTiles[index].rotation + 90) % 360
    };
    setTiles(newTiles);
    setMoves(moves + 1);
    checkConnections(newTiles);
  };

  const checkCircuitCompletion = (tiles: TileType[]) => {
    const startTile = tiles.find(tile => tile.isStart);
    const endTile = tiles.find(tile => tile.isEnd);
    
    if (!startTile || !endTile) return false;
    
    return startTile.isConnected && endTile.isConnected;
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
    
    if (checkCircuitCompletion(newTiles)) {
      setIsCompleted(true);
    }
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

  const currentLevelConfig = levels[currentLevel - 1];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-primary mb-4">Circuit Connect</h1>
      <h2 className="text-2xl font-semibold text-primary/80 mb-6">Level {currentLevel}</h2>
      
      <Alert className="mb-4 max-w-md">
        <CircleArrowRight className="h-4 w-4" />
        <AlertDescription>
          Connect the green start point to the red end point. Moves remaining: {currentLevelConfig.moveLimit - moves}
        </AlertDescription>
      </Alert>
      
      <GameScore score={score} moves={moves} />
      <GameGrid tiles={tiles} onTileRotate={handleTileRotate} />
      <p className="mt-8 text-primary/70 text-sm">
        Rotate tiles to connect the circuits from green to red!
      </p>
      
      <CompletionDialog 
        isOpen={isCompleted} 
        score={score} 
        moves={moves}
        currentLevel={currentLevel}
        moveLimit={currentLevelConfig.moveLimit}
        onNextLevel={handleNextLevel}
      />
    </div>
  );
};

export default Index;
