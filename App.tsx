
import React, { useState, useCallback } from 'react';
import { PromptPanel } from './components/PromptPanel';
import { MockupDisplay } from './components/MockupDisplay';
import { generateMockup } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedHtml, setGeneratedHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedHtml('');

    try {
      const html = await generateMockup(prompt);
      setGeneratedHtml(html);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans bg-gray-900 text-gray-100">
      <PromptPanel
        prompt={prompt}
        setPrompt={setPrompt}
        onSubmit={handleGenerate}
        isLoading={isLoading}
      />
      <main className="flex-1 flex flex-col bg-gray-800/50 shadow-lg md:ml-96">
        <MockupDisplay
          htmlContent={generatedHtml}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;
