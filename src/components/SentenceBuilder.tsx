
import React, { useState, useCallback } from 'react';
import { CheckCircle, XCircle, RotateCcw, Lightbulb } from 'lucide-react';

interface WordPart {
  id: string;
  word: string;
  type: 'subject' | 'verb' | 'object' | 'complement' | 'conjunction';
  used: boolean;
}

interface SentenceBuilderProps {
  targetSentence: string;
  availableParts: WordPart[];
  pattern: string;
  onComplete: (correct: boolean) => void;
}

const SentenceBuilder: React.FC<SentenceBuilderProps> = ({
  targetSentence,
  availableParts,
  pattern,
  onComplete
}) => {
  const [builtSentence, setBuiltSentence] = useState<WordPart[]>([]);
  const [usedParts, setUsedParts] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent, position: number) => {
    e.preventDefault();
    const partId = e.dataTransfer.getData('text/plain');
    const part = availableParts.find(p => p.id === partId);
    
    if (part && !usedParts.has(partId)) {
      const newSentence = [...builtSentence];
      newSentence[position] = part;
      setBuiltSentence(newSentence);
      setUsedParts(prev => new Set([...prev, partId]));
    }
  }, [builtSentence, availableParts, usedParts]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, part: WordPart) => {
    e.dataTransfer.setData('text/plain', part.id);
  };

  const removePart = (position: number) => {
    const part = builtSentence[position];
    if (part) {
      setUsedParts(prev => {
        const newSet = new Set(prev);
        newSet.delete(part.id);
        return newSet;
      });
      const newSentence = [...builtSentence];
      newSentence[position] = undefined as any;
      setBuiltSentence(newSentence);
    }
  };

  const checkAnswer = () => {
    const userSentence = builtSentence.map(part => part?.word).join(' ').trim();
    const correct = userSentence.toLowerCase() === targetSentence.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    onComplete(correct);
  };

  const reset = () => {
    setBuiltSentence([]);
    setUsedParts(new Set());
    setShowFeedback(false);
  };

  const getPartClassName = (type: string) => {
    const baseClasses = "px-3 py-2 rounded-lg border-2 text-sm font-medium transition-colors";
    switch (type) {
      case 'subject': return `${baseClasses} sentence-part-subject`;
      case 'verb': return `${baseClasses} sentence-part-verb`;
      case 'object': return `${baseClasses} sentence-part-object`;
      case 'complement': return `${baseClasses} sentence-part-complement`;
      default: return `${baseClasses} bg-gray-100 text-gray-800 border-gray-200`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Pattern Guide */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <Lightbulb className="h-5 w-5 text-blue-600" />
          <h4 className="font-medium text-blue-900">Sentence Pattern</h4>
        </div>
        <p className="text-blue-800 font-mono text-sm">{pattern}</p>
      </div>

      {/* Sentence Building Area */}
      <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300 min-h-20">
        <h4 className="font-medium text-gray-700 mb-3">Build your sentence:</h4>
        <div className="flex flex-wrap gap-2 min-h-12">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className={`min-w-20 min-h-10 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center p-2 ${
                builtSentence[index] ? 'border-solid border-gray-400' : 'hover:border-gray-400'
              }`}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
              onClick={() => removePart(index)}
            >
              {builtSentence[index] ? (
                <span className={getPartClassName(builtSentence[index].type)}>
                  {builtSentence[index].word}
                </span>
              ) : (
                <span className="text-gray-400 text-sm">Drop here</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available Word Parts */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">Available words:</h4>
        <div className="flex flex-wrap gap-2">
          {availableParts.map((part) => (
            <div
              key={part.id}
              draggable={!usedParts.has(part.id)}
              onDragStart={(e) => handleDragStart(e, part)}
              className={`${getPartClassName(part.type)} cursor-move ${
                usedParts.has(part.id) ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-sm'
              }`}
            >
              {part.word}
            </div>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={checkAnswer}
          disabled={builtSentence.filter(Boolean).length === 0}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Check Answer
        </button>
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center space-x-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </button>
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`p-4 rounded-lg border ${isCorrect ? 'correct-answer' : 'incorrect-answer'}`}>
          <div className="flex items-center space-x-2">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <span className="font-medium">
              {isCorrect ? 'Excellent!' : 'Not quite right.'}
            </span>
          </div>
          {!isCorrect && (
            <p className="mt-2 text-sm">
              Correct answer: "{targetSentence}"
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SentenceBuilder;
