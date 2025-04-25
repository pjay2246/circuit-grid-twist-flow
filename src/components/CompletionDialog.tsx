
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Award } from "lucide-react";

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
            <Award className="h-8 w-8 text-yellow-500 animate-bounce" />
            Level {currentLevel} Complete!
          </DialogTitle>
        </DialogHeader>
        <div className="text-center pt-2">
          <p className="text-lg mb-2">Circuit successfully connected!</p>
          <div className="flex justify-center gap-8 mt-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Final Score</p>
              <p className="text-2xl font-bold text-primary">{score}</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Moves Used</p>
              <p className="text-2xl font-bold text-primary">{moves}/{moveLimit}</p>
            </div>
          </div>
          <Button 
            onClick={onNextLevel}
            className="mt-6 bg-primary hover:bg-primary/90"
            size="lg"
          >
            Next Level
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompletionDialog;
