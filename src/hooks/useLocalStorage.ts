import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import {
  saveLink,
  getLinks,
  getLinkById,
  savePayment,
  getPayments,
  getPaymentById,
  updatePayment as updatePaymentInStorage,
  Link,
  Payment,
} from "@/lib/localStorage";
import {
  getChaletsByCountry,
  getCarriersByCountry,
  Chalet,
  ShippingCarrier,
} from "@/lib/mockData";

// Fetch chalets by country
export const useChalets = (countryCode?: string) => {
  return useQuery({
    queryKey: ["chalets", countryCode],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      if (!countryCode) return [];
      return getChaletsByCountry(countryCode);
    },
    enabled: !!countryCode,
  });
};

// Fetch shipping carriers by country
export const useShippingCarriers = (countryCode?: string) => {
  return useQuery({
    queryKey: ["carriers", countryCode],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      if (!countryCode) return [];
      return getCarriersByCountry(countryCode);
    },
    enabled: !!countryCode,
  });
};

// Create link
export const useCreateLink = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (linkData: {
      type: string;
      country_code: string;
      provider_id?: string;
      payload: any;
    }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const linkId = crypto.randomUUID();
      const micrositeUrl = `${window.location.origin}/r/${linkData.country_code}/${linkData.type}/${linkId}`;
      const paymentUrl = `${window.location.origin}/pay/${linkId}/recipient`;

      // Simple signature (in production, use HMAC)
      const signature = btoa(encodeURIComponent(JSON.stringify(linkData.payload)));

      const newLink: Link = {
        id: linkId,
        type: linkData.type,
        country_code: linkData.country_code,
        provider_id: linkData.provider_id || null,
        payload: linkData.payload,
        microsite_url: micrositeUrl,
        payment_url: paymentUrl,
        signature,
        status: "active",
        created_at: new Date().toISOString(),
      };

      return saveLink(newLink);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      toast({
        title: "تم إنشاء الرابط",
        description: "تم إنشاء رابط الخدمة بنجاح",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء إنشاء الرابط",
        variant: "destructive",
      });
    },
  });
};

// Fetch link by ID
export const useLink = (linkId?: string) => {
  return useQuery({
    queryKey: ["link", linkId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      if (!linkId) return null;
      return getLinkById(linkId);
    },
    enabled: !!linkId,
  });
};

// Create payment
export const useCreatePayment = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (paymentData: {
      link_id: string;
      amount: number;
      currency: string;
    }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate OTP (4 digits)
      const otp = Math.floor(1000 + Math.random() * 9000).toString();

      const newPayment: Payment = {
        id: crypto.randomUUID(),
        link_id: paymentData.link_id,
        amount: paymentData.amount,
        currency: paymentData.currency,
        otp,
        status: "pending",
        attempts: 0,
        locked_until: null,
        receipt_url: null,
        cardholder_name: null,
        last_four: null,
        created_at: new Date().toISOString(),
      };

      return savePayment(newPayment);
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء إنشاء الدفعة",
        variant: "destructive",
      });
    },
  });
};

// Fetch payment by ID
export const usePayment = (paymentId?: string) => {
  return useQuery({
    queryKey: ["payment", paymentId],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      if (!paymentId) return null;
      return getPaymentById(paymentId);
    },
    enabled: !!paymentId,
    refetchInterval: 2000, // Refresh every 2 seconds for OTP status
  });
};

// Update payment (for OTP verification)
export const useUpdatePayment = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      paymentId,
      updates,
    }: {
      paymentId: string;
      updates: Partial<Payment>;
    }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedPayment = updatePaymentInStorage(paymentId, updates);
      if (!updatedPayment) {
        throw new Error("Payment not found");
      }
      return updatedPayment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payment"] });
    },
    onError: (error: any) => {
      toast({
        title: "خطأ",
        description: error.message || "حدث خطأ أثناء تحديث الدفعة",
        variant: "destructive",
      });
    },
  });
};

// Export types
export type { Chalet, ShippingCarrier, Link, Payment };
