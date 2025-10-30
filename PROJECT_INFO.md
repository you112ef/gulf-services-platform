# Gulf Services Platform

## 🌟 Overview

A comprehensive service management platform for GCC (Gulf Cooperation Council) countries, providing a unified solution for multiple service types including shipping, chalet bookings, invoices, health services, logistics, and contracts.

## 🚀 Live Repository

**GitHub Repository:** https://github.com/you112ef/gulf-services-platform

## 📦 Services Included

### 1. **Chalet Booking** 🏠
- Book chalets with customizable pricing
- Multiple nights booking
- Guest count management
- Provider verification system

### 2. **Shipping Services** 📦
- Support for all major GCC shipping carriers
- International and domestic shipping
- Real-time tracking integration
- Multi-country support

### 3. **Invoices** 📄
- Professional invoice generation
- Multiple line items
- Client management
- Automatic total calculation

### 4. **Health Services** ❤️
- 8 types of medical services:
  - Medical Consultation
  - Home Care
  - Laboratory Tests
  - Radiology
  - Pharmacy
  - Physiotherapy
  - Dental Services
  - Vaccination
- Appointment scheduling
- Patient information management

### 5. **Logistics** 🚚
- 8 types of logistics services:
  - Warehousing
  - Freight Forwarding
  - Customs Clearance
  - Distribution
  - Packaging
  - Inventory Management
  - Express Delivery
  - Bulk Shipping
- Shipment tracking
- Weight and dimensions support

### 6. **Contracts** 📋
- 8 types of contracts:
  - Rental Agreement
  - Employment Contract
  - Service Agreement
  - Partnership Agreement
  - Sales Contract
  - Non-Disclosure Agreement
  - Maintenance Contract
  - Consultancy Agreement
- Two-party contract management
- Financial terms configuration

## 🌍 Supported Countries

- 🇸🇦 Saudi Arabia (KSA)
- 🇦🇪 United Arab Emirates (UAE)
- 🇰🇼 Kuwait
- 🇶🇦 Qatar
- 🇴🇲 Oman
- 🇧🇭 Bahrain

## 🛠️ Technology Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Routing:** React Router v6
- **State Management:** TanStack Query (React Query)
- **Database:** Supabase
- **Build Tool:** Vite
- **Deployment:** Netlify-ready
- **Icons:** Lucide React

## 📁 Project Structure

```
/workspace/
├── src/
│   ├── pages/
│   │   ├── CreateChaletLink.tsx
│   │   ├── CreateShippingLink.tsx
│   │   ├── CreateInvoiceLink.tsx
│   │   ├── CreateHealthServiceLink.tsx
│   │   ├── CreateLogisticsLink.tsx
│   │   ├── CreateContractLink.tsx
│   │   ├── Microsite.tsx
│   │   ├── Services.tsx
│   │   └── Payment*.tsx (Payment flow pages)
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   └── ServiceCard.tsx
│   ├── hooks/
│   │   └── useSupabase.ts
│   ├── lib/
│   │   ├── countries.ts
│   │   └── utils.ts
│   └── integrations/
│       └── supabase/
├── public/
│   ├── _redirects
│   └── og-*.jpg (Open Graph images)
├── netlify/
│   └── functions/
├── netlify.toml
└── package.json
```

## 🚀 Deployment to Netlify

### Prerequisites
- Netlify account
- Supabase project with the required tables

### Steps

1. **Connect Repository:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select `you112ef/gulf-services-platform`

2. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - These are already configured in `netlify.toml`

3. **Environment Variables:**
   Add these in Netlify dashboard (Site settings → Environment variables):
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Deploy:**
   - Click "Deploy site"
   - Your site will be live in minutes!

### Netlify Configuration

The project includes:
- ✅ `netlify.toml` with proper redirects for SPA routing
- ✅ `_redirects` file for fallback routing
- ✅ Security headers configured
- ✅ Serverless functions for meta tags
- ✅ Form handling support

## 🗄️ Database Schema

Required Supabase tables:
- `chalets` - Chalet listings
- `shipping_carriers` - Shipping service providers
- `links` - Generated payment/service links
- `payments` - Payment transactions

See `/workspace/supabase/migrations/` for SQL schema.

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Features

- ✅ **Fully RTL (Right-to-Left)** support for Arabic
- ✅ **Multi-currency** support (SAR, AED, KWD, QAR, OMR, BHD)
- ✅ **Responsive design** - Mobile, tablet, and desktop
- ✅ **Dark mode ready** (via CSS variables)
- ✅ **SEO optimized** with meta tags
- ✅ **Payment flow** with OTP verification
- ✅ **Shareable links** for each service
- ✅ **Copy to clipboard** functionality
- ✅ **Toast notifications** for user feedback

## 🔐 Security

- HTTPS enforced
- X-Frame-Options header
- Content Security Policy
- XSS Protection
- OTP verification for payments
- Secure signature generation for links

## 📱 Progressive Web App (PWA)

- Service Worker configured
- Manifest.json included
- Offline capabilities
- Install prompts

## 🤝 Contributing

This is a unified platform for GCC services. To contribute:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

This project is ready for commercial use in the GCC region.

## 📞 Support

For issues or questions, please open an issue on GitHub:
https://github.com/you112ef/gulf-services-platform/issues

## 🎯 Roadmap

- [ ] Add more payment gateways
- [ ] SMS notifications
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] Multi-language support (beyond Arabic/English)
- [ ] Mobile apps (React Native)

## ⚡ Quick Links

- **Repository:** https://github.com/you112ef/gulf-services-platform
- **Current Branch:** `cursor/create-remaining-services-29a1`
- **Main Branch:** `main`

---

Built with ❤️ for the GCC region
