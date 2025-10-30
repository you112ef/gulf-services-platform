import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLink } from "@/hooks/useLocalStorage";
import { getCountryByCode, formatCurrency } from "@/lib/countries";
import { getServiceBranding } from "@/lib/serviceLogos";
import { getServiceBrandingByType, getServiceTitle, getServiceIcon } from "@/lib/serviceBranding";
import { gccShippingServices } from "@/lib/gccShippingServices";
import SEOHead from "@/components/SEOHead";
import {
  MapPin,
  Users,
  CheckCircle2,
  CreditCard,
  Shield,
  Sparkles,
  Package,
  Truck,
  Hash,
  FileText,
  Heart,
  Building2,
  User,
  Phone,
  Calendar,
  DollarSign,
} from "lucide-react";

const Microsite = () => {
  const { country, type, id } = useParams();
  const navigate = useNavigate();
  const { data: link, isLoading } = useLink(id);
  const countryData = getCountryByCode(country || "");
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">جاري التحميل...</div>
      </div>
    );
  }
  
  if (!link || !countryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">الرابط غير موجود</h2>
          <p className="text-muted-foreground">الرجاء التحقق من الرابط</p>
        </div>
      </div>
    );
  }
  
  const payload = link.payload;
  const serviceType = link.type;
  const serviceBranding = getServiceBrandingByType(serviceType);
  const serviceTitle = getServiceTitle(serviceType);
  const serviceIconEmoji = getServiceIcon(serviceType);
  
  // Get service name based on type
  const getServiceName = () => {
    switch (serviceType) {
      case 'chalet':
        return payload.chalet_name;
      case 'shipping':
        return payload.service_name;
      case 'invoice':
        return `فاتورة رقم ${payload.invoice_number}`;
      case 'health':
        return payload.service_name;
      case 'logistics':
        return payload.service_name;
      case 'contract':
        return payload.contract_type_name;
      default:
        return 'خدمة';
    }
  };
  
  const serviceName = getServiceName();
  
  // For shipping, get service branding
  const shippingBranding = serviceType === 'shipping' && payload.service_key 
    ? getServiceBranding(payload.service_key)
    : null;
  
  // SEO metadata
  const seoTitle = `${serviceTitle.ar} - ${serviceName}`;
  const seoDescription = `${serviceTitle.ar} في ${countryData.nameAr} - دفع آمن ومحمي`;
  const seoImage = shippingBranding?.ogImage || '/og-aramex.jpg';
  
  // Get total amount based on service type
  const getTotalAmount = () => {
    switch (serviceType) {
      case 'chalet':
        return payload.total_amount;
      case 'shipping':
        return payload.cod_amount;
      case 'invoice':
      case 'health':
      case 'logistics':
      case 'contract':
        return payload.amount;
      default:
        return 0;
    }
  };
  
  const totalAmount = getTotalAmount();
  
  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={window.location.href}
        type="website"
      />
      <div className="min-h-screen py-12 bg-gradient-to-b from-background to-secondary/20" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header Badge */}
            <div className="text-center mb-8 animate-fade-in">
              <Badge className="text-lg px-6 py-3 text-white border-0" style={{ background: serviceBranding.gradient }}>
                <Shield className="w-5 h-5 ml-2" />
                <span>موثّق ومحمي {serviceBranding.seal}</span>
              </Badge>
            </div>
            
            {/* Main Card */}
            <Card className="overflow-hidden shadow-2xl animate-fade-in">
              {/* Header with Service Colors */}
              <div
                className="h-40 relative overflow-hidden"
                style={{ background: serviceBranding.gradient }}
              >
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 opacity-10" 
                     style={{ 
                       backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', 
                       backgroundSize: '20px 20px' 
                     }} 
                />
                <div className="absolute bottom-6 right-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-5xl">{serviceIconEmoji}</span>
                    <div>
                      <p className="text-sm opacity-90">{serviceTitle.ar}</p>
                      <h1 className="text-3xl font-bold">{serviceName}</h1>
                    </div>
                  </div>
                </div>
                <div className="absolute top-6 left-6 text-white">
                  <p className="text-2xl font-bold opacity-90">{countryData.nameAr}</p>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                {/* Service Image for Shipping */}
                {serviceType === 'shipping' && shippingBranding?.heroImage && (
                  <div className="aspect-video rounded-xl mb-6 overflow-hidden shadow-lg">
                    <img 
                      src={shippingBranding.heroImage} 
                      alt={serviceName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Service Details based on Type */}
                <div className="space-y-6 mb-8">
                  {/* Chalet Details */}
                  {serviceType === 'chalet' && (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <DetailItem 
                          icon={<MapPin className="w-5 h-5 text-primary" />}
                          label="الموقع"
                          value={payload.chalet_name}
                        />
                        <DetailItem 
                          icon={<Users className="w-5 h-5 text-primary" />}
                          label="عدد الضيوف"
                          value={`${payload.guest_count} ضيف`}
                        />
                        <DetailItem 
                          icon={<Calendar className="w-5 h-5 text-primary" />}
                          label="المدة"
                          value={`${payload.nights} ليلة`}
                        />
                        <DetailItem 
                          icon={<DollarSign className="w-5 h-5 text-primary" />}
                          label="السعر / الليلة"
                          value={formatCurrency(payload.price_per_night, payload.currency)}
                        />
                      </div>
                    </>
                  )}
                  
                  {/* Shipping Details */}
                  {serviceType === 'shipping' && (
                    <>
                      <div className="mb-6 p-4 bg-secondary/20 rounded-lg border">
                        <div className="flex items-center gap-3 mb-2">
                          <Package className="w-5 h-5 text-primary" />
                          <h3 className="font-bold text-lg">{payload.service_name}</h3>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <DetailItem 
                          icon={<Hash className="w-5 h-5 text-primary" />}
                          label="رقم الشحنة"
                          value={payload.tracking_number}
                        />
                        <DetailItem 
                          icon={<Truck className="w-5 h-5 text-primary" />}
                          label="وصف الطرد"
                          value={payload.package_description || 'غير محدد'}
                        />
                      </div>
                    </>
                  )}
                  
                  {/* Invoice Details */}
                  {serviceType === 'invoice' && (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <DetailItem 
                          icon={<FileText className="w-5 h-5 text-primary" />}
                          label="رقم الفاتورة"
                          value={payload.invoice_number}
                        />
                        <DetailItem 
                          icon={<User className="w-5 h-5 text-primary" />}
                          label="اسم العميل"
                          value={payload.client_name}
                        />
                        <DetailItem 
                          icon={<Calendar className="w-5 h-5 text-primary" />}
                          label="تاريخ الإصدار"
                          value={new Date(payload.issue_date).toLocaleDateString('ar-SA')}
                        />
                        {payload.client_email && (
                          <DetailItem 
                            icon={<Phone className="w-5 h-5 text-primary" />}
                            label="البريد الإلكتروني"
                            value={payload.client_email}
                          />
                        )}
                      </div>
                      
                      {/* Invoice Items */}
                      {payload.items && payload.items.length > 0 && (
                        <div className="bg-secondary/20 rounded-lg p-4">
                          <h3 className="font-bold mb-3">بنود الفاتورة</h3>
                          <div className="space-y-2">
                            {payload.items.map((item: any, index: number) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>{item.description} ({item.quantity}×)</span>
                                <span className="font-semibold">{formatCurrency(item.quantity * item.unit_price, payload.currency)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Health Service Details */}
                  {serviceType === 'health' && (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <DetailItem 
                          icon={<Heart className="w-5 h-5 text-primary" />}
                          label="نوع الخدمة"
                          value={payload.service_name}
                        />
                        <DetailItem 
                          icon={<Building2 className="w-5 h-5 text-primary" />}
                          label="مقدم الخدمة"
                          value={payload.provider_name}
                        />
                        <DetailItem 
                          icon={<User className="w-5 h-5 text-primary" />}
                          label="اسم المريض"
                          value={payload.patient_name}
                        />
                        <DetailItem 
                          icon={<Phone className="w-5 h-5 text-primary" />}
                          label="رقم الهاتف"
                          value={payload.patient_phone}
                        />
                        {payload.appointment_date && (
                          <DetailItem 
                            icon={<Calendar className="w-5 h-5 text-primary" />}
                            label="موعد الخدمة"
                            value={`${new Date(payload.appointment_date).toLocaleDateString('ar-SA')} ${payload.appointment_time || ''}`}
                          />
                        )}
                      </div>
                      {payload.service_description && (
                        <div className="bg-secondary/20 rounded-lg p-4">
                          <h3 className="font-bold mb-2">وصف الخدمة</h3>
                          <p className="text-sm text-muted-foreground">{payload.service_description}</p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Logistics Details */}
                  {serviceType === 'logistics' && (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <DetailItem 
                          icon={<Truck className="w-5 h-5 text-primary" />}
                          label="نوع الخدمة"
                          value={payload.service_name}
                        />
                        <DetailItem 
                          icon={<Building2 className="w-5 h-5 text-primary" />}
                          label="الشركة"
                          value={payload.company_name}
                        />
                        <DetailItem 
                          icon={<User className="w-5 h-5 text-primary" />}
                          label="المسؤول"
                          value={payload.contact_person}
                        />
                        <DetailItem 
                          icon={<Phone className="w-5 h-5 text-primary" />}
                          label="رقم الهاتف"
                          value={payload.contact_phone}
                        />
                        {payload.weight > 0 && (
                          <DetailItem 
                            icon={<Package className="w-5 h-5 text-primary" />}
                            label="الوزن"
                            value={`${payload.weight} كجم`}
                          />
                        )}
                        {payload.dimensions && (
                          <DetailItem 
                            icon={<Package className="w-5 h-5 text-primary" />}
                            label="الأبعاد"
                            value={payload.dimensions}
                          />
                        )}
                      </div>
                      {payload.shipment_details && (
                        <div className="bg-secondary/20 rounded-lg p-4">
                          <h3 className="font-bold mb-2">تفاصيل الشحنة</h3>
                          <p className="text-sm text-muted-foreground">{payload.shipment_details}</p>
                        </div>
                      )}
                    </>
                  )}
                  
                  {/* Contract Details */}
                  {serviceType === 'contract' && (
                    <>
                      <div className="grid md:grid-cols-2 gap-6">
                        <DetailItem 
                          icon={<FileText className="w-5 h-5 text-primary" />}
                          label="نوع العقد"
                          value={payload.contract_type_name}
                        />
                        <DetailItem 
                          icon={<Hash className="w-5 h-5 text-primary" />}
                          label="رقم العقد"
                          value={payload.contract_number}
                        />
                        <DetailItem 
                          icon={<User className="w-5 h-5 text-primary" />}
                          label="الطرف الأول"
                          value={payload.first_party_name}
                        />
                        <DetailItem 
                          icon={<User className="w-5 h-5 text-primary" />}
                          label="الطرف الثاني"
                          value={payload.second_party_name}
                        />
                        {payload.contract_start_date && (
                          <DetailItem 
                            icon={<Calendar className="w-5 h-5 text-primary" />}
                            label="تاريخ البدء"
                            value={new Date(payload.contract_start_date).toLocaleDateString('ar-SA')}
                          />
                        )}
                        {payload.contract_end_date && (
                          <DetailItem 
                            icon={<Calendar className="w-5 h-5 text-primary" />}
                            label="تاريخ الانتهاء"
                            value={new Date(payload.contract_end_date).toLocaleDateString('ar-SA')}
                          />
                        )}
                      </div>
                      {payload.contract_description && (
                        <div className="bg-secondary/20 rounded-lg p-4">
                          <h3 className="font-bold mb-2">وصف العقد</h3>
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{payload.contract_description}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                {/* Total Amount */}
                <div 
                  className="p-6 rounded-xl text-white mb-6 shadow-lg relative overflow-hidden"
                  style={{ background: serviceBranding.gradient }}
                >
                  <div className="absolute inset-0 opacity-10" 
                       style={{ 
                         backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', 
                         backgroundSize: '30px 30px' 
                       }} 
                  />
                  <div className="relative">
                    <p className="text-sm mb-2 opacity-90">المبلغ الإجمالي</p>
                    <p className="text-5xl font-bold mb-2">
                      {formatCurrency(totalAmount, payload.currency)}
                    </p>
                    <p className="text-sm opacity-80">
                      {serviceType === 'chalet' && `${payload.price_per_night} × ${payload.nights} ليلة`}
                      {serviceType === 'shipping' && 'مبلغ الدفع عند الاستلام'}
                      {(serviceType === 'invoice' || serviceType === 'health' || serviceType === 'logistics' || serviceType === 'contract') && 'المبلغ المطلوب'}
                    </p>
                  </div>
                </div>
                
                {/* Terms */}
                <div className="bg-secondary/30 p-4 rounded-lg mb-6 border">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>الشروط والأحكام</span>
                  </h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>الدفع آمن ومحمي بأعلى معايير الأمان</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>جميع المعاملات مشفرة ومؤمنة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>تأكد من صحة المعلومات قبل الدفع</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>ستحصل على إيصال فوري بعد إتمام الدفع</span>
                    </li>
                  </ul>
                </div>
                
                {/* Payment Button */}
                <Button
                  size="lg"
                  className="w-full text-xl py-7 shadow-glow animate-pulse-glow border-0 text-white"
                  style={{ background: serviceBranding.gradient }}
                  onClick={() => navigate(`/pay/${link.id}/recipient`)}
                >
                  <CreditCard className="w-6 h-6 ml-3" />
                  <span>ادفع الآن - {formatCurrency(totalAmount, payload.currency)}</span>
                </Button>
                
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <p className="text-xs text-center text-muted-foreground">
                    دفع آمن ومحمي بتقنيات التشفير العالمية {serviceBranding.seal}
                  </p>
                </div>
              </div>
            </Card>
            
            {/* Footer Badge */}
            <div className="text-center mt-6">
              <Badge variant="outline" className="text-xs px-4 py-2">
                <Sparkles className="w-3 h-3 ml-1" />
                <span>منصة خليجية موثوقة</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Detail Item Component
const DetailItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/20 border">
    <div className="mt-1">{icon}</div>
    <div className="flex-1">
      <p className="font-semibold text-sm mb-1">{label}</p>
      <p className="text-muted-foreground text-sm">{value}</p>
    </div>
  </div>
);

export default Microsite;
