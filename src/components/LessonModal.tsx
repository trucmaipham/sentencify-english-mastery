
import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import SentenceBuilder from './SentenceBuilder';

interface Exercise {
  id: string;
  targetSentence: string;
  availableParts: Array<{
    id: string;
    word: string;
    type: 'subject' | 'verb' | 'object' | 'complement' | 'conjunction';
    used: boolean;
  }>;
  pattern: string;
}

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  exercises: Exercise[];
}

const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  onClose,
  title,
  exercises
}) => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());

  if (!isOpen) return null;

  const handleExerciseComplete = (correct: boolean) => {
    if (correct) {
      setCompletedExercises(prev => new Set([...prev, currentExercise]));
    }
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    }
  };

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">
              Exercise {currentExercise + 1} of {exercises.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">
              {completedExercises.size}/{exercises.length} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedExercises.size / exercises.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Exercise Content */}
        <div className="p-6">
          {exercises[currentExercise] && (
            <SentenceBuilder
              targetSentence={exercises[currentExercise].targetSentence}
              availableParts={exercises[currentExercise].availableParts}
              pattern={exercises[currentExercise].pattern}
              onComplete={handleExerciseComplete}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center p-6 border-t bg-gray-50">
          <button
            onClick={prevExercise}
            disabled={currentExercise === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {exercises.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentExercise(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentExercise
                    ? 'bg-primary text-white'
                    : completedExercises.has(index)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextExercise}
            disabled={currentExercise === exercises.length - 1}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
