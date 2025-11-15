
import React from 'react';

interface MockupDisplayProps {
  htmlContent: string;
  isLoading: boolean;
  error: string | null;
}

const Loader: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
        <svg className="animate-spin h-10 w-10 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="font-semibold">Generating your mockup...</p>
        <p className="text-sm">This may take a few moments.</p>
    </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h2 className="text-xl font-bold text-gray-300">Your Mockup Awaits</h2>
        <p>Describe your UI in the panel and click "Generate" to see it here.</p>
    </div>
);

const ErrorDisplay: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-red-400 p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-bold">Generation Failed</h2>
        <p className="mt-2 text-sm bg-red-900/50 p-2 rounded-md">{message}</p>
    </div>
);


export const MockupDisplay: React.FC<MockupDisplayProps> = ({ htmlContent, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    if (htmlContent) {
      // WARNING: This is for demonstration purposes. In a production app,
      // you should sanitize the HTML or use a sandboxed iframe to prevent XSS attacks.
      return <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    }
    return <InitialState />;
  };

  return (
    <div className="w-full h-full flex-grow mt-[33vh] md:mt-0 p-4 overflow-auto bg-white">
        {renderContent()}
    </div>
  );
};
