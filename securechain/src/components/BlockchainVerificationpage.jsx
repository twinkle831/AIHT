import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Shield, Search, CheckCircle, XCircle, Clock, Database, FileText, Link, Code, Lock, Hash, ChevronRight, RefreshCw, Download, Upload, ExternalLink } from 'lucide-react';

export default function BlockchainVerificationPage() {
  // State for different components
  const [activeTab, setActiveTab] = useState('explorer');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('24h');
  const [isVerifying, setIsVerifying] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  const [smartContractFunction, setSmartContractFunction] = useState('verifyLog');

  // Mock data for blockchain transactions
  const blockchainTransactions = [
    { id: 'tx_1', hash: '0x8e4f2a1d...3b9f', timestamp: '2025-04-18 14:32:24', status: 'confirmed', blocks: 12, data: 'IDS Log #45672', from: '0x742f...9a1b', to: '0x3e7c...f452', gas: 21000 },
    { id: 'tx_2', hash: '0x7b2e9c5d...4a1e', timestamp: '2025-04-18 13:17:05', status: 'confirmed', blocks: 24, data: 'IDS Log #45671', from: '0x742f...9a1b', to: '0x3e7c...f452', gas: 21000 },
    { id: 'tx_3', hash: '0x3a9f7d2e...6c4b', timestamp: '2025-04-18 12:45:33', status: 'confirmed', blocks: 31, data: 'IDS Log #45670', from: '0x742f...9a1b', to: '0x3e7c...f452', gas: 21000 },
    { id: 'tx_4', hash: '0x5e2d8b3a...7f1c', timestamp: '2025-04-18 11:22:51', status: 'confirmed', blocks: 43, data: 'IDS Log #45669', from: '0x742f...9a1b', to: '0x3e7c...f452', gas: 21000 },
    { id: 'tx_5', hash: '0x1f4a6c9d...2e3b', timestamp: '2025-04-18 10:08:27', status: 'confirmed', blocks: 56, data: 'IDS Log #45668', from: '0x742f...9a1b', to: '0x3e7c...f452', gas: 21000 },
  ];

  // Mock blockchain statistics data
  const blockchainStats = [
    { name: '14:00', transactions: 12, verifications: 10 },
    { name: '15:00', transactions: 8, verifications: 8 },
    { name: '16:00', transactions: 15, verifications: 14 },
    { name: '17:00', transactions: 10, verifications: 10 },
    { name: '18:00', transactions: 18, verifications: 17 },
    { name: '19:00', transactions: 14, verifications: 14 },
    { name: '20:00', transactions: 20, verifications: 19 },
    { name: '21:00', transactions: 16, verifications: 15 },
  ];

  // Mock smart contract details
  const smartContract = {
    address: '0x3e7c41f9b2d75e8c4b2e452bf3a731a',
    abi: [
      { name: 'verifyLog', inputs: [{ type: 'bytes32', name: 'logHash' }], outputs: [{ type: 'bool', name: 'isValid' }] },
      { name: 'storeLog', inputs: [{ type: 'bytes32', name: 'logHash' }, { type: 'string', name: 'logData' }], outputs: [] },
      { name: 'getLogMetadata', inputs: [{ type: 'bytes32', name: 'logHash' }], outputs: [{ type: 'string', name: 'metadata' }] }
    ],
    functions: ['verifyLog', 'storeLog', 'getLogMetadata']
  };

  // Mock verification results
  const verificationResults = [
    { id: 1, logId: 'IDS Log #45672', blockHeight: 24872, timestamp: '2025-04-18 14:32:24', hash: '0x7a2e...9c4f', status: 'verified', merkleProof: true },
    { id: 2, logId: 'IDS Log #45671', blockHeight: 24860, timestamp: '2025-04-18 13:17:05', hash: '0x3b5d...1a7e', status: 'verified', merkleProof: true },
    { id: 3, logId: 'IDS Log #45670', blockHeight: 24853, timestamp: '2025-04-18 12:45:33', hash: '0x9c2f...4e7d', status: 'verified', merkleProof: true },
    { id: 4, logId: 'IDS Log #45669', blockHeight: 24841, timestamp: '2025-04-18 11:22:51', hash: '0x1e6a...8d3c', status: 'verified', merkleProof: true },
    { id: 5, logId: 'IDS Log #45668', blockHeight: 24828, timestamp: '2025-04-18 10:08:27', hash: '0x5f7d...2b8a', status: 'verified', merkleProof: true },
  ];

  // Mock detailed transaction data
  const txDetails = {
    hash: '0x8e4f2a1d5b7c9e6f3a2d4b8c9e6f3a2d4b8c9e6f3a2d4b8c9e6f3b9f',
    blockNumber: 24872,
    timestamp: '2025-04-18 14:32:24',
    from: '0x742f9d8e6b3a1c7f5e2d4b8c9a1b',
    to: '0x3e7c41f9b2d75e8c4b2e452bf3a731a',
    value: '0',
    gasUsed: 21000,
    gasPrice: '20 Gwei',
    nonce: 157,
    input: '0x7a2e...9c4f',
    status: 'Success',
    confirmations: 12,
    decodedInput: {
      method: 'storeLog',
      parameters: {
        logHash: '0x7a2e9c4f5d8e6b3a1c7f5e2d4b8c9a1b7f5e2d4b8c9a1b7f5e2d4b',
        logData: 'Encrypted IDS Log Data'
      }
    }
  };

  // Helper function to handle verification process
  const verifyLogIntegrity = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      alert('Log integrity verification completed successfully!');
    }, 2000);
  };

  // Helper function to handle transaction selection
  const handleTxSelect = (tx) => {
    setSelectedTx(tx);
  };

  // Search functionality
  const filteredTransactions = blockchainTransactions.filter(tx => 
    tx.hash.includes(searchQuery) || tx.data.includes(searchQuery)
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-blue-900 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield size={24} />
            <h1 className="text-xl font-bold">Blockchain Verification System</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tx hash or log ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-blue-800 text-white pl-8 pr-4 py-1 rounded border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <Search size={16} className="absolute left-2 top-2 text-blue-400" />
            </div>
            <button className="flex items-center space-x-1 bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded">
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-6 px-6">
            <button 
              className={`py-4 px-2 font-medium flex items-center space-x-2 ${activeTab === 'explorer' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('explorer')}
            >
              <Search size={16} />
              <span>Blockchain Explorer</span>
            </button>
            <button 
              className={`py-4 px-2 font-medium flex items-center space-x-2 ${activeTab === 'verification' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('verification')}
            >
              <CheckCircle size={16} />
              <span>Verification Status</span>
            </button>
            <button 
              className={`py-4 px-2 font-medium flex items-center space-x-2 ${activeTab === 'smartcontract' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('smartcontract')}
            >
              <Code size={16} />
              <span>Smart Contract</span>
            </button>
            <button 
              className={`py-4 px-2 font-medium flex items-center space-x-2 ${activeTab === 'integrity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('integrity')}
            >
              <Lock size={16} />
              <span>Log Integrity</span>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Blockchain Explorer Tab */}
          {activeTab === 'explorer' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Blockchain Explorer</h2>
                <div className="flex items-center space-x-2">
                  <span>Time range:</span>
                  <select 
                    value={timeRange} 
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="1h">Last hour</option>
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                  </select>
                </div>
              </div>
              
              {/* Network Statistics */}
              <div className="bg-white rounded-lg shadow-md p-4 h-64">
                <h3 className="font-semibold text-lg mb-2">Network Activity</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart data={blockchainStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="transactions" fill="#8884d8" name="Transactions" />
                    <Bar dataKey="verifications" fill="#82ca9d" name="Verifications" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Transactions Table */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Recent Transactions</h3>
                  <button className="text-blue-600 hover:text-blue-800 flex items-center space-x-1">
                    <span>View all</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TX Hash</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredTransactions.map(tx => (
                        <tr key={tx.id} className="hover:bg-gray-50" onClick={() => handleTxSelect(tx)}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <Hash size={16} className="text-blue-500" />
                              <span className="font-mono text-sm">{tx.hash}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.timestamp}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{tx.data}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{tx.from}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{tx.to}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button className="text-blue-600 hover:text-blue-900">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Transaction Details */}
              {selectedTx && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Transaction Details</h3>
                    <button 
                      onClick={() => setSelectedTx(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-500 mb-2">Basic Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between border-b border-gray-100 py-2">
                          <span className="text-gray-600">Transaction Hash:</span>
                          <span className="font-mono">{txDetails.hash.substring(0, 10)}...{txDetails.hash.substring(txDetails.hash.length - 4)}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 py-2">
                          <span className="text-gray-600">Block:</span>
                          <span>{txDetails.blockNumber}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 py-2">
                          <span className="text-gray-600">Timestamp:</span>
                          <span>{txDetails.timestamp}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 py-2">
                          <span className="text-gray-600">Status:</span>
                          <span className="text-green-600 font-medium">{txDetails.status}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 py-2">
                          <span className="text-gray-600">Confirmations:</span>
                          <span>{txDetails.confirmations}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-500 mb-2">Transaction Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between border-b border-gray-100 py-2">
                          <span className="text-gray-600">From:</span>
                          <span className="font-mono">{txDetails.from}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 py-2">
                          <span className="text-gray-600">To:</span>
                          <span className="font-mono">{txDetails.to}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 py-2">
                          <span className="text-gray-600">Value:</span>
                          <span>{txDetails.value}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 py-2">
                          <span className="text-gray-600">Gas Used:</span>
                          <span>{txDetails.gasUsed}</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-100 py-2">
                          <span className="text-gray-600">Gas Price:</span>
                          <span>{txDetails.gasPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-500 mb-2">Input Data (Decoded)</h4>
                    <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                      <div className="mb-2">
                        <span className="text-blue-600">Method:</span> {txDetails.decodedInput.method}
                      </div>
                      <div>
                        <span className="text-blue-600">Parameters:</span>
                        <div className="ml-4">
                          {Object.entries(txDetails.decodedInput.parameters).map(([key, value]) => (
                            <div key={key}>
                              <span className="text-purple-600">{key}:</span> {value}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Verification Status Tab */}
          {activeTab === 'verification' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Transaction Verification Status</h2>
                <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded">
                  <Download size={16} />
                  <span>Export Report</span>
                </button>
              </div>
              
              {/* Verification Status Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Total Logs</h3>
                      <p className="text-2xl font-bold">125</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <FileText size={20} className="text-blue-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Verified Logs</h3>
                      <p className="text-2xl font-bold">122</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Pending Verification</h3>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-full">
                      <Clock size={20} className="text-yellow-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Failed Verification</h3>
                      <p className="text-2xl font-bold">1</p>
                    </div>
                    <div className="bg-red-100 p-3 rounded-full">
                      <XCircle size={20} className="text-red-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Verification Results Table */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-lg mb-4">Recent Verifications</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Log ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Block Height</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hash</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Merkle Proof</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {verificationResults.map(result => (
                        <tr key={result.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{result.logId}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{result.blockHeight}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{result.timestamp}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{result.hash}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {result.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {result.merkleProof ? (
                              <CheckCircle size={16} className="text-green-600" />
                            ) : (
                              <XCircle size={16} className="text-red-600" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Verification Timeline */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-lg mb-4">Verification Timeline</h3>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={blockchainStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="verifications" stroke="#82ca9d" name="Verified Logs" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Smart Contract Tab */}
          {activeTab === 'smartcontract' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Smart Contract Interaction</h2>
                <a 
                  href="#" 
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <span>View on Etherscan</span>
                  <ExternalLink size={16} />
                </a>
              </div>
              
              {/* Contract Information */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-lg mb-4">Contract Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-gray-100 py-2">
                        <span className="text-gray-600">Contract Address:</span>
                        <span className="font-mono">{smartContract.address}</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 py-2">
                        <span className="text-gray-600">Contract Name:</span>
                        <span>SecurityLogVerifier</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 py-2">
                        <span className="text-gray-600">Version:</span>
                        <span>v1.2.0</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 py-2">
                        <span className="text-gray-600">Owner:</span>
                        <span className="font-mono">0x742f...9a1b</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="space-y-2">
                      <div className="flex justify-between border-b border-gray-100 py-2">
                        <span className="text-gray-600">Total Logs Stored:</span>
                        <span>125</span>
                        </div>
                      <div className="flex justify-between border-b border-gray-100 py-2">
                        <span className="text-gray-600">Last Updated:</span>
                        <span>2025-04-18 14:32:24</span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 py-2">
                        <span className="text-gray-600">Verification Success Rate:</span>
                        <span>97.6%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contract Interaction */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-lg mb-4">Interact with Contract</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Function
                    </label>
                    <select 
                      value={smartContractFunction} 
                      onChange={(e) => setSmartContractFunction(e.target.value)}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                      {smartContract.functions.map(func => (
                        <option key={func} value={func}>{func}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parameters
                    </label>
                    {smartContractFunction === 'verifyLog' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">logHash (bytes32)</label>
                          <input 
                            type="text" 
                            placeholder="0x..."
                            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    )}
                    
                    {smartContractFunction === 'storeLog' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">logHash (bytes32)</label>
                          <input 
                            type="text" 
                            placeholder="0x..."
                            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">logData (string)</label>
                          <textarea 
                            placeholder="Log data content..."
                            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            rows={3}
                          />
                        </div>
                      </div>
                    )}
                    
                    {smartContractFunction === 'getLogMetadata' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">logHash (bytes32)</label>
                          <input 
                            type="text" 
                            placeholder="0x..."
                            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Execute Function
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Contract ABI */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="font-semibold text-lg mb-4">Contract ABI</h3>
                
                <div className="bg-gray-50 p-3 rounded font-mono text-sm overflow-auto max-h-60">
                  <pre>{JSON.stringify(smartContract.abi, null, 2)}</pre>
                </div>
              </div>
            </div>
          )}

          {/* Log Integrity Tab */}
          {activeTab === 'integrity' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Log Integrity Verification</h2>
                <div className="space-x-2">
                  <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded">
                    <Upload size={16} />
                    <span>Upload Log</span>
                  </button>
                </div>
              </div>
              
              {/* Verification Process */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Verify Log Integrity</h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter Log ID
                      </label>
                      <input 
                        type="text" 
                        placeholder="IDS Log #45672"
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Log Hash (generated)
                      </label>
                      <input 
                        type="text" 
                        placeholder="0x7a2e9c4f5d8e6b3a1c7f5e2d4b8c9a1b..."
                        disabled
                        className="w-full border border-gray-300 bg-gray-50 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Log Content
                    </label>
                    <textarea 
                      placeholder="Paste or upload log content here..."
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      rows={6}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white font-medium ${isVerifying ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'}`}
                      onClick={verifyLogIntegrity}
                      disabled={isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <RefreshCw size={16} className="animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <Lock size={16} />
                          <span>Verify Integrity</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Verification Process Steps */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Verification Process</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                      <span className="h-6 w-6 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-medium">1</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium">Generate Hash</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        The system generates a cryptographic hash of the log content using SHA-256 algorithm.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                      <span className="h-6 w-6 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-medium">2</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium">Retrieve Blockchain Record</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        The system retrieves the stored hash from the blockchain using the Log ID.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                      <span className="h-6 w-6 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-medium">3</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium">Compare Hashes</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        The system compares the generated hash with the hash stored on the blockchain.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                      <span className="h-6 w-6 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-medium">4</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium">Verify Merkle Proof</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        The system verifies the Merkle proof to ensure the transaction was included in the blockchain.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                      <span className="h-6 w-6 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-medium">5</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium">Generate Report</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        The system generates a verification report with timestamp and blockchain references.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Verification History */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold text-lg mb-4">Recent Verification History</h3>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Log ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">IDS Log #45672</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">2025-04-18 14:35:12</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Verified
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            View Report
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            Download Proof
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">IDS Log #45671</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">2025-04-18 13:20:45</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Verified
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            View Report
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            Download Proof
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">IDS Log #45668</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">2025-04-18 10:15:33</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Failed
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">
                            View Report
                          </button>
                          <button className="text-blue-600 hover:text-blue-900">
                            Try Again
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white p-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            © 2025 Blockchain Verification System v1.3.2
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-600">Documentation</a>
            <a href="#" className="hover:text-blue-600">API</a>
            <a href="#" className="hover:text-blue-600">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}