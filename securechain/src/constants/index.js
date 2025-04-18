import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage, 
  benefitImage2,
  chromecast,
  disc02,
  file02,
  homeSmile,
  instagram,
  plusSquare,
  recording01,
  recording03,
  searchMd,
  sliders04,
  yourlogo,
} from "../assets";


export const heroIcons = [homeSmile, file02, searchMd, plusSquare];


export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Threat Detection",
  "Log Analysis",
  "Blockchain Verification",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "Essential network monitoring and intrusion detection",
    price: "0",
    features: [
      "Real-time network traffic monitoring",
      "Basic autoencoder anomaly detection",
      "Standard security alert notifications",
    ],
  },
  {
    id: "1",
    title: "Professional",
    description: "Advanced detection with blockchain verification",
    price: "199.99",
    features: [
      "Advanced intrusion detection with deep learning",
      "Blockchain-based immutable security logs",
      "Priority incident response support",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom security solution with dedicated infrastructure",
    price: null,
    features: [
      "Custom autoencoder models for your network",
      "Private blockchain deployment for enhanced security",
      "Dedicated security operations team support",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "AI-Powered Threat Detection",
    text: "Identify potential security breaches using advanced **autoencoder neural networks**, ensuring accurate and early detection of network anomalies.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Blockchain Log Verification",
    text: "Experience **tamper-proof security logs** powered by **distributed ledger technology**, making security audit trails immutable and verifiable.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Data-Driven Security Analysis",
    text: "Your network's protection is **enhanced using real-time traffic data**, ensuring threat detection models adapt to evolving attack vectors.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Enterprise-Grade Encryption",
    text: "Your data security is our priority. CyberShield **implements end-to-end encryption** while ensuring comprehensive protection of network information.",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "Multi-Vector Monitoring",
    text: "Monitor your network security via **multiple traffic channels**, allowing for comprehensive detection of sophisticated attack techniques.",
    backgroundUrl: "./src/assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Continuous Learning & Adaptation",
    text: "With **advanced autoencoder architecture and blockchain verification**, CyberShield continuously learns from attack patterns to offer **adaptive threat protection**.",
    backgroundUrl: "./src/assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];