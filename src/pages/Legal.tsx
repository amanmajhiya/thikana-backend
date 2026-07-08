import { useParams, useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Shield,
  FileText,
  HelpCircle,
  AlertTriangle,
  Info,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  ExternalLink,
  Building2,
  Users,
  Landmark,
} from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

/* ────────────────────── legal page configs ────────────────────── */

interface Section {
  title: string;
  content: string[];
}

interface LegalPageConfig {
  titleKey: string;
  icon: typeof Shield;
  iconColor: string;
  iconBg: string;
  sections: Section[];
}

const legalPages: Record<string, LegalPageConfig> = {
  privacy: {
    titleKey: 'privacyPolicy',
    icon: FileText,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    sections: [
      {
        title: '1. Introduction',
        content: [
          'THIKANA is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.',
          'By accessing or using THIKANA, you consent to the practices described in this policy.',
        ],
      },
      {
        title: '2. Information We Collect',
        content: [
          'Personal Information: Name, mobile number, email address, and profile photo (if provided via Google login).',
          'Location Data: City and locality information to show relevant property listings in your area.',
          'Property Details: Information about properties you list including photos, address, price, and amenities.',
          'Usage Data: How you interact with the platform, search queries, and pages visited.',
        ],
      },
      {
        title: '3. How We Use Your Information',
        content: [
          'To match property owners with potential buyers/renters.',
          'To display relevant property listings based on your location and preferences.',
          'To enable communication between users through our in-app chat system.',
          'To improve our services and user experience.',
          'To send important notifications about your listings or account.',
        ],
      },
      {
        title: '4. Information Sharing',
        content: [
          'We do NOT sell your personal data to any third parties.',
          'Your contact information is only shared with another user when you initiate contact (e.g., call or chat).',
          'Property listing information is publicly visible on the platform.',
          'We may share data with service providers who assist in platform operations (subject to confidentiality).',
        ],
      },
      {
        title: '5. Data Security',
        content: [
          'We use industry-standard encryption to protect your data during transmission.',
          'Your password (if any) is stored in encrypted form.',
          'We regularly review our security practices to ensure data protection.',
        ],
      },
      {
        title: '6. Your Rights',
        content: [
          'You can access and update your profile information at any time.',
          'You can request deletion of your account and associated data.',
          'You can opt-out of non-essential communications.',
        ],
      },
      {
        title: '7. Cookies & Tracking',
        content: [
          'We use minimal cookies to maintain your session and language preferences.',
          'Analytics tools may be used to understand platform usage patterns (anonymized data only).',
        ],
      },
      {
        title: '8. Contact Us',
        content: [
          'If you have any questions about this Privacy Policy, please contact us at support@thikana.in.',
        ],
      },
    ],
  },

  terms: {
    titleKey: 'termsConditions',
    icon: FileText,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-50',
    sections: [
      {
        title: '1. Acceptance of Terms',
        content: [
          'By accessing or using THIKANA, you agree to be bound by these Terms & Conditions.',
          'If you do not agree to these terms, please do not use the platform.',
        ],
      },
      {
        title: '2. User Eligibility',
        content: [
          'You must be at least 18 years old to use THIKANA.',
          'You must provide accurate and truthful information during registration.',
          'You are responsible for maintaining the confidentiality of your account.',
        ],
      },
      {
        title: '3. Property Listings',
        content: [
          'All property information provided must be accurate and truthful.',
          'Broker listings are strictly prohibited. THIKANA is for direct owner-to-seeker connections only.',
          'You must have the legal right to list any property you post.',
          'Listings must include genuine photos of the actual property.',
        ],
      },
      {
        title: '4. Prohibited Content',
        content: [
          'Fake or misleading property listings.',
          'Discriminatory content based on religion, caste, gender, or nationality.',
          'Illegal activities or promotion of illegal services.',
          'Spam, scams, or fraudulent content.',
          'Content that infringes on intellectual property rights.',
        ],
      },
      {
        title: '5. User Conduct',
        content: [
          'Users must communicate respectfully with each other.',
          'Harassment, abuse, or threatening behavior will not be tolerated.',
          'Users must not attempt to bypass the platform\'s communication systems.',
          'Any form of data scraping or automated access is prohibited.',
        ],
      },
      {
        title: '6. Liability & Disclaimers',
        content: [
          'THIKANA is a platform connecting users and is not a party to any transaction.',
          'We do not guarantee the accuracy of any listing information.',
          'Users are solely responsible for verifying property details before any transaction.',
          'We are not liable for any disputes between users.',
        ],
      },
      {
        title: '7. Termination',
        content: [
          'We reserve the right to suspend or terminate accounts that violate these terms.',
          'Users may delete their account at any time through the profile settings.',
          'Upon termination, all listings associated with the account will be removed.',
        ],
      },
      {
        title: '8. Governing Law',
        content: [
          'These terms are governed by the laws of India.',
          'Any disputes shall be subject to the exclusive jurisdiction of courts in Lucknow, Uttar Pradesh.',
        ],
      },
    ],
  },

  disclaimer: {
    titleKey: 'disclaimer',
    icon: AlertTriangle,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    sections: [
      {
        title: '1. Platform Role',
        content: [
          'THIKANA is a property listing platform that connects property owners directly with seekers.',
          'We are NOT a real estate agency, broker, or intermediary.',
        ],
      },
      {
        title: '2. Verification',
        content: [
          'Properties marked "Verified" have been reviewed by our team.',
          'Other listings are user-submitted and posted as-is.',
          'We do not independently verify all property details.',
        ],
      },
      {
        title: '3. Information Accuracy',
        content: [
          'THIKANA property information ko verify karne ka prayas karta hai, lekin final deal se pehle user khud property, owner, documents aur payment verify kare.',
          'Property details, prices, and availability are provided by users and may change without notice.',
        ],
      },
      {
        title: '4. Transactions',
        content: [
          'All dealings, negotiations, and transactions are solely between users.',
          'THIKANA does not handle payments, deposits, or agreements between parties.',
        ],
      },
      {
        title: '5. No Brokerage',
        content: [
          'THIKANA does not charge any brokerage or commission for property listings.',
          'Our platform is free to use for listing and searching properties.',
        ],
      },
      {
        title: '6. Due Diligence',
        content: [
          'Users must independently verify property ownership, legal documents, and physical condition.',
          'We recommend visiting the property in person before any financial commitment.',
          'Always obtain proper legal advice before signing any agreements.',
        ],
      },
    ],
  },

  safety: {
    titleKey: 'safetyGuidelines',
    icon: Shield,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    sections: [
      {
        title: '1. Before Visiting',
        content: [
          'Verify property details through photos, videos, and virtual tours when possible.',
          'Share the property address and owner details with a family member or friend.',
          'Research the locality, nearby amenities, and safety of the area.',
          'Check property documents online where available.',
        ],
      },
      {
        title: '2. During Visit',
        content: [
          'Always visit during daylight hours.',
          'Bring a friend or family member with you.',
          'Meet in a public place first if possible.',
          'Trust your instincts — if something feels wrong, leave immediately.',
        ],
      },
      {
        title: '3. Financial Safety',
        content: [
          'NEVER pay any advance before physically viewing the property.',
          'Do not pay cash — use traceable payment methods.',
          'Verify ownership documents before paying any token amount.',
          'Get a proper receipt for every payment made.',
          'Be cautious of deals that seem too good to be true.',
        ],
      },
      {
        title: '4. Communication Safety',
        content: [
          'Use THIKANA\'s in-app chat for initial communication.',
          'Avoid sharing personal information like Aadhaar, PAN, or bank details prematurely.',
          'Do not share OTPs or passwords with anyone.',
          'Report suspicious messages or behavior immediately.',
        ],
      },
      {
        title: '5. Report Suspicious Activity',
        content: [
          'Use the "Report" feature on any listing you find suspicious.',
          'Report users who ask for advance payments or personal information.',
          'Contact our support team if you encounter any fraudulent activity.',
        ],
      },
      {
        title: '6. Emergency Contacts',
        content: [
          'Keep local emergency numbers handy: Police (100), Fire (101), Ambulance (102).',
          'Save the local police station number for the area you are visiting.',
          'Share your live location with a trusted contact during property visits.',
        ],
      },
    ],
  },

  support: {
    titleKey: 'contactSupport',
    icon: HelpCircle,
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-50',
    sections: [
      {
        title: 'Contact Information',
        content: [
          'Email: support@thikana.in',
          'Phone: +91-522-XXXXXXX',
          'Address: THIKANA Technologies Pvt. Ltd., Gomti Nagar, Lucknow, Uttar Pradesh - 226010',
          'Available: Monday to Saturday, 9:00 AM - 6:00 PM IST',
        ],
      },
    ],
  },

  about: {
    titleKey: 'about',
    icon: Info,
    iconColor: 'text-teal-600',
    iconBg: 'bg-teal-50',
    sections: [
      {
        title: 'Our Story',
        content: [
          'THIKANA was founded with a simple mission — to make property search easy, direct, and broker-free for everyone in India.',
          'Our name "THIKANA" means a reliable address — a place you can trust.',
        ],
      },
      {
        title: 'Our Mission',
        content: [
          'To democratize property discovery by connecting owners directly with seekers.',
          'To eliminate brokerage costs and make property transactions transparent.',
          'To provide a trusted platform where every listing matters.',
        ],
      },
      {
        title: 'Our Vision',
        content: [
          'To become India\'s most trusted property platform.',
          'To cover every city, town, and village with reliable property listings.',
          'To empower millions of Indians to find their perfect home or investment.',
        ],
      },
      {
        title: 'How It Works',
        content: [
          '1. List your property for free — Add photos, details, and set your price.',
          '2. Connect directly — Interested seekers contact you directly via chat or call.',
          '3. No broker, no commission — Deal directly and save on brokerage fees.',
        ],
      },
      {
        title: 'Why Choose THIKANA',
        content: [
          '100% Free Listings — No charges for posting your property.',
          'Direct Owner Contact — No brokers or intermediaries.',
          'Verified Listings — Our team reviews listings for authenticity.',
          'Multi-language Support — Available in English, Hindi, and Hinglish.',
          'Secure Chat — Communicate safely through our in-app messaging.',
        ],
      },
    ],
  },
};

