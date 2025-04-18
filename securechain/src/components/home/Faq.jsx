import React, { useState } from "react";
import { Collapse, Input, Button, Tooltip, message, Pagination } from "antd";
import { motion } from "framer-motion";
import {
  QuestionCircleOutlined,
  SearchOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import "./FaqSection.css";
import photo5 from "../../assets/images/photo_5.png"
const { Panel } = Collapse;

const faqsData = [
  { id: 1, question: "What is CyberShield?", answer: "CyberShield is an advanced network intrusion detection system that combines blockchain technology and autoencoder neural networks for superior threat detection and verification." },
  { id: 2, question: "How does CyberShield detect network intrusions?", answer: "It uses AI-driven autoencoders to establish network traffic baselines and identify anomalies that deviate from normal patterns, providing early detection of potential threats." },
  { id: 3, question: "What AI technology does CyberShield use?", answer: "CyberShield leverages **deep learning autoencoders** alongside **blockchain verification** to generate accurate threat assessments with immutable audit trails." },
  { id: 4, question: "What traffic types can CyberShield monitor?", answer: "The system can monitor **both encrypted and unencrypted traffic** for a comprehensive security approach." },
  { id: 5, question: "Does CyberShield support real-time alerts?", answer: "Yes, CyberShield provides **real-time threat notifications** through multiple channels including dashboard alerts, email, and optional SMS." },
  { id: 6, question: "Can CyberShield analyze historical traffic patterns?", answer: "Yes! CyberShield offers **historical traffic analysis** and identifies patterns that may indicate persistent threats or advanced persistent threats (APTs)." },
  { id: 7, question: "How are security logs stored?", answer: "Your security logs are stored in an immutable blockchain ledger, ensuring they cannot be tampered with while providing cryptographic verification of their integrity." },
  { id: 8, question: "How secure is my network data?", answer: "We prioritize your security with **end-to-end encryption** and blockchain-powered verification of all security incidents." },
  { id: 9, question: "Can CyberShield replace human security analysts?", answer: "CyberShield provides AI-driven insights but **works best alongside security professionals**. It significantly reduces false positives and helps analysts focus on genuine threats." },
  { id: 10, question: "Do I need specialized hardware to deploy CyberShield?", answer: "No, our system is designed to work with **standard network infrastructure**, though performance scales with available computational resources." },
  { id: 11, question: "Does CyberShield integrate with other security tools?", answer: "Yes, CyberShield offers **API integration** with SIEM platforms, firewalls, and other security solutions for a unified defense strategy." },
  { id: 12, question: "Can I track security incidents over time?", answer: "Yes! CyberShield maintains a comprehensive timeline of all detected anomalies, threat classifications, and response actions, which you can review and analyze at any time." },
  { id: 13, question: "How does the autoencoder model work?", answer: "It combines **unsupervised learning techniques with neural networks** to learn normal network behavior patterns and identify deviations that may indicate security threats." },
  { id: 14, question: "Does the system improve over time?", answer: "Yes! CyberShield continuously learns from your network traffic patterns and emerging threat intelligence to enhance its detection capabilities." },
  { id: 15, question: "What blockchain technology does CyberShield use?", answer: "CyberShield implements a private, permissioned blockchain network optimized for security log verification while maintaining high throughput and minimal latency." },
  { id: 16, question: "Can CyberShield detect zero-day exploits?", answer: "It can recognize **unusual network behavior patterns** that may indicate novel attack vectors. While not guaranteed to catch all zero-days, its anomaly-based approach provides better protection than signature-based systems alone." },
]; 


const Faq = () => {
  const [faqs, setFaqs] = useState(faqsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of FAQs per page

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  // Filtered FAQs based on search input
  const filteredFaqs = faqs?.filter((faq) =>
    faq?.question?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Paginate FAQs
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedFaqs = filteredFaqs.slice(startIndex, startIndex + pageSize);

  // Handle pagination change
  const handlePageChange = (page) => setCurrentPage(page);

  // Handle feedback (Like/Dislike)
  const handleFeedback = (id, type) => {
    setFeedback((prev) => ({
      ...prev,
      [id]: type,
    }));
    message.success(`You ${type === "like" ? "liked" : "disliked"} this FAQ!`);
  };
 
    return (
        <section>
           <div className="text-center">
  <p className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
    <span className="text-[#f64a8a]">SECURITY CONCERNS? WE'VE </span> 
    <span className="text-[#5CE0E6]">GOT YOU COVERED </span>
  </p>
  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold pt-8 pb-6" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
    <span className="text-[#5CE0E6] mx-auto">FREQUENTLY ASKED QUESTIONS </span>
  </h1>
</div>
          <motion.div
            className="faq-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Add the image here */}
            <img
  src={photo5}
  alt="Security FAQ Illustration"
  className="faq-overlap-image hidden md:hidden lg:block"
/>

<h2 className="faq-title">
              <QuestionCircleOutlined /> Search Security Questions
            </h2>
            
    
            {/* Search Bar */}
            <Input
              className="faq-search"
              placeholder="Search security FAQs..."
              prefix={<SearchOutlined />}
              onChange={handleSearch}
            />
    
            {/* FAQ Accordion */}
            <Collapse accordion className="faq-collapse">
              {paginatedFaqs.length > 0 ? (
                paginatedFaqs.map((faq) => (
                  <Panel header={faq.question} key={faq.id} className="faq-panel">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {faq.answer}
                    </motion.p>
    
                    {/* Feedback Buttons */}
                    <div className="faq-feedback">
                      <Tooltip title="Helpful">
                        <Button
                          type={feedback[faq.id] === "like" ? "primary" : "default"}
                          shape="circle"
                          icon={<LikeOutlined />}
                          onClick={() => handleFeedback(faq.id, "like")}
                        />
                      </Tooltip>
                      <Tooltip title="Not Helpful">
                        <Button
                          type={feedback[faq.id] === "dislike" ? "primary" : "default"}
                          shape="circle"
                          icon={<DislikeOutlined />}
                          onClick={() => handleFeedback(faq.id, "dislike")}
                        />
                      </Tooltip>
                    </div>
                  </Panel>
                ))
              ) : (
                <p className="no-results">No security FAQs found for "{searchTerm}"</p>
              )}
            </Collapse>
    
            {/* Pagination */}
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredFaqs.length}
              onChange={handlePageChange}
              className="faq-pagination"
            />
          </motion.div>
        </section>
      );
    };
    
    export default Faq;