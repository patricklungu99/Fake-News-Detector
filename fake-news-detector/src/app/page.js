'use client';
import { useState } from 'react';
import { Search, Shield, AlertTriangle, CheckCircle, Eye, TrendingUp, Zap } from 'lucide-react';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(0);

  const analyzeText = async () => {
  if (!inputText.trim()) return;

  setIsAnalyzing(true);
  setResult(null);

  try {
    const res = await fetch("http://localhost:5000/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch prediction");
    }

   const data = await res.json();
    setConfidence(data.confidence * 100);
    setResult({
      isFake: data.label.toLowerCase().includes('fake'),
      category: data.label,
      reasons: [
        data.label === 'FAKE' ? 'Model flagged this as deceptive.' : 'Model found this credible.'
      ]
    });
  } catch (err) {
    console.error("Prediction error:", err);
    setResult({
      isFake: true,
      confidence: 0,
      category: "Error",
      reasons: ["Failed to analyze the text. Please try again."],
    });
  } finally {
    setIsAnalyzing(false);
  }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      analyzeText();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-4xl">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Fake News Detector
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl">
              Harness the power of AI to identify misinformation and protect yourself from fake news. 
              Get instant analysis with confidence scores and detailed insights.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-blue-400">94.7%</div>
                  <div className="text-sm text-gray-300">Accuracy Rate</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-green-400">2.3M+</div>
                  <div className="text-sm text-gray-300">Articles Analyzed</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-400" />
                <div>
                  <div className="text-2xl font-bold text-yellow-400">0.8s</div>
                  <div className="text-sm text-gray-300">Avg Response Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Input Section */}
          <div className="w-full max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-300">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Paste your news article, headline, or text to analyze:
              </label>
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter the text you want to verify for authenticity..."
                  className="w-full h-32 p-4 bg-black/20 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {inputText.length}/2000
                </div>
              </div>
              <button
                onClick={analyzeText}
                disabled={!inputText.trim() || isAnalyzing}
                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Analyze Text
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="w-full max-w-3xl animate-in fade-in duration-500">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Analysis Results</h3>
                  <div className="flex items-center gap-2">
                    {result.isFake ? (
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    <span className={`font-medium ${result.isFake ? 'text-red-400' : 'text-green-400'}`}>
                      {result.category}
                    </span>
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-300">Confidence Score</span>
                    <span className="text-sm font-medium">{Math.round(confidence)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        result.isFake 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                          : 'bg-gradient-to-r from-green-500 to-blue-500'
                      }`}
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                </div>

                {/* Analysis Reasons */}
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Key Indicators:</h4>
                  <ul className="space-y-1">
                    {result.reasons.map((reason, index) => (
                      <li key={index} className="text-sm text-gray-300 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${result.isFake ? 'bg-red-400' : 'bg-green-400'}`}></div>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Quick Tips */}
          <div className="w-full max-w-3xl">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-3 text-center">💡 Quick Tips to Spot Fake News</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>Check the source and publication date</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>Look for emotional or sensational language</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2"></div>
                  <div>Verify with multiple credible sources</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>Check author credentials and expertise</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}