// Mock data for the application - no external APIs needed

export interface Chalet {
  id: string;
  name: string;
  country_code: string;
  city: string;
  address: string;
  default_price: number;
  images: string[];
  provider_id: string | null;
  verified: boolean;
  amenities: string[];
  capacity: number;
}

export interface ShippingCarrier {
  id: string;
  name: string;
  country_code: string;
  services: string[];
  contact: string | null;
  website: string | null;
  logo_path: string | null;
}

// Mock Chalets Data
export const mockChalets: Chalet[] = [
  // Saudi Arabia
  {
    id: "chalet-ksa-1",
    name: "شاليه الريان الفاخر",
    country_code: "ksa",
    city: "الرياض",
    address: "حي الملقا، شارع الأمير سلطان",
    default_price: 800,
    images: [],
    provider_id: "provider-ksa-1",
    verified: true,
    amenities: ["مسبح", "حديقة", "شواية", "مكيفات"],
    capacity: 10
  },
  {
    id: "chalet-ksa-2",
    name: "شاليه النخيل",
    country_code: "ksa",
    city: "جدة",
    address: "شمال جدة، حي الشاطئ",
    default_price: 1200,
    images: [],
    provider_id: "provider-ksa-2",
    verified: true,
    amenities: ["مسبح", "ألعاب مائية", "غرفة ألعاب"],
    capacity: 15
  },
  // UAE
  {
    id: "chalet-uae-1",
    name: "فيلا البحر",
    country_code: "uae",
    city: "دبي",
    address: "منطقة الجميرا",
    default_price: 2000,
    images: [],
    provider_id: "provider-uae-1",
    verified: true,
    amenities: ["مسبح خاص", "إطلالة بحرية", "جاكوزي"],
    capacity: 12
  },
  {
    id: "chalet-uae-2",
    name: "شاليه الواحة",
    country_code: "uae",
    city: "أبوظبي",
    address: "جزيرة ياس",
    default_price: 1500,
    images: [],
    provider_id: "provider-uae-2",
    verified: true,
    amenities: ["مسبح", "ملعب أطفال", "حديقة"],
    capacity: 8
  },
  // Kuwait
  {
    id: "chalet-kwt-1",
    name: "شاليه الخليج",
    country_code: "kwt",
    city: "مدينة الكويت",
    address: "منطقة السالمية",
    default_price: 600,
    images: [],
    provider_id: "provider-kwt-1",
    verified: true,
    amenities: ["مسبح", "شواية", "صالة ألعاب"],
    capacity: 10
  },
  // Qatar
  {
    id: "chalet-qat-1",
    name: "منتجع اللؤلؤة",
    country_code: "qat",
    city: "الدوحة",
    address: "اللؤلؤة قطر",
    default_price: 1800,
    images: [],
    provider_id: "provider-qat-1",
    verified: true,
    amenities: ["مسبح", "جيم", "ساونا"],
    capacity: 12
  },
  // Oman
  {
    id: "chalet-omn-1",
    name: "شاليه الجبل الأخضر",
    country_code: "omn",
    city: "مسقط",
    address: "القرم",
    default_price: 500,
    images: [],
    provider_id: "provider-omn-1",
    verified: true,
    amenities: ["مسبح", "حديقة", "إطلالة جبلية"],
    capacity: 8
  },
  // Bahrain
  {
    id: "chalet-bhr-1",
    name: "شاليه النورس",
    country_code: "bhr",
    city: "المنامة",
    address: "عمارات السيف",
    default_price: 700,
    images: [],
    provider_id: "provider-bhr-1",
    verified: true,
    amenities: ["مسبح", "إطلالة بحرية", "شواية"],
    capacity: 10
  }
];

