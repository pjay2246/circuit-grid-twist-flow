
import React from 'react';

interface GameScoreProps {
  score: number;
  moves: number;
}

const GameScore: React.FC<GameScoreProps> = ({ score, moves }) => {
  return (
    <div className="flex gap-8 justify-center items-center mb-8">
      <div className="text-primary">
        <h3 className="text-sm uppercase tracking-wide opacity-70">Score</h3>
        <p className="text-2xl font-bold">{score}</p>
      </div>
      <div className="text-primary">
        <h3 className="text-sm uppercase tracking-wide opacity-70">Moves</h3>
        <p className="text-2xl font-bold">{moves}</p>
      </div>
    </div>
  );
};

export default GameScore;