/* ────────────────────── faq data for support page ────────────────────── */

const supportFaqs = [
  {
    question: 'How do I list my property?',
    answer: 'Tap the "+" button in the bottom navigation, fill in your property details, add at least 3 photos, and submit. Your listing will be reviewed and live within 24 hours.',
  },
  {
    question: 'Why was my listing rejected?',
    answer: 'Listings may be rejected due to: insufficient photos, incorrect information, broker listings, duplicate posts, or inappropriate content. You will receive a reason and can resubmit after corrections.',
  },
  {
    question: 'How do I contact a property owner?',
    answer: 'Go to any property detail page and tap "Contact" or "Chat" button. You can call directly or use our in-app chat feature to communicate with the owner.',
  },
  {
    question: 'How do I delete my account?',
    answer: 'Go to Profile > Settings > Delete Account. Please note that this action is irreversible and all your listings will be removed.',
  },
  {
    question: 'How do I report a fake listing?',
    answer: 'Open the property detail page, tap the "Report" button, select the reason, and submit. Our team will review and take appropriate action within 48 hours.',
  },
];

/* ────────────────────── quick links ────────────────────── */

const quickLinks = [
  { key: 'privacy', labelKey: 'privacyPolicy', icon: FileText },
  { key: 'terms', labelKey: 'termsConditions', icon: FileText },
  { key: 'disclaimer', labelKey: 'disclaimer', icon: AlertTriangle },
  { key: 'safety', labelKey: 'safetyGuidelines', icon: Shield },
  { key: 'support', labelKey: 'contactSupport', icon: HelpCircle },
  { key: 'about', labelKey: 'about', icon: Info },
];

