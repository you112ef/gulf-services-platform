import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { 
  LinkData, 
  getLinkDataFromUrl, 
  validateLinkData,
  createShareableLink,
  encodeLinkData,
  decodeLinkData
} from '@/lib/urlEncoding';

/**
 * Hook to create a shareable link with embedded data
 */
export const useCreateShareableLink = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  const createLink = async (linkData: Omit<LinkData, 'created_at'>) => {
    setIsCreating(true);
    
    try {
      // Add timestamp
      const fullLinkData: LinkData = {
        ...linkData,
        created_at: new Date().toISOString(),
      };

      // Validate data
      if (!validateLinkData(fullLinkData)) {
        throw new Error('Invalid link data structure');
      }

      // Create shareable URL
      const shareableUrl = createShareableLink(fullLinkData);

      toast({
        title: "تم إنشاء الرابط",
        description: "الرابط جاهز للمشاركة",
      });

      setIsCreating(false);
      return shareableUrl;
    } catch (error: any) {
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء إنشاء الرابط",
        variant: "destructive",
      });
      setIsCreating(false);
      throw error;
    }
  };

  return { createLink, isCreating };
};

/**
 * Hook to get link data from current URL
 */
export const useLinkData = () => {
  const [linkData, setLinkData] = useState<LinkData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const data = getLinkDataFromUrl();
      
      if (data && validateLinkData(data)) {
        setLinkData(data);
        setError(null);
      } else {
        setError('Invalid or missing link data');
        setLinkData(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load link data');
      setLinkData(null);
    } finally {
      setIsLoading(false);
    }
  }, [window.location.search]);

  return { linkData, isLoading, error };
};

/**
 * Hook to manage link state and navigation
 */
export const useLinkNavigation = () => {
  const getCurrentLinkId = () => {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
  };

  const navigateToPayment = (linkId: string, linkData: LinkData) => {
    const encodedData = encodeLinkData(linkData);
    return `/pay/${linkId}/recipient?d=${encodedData}`;
  };

  const navigateToDetails = (linkId: string, linkData: LinkData) => {
    const encodedData = encodeLinkData(linkData);
    return `/pay/${linkId}/details?d=${encodedData}`;
  };

  const navigateToCard = (linkId: string, linkData: LinkData) => {
    const encodedData = encodeLinkData(linkData);
    return `/pay/${linkId}/card?d=${encodedData}`;
  };

  const navigateToOtp = (linkId: string, linkData: LinkData) => {
    const encodedData = encodeLinkData(linkData);
    return `/pay/${linkId}/otp?d=${encodedData}`;
  };

  const navigateToReceipt = (linkId: string, linkData: LinkData) => {
    const encodedData = encodeLinkData(linkData);
    return `/pay/${linkId}/receipt?d=${encodedData}`;
  };

  return {
    getCurrentLinkId,
    navigateToPayment,
    navigateToDetails,
    navigateToCard,
    navigateToOtp,
    navigateToReceipt,
  };
};

/**
 * Hook for backward compatibility with localStorage
 * Tries URL first, then falls back to localStorage
 */
export const useHybridLinkData = (linkId?: string) => {
  const { linkData: urlData, isLoading: urlLoading } = useLinkData();
  const [finalData, setFinalData] = useState<LinkData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Try URL data first
      if (urlData) {
        setFinalData(urlData);
        setIsLoading(false);
        return;
      }

      // Fallback to localStorage if available
      if (linkId) {
        try {
          const { getLinkById } = await import('@/lib/localStorage');
          const storedLink = getLinkById(linkId);
          if (storedLink) {
            setFinalData({
              type: storedLink.type,
              country_code: storedLink.country_code,
              provider_id: storedLink.provider_id || undefined,
              payload: storedLink.payload,
              created_at: storedLink.created_at,
            });
          }
        } catch (error) {
          console.error('Failed to load from localStorage:', error);
        }
      }

      setIsLoading(false);
    };

    if (!urlLoading) {
      loadData();
    }
  }, [urlData, urlLoading, linkId]);

  return { data: finalData, isLoading };
};
