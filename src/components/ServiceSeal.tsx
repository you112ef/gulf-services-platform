// Professional service seals/stamps for microsite pages
import React from "react";

interface ServiceSealProps {
  serviceType: string;
  verified?: boolean;
}

const ServiceSeal: React.FC<ServiceSealProps> = ({ serviceType, verified = true }) => {
  const seals: Record<string, { emoji: string; text: string; color: string }> = {
    chalet: { emoji: "✓", text: "موثّق", color: "#667eea" },
    shipping: { emoji: "✓", text: "معتمد", color: "#f5576c" },
    invoice: { emoji: "✓", text: "رسمي", color: "hsl(210 95% 50%)" },
    health: { emoji: "✓", text: "مرخّص", color: "hsl(0 85% 55%)" },
    logistics: { emoji: "✓", text: "معتمد", color: "hsl(260 95% 55%)" },
    contract: { emoji: "✓", text: "قانوني", color: "hsl(40 95% 55%)" },
  };
  
  const seal = seals[serviceType] || seals.chalet;
  
  if (!verified) return null;
  
  return (
    <div 
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg animate-pulse-glow"
      style={{ background: seal.color }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="animate-bounce">
        <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M6 10l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>{seal.text}</span>
    </div>
  );
};

export default ServiceSeal;
