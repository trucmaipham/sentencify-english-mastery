
import React from 'react';
import { ChevronRight, CheckCircle, Circle } from 'lucide-react';

interface SentenceTypeCardProps {
  title: string;
  description: string;
  pattern: string;
  example: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  onClick: () => void;
}

const SentenceTypeCard: React.FC<SentenceTypeCardProps> = ({
  title,
  description,
  pattern,
  example,
  difficulty,
  completed,
  onClick
}) => {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {completed ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <Circle className="h-6 w-6 text-gray-300" />
          )}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColors[difficulty]}`}>
            {difficulty}
          </span>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <p className="text-gray-600 mb-3">{description}</p>
      
      <div className="space-y-2">
        <div>
          <span className="text-sm font-medium text-gray-700">Pattern: </span>
          <span className="text-sm text-primary font-mono">{pattern}</span>
        </div>
        <div>
          <span className="text-sm font-medium text-gray-700">Example: </span>
          <span className="text-sm text-gray-600 italic">"{example}"</span>
        </div>
      </div>
    </div>
  );
};

export default SentenceTypeCard;
