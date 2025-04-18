
import React from 'react';
import { Shield, Activity, AlertTriangle, Lock, Bell, Clock, CheckCircle, Server } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header with logo and user navigation */}
        <header className="flex justify-between items-center py-4 border-b border-slate-800 mb-6">
          <div className="flex items-center text-2xl font-bold text-slate-100">
            <Shield className="mr-3" size={32} />
            <span>SecureChain</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                3
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-slate-700 rounded-full flex items-center justify-center text-slate-300">
                SA
              </div>
              <span>Security Admin</span>
            </div>
          </div>
        </header>
        
        {/* Main dashboard content */}
        <main>
          {/* Stats row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-slate-800 rounded-xl p-6 shadow-md hover:translate-y-px transition-transform">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-slate-100">Active Threats</h3>
                <AlertTriangle className="text-slate-500" size={24} />
              </div>
              <div className="text-4xl font-bold text-slate-100 mb-2">7</div>
              <div className="text-sm text-slate-500">+2 from yesterday</div>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6 shadow-md hover:translate-y-px transition-transform">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-slate-100">Detected Anomalies</h3>
                <Activity className="text-slate-500" size={24} />
              </div>
              <div className="text-4xl font-bold text-slate-100 mb-2">24</div>
              <div className="text-sm text-slate-500">Last 24 hours</div>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6 shadow-md hover:translate-y-px transition-transform">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-slate-100">Blocked Attacks</h3>
                <Lock className="text-slate-500" size={24} />
              </div>
              <div className="text-4xl font-bold text-slate-100 mb-2">182</div>
              <div className="text-sm text-slate-500">Last 7 days</div>
            </div>
            
            <div className="bg-slate-800 rounded-xl p-6 shadow-md hover:translate-y-px transition-transform">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-slate-100">Network Uptime</h3>
                <Clock className="text-slate-500" size={24} />
              </div>
              <div className="text-4xl font-bold text-slate-100 mb-2">99.8%</div>
              <div className="text-sm text-slate-500">Monthly average</div>
            </div>
          </div>
          
          {/* Charts and data section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
            {/* Network Traffic Chart */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-md lg:col-span-8">
              <h3 className="text-xl font-semibold mb-4 text-slate-100">Real-time Network Traffic</h3>
              <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
                <NetworkTrafficChart />
              </div>
            </div>
            
            {/* Blockchain Status */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-md lg:col-span-4">
              <h3 className="text-xl font-semibold mb-4 text-slate-100">Blockchain Integrity Status</h3>
              <div className="space-y-3 mt-4">
                <BlockchainItem 
                  blockNumber="39482" 
                  timeAgo="4 minutes ago" 
                />
                
                <BlockchainItem 
                  blockNumber="39481" 
                  timeAgo="17 minutes ago" 
                />
                
                <BlockchainItem 
                  blockNumber="39480" 
                  timeAgo="32 minutes ago" 
                />
              </div>
            </div>
          </div>
          
          {/* Additional stats and metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Threat Detection Metrics */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-slate-100">Threat Detection Metrics</h3>
              <div className="h-72 bg-slate-900/50 rounded-lg flex items-center justify-center">
                <ThreatMetricsChart />
              </div>
            </div>
            
            {/* System Health */}
            <div className="bg-slate-800 rounded-xl p-6 shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-slate-100">System Health Indicators</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <HealthItem 
                  name="CPU Usage" 
                  value="32%" 
                  status="optimal" 
                />
                
                <HealthItem 
                  name="Memory Usage" 
                  value="45%" 
                  status="optimal" 
                />
                
                <HealthItem 
                  name="Storage" 
                  value="78%" 
                  status="warning" 
                />
                
                <HealthItem 
                  name="Network Latency" 
                  value="12ms" 
                  status="optimal" 
                />
                
                <HealthItem 
                  name="Nodes Online" 
                  value="8/8" 
                  status="optimal" 
                />
                
                <HealthItem 
                  name="ML Model Status" 
                  value="Normal" 
                  status="optimal" 
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Component for blockchain items in the integrity list
function BlockchainItem({ blockNumber, timeAgo }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-slate-700 last:border-0">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-slate-700 rounded flex items-center justify-center">
          <Server size={16} />
        </div>
        <div>
          <h4 className="text-sm font-medium">Block #{blockNumber}</h4>
          <p className="text-xs text-slate-400">{timeAgo}</p>
        </div>
      </div>
      <div className="flex items-center text-xs text-emerald-400">
        <CheckCircle size={16} className="mr-1" />
        Verified
      </div>
    </div>
  );
}

// Component for health indicator items
function HealthItem({ name, value, status }) {
  const statusColors = {
    optimal: "bg-emerald-500",
    warning: "bg-amber-500",
    critical: "bg-red-500"
  };
  
  const statusText = {
    optimal: "Optimal",
    warning: "Warning",
    critical: "Critical"
  };
  
  return (
    <div className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-4">
      <div className={`w-3 h-3 rounded-full ${statusColors[status]}`}></div>
      <div>
        <h4 className="text-sm font-medium">{name}</h4>
        <p className="text-xs text-slate-400">{value} - {statusText[status]}</p>
      </div>
    </div>
  );
}

// Network Traffic Chart Component
function NetworkTrafficChart() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <img 
        src="/api/placeholder/700/200" 
        alt="Network Traffic Chart"
        className="rounded opacity-80"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Activity size={48} className="text-blue-400 opacity-50" />
      </div>
    </div>
  );
}

// Threat Metrics Chart Component
function ThreatMetricsChart() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <img 
        src="/api/placeholder/500/250" 
        alt="Threat Metrics Chart"
        className="rounded opacity-80"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <AlertTriangle size={48} className="text-amber-400 opacity-50" />
      </div>
    </div>
  );
}