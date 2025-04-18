import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertTriangle, Settings, Search, Activity, Clock, Database, Shield, Filter, Download, RefreshCw } from 'lucide-react';

export default function IntrusionDetectionDashboard() {
  // State for different components
  const [activeTab, setActiveTab] = useState('live');
  const [anomalyThreshold, setAnomalyThreshold] = useState(0.7);
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(false);
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [filterDateRange, setFilterDateRange] = useState({ start: '', end: '' });
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [refreshInterval, setRefreshInterval] = useState(10);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  // Mock data for demonstration
  const liveAnomalyData = [
    { time: '12:00', score: 0.2, normal: true },
    { time: '12:01', score: 0.3, normal: true },
    { time: '12:02', score: 0.5, normal: true },
    { time: '12:03', score: 0.4, normal: true },
    { time: '12:04', score: 0.8, normal: false },
    { time: '12:05', score: 0.9, normal: false },
    { time: '12:06', score: 0.6, normal: true },
    { time: '12:07', score: 0.5, normal: true },
    { time: '12:08', score: 0.3, normal: true },
    { time: '12:09', score: 0.7, normal: true },
    { time: '12:10', score: 1.2, normal: false }
  ];

  const historicalEvents = [
    { id: 1, timestamp: '2025-04-18 10:23:45', severity: 'high', source: '192.168.1.105', destination: '10.0.0.23', protocol: 'HTTP', score: 0.92, status: 'Investigating' },
    { id: 2, timestamp: '2025-04-18 09:17:32', severity: 'medium', source: '192.168.1.57', destination: '10.0.0.8', protocol: 'SSH', score: 0.78, status: 'Resolved' },
    { id: 3, timestamp: '2025-04-18 08:05:13', severity: 'critical', source: '192.168.1.22', destination: '10.0.0.145', protocol: 'SMB', score: 0.95, status: 'Confirmed Attack' },
    { id: 4, timestamp: '2025-04-17 23:45:02', severity: 'low', source: '192.168.1.86', destination: '10.0.0.41', protocol: 'DNS', score: 0.65, status: 'False Positive' },
  ];

  const packetData = {
    timestamp: '2025-04-18 10:23:45',
    sourceIP: '192.168.1.105',
    sourcePort: 49732,
    destinationIP: '10.0.0.23',
    destinationPort: 80,
    protocol: 'HTTP',
    method: 'POST',
    uri: '/admin/login.php',
    payload: 'username=admin&password=\'%20OR%201=1%20--%20',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml'
    },
    anomalyScore: 0.92,
    anomalyFeatures: ['SQL Injection Pattern', 'Suspicious Login Attempt', 'Admin Path Access']
  };

  // Simulated blockchain verification data
  const blockchainData = {
    blockHeight: 24853,
    timestamp: '2025-04-18 10:24:12',
    txHash: '0x8a3b...f921',
    merkleRoot: '0x72c1...e537',
    verified: true
  };

  useEffect(() => {
    // Simulate periodic data refresh
    if (isAutoRefresh) {
      const timer = setInterval(() => {
        console.log('Refreshing data...');
        // In a real app, you would fetch new data here
      }, refreshInterval * 1000);
      return () => clearInterval(timer);
    }
  }, [isAutoRefresh, refreshInterval]);

  const handleAnomalySelection = (anomaly) => {
    setSelectedAnomaly(anomaly);
  };

  const handleFilterChange = (e) => {
    setFilterSeverity(e.target.value);
  };

  const saveThresholdConfiguration = () => {
    // In a real app, this would send the configuration to the backend
    alert(`Anomaly threshold updated to ${anomalyThreshold}`);
    setIsConfigPanelOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield size={24} />
            <h1 className="text-xl font-bold">Intrusion Detection Monitoring</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              className="flex items-center space-x-1 bg-blue-800 hover:bg-blue-700 px-3 py-1 rounded"
              onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)}
            >
              <Settings size={16} />
              <span>Configure</span>
            </button>
            <div className="flex items-center space-x-2">
              <span>Auto-refresh:</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isAutoRefresh} 
                  onChange={() => setIsAutoRefresh(!isAutoRefresh)} 
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-6 px-6">
            <button 
              className={`py-4 px-2 font-medium flex items-center space-x-2 ${activeTab === 'live' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('live')}
            >
              <Activity size={16} />
              <span>Live Monitoring</span>
            </button>
            <button 
              className={`py-4 px-2 font-medium flex items-center space-x-2 ${activeTab === 'historical' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('historical')}
            >
              <Clock size={16} />
              <span>Historical Data</span>
            </button>
            <button 
              className={`py-4 px-2 font-medium flex items-center space-x-2 ${activeTab === 'packet' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('packet')}
            >
              <Database size={16} />
              <span>Packet Analysis</span>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'live' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Live Anomaly Detection</h2>
                <div className="flex items-center space-x-2">
                  <span>Refresh every:</span>
                  <select 
                    value={refreshInterval} 
                    onChange={(e) => setRefreshInterval(Number(e.target.value))}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value={5}>5 seconds</option>
                    <option value={10}>10 seconds</option>
                    <option value={30}>30 seconds</option>
                    <option value={60}>1 minute</option>
                  </select>
                  <button className="bg-gray-200 p-1 rounded hover:bg-gray-300">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={liveAnomalyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 'auto']} />
                    <Tooltip />
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="score" stroke="#8884d8" fillOpacity={1} fill="url(#colorScore)" />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" dot={{ stroke: '#8884d8', strokeWidth: 2 }} activeDot={{ r: 8 }} />
                    {/* Threshold line */}
                    <ReferenceLine y={anomalyThreshold} stroke="red" strokeDasharray="3 3">
                      <Label value="Threshold" position="right" />
                    </ReferenceLine>
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold text-lg mb-2">Active Threats</h3>
                  <div className="flex items-center justify-center h-24 bg-red-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-600">3</div>
                      <div className="text-sm text-gray-500">Critical Anomalies</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold text-lg mb-2">Network Status</h3>
                  <div className="flex items-center justify-center h-24 bg-green-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">Blockchain Verification Active</div>
                      <div className="text-sm text-gray-500">Last block: #{blockchainData.blockHeight}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold text-lg mb-2">System Health</h3>
                  <div className="flex items-center justify-center h-24 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600">98.7%</div>
                      <div className="text-sm text-gray-500">Autoencoder Confidence</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'historical' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Historical Anomaly Data</h2>
                <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded">
                  <Download size={16} />
                  <span>Export Data</span>
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <span>From:</span>
                    <input 
                      type="date" 
                      value={filterDateRange.start}
                      onChange={(e) => setFilterDateRange({...filterDateRange, start: e.target.value})}
                      className="border rounded px-2 py-1"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>To:</span>
                    <input 
                      type="date" 
                      value={filterDateRange.end}
                      onChange={(e) => setFilterDateRange({...filterDateRange, end: e.target.value})}
                      className="border rounded px-2 py-1"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>Severity:</span>
                    <select 
                      value={filterSeverity}
                      onChange={handleFilterChange}
                      className="border rounded px-2 py-1"
                    >
                      <option value="all">All</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <button className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded">
                    <Filter size={16} />
                    <span>Apply Filters</span>
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocol</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {historicalEvents.map(event => (
                        <tr key={event.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{event.timestamp}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${event.severity === 'low' ? 'bg-yellow-100 text-yellow-800' : 
                                event.severity === 'medium' ? 'bg-orange-100 text-orange-800' : 
                                event.severity === 'high' ? 'bg-red-100 text-red-800' : 
                                'bg-purple-100 text-purple-800'}`}>
                              {event.severity}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{event.source}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{event.destination}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{event.protocol}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{event.score.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{event.status}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button 
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => setActiveTab('packet')}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'packet' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Detailed Packet Analysis</h2>
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded">
                    <AlertTriangle size={16} />
                    <span>Flag as Threat</span>
                  </button>
                  <button className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded">
                    <span>Mark as Resolved</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold text-lg mb-4">Connection Details</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-gray-500">Timestamp</div>
                        <div className="font-medium">{packetData.timestamp}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Protocol</div>
                        <div className="font-medium">{packetData.protocol}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="text-sm text-gray-500">Source</div>
                        <div className="font-medium">{packetData.sourceIP}:{packetData.sourcePort}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Destination</div>
                        <div className="font-medium">{packetData.destinationIP}:{packetData.destinationPort}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Request URI</div>
                      <div className="font-medium">{packetData.method} {packetData.uri}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Anomaly Score</div>
                      <div className="flex items-center">
                        <div className="font-bold text-red-600 text-lg">{packetData.anomalyScore.toFixed(2)}</div>
                        <div className="ml-2 text-sm text-white bg-red-600 px-2 py-0.5 rounded">Critical</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="font-semibold text-lg mb-4">Anomaly Features</h3>
                  <div className="space-y-2">
                    {packetData.anomalyFeatures.map((feature, i) => (
                      <div key={i} className="flex items-center py-2 px-3 bg-red-50 text-red-800 rounded">
                        <AlertTriangle size={16} className="mr-2" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="font-semibold text-lg mt-6 mb-4">Blockchain Verification</h3>
                  <div className="rounded-lg bg-green-50 p-3 border border-green-200">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-500">Block Height</div>
                        <div className="font-medium">#{blockchainData.blockHeight}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Timestamp</div>
                        <div className="font-medium">{blockchainData.timestamp}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Transaction Hash</div>
                        <div className="font-medium">{blockchainData.txHash}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Verification Status</div>
                        <div className="font-medium text-green-600">✓ Verified</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-lg mb-4">HTTP Headers</h3>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm overflow-x-auto">
                  {Object.entries(packetData.headers).map(([key, value]) => (
                    <div key={key} className="py-1">
                      <span className="text-blue-700">{key}:</span> {value}
                    </div>
                  ))}
                </div>
                
                <h3 className="font-semibold text-lg mt-6 mb-4">Request Payload</h3>
                <div className="bg-gray-50 p-3 rounded font-mono text-sm overflow-x-auto">
                  <div className="text-red-700">{packetData.payload}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Configuration Panel */}
      {isConfigPanelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">System Configuration</h2>
              <button onClick={() => setIsConfigPanelOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Anomaly Detection Threshold</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={anomalyThreshold}
                    onChange={(e) => setAnomalyThreshold(parseFloat(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-12 text-center">{anomalyThreshold.toFixed(2)}</span>
                </div>
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>More Sensitive</span>
                  <span>Less Sensitive</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Data Collection Settings</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="collectHeaders" defaultChecked className="mr-2" />
                    <label htmlFor="collectHeaders">Collect HTTP Headers</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="collectPayloads" defaultChecked className="mr-2" />
                    <label htmlFor="collectPayloads">Collect Request Payloads</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="collectResponse" defaultChecked className="mr-2" />
                    <label htmlFor="collectResponse">Collect Response Data</label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Blockchain Verification</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="enableBlockchain" defaultChecked className="mr-2" />
                    <label htmlFor="enableBlockchain">Enable Blockchain Verification</label>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">Verification Frequency:</span>
                    <select defaultValue="real-time" className="border rounded px-2 py-1 text-sm">
                      <option value="real-time">Real-time</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setIsConfigPanelOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={saveThresholdConfiguration}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Missing components that need to be defined
const ReferenceLine = ({ y, stroke, strokeDasharray, children }) => {
  return null; // This would be implemented with recharts in a complete implementation
};

const Label = ({ value, position }) => {
  return null; // This would be implemented with recharts in a complete implementation
};