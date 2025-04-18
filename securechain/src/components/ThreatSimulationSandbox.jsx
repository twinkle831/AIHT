import { useState } from 'react';
import { AlertCircle, Check, ChevronRight, HelpCircle, Mail, Shield, AlertTriangle, X } from 'lucide-react';

export default function ThreatSimulationSandbox() {
  const [currentSimulation, setCurrentSimulation] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [completedSimulations, setCompletedSimulations] = useState([]);

  const simulationTypes = [
    {
      id: 'phishing',
      title: 'Phishing Email Detection',
      icon: <Mail className="h-6 w-6" />,
      description: 'Practice identifying suspicious emails and learn the warning signs of phishing attempts.',
    },
    {
      id: 'social',
      title: 'Social Engineering Defense',
      icon: <AlertCircle className="h-6 w-6" />,
      description: 'Learn to recognize and respond to social engineering tactics used by attackers.',
    },
    {
      id: 'urls',
      title: 'Suspicious URL Analysis',
      icon: <AlertTriangle className="h-6 w-6" />,
      description: 'Identify malicious URLs and understand the techniques used to disguise them.',
    }
  ];

  // Sample simulations for each type
  const simulations = {
    phishing: [
      {
        id: 'phish1',
        title: 'Urgent: Account Security Alert',
        sender: 'security-alert@am4z0n-security.net',
        content: `Dear Valued Customer,
        
We've detected unusual activity on your account. Your account will be locked in 24 hours unless you verify your information immediately by clicking the button below.
        
[VERIFY ACCOUNT NOW]
        
Amazon Customer Service`,
        redFlags: ['Suspicious sender domain (am4z0n-security.net instead of amazon.com)', 'Creates urgency to prompt immediate action', 'Generic greeting instead of using your name', 'Contains threats about account lockout'],
        safeAction: 'Check your account directly by typing the official website address in your browser, not by clicking any links in the email.'
      },
      {
        id: 'phish2',
        title: 'Your Payment Transfer',
        sender: 'paypa1-service@accounts-confirm.com',
        content: `We've processed your payment of $750.00 to Overseas Merchandise Ltd.
        
If you did not authorize this transaction, please download and fill out the attached refund form: refund_form.doc
        
PayPal Support Team`,
        redFlags: ['Suspicious sender domain (not paypal.com)', 'Contains an attachment which likely has malware', 'Tries to alarm you about a large unauthorized transaction', 'Unusual payment recipient you don\'t recognize'],
        safeAction: 'Never open attachments from suspicious emails. Log into your PayPal account directly through the official website or app to check transaction history.'
      }
    ],
    social: [
      {
        id: 'social1',
        title: 'IT Support Call',
        scenario: `You receive a phone call from someone claiming to be from your company's IT department. They say they've detected a virus on your computer and need your login credentials to fix the issue remotely.`,
        redFlags: ['IT staff shouldn\'t need your password', 'Creating urgency about a virus threat', 'Called you instead of responding to a ticket you submitted', 'Asking for direct access to your account'],
        safeAction: 'Tell them you will call back through the official IT support number, then verify the issue through proper channels.'
      },
      {
        id: 'social2',
        title: 'Executive Request',
        scenario: `You receive an email that appears to be from your CEO asking you to purchase gift cards urgently for client gifts and send the card details immediately. The email mentions this is time-sensitive and confidential.`,
        redFlags: ['Unusual request from an executive', 'Creates urgency and requests secrecy', 'Involves gift cards (commonly used in scams)', 'Likely sent from a lookalike email address'],
        safeAction: 'Verify the request directly with the executive through another communication channel, such as calling their office or speaking in person.'
      }
    ],
    urls: [
      {
        id: 'url1',
        title: 'Banking URL',
        url: 'https://onIinebanking-chase.com/secure/login.php',
        redFlags: ['Domain uses capital "I" instead of lowercase "l" to look like "online"', 'Legitimate Chase online banking would use chase.com domain, not a hyphenated version', 'Trying to look legitimate with "secure" in the path'],
        safeAction: 'Type the known URL of your bank directly in your browser or use their official mobile app.'
      },
      {
        id: 'url2',
        title: 'Password Reset Link',
        url: 'http://accounts.g00gle.com.password-reset.tk/auth',
        redFlags: ['Uses zeros instead of "o" in "google"', 'Suspicious TLD (.tk) for a major company', 'Additional domain (password-reset.tk) after what appears to be the main domain', 'Uses http:// instead of https://'],
        safeAction: 'Never click suspicious password reset links. Go directly to the service\'s official website and reset your password there if needed.'
      }
    ]
  };

  const startSimulation = (type) => {
    // Select a random simulation of the chosen type
    const availableSimulations = simulations[type].filter(sim => !completedSimulations.includes(sim.id));
    
    // If all simulations completed, allow replaying
    const simulationsToChooseFrom = availableSimulations.length > 0 ? availableSimulations : simulations[type];
    
    const randomIndex = Math.floor(Math.random() * simulationsToChooseFrom.length);
    const selectedSimulation = {
      ...simulationsToChooseFrom[randomIndex],
      type
    };
    
    setCurrentSimulation(selectedSimulation);
    setFeedback(null);
  };

  const handleResponse = (isThreat) => {
    const isCorrectAnswer = true; // In a real app, this would evaluate if user correctly identified threat
    
    if (isCorrectAnswer) {
      setScore(score + 10);
      setFeedback({
        isCorrect: true,
        message: 'Great job! You correctly identified this as a threat.',
        details: currentSimulation.redFlags,
        safeAction: currentSimulation.safeAction
      });
    } else {
      setFeedback({
        isCorrect: false,
        message: 'This was actually a threat. Here are the red flags to look for:',
        details: currentSimulation.redFlags,
        safeAction: currentSimulation.safeAction
      });
    }
    
    setCompletedSimulations([...completedSimulations, currentSimulation.id]);
  };

  const resetSimulation = () => {
    setCurrentSimulation(null);
    setFeedback(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-indigo-700 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8" />
            <h1 className="text-xl font-bold">Threat Simulation Sandbox</h1>
          </div>
          <div className="bg-indigo-600 px-4 py-2 rounded-full flex items-center">
            <span className="font-semibold">Score:</span>
            <span className="ml-2 bg-white text-indigo-700 px-3 py-1 rounded-full font-bold">{score}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto flex-grow p-4">
        {!currentSimulation ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 col-span-full mb-2">Choose a Simulation Type</h2>
            {simulationTypes.map((type) => (
              <div 
                key={type.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden cursor-pointer"
                onClick={() => startSimulation(type.id)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-indigo-100 p-3 rounded-full text-indigo-600 mr-4">
                      {type.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{type.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="flex justify-end">
                    <button className="flex items-center text-indigo-600 font-medium">
                      Start <ChevronRight className="h-5 w-5 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {currentSimulation.type === 'phishing' && 'Phishing Email Simulation'}
                {currentSimulation.type === 'social' && 'Social Engineering Simulation'}
                {currentSimulation.type === 'urls' && 'Suspicious URL Analysis'}
              </h2>
              <button 
                onClick={resetSimulation}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Simulation Content */}
            <div className="mb-8">
              {currentSimulation.type === 'phishing' && (
                <div className="border rounded-md p-4">
                  <div className="border-b pb-2 mb-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-bold">{currentSimulation.title}</p>
                        <p className="text-sm text-gray-600">From: {currentSimulation.sender}</p>
                      </div>
                      <div className="text-sm text-gray-500">Today, 10:42 AM</div>
                    </div>
                  </div>
                  <div className="whitespace-pre-line text-gray-800">
                    {currentSimulation.content}
                  </div>
                </div>
              )}

              {currentSimulation.type === 'social' && (
                <div className="bg-gray-50 border rounded-md p-6">
                  <h3 className="text-xl font-semibold mb-4">{currentSimulation.title}</h3>
                  <div className="bg-white p-4 rounded border mb-4">
                    <p className="text-gray-800">{currentSimulation.scenario}</p>
                  </div>
                  <p className="text-sm text-gray-600 italic">How would you respond to this situation?</p>
                </div>
              )}

              {currentSimulation.type === 'urls' && (
                <div className="bg-gray-50 border rounded-md p-6">
                  <h3 className="text-xl font-semibold mb-4">{currentSimulation.title}</h3>
                  <div className="bg-white p-4 rounded border mb-4 font-mono text-lg">
                    {currentSimulation.url}
                  </div>
                  <p className="text-sm text-gray-600 italic">Is this URL safe or suspicious?</p>
                </div>
              )}
            </div>

            {/* Response Options */}
            {!feedback ? (
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => handleResponse(false)}
                  className="px-6 py-3 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-md flex items-center"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  Safe / Legitimate
                </button>
                <button 
                  onClick={() => handleResponse(true)}
                  className="px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-md flex items-center"
                >
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Threat / Suspicious
                </button>
                <button 
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md flex items-center"
                >
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Not Sure
                </button>
              </div>
            ) : (
              <div className="mt-6">
                <div className={`p-4 rounded-md ${feedback.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                  <div className="flex items-center mb-4">
                    {feedback.isCorrect ? (
                      <Check className="h-6 w-6 text-green-600 mr-2" />
                    ) : (
                      <AlertTriangle className="h-6 w-6 text-amber-600 mr-2" />
                    )}
                    <p className={`font-medium ${feedback.isCorrect ? 'text-green-800' : 'text-amber-800'}`}>
                      {feedback.message}
                    </p>
                  </div>
                  
                  <div className="ml-8">
                    <p className="font-medium mb-2">Red flags to notice:</p>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                      {feedback.details.map((flag, index) => (
                        <li key={index} className="text-gray-700">{flag}</li>
                      ))}
                    </ul>
                    
                    <p className="font-medium mb-2">Recommended safe action:</p>
                    <p className="text-gray-700 bg-white p-3 rounded">{feedback.safeAction}</p>
                  </div>
                </div>
                
                <div className="flex justify-center mt-6">
                  <button 
                    onClick={resetSimulation}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md"
                  >
                    Try Another Simulation
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 border-t">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          Threat Simulation Sandbox — An educational tool for cybersecurity awareness
        </div>
      </footer>
    </div>
  );
}