import React from 'react';
import { Shield, Activity, AlertTriangle, Lock, Bell, Clock, CheckCircle, Server, User, BarChart2, PieChart, TrendingUp, Download } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  // Sample data for network traffic chart
  const networkData = [
    { time: '00:00', traffic: 42, anomalies: 0 },
    { time: '02:00', traffic: 28, anomalies: 1 },
    { time: '04:00', traffic: 15, anomalies: 0 },
    { time: '06:00', traffic: 20, anomalies: 0 },
    { time: '08:00', traffic: 65, anomalies: 2 },
    { time: '10:00', traffic: 101, anomalies: 1 },
    { time: '12:00', traffic: 125, anomalies: 0 },
    { time: '14:00', traffic: 132, anomalies: 3 },
    { time: '16:00', traffic: 110, anomalies: 2 },
    { time: '18:00', traffic: 90, anomalies: 1 },
    { time: '20:00', traffic: 72, anomalies: 0 },
    { time: '22:00', traffic: 50, anomalies: 0 },
  ];

  // Sample data for threat metrics chart
  const threatData = [
    { name: 'SQL Injection', value: 28 },
    { name: 'DDoS', value: 15 },
    { name: 'XSS', value: 12 },
    { name: 'Brute Force', value: 32 },
    { name: 'Data Exfil', value: 8 },
    { name: 'Other', value: 5 },
  ];
  
  // Colors for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header with logo and user navigation */}
        <header className="flex justify-between items-center py-4 border-b border-gray-200 mb-6">
          <div className="flex items-center text-2xl font-bold text-blue-800">
            <Shield className="mr-3 text-blue-600" size={32} />
            <span>CyberShield</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell size={24} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                3
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-colors">
                <Download size={18} className="text-gray-700" />
              </button>
              <button className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full transition-colors">
                <User size={18} className="text-blue-700" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center">
                SA
              </div>
              <span className="font-medium">Security Admin</span>
            </div>
          </div>
        </header>
        
        {/* Main dashboard content */}
        <main>
          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-800">Active Threats</h3>
                <AlertTriangle className="text-amber-500" size={24} />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">7</div>
              <div className="text-sm text-red-500 flex items-center">
                <TrendingUp size={14} className="mr-1" />
                +2 from yesterday
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-800">Detected Anomalies</h3>
                <Activity className="text-blue-500" size={24} />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">24</div>
              <div className="text-sm text-gray-500">Last 24 hours</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-800">Blocked Attacks</h3>
                <Lock className="text-green-500" size={24} />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">182</div>
              <div className="text-sm text-gray-500">Last 7 days</div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-gray-800">Network Uptime</h3>
                <Clock className="text-indigo-500" size={24} />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">99.8%</div>
              <div className="text-sm text-gray-500">Monthly average</div>
            </div>
          </div>
          
          {/* Charts and data section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            {/* Network Traffic Chart */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Real-time Network Traffic</h3>
                <div className="flex space-x-2">
                  <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium">Hourly</button>
                  <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm font-medium">Daily</button>
                  <button className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm font-medium">Weekly</button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={networkData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="traffic" stroke="#3b82f6" fill="#93c5fd" name="Network Traffic (Mbps)" />
                    <Area type="monotone" dataKey="anomalies" stroke="#ef4444" fill="#fca5a5" name="Anomalies Detected" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Blockchain Status */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 lg:col-span-4">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Blockchain Integrity Status</h3>
              <div className="space-y-3 mt-4">
                <BlockchainItem 
                  blockNumber="39482" 
                  timeAgo="4 minutes ago" 
                  transactions="12"
                />
                
                <BlockchainItem 
                  blockNumber="39481" 
                  timeAgo="17 minutes ago" 
                  transactions="8"
                />
                
                <BlockchainItem 
                  blockNumber="39480" 
                  timeAgo="32 minutes ago" 
                  transactions="15"
                />
                
                <BlockchainItem 
                  blockNumber="39479" 
                  timeAgo="48 minutes ago" 
                  transactions="6"
                />
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <button className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center">
                  View all blockchain records
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Additional stats and metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Threat Detection Metrics */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Threat Detection Metrics</h3>
              <div className="h-72 flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={threatData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {threatData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="space-y-3">
                    {threatData.map((entry, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <div className="text-sm font-medium">{entry.name}</div>
                        <div className="ml-auto text-sm font-bold">{entry.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm font-medium">Total threats detected: <span className="font-bold">100</span></div>
                    <div className="text-sm text-gray-500">Last 7 days</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* System Health */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">System Health Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <HealthItem 
                  name="CPU Usage" 
                  value="32%" 
                  status="optimal" 
                  icon={<BarChart2 size={16} className="text-blue-500" />}
                />
                
                <HealthItem 
                  name="Memory Usage" 
                  value="45%" 
                  status="optimal" 
                  icon={<BarChart2 size={16} className="text-green-500" />}
                />
                
                <HealthItem 
                  name="Storage" 
                  value="78%" 
                  status="warning" 
                  icon={<PieChart size={16} className="text-amber-500" />}
                />
                
                <HealthItem 
                  name="Network Latency" 
                  value="12ms" 
                  status="optimal" 
                  icon={<Activity size={16} className="text-blue-500" />}
                />
                
                <HealthItem 
                  name="Nodes Online" 
                  value="8/8" 
                  status="optimal" 
                  icon={<Server size={16} className="text-green-500" />}
                />
                
                <HealthItem 
                  name="ML Model Status" 
                  value="Normal" 
                  status="optimal" 
                  icon={<TrendingUp size={16} className="text-indigo-500" />}
                />
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-600">Autoencoder Model Performance</h4>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Precision', value: 94 },
                        { name: 'Recall', value: 89 },
                        { name: 'F1 Score', value: 91 },
                        { name: 'Accuracy', value: 96 },
                      ]}
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" scale="band" stroke="#666" />
                      <YAxis domain={[0, 100]} stroke="#666" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Component for blockchain items in the integrity list
function BlockchainItem({ blockNumber, timeAgo, transactions }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded flex items-center justify-center">
          <Server size={16} />
        </div>
        <div>
          <h4 className="text-sm font-medium">Block #{blockNumber}</h4>
          <p className="text-xs text-gray-500">{timeAgo} • {transactions} transactions</p>
        </div>
      </div>
      <div className="flex items-center text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
        <CheckCircle size={14} className="mr-1" />
        Verified
      </div>
    </div>
  );
}

// Component for health indicator items
function HealthItem({ name, value, status, icon }) {
  const statusColors = {
    optimal: "bg-emerald-500",
    warning: "bg-amber-500",
    critical: "bg-red-500"
  };
  
  const statusBgColors = {
    optimal: "bg-emerald-50 text-emerald-700",
    warning: "bg-amber-50 text-amber-700",
    critical: "bg-red-50 text-red-700"
  };
  
  const statusText = {
    optimal: "Optimal",
    warning: "Warning",
    critical: "Critical"
  };
  
  return (
    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div className={`w-3 h-3 rounded-full ${statusColors[status]}`}></div>
      <div className="flex-1">
        <div className="flex items-center">
          {icon}
          <h4 className="text-sm font-medium ml-1">{name}</h4>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-lg font-bold">{value}</p>
          <span className={`text-xs px-2 py-1 rounded-full ${statusBgColors[status]}`}>
            {statusText[status]}
          </span>
        </div>
      </div>
    </div>
  );
}