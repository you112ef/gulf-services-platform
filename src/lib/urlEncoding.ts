// URL-based data encoding/decoding for standalone links
// Each link contains all data encoded in the URL itself

export interface LinkData {
  type: string;
  country_code: string;
  provider_id?: string;
  payload: any;
  created_at: string;
}

/**
 * Encode link data into a URL-safe base64 string
 */
export const encodeLinkData = (data: LinkData): string => {
  try {
    // Convert to JSON
    const jsonString = JSON.stringify(data);
    
    // Encode to base64 with URL-safe characters
    const base64 = btoa(encodeURIComponent(jsonString));
    
    // Make it more URL-friendly
    return base64
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  } catch (error) {
    console.error('Error encoding link data:', error);
    throw new Error('Failed to encode link data');
  }
};

/**
 * Decode link data from a URL-safe base64 string
 */
export const decodeLinkData = (encoded: string): LinkData | null => {
  try {
    // Restore base64 padding and characters
    let base64 = encoded
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // Decode from base64
    const jsonString = decodeURIComponent(atob(base64));
    
    // Parse JSON
    const data = JSON.parse(jsonString);
    
    return data as LinkData;
  } catch (error) {
    console.error('Error decoding link data:', error);
    return null;
  }
};

/**
 * Generate a unique link ID
 */
export const generateLinkId = (): string => {
  return crypto.randomUUID();
};

/**
 * Create a complete microsite URL with encoded data
 */
export const createMicrositeUrl = (
  linkId: string,
  data: LinkData,
  baseUrl: string = window.location.origin
): string => {
  const encodedData = encodeLinkData(data);
  return `${baseUrl}/r/${data.country_code}/${data.type}/${linkId}?d=${encodedData}`;
};

/**
 * Create a payment URL with encoded data
 */
export const createPaymentUrl = (
  linkId: string,
  data: LinkData,
  baseUrl: string = window.location.origin
): string => {
  const encodedData = encodeLinkData(data);
  return `${baseUrl}/pay/${linkId}/recipient?d=${encodedData}`;
};

/**
 * Extract link data from URL parameters
 */
export const getLinkDataFromUrl = (): LinkData | null => {
  try {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('d');
    
    if (!encodedData) {
      return null;
    }
    
    return decodeLinkData(encodedData);
  } catch (error) {
    console.error('Error getting link data from URL:', error);
    return null;
  }
};

/**
 * Validate link data structure
 */
export const validateLinkData = (data: any): data is LinkData => {
  if (!data || typeof data !== 'object') return false;
  
  return (
    typeof data.type === 'string' &&
    typeof data.country_code === 'string' &&
    typeof data.payload === 'object' &&
    typeof data.created_at === 'string'
  );
};

/**
 * Create a shareable link with all data embedded
 */
export const createShareableLink = (linkData: LinkData): string => {
  const linkId = generateLinkId();
  return createMicrositeUrl(linkId, linkData);
};

/**
 * Get link info from current URL
 */
export const getCurrentLinkInfo = (): { linkId: string; data: LinkData | null } | null => {
  try {
    // Extract link ID from URL path
    const pathParts = window.location.pathname.split('/');
    const linkId = pathParts[pathParts.length - 1];
    
    // Get data from URL parameter
    const data = getLinkDataFromUrl();
    
    if (!linkId) {
      return null;
    }
    
    return { linkId, data };
  } catch (error) {
    console.error('Error getting current link info:', error);
    return null;
  }
};
