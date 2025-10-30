// Service branding for all service types with colors, icons, and themes

export interface ServiceBranding {
  gradient: string;
  primaryColor: string;
  secondaryColor: string;
  icon: string;
  seal: string; // Emoji seal/stamp
  bgPattern?: string;
}

export const serviceBranding: Record<string, ServiceBranding> = {
  // Chalet
  chalet: {
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    primaryColor: "#667eea",
    secondaryColor: "#764ba2",
    icon: "🏠",
    seal: "✓",
  },
  
  // Shipping
  shipping: {
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    primaryColor: "#f093fb",
    secondaryColor: "#f5576c",
    icon: "📦",
    seal: "✓",
  },
  
  // Invoice
  invoice: {
    gradient: "linear-gradient(135deg, hsl(210 95% 50%), hsl(220 90% 60%))",
    primaryColor: "hsl(210 95% 50%)",
    secondaryColor: "hsl(220 90% 60%)",
    icon: "📄",
    seal: "✓",
  },
  
  // Health Services
  health: {
    gradient: "linear-gradient(135deg, hsl(0 85% 55%), hsl(10 80% 60%))",
    primaryColor: "hsl(0 85% 55%)",
    secondaryColor: "hsl(10 80% 60%)",
    icon: "❤️",
    seal: "✓",
  },
  
  // Logistics
  logistics: {
    gradient: "linear-gradient(135deg, hsl(260 95% 55%), hsl(280 90% 60%))",
    primaryColor: "hsl(260 95% 55%)",
    secondaryColor: "hsl(280 90% 60%)",
    icon: "🚚",
    seal: "✓",
  },
  
  // Contract
  contract: {
    gradient: "linear-gradient(135deg, hsl(40 95% 55%), hsl(30 90% 50%))",
    primaryColor: "hsl(40 95% 55%)",
    secondaryColor: "hsl(30 90% 50%)",
    icon: "📋",
    seal: "✓",
  },
};

export const getServiceBrandingByType = (type: string): ServiceBranding => {
  return serviceBranding[type] || serviceBranding.chalet;
};

export const getServiceTitle = (type: string): { ar: string; en: string } => {
  const titles: Record<string, { ar: string; en: string }> = {
    chalet: { ar: "حجز شاليه", en: "Chalet Booking" },
    shipping: { ar: "خدمة شحن", en: "Shipping Service" },
    invoice: { ar: "فاتورة", en: "Invoice" },
    health: { ar: "خدمة صحية", en: "Health Service" },
    logistics: { ar: "خدمة لوجستية", en: "Logistics Service" },
    contract: { ar: "عقد", en: "Contract" },
  };
  
  return titles[type] || titles.chalet;
};

export const getServiceIcon = (type: string) => {
  const icons: Record<string, string> = {
    chalet: "🏠",
    shipping: "📦",
    invoice: "📄",
    health: "❤️",
    logistics: "🚚",
    contract: "📋",
  };
  
  return icons[type] || "📄";
};
