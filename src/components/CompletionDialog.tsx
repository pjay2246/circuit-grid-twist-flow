
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy } from "lucide-react";

interface CompletionDialogProps {
  isOpen: boolean;
  score: number;
  moves: number;
  currentLevel: number;
  moveLimit: number;
  onNextLevel: () => void;
}

const CompletionDialog = ({ 
  isOpen, 
  score, 
  moves,
  currentLevel,
  moveLimit,
  onNextLevel 
}: CompletionDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Level {currentLevel} Complete!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center pt-2">
          <p className="text-lg mb-2">Congratulations! You've connected the circuit!</p>
          <div className="flex justify-center gap-8 mt-4">
            <div>
              <p className="text-sm text-muted-foreground">Final Score</p>
              <p className="text-xl font-bold text-primary">{score}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Moves Used</p>
              <p className="text-xl font-bold text-primary">{moves}/{moveLimit}</p>
            </div>
          </div>
          <Button 
            onClick={onNextLevel}
            className="mt-6"
          >
            Next Level
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompletionDialog;
