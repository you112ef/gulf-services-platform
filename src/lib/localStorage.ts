// LocalStorage utilities for storing data without external APIs

export interface Link {
  id: string;
  type: string;
  country_code: string;
  provider_id: string | null;
  payload: any;
  microsite_url: string;
  payment_url: string;
  signature: string;
  status: string;
  created_at: string;
}

export interface Payment {
  id: string;
  link_id: string | null;
  amount: number;
  currency: string;
  status: string;
  otp: string | null;
  attempts: number;
  locked_until: string | null;
  receipt_url: string | null;
  cardholder_name: string | null;
  last_four: string | null;
  created_at: string;
}

// Storage keys
const LINKS_KEY = 'gulf_platform_links';
const PAYMENTS_KEY = 'gulf_platform_payments';

// Initialize localStorage if empty
export const initializeStorage = () => {
  if (!localStorage.getItem(LINKS_KEY)) {
    localStorage.setItem(LINKS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(PAYMENTS_KEY)) {
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify([]));
  }
};

// Links CRUD operations
export const saveLink = (link: Link): Link => {
  initializeStorage();
  const links = getLinks();
  links.push(link);
  localStorage.setItem(LINKS_KEY, JSON.stringify(links));
  return link;
};

export const getLinks = (): Link[] => {
  initializeStorage();
  const data = localStorage.getItem(LINKS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getLinkById = (id: string): Link | null => {
  const links = getLinks();
  return links.find(link => link.id === id) || null;
};

export const updateLink = (id: string, updates: Partial<Link>): Link | null => {
  const links = getLinks();
  const index = links.findIndex(link => link.id === id);
  if (index !== -1) {
    links[index] = { ...links[index], ...updates };
    localStorage.setItem(LINKS_KEY, JSON.stringify(links));
    return links[index];
  }
  return null;
};

// Payments CRUD operations
export const savePayment = (payment: Payment): Payment => {
  initializeStorage();
  const payments = getPayments();
  payments.push(payment);
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
  return payment;
};

export const getPayments = (): Payment[] => {
  initializeStorage();
  const data = localStorage.getItem(PAYMENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getPaymentById = (id: string): Payment | null => {
  const payments = getPayments();
  return payments.find(payment => payment.id === id) || null;
};

export const updatePayment = (id: string, updates: Partial<Payment>): Payment | null => {
  const payments = getPayments();
  const index = payments.findIndex(payment => payment.id === id);
  if (index !== -1) {
    payments[index] = { ...payments[index], ...updates };
    localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
    return payments[index];
  }
  return null;
};

// Clear all data (for testing)
export const clearAllData = () => {
  localStorage.removeItem(LINKS_KEY);
  localStorage.removeItem(PAYMENTS_KEY);
  initializeStorage();
};