// Mock Shipping Carriers Data
export const mockShippingCarriers: ShippingCarrier[] = [
  // Saudi Arabia
  {
    id: "carrier-ksa-aramex",
    name: "أرامكس",
    country_code: "ksa",
    services: ["توصيل سريع", "شحن دولي", "تتبع الشحنات"],
    contact: "+966-800-123-4567",
    website: "https://www.aramex.com",
    logo_path: "/og-aramex.jpg"
  },
  {
    id: "carrier-ksa-smsa",
    name: "سمسا",
    country_code: "ksa",
    services: ["توصيل محلي", "شحن دولي", "توصيل في نفس اليوم"],
    contact: "+966-920-000-744",
    website: "https://www.smsaexpress.com",
    logo_path: "/og-smsa.jpg"
  },
  {
    id: "carrier-ksa-zajil",
    name: "زاجل",
    country_code: "ksa",
    services: ["البريد السعودي", "توصيل للمنازل", "خدمات الشحن"],
    contact: "+966-920-005-700",
    website: "https://www.zajil.com",
    logo_path: "/og-zajil.jpg"
  },
  // UAE
  {
    id: "carrier-uae-aramex",
    name: "أرامكس",
    country_code: "uae",
    services: ["توصيل سريع", "شحن دولي", "تتبع الشحنات"],
    contact: "+971-600-544-000",
    website: "https://www.aramex.com",
    logo_path: "/og-aramex.jpg"
  },
  {
    id: "carrier-uae-empost",
    name: "بريد الإمارات",
    country_code: "uae",
    services: ["البريد المحلي", "شحن دولي", "خدمات البريد السريع"],
    contact: "+971-600-599-999",
    website: "https://www.emiratespost.ae",
    logo_path: "/og-empost.jpg"
  },
  // Kuwait
  {
    id: "carrier-kwt-aramex",
    name: "أرامكس",
    country_code: "kwt",
    services: ["توصيل سريع", "شحن دولي", "تتبع الشحنات"],
    contact: "+965-1-802-626",
    website: "https://www.aramex.com",
    logo_path: "/og-aramex.jpg"
  },
  // Qatar
  {
    id: "carrier-qat-qpost",
    name: "بريد قطر",
    country_code: "qat",
    services: ["البريد المحلي", "شحن دولي", "خدمات البريد السريع"],
    contact: "+974-4445-9999",
    website: "https://www.qpost.qa",
    logo_path: "/og-qpost.jpg"
  },
  // Oman
  {
    id: "carrier-omn-omanpost",
    name: "بريد عمان",
    country_code: "omn",
    services: ["البريد المحلي", "شحن دولي", "خدمات البريد السريع"],
    contact: "+968-800-77777",
    website: "https://www.omanpost.om",
    logo_path: "/og-omanpost.jpg"
  },
  // Bahrain
  {
    id: "carrier-bhr-bahpost",
    name: "بريد البحرين",
    country_code: "bhr",
    services: ["البريد المحلي", "شحن دولي", "خدمات البريد السريع"],
    contact: "+973-1729-6666",
    website: "https://www.bahrainpost.gov.bh",
    logo_path: "/og-bahpost.jpg"
  },
  // International carriers available in all countries
  {
    id: "carrier-dhl",
    name: "DHL",
    country_code: "all",
    services: ["شحن دولي سريع", "تتبع متقدم", "خدمات الجمارك"],
    contact: "+800-DHL-DHL",
    website: "https://www.dhl.com",
    logo_path: "/og-dhl.jpg"
  },
  {
    id: "carrier-fedex",
    name: "FedEx",
    country_code: "all",
    services: ["توصيل سريع دولي", "شحن جوي", "حلول لوجستية"],
    contact: "+800-FEDEX",
    website: "https://www.fedex.com",
    logo_path: "/og-fedex.jpg"
  },
  {
    id: "carrier-ups",
    name: "UPS",
    country_code: "all",
    services: ["شحن دولي", "توصيل سريع", "حلول الأعمال"],
    contact: "+800-UPS",
    website: "https://www.ups.com",
    logo_path: "/og-ups.jpg"
  }
];

// Get chalets by country
export const getChaletsByCountry = (countryCode: string): Chalet[] => {
  return mockChalets.filter(chalet => chalet.country_code === countryCode);
};

// Get shipping carriers by country
export const getCarriersByCountry = (countryCode: string): ShippingCarrier[] => {
  return mockShippingCarriers.filter(
    carrier => carrier.country_code === countryCode || carrier.country_code === "all"
  );
};

// Get chalet by ID
export const getChaletById = (id: string): Chalet | undefined => {
  return mockChalets.find(chalet => chalet.id === id);
};

// Get carrier by ID
export const getCarrierById = (id: string): ShippingCarrier | undefined => {
  return mockShippingCarriers.find(carrier => carrier.id === id);
};
