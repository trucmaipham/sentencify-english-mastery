
import React from 'react';
import { Book, User, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-gray-900">Sentencify</h1>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">English Mastery</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Progress: 25%</span>
              <div className="w-20 h-2 bg-gray-200 rounded-full">
                <div className="w-1/4 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
