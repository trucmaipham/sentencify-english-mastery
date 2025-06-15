
import React, { useState } from 'react';
import Header from '../components/Header';
import SentenceTypeCard from '../components/SentenceTypeCard';
import LessonModal from '../components/LessonModal';

const Index = () => {
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sentenceTypes = [
    {
      id: 'simple',
      title: 'Simple Sentences',
      description: 'Master the foundation with single independent clauses',
      pattern: 'Subject + Verb (+ Object)',
      example: 'The cat sleeps peacefully.',
      difficulty: 'Beginner' as const,
      completed: false
    },
    {
      id: 'compound',
      title: 'Compound Sentences',
      description: 'Connect ideas using coordinating conjunctions',
      pattern: 'Independent Clause + Conjunction + Independent Clause',
      example: 'I love reading, and she enjoys writing.',
      difficulty: 'Intermediate' as const,
      completed: false
    },
    {
      id: 'complex',
      title: 'Complex Sentences',
      description: 'Add depth with subordinating conjunctions',
      pattern: 'Independent Clause + Dependent Clause',
      example: 'Although it was raining, we went for a walk.',
      difficulty: 'Intermediate' as const,
      completed: false
    },
    {
      id: 'compound-complex',
      title: 'Compound-Complex Sentences',
      description: 'Combine multiple ideas with advanced structures',
      pattern: 'Multiple Independent + Dependent Clauses',
      example: 'While I was cooking dinner, John called, and we made plans.',
      difficulty: 'Advanced' as const,
      completed: false
    }
  ];

  const getExercisesForLesson = (lessonId: string) => {
    const exerciseMap: { [key: string]: any[] } = {
      'simple': [
        {
          id: '1',
          targetSentence: 'The dog barks loudly',
          pattern: 'Subject + Verb + Adverb',
          availableParts: [
            { id: 'the', word: 'The', type: 'subject', used: false },
            { id: 'dog', word: 'dog', type: 'subject', used: false },
            { id: 'barks', word: 'barks', type: 'verb', used: false },
            { id: 'loudly', word: 'loudly', type: 'complement', used: false },
            { id: 'cat', word: 'cat', type: 'subject', used: false },
            { id: 'sleeps', word: 'sleeps', type: 'verb', used: false }
          ]
        },
        {
          id: '2',
          targetSentence: 'Students study diligently',
          pattern: 'Subject + Verb + Adverb',
          availableParts: [
            { id: 'students', word: 'Students', type: 'subject', used: false },
            { id: 'study', word: 'study', type: 'verb', used: false },
            { id: 'diligently', word: 'diligently', type: 'complement', used: false },
            { id: 'teachers', word: 'teachers', type: 'subject', used: false },
            { id: 'work', word: 'work', type: 'verb', used: false },
            { id: 'quickly', word: 'quickly', type: 'complement', used: false }
          ]
        }
      ],
      'compound': [
        {
          id: '1',
          targetSentence: 'I read books and she watches movies',
          pattern: 'Subject + Verb + Object + Conjunction + Subject + Verb + Object',
          availableParts: [
            { id: 'i', word: 'I', type: 'subject', used: false },
            { id: 'read', word: 'read', type: 'verb', used: false },
            { id: 'books', word: 'books', type: 'object', used: false },
            { id: 'and', word: 'and', type: 'conjunction', used: false },
            { id: 'she', word: 'she', type: 'subject', used: false },
            { id: 'watches', word: 'watches', type: 'verb', used: false },
            { id: 'movies', word: 'movies', type: 'object', used: false }
          ]
        }
      ]
    };

    return exerciseMap[lessonId] || [];
  };

  const handleLessonClick = (lesson: any) => {
    const exercises = getExercisesForLesson(lesson.id);
    setSelectedLesson({ ...lesson, exercises });
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Master English Sentence Structure
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build confidence in English writing through systematic practice of sentence types and patterns. 
            Learn by doing with interactive exercises and instant feedback.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-primary mb-2">12</div>
            <div className="text-sm text-gray-600">Lessons Completed</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-green-600 mb-2">89%</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-purple-600 mb-2">156</div>
            <div className="text-sm text-gray-600">Sentences Built</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-2xl font-bold text-orange-600 mb-2">7</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
        </div>

        {/* Learning Modules */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sentence Structure Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sentenceTypes.map((type) => (
              <SentenceTypeCard
                key={type.id}
                title={type.title}
                description={type.description}
                pattern={type.pattern}
                example={type.example}
                difficulty={type.difficulty}
                completed={type.completed}
                onClick={() => handleLessonClick(type)}
              />
            ))}
          </div>
        </div>

        {/* Learning Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 border border-blue-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">💡 Learning Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h4 className="font-medium mb-2">Color-Coded Learning</h4>
              <ul className="space-y-1">
                <li className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-blue-200 rounded border border-blue-300"></span>
                  <span>Blue = Subjects</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-green-200 rounded border border-green-300"></span>
                  <span>Green = Verbs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-purple-200 rounded border border-purple-300"></span>
                  <span>Purple = Objects</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Practice Strategy</h4>
              <ul className="space-y-1">
                <li>• Start with simple sentences</li>
                <li>• Practice daily for best results</li>
                <li>• Use the drag-and-drop builder</li>
                <li>• Review incorrect answers</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Lesson Modal */}
      {selectedLesson && (
        <LessonModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedLesson.title}
          exercises={selectedLesson.exercises}
        />
      )}
    </div>
  );
};

export default Index;