/* ────────────────────── animation variants ────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

/* ────────────────────── main component ────────────────────── */

export default function Legal() {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const config = page && legalPages[page] ? legalPages[page] : legalPages.terms;
  const Icon = config.icon;

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white px-4 py-3 border-b border-gray-100 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-gray-900 truncate">
          {t(config.titleKey as 'privacyPolicy' | 'termsConditions' | 'disclaimer' | 'safetyGuidelines' | 'contactSupport' | 'about')}
        </h1>
      </div>

      <ScrollArea className="h-[calc(100dvh-56px-64px)]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl mx-auto px-4 py-6 pb-24 sm:px-6"
        >
          {/* Page Title */}
          <motion.div
            variants={sectionVariants}
            className="flex items-center gap-4 mb-8"
          >
            <div className={`w-14 h-14 rounded-2xl ${config.iconBg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-7 h-7 ${config.iconColor}`} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t(config.titleKey as 'privacyPolicy' | 'termsConditions' | 'disclaimer' | 'safetyGuidelines' | 'contactSupport' | 'about')}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Last updated: January 2025
              </p>
            </div>
          </motion.div>

          {/* Content Sections */}
          {config.sections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={sectionVariants}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.content.map((paragraph, pIdx) => (
                  <div key={pIdx} className="flex gap-3">
                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                    <p className="text-[15px] text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  </div>
                ))}
              </div>
              {idx < config.sections.length - 1 && (
                <Separator className="mt-8 bg-gray-100" />
              )}
            </motion.div>
          ))}

          {/* Support Page: Contact Cards + FAQ */}
          {page === 'support' && (
            <motion.div variants={sectionVariants}>
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <a
                  href="mailto:support@thikana.in"
                  className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                >
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm font-medium text-blue-700">support@thikana.in</p>
                  </div>
                </a>
                <a
                  href="tel:+91522XXXXXXX"
                  className="flex items-center gap-3 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                >
                  <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm font-medium text-green-700">+91-522-XXXXXXX</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm font-medium text-amber-700">Lucknow, UP</p>
                  </div>
                </div>
              </div>

              <Separator className="mb-8 bg-gray-100" />

              {/* FAQ Accordion */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {supportFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm font-medium text-gray-800 pr-4">
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openFaq === idx ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === idx ? 'auto' : 0,
                        opacity: openFaq === idx ? 1 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* About Page: Stats */}
          {page === 'about' && (
            <motion.div variants={sectionVariants} className="mb-8">
              <Separator className="mb-8 bg-gray-100" />
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <Building2 className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-xl font-bold text-gray-900">10K+</p>
                  <p className="text-xs text-gray-500">Properties Listed</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <Landmark className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-xl font-bold text-gray-900">50+</p>
                  <p className="text-xs text-gray-500">Cities Covered</p>
                </div>
                <div className="text-center p-4 bg-violet-50 rounded-xl">
                  <Users className="w-6 h-6 text-violet-600 mx-auto mb-2" />
                  <p className="text-xl font-bold text-gray-900">25K+</p>
                  <p className="text-xs text-gray-500">Happy Users</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Footer CTA */}
          <motion.div
            variants={sectionVariants}
            className="mt-8 p-5 bg-[#F9FAFB] rounded-xl border border-gray-100"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  Need Help?
                </h4>
                <p className="text-sm text-gray-500 mb-3">
                  Our support team is here to assist you.
                </p>
                <button
                  onClick={() => navigate('/legal/support')}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                >
                  {t('contactSupport')}
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={sectionVariants} className="mt-8 mb-12">
            <h4 className="text-sm font-semibold text-gray-700 mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {quickLinks
                .filter((link) => link.key !== page)
                .map((link) => (
                  <button
                    key={link.key}
                    onClick={() => navigate(`/legal/${link.key}`)}
                    className="flex items-center gap-2 p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all text-left"
                  >
                    <link.icon className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {t(link.labelKey as 'privacyPolicy' | 'termsConditions' | 'disclaimer' | 'safetyGuidelines' | 'contactSupport' | 'about')}
                    </span>
                  </button>
                ))}
            </div>
          </motion.div>
        </motion.div>
      </ScrollArea>
    </div>
  );
}
