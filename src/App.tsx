import React, { useState } from 'react';
import { humanizeText } from './utils/textHumanizer';
import { Wand2, Copy, Check, RefreshCw } from 'lucide-react';

function App() {
  const [inputText, setInputText] = useState('');
  const [tone, setTone] = useState<'casual' | 'formal' | 'persuasive'>('casual');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleHumanize = () => {
    setLoading(true);
    // Simulate processing time for more natural feel
    setTimeout(() => {
      const humanized = humanizeText(inputText, tone);
      setOutput(humanized);
      setLoading(false);
    }, 600);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const humanized = humanizeText(inputText, tone);
      setOutput(humanized);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Text Humanizer
          </h1>
          <p className="text-gray-600 text-lg">
            Transform your text into natural, human-like writing with AI-powered enhancement
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Input Text
            </label>
            <textarea
              className="w-full h-40 p-4 text-gray-800 bg-white/50 border border-gray-200 rounded-2xl 
                       shadow-inner focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                       transition-all duration-200 resize-none"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter your text here..."
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Writing Tone
              </label>
              <select
                className="w-full p-3 bg-white/50 border border-gray-200 rounded-xl 
                         focus:ring-2 focus:ring-purple-500 focus:border-purple-500 
                         transition-all duration-200"
                value={tone}
                onChange={(e) => setTone(e.target.value as 'casual' | 'formal' | 'persuasive')}
              >
                <option value="casual">Casual & Friendly</option>
                <option value="formal">Professional & Formal</option>
                <option value="persuasive">Confident & Persuasive</option>
              </select>
            </div>

            <button
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
                       rounded-xl hover:from-indigo-700 hover:to-purple-700
                       focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
                       transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
              onClick={handleHumanize}
              disabled={loading || !inputText.trim()}
            >
              <Wand2 className="w-5 h-5" />
              <span>Humanize</span>
            </button>
          </div>

          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">
                  Humanized Output
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRegenerate}
                    className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                    disabled={loading}
                  >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                  >
                    {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div className="w-full min-h-40 p-4 bg-white/50 border border-gray-200 
                           rounded-2xl shadow-inner whitespace-pre-wrap text-gray-800">
                {output}
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          Pro tip: Try regenerating multiple times to get different variations of human-like text
        </div>
      </div>
    </div>
  );
}

export default App;