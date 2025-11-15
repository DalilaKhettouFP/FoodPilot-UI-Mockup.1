
import React from 'react';

interface PromptPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const ExamplePrompts: React.FC<{ setPrompt: (prompt: string) => void }> = ({ setPrompt }) => {
  const examples = [
    'A login page for a futuristic space travel company.',
    'A product dashboard with a sidebar, a main chart, and some stat cards.',
    'A pricing page with three tiers: Starter, Pro, and Enterprise.',
    'A landing page for a SaaS product with a hero section and features list.'
  ];

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-400 mb-2">Examples</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => setPrompt(example)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-left transition-colors"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
};

export const PromptPanel: React.FC<PromptPanelProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit();
    }
  };
  
  return (
    <aside className="fixed top-0 left-0 w-full md:w-96 h-1/3 md:h-screen bg-gray-900 shadow-2xl z-10 flex flex-col p-6 border-r border-gray-700/50 overflow-y-auto">
      <header className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
           <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
             </svg>
           </div>
           <h1 className="text-2xl font-bold text-white">AI Mockup Generator</h1>
        </div>
        <p className="text-gray-400 text-sm">Describe the UI you want to build, and let AI bring it to life.</p>
      </header>
      
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="flex flex-col flex-grow"
      >
        <div className="flex-grow flex flex-col">
            <label htmlFor="prompt-input" className="mb-2 font-semibold text-gray-300">
            Your Mockup Description
            </label>
            <textarea
            id="prompt-input"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., A modern dashboard with a sidebar and three stat cards..."
            className="w-full flex-grow p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows={8}
            />
            <p className="text-xs text-gray-500 mt-2 text-right">Press Cmd/Ctrl + Enter to submit</p>
        </div>

        <div className="my-6">
            <ExamplePrompts setPrompt={setPrompt} />
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !prompt}
          className="w-full flex justify-center items-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {isLoading ? (
             <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
             </>
          ) : 'Generate Mockup'}
        </button>
      </form>
    </aside>
  );
};
