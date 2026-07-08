import { useNavigate } from 'react-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, Home, Shield, Users, Globe, Target, Heart, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

export default function AboutPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-sm text-gray-600 leading-relaxed space-y-3">{children}</div>
    </section>
  );

  const SubSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-4">
      <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="text-sm text-gray-600 leading-relaxed space-y-2">{children}</div>
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-base font-bold text-gray-900">{t('about')}</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Home className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">THIKANA</h1>
          <p className="text-lg text-emerald-700 font-semibold mb-2">ठिकाना</p>
          <p className="text-base text-gray-700 font-medium italic">
            &ldquo;घर हो या जमीन &mdash; भरोसे का ठिकाना&rdquo;
          </p>
          <p className="text-sm text-gray-500 mt-2">{t('taglineEnglish')}</p>
        </div>

        {/* 1. Our Story */}
        <Section title="1. Our Story">
          <p>
            <strong>THIKANA (ठिकाना)</strong> was born from a simple yet powerful observation: finding or listing a property in 
            India shouldn&rsquo;t require paying hefty brokerage fees to intermediaries who add little value to the transaction. 
            In a country where real estate is not just an asset but a deeply emotional journey &mdash; where a home represents 
            dreams, security, and legacy &mdash; the process of buying, selling, or renting property remained frustratingly 
            opaque and expensive.
          </p>
          <p>
            Founded in <strong>Lucknow, Uttar Pradesh</strong>, THIKANA was created with a singular mission: to build India&rsquo;s 
            most trusted, broker-free property platform that directly connects property owners with genuine buyers and renters. 
            We believe that when owners and seekers communicate directly, transactions become more transparent, efficient, and 
            affordable for everyone involved.
          </p>
          <p>
            The word <strong>&ldquo;ठिकाना&rdquo;</strong> (Thikana) in Hindi means &ldquo;a destination&rdquo; or &ldquo;a place 
            one can call their own.&rdquo; It captures the essence of what we strive to provide &mdash; not just a listing platform, 
            but a trusted destination where every Indian can find their perfect home, plot of land, or commercial space without 
            intermediaries eating into their hard-earned money.
          </p>

          <SubSection title="1.1 Our Mission">
            <p>
              To democratize property transactions in India by eliminating brokers, reducing costs, and creating a transparent, 
              technology-driven marketplace where property owners and seekers can connect directly, communicate freely, and transact 
              confidently.
            </p>
          </SubSection>

          <SubSection title="1.2 Our Vision">
            <p>
              To become India&rsquo;s most trusted property platform, serving every district and town from Lucknow to Ludhiana, 
              from Kannauj to Kanyakumari. We envision a future where every property transaction in India is broker-free, 
              cost-effective, and powered by cutting-edge technology that makes the process seamless for every Indian, regardless 
              of their technical expertise or location.
            </p>
          </SubSection>

          <SubSection title="1.3 Our Journey">
          <p>
            THIKANA was conceptualized when our founder, Devendra Tiwari, witnessed firsthand the struggles that everyday Indians 
            face when dealing with property transactions. From unresponsive brokers who demand exorbitant fees to misleading 
            listings that waste precious time, the property market was ripe for disruption. Starting with Lucknow &mdash; the 
            heart of Uttar Pradesh and one of India&rsquo;s fastest-growing cities &mdash; we set out to build a platform that 
            puts power back in the hands of property owners and seekers.
          </p>
          <p>
            What started as a local solution has now grown into a platform serving thousands of users across multiple cities. 
            Our journey has been guided by feedback from real users &mdash; the property owner in Gomti Nagar trying to sell 
            their family home, the young professional looking for their first rental in Indira Nagar, the farmer seeking to 
            sell agricultural land in the outskirts. Every feature we build is inspired by the real needs of real Indians.
          </p>
          </SubSection>
        </Section>

        {/* 2. About the Founder */}
        <Section title="2. About the Founder">
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                <Users className="w-7 h-7 text-emerald-700" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-base">Devendra Tiwari</p>
                <p className="text-sm text-gray-600">Founder &amp; Director</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Devendra Tiwari is the visionary founder behind THIKANA. With deep roots in Lucknow and a passion for leveraging 
              technology to solve real-world problems, Devendra identified the inefficiencies and unfair practices prevalent in 
              India&rsquo;s property market. His mission was clear: create a platform that empowers Indians to handle property 
              transactions independently, without relying on expensive intermediaries.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">
              Under Devendra&rsquo;s leadership, THIKANA has grown from an idea into a thriving platform that serves thousands 
              of users. His commitment to transparency, customer-centricity, and technological innovation drives every aspect of 
              the platform&rsquo;s development. Devendra believes that every Indian deserves a fair, transparent, and affordable 
              way to buy, sell, or rent property &mdash; and he is dedicated to making that vision a reality through THIKANA.
            </p>
          </div>
        </Section>

        {/* 3. Company Information */}
        <Section title="3. Company Information">
          <p>
            THIKANA is owned and operated by <strong>RAMANOVA RENEWAL ENERGY PRIVATE LIMITED</strong>, a company incorporated 
            under the Companies Act, 2013 in India. While our company name reflects our broader commitment to sustainable and 
            innovative solutions, THIKANA represents our dedicated focus on transforming India&rsquo;s real estate landscape.
          </p>

          <div className="bg-gray-50 rounded-xl p-4 space-y-3 mt-3">
            <div>
              <p className="font-semibold text-gray-800">Legal Name</p>
              <p className="text-gray-600">RAMANOVA RENEWAL ENERGY PRIVATE LIMITED</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Brand Name</p>
              <p className="text-gray-600">THIKANA (ठिकाना)</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Registered Office</p>
              <p className="text-gray-600 flex items-center gap-1">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Lucknow, Uttar Pradesh, India
              </p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Incorporation</p>
              <p className="text-gray-600">Under the Companies Act, 2013, Government of India</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Founder &amp; Director</p>
              <p className="text-gray-600">Mr. Devendra Tiwari</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Nature of Business</p>
              <p className="text-gray-600">Technology Platform / Real Estate Services (Broker-Free)</p>
            </div>
          </div>

          <p className="mt-4">
            RAMANOVA RENEWAL ENERGY PRIVATE LIMITED is committed to compliance with all applicable Indian laws, including the 
            Information Technology Act, 2000, the Digital Personal Data Protection Act, 2023, the Consumer Protection Act, 2019, 
            and the Real Estate (Regulation and Development) Act, 2016. We operate as an intermediary technology platform and 
            do not engage in brokerage services.
          </p>
        </Section>

        {/* 4. Why THIKANA */}
        <Section title="4. Why THIKANA">
          <p>
            In a market crowded with property portals, THIKANA stands apart for several reasons. We are not just another listing 
            website &mdash; we are a movement towards fair, transparent, and broker-free property transactions.
          </p>

          <SubSection title="4.1 Broker-Free, Always">
            <p>
              Unlike traditional property portals that work hand-in-hand with brokers and charge them for premium placement, 
              THIKANA is fundamentally broker-free. We do not allow brokers to list properties or contact property seekers. 
              This ensures that every enquiry you receive is from a genuine buyer or renter, and every property you view is 
              listed by the actual owner. This saves you from paying the typical 1-2% brokerage fee on property transactions, 
              which can amount to lakhs of rupees.
            </p>
          </SubSection>

          <SubSection title="4.2 Verified Listings">
            <p>
              We take verification seriously. Our verification process includes phone verification, document verification (voluntary), 
              and periodic quality checks. Listings with the Verified Owner badge indicate that the owner has completed our 
              verification process. This dramatically reduces the chances of encountering fake listings or fraudulent property owners.
            </p>
          </SubSection>

          <SubSection title="4.3 Local Focus, National Ambition">
            <p>
              We started in Lucknow because we believe in understanding the local market deeply before expanding. Our local focus 
              means that we understand the neighbourhoods, the pricing dynamics, and the unique characteristics of each locality. 
              This local expertise, combined with our ambition to serve all of India, ensures that you get the best of both 
              worlds &mdash; local knowledge with national reach.
            </p>
          </SubSection>

          <SubSection title="4.4 Affordable Pricing">
            <p>
              Our pricing model is designed to be accessible to every Indian. The Free Plan allows anyone to list properties 
              without any cost. Our paid plans (starting at just ₹49) are significantly more affordable than the competition, 
              ensuring that even individual property owners can get premium visibility without breaking the bank.
            </p>
          </SubSection>

          <SubSection title="4.5 Multi-Language Support">
            <p>
              We understand that India is a diverse country with multiple languages. That&rsquo;s why THIKANA supports 
              <strong> English, Hindi, and Hinglish</strong>, making the platform accessible to users across linguistic 
              backgrounds. Whether you are comfortable in English or prefer to browse in Hindi, THIKANA has you covered.
            </p>
          </SubSection>

          <SubSection title="4.6 Direct Communication">
            <p>
              Our in-app chat and calling features allow property owners and seekers to communicate directly without sharing 
              personal contact information until they choose to. This protects your privacy while ensuring seamless communication 
              throughout the property transaction process.
            </p>
          </SubSection>
        </Section>

        {/* 5. Our Features */}
        <Section title="5. Our Features">
          <p>
            THIKANA offers a comprehensive suite of features designed to make property listing, discovery, and communication 
            as seamless as possible:
          </p>

          <SubSection title="5.1 15+ Property Types">
            <p>
              We support a wide range of property types to cater to diverse needs: <strong>Residential Apartment, Independent 
              House/Villa, Residential Plot/Land, Commercial Office Space, Commercial Shop, Commercial Showroom, Warehouse/Godown, 
              Industrial Property, Agricultural Land, Farm House, Penthouse, Studio Apartment, Builder Floor, Co-working Space, 
              and Hostel/PG Accommodation</strong>. No matter what type of property you are looking for or listing, THIKANA has 
              a category for it.
            </p>
          </SubSection>

          <SubSection title="5.2 Three Language Support">
            <p>
              Our platform is available in <strong>English, Hindi (हिन्दी), and Hinglish</strong> &mdash; a unique blend of 
              Hindi and English that resonates with millions of Indians. Users can switch languages seamlessly, and all property 
              listings, interface elements, and communications adapt to their preferred language.
            </p>
          </SubSection>

          <SubSection title="5.3 Flexible Premium Plans">
            <p>
              From the free plan for casual users to the comprehensive Premium Owner monthly subscription for professional 
              landlords, our pricing tiers ensure that there&rsquo;s a plan for everyone. Features include boosted visibility, 
              verified badges, video uploads, analytics dashboards, and priority support.
            </p>
          </SubSection>

          <SubSection title="5.4 Smart Search &amp; Filters">
            <p>
              Our powerful search engine allows property seekers to find their perfect match using filters for location, property 
              type, price range, number of bedrooms, furnishing status, and more. The map-based search helps you explore properties 
              in specific neighbourhoods.
            </p>
          </SubSection>

          <SubSection title="5.5 In-App Communication">
            <p>
              Connect with property owners or seekers directly through our secure in-app chat and calling system. No need to 
              share your personal phone number until you are comfortable. All communications are logged for safety and dispute 
              resolution.
            </p>
          </SubSection>

          <SubSection title="5.6 Property Verification">
            <p>
              Our multi-step verification process ensures that listings are genuine and owners are who they claim to be. Verified 
              listings receive higher visibility and a trusted badge that sets them apart.
            </p>
          </SubSection>

          <SubSection title="5.7 Save &amp; Compare">
            <p>
              Property seekers can save favourite listings and compare them side-by-side. This feature helps you make informed 
              decisions by evaluating multiple properties based on price, location, amenities, and other factors.
            </p>
          </SubSection>
        </Section>

        {/* 6. How It Works */}
        <Section title="6. How It Works">
          <SubSection title="6.1 For Property Owners (Sellers/Landlords)">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Download &amp; Register:</strong> Download the THIKANA app, register with your mobile number, and complete 
                your profile.
              </li>
              <li>
                <strong>Create Your Listing:</strong> Tap &ldquo;Add Property&rdquo; and fill in details including property type, 
                location, size, price, photos, and description. The more details you provide, the more enquiries you will receive.
              </li>
              <li>
                <strong>Get Verified:</strong> Complete the verification process to earn the Verified Owner badge. Verified listings 
                receive up to 5x more views and enquiries.
              </li>
              <li>
                <strong>Receive Enquiries:</strong> Interested buyers or renters will contact you directly through the app. Respond 
                promptly for best results.
              </li>
              <li>
                <strong>Close the Deal:</strong> Schedule visits, negotiate terms, and complete the transaction directly &mdash; 
                with zero brokerage fees.
              </li>
            </ol>
          </SubSection>

          <SubSection title="6.2 For Property Seekers (Buyers/Renters)">
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Download &amp; Explore:</strong> Download the THIKANA app, set your preferred location, and start browsing 
                thousands of broker-free listings.
              </li>
              <li>
                <strong>Search &amp; Filter:</strong> Use our smart search and filters to find properties that match your requirements 
                &mdash; budget, property type, location, amenities, and more.
              </li>
              <li>
                <strong>Save Favourites:</strong> Shortlist properties you like by saving them for easy comparison later.
              </li>
              <li>
                <strong>Contact Owners Directly:</strong> Reach out to property owners through our in-app chat or call feature. 
                No brokers, no middlemen.
              </li>
              <li>
                <strong>Visit &amp; Decide:</strong> Schedule property visits, evaluate your options, and make an informed decision.
              </li>
              <li>
                <strong>Seal the Deal:</strong> Negotiate directly with the owner and complete your property transaction without 
                paying any brokerage.
              </li>
            </ol>
          </SubSection>

          <SubSection title="6.3 For Renters (Tenants)">
            <p>
              Finding a rental property on THIKANA is quick and easy. Search for rental properties in your desired locality, 
              filter by monthly rent, deposit amount, furnishing status, and tenant preferences. Contact landlords directly, 
              schedule visits, and move into your new home without paying broker fees that typically amount to one month&rsquo;s rent.
            </p>
          </SubSection>
        </Section>

        {/* 7. Our Values */}
        <Section title="7. Our Values">
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Trust &amp; Transparency</p>
                <p className="text-sm text-gray-600">
                  We believe that trust is the foundation of every property transaction. We are committed to transparency in 
                  everything we do &mdash; from clear pricing with no hidden fees to honest communication about what our platform 
                  can and cannot do.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Customer First</p>
                <p className="text-sm text-gray-600">
                  Every decision we make starts with one question: &ldquo;How does this benefit our users?&rdquo; From our 
                  affordable pricing to our multi-language support, every feature is designed with the Indian property owner 
                  and seeker in mind.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Innovation</p>
                <p className="text-sm text-gray-600">
                  We constantly explore new technologies and approaches to make property transactions simpler, faster, and more 
                  secure. From AI-powered property recommendations to blockchain-based verification, we are always looking ahead.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Community</p>
                <p className="text-sm text-gray-600">
                  We are building more than a platform &mdash; we are building a community of property owners and seekers who 
                  believe in fair, direct transactions. We celebrate the success stories of our users and continuously work to 
                  create a supportive ecosystem.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Inclusivity</p>
                <p className="text-sm text-gray-600">
                  We believe that every Indian, regardless of their location, language, or technical expertise, deserves access 
                  to a fair property marketplace. Our multi-language support, simple interface, and affordable pricing reflect 
                  this commitment.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* 8. Future Roadmap */}
        <Section title="8. Our Future Roadmap">
          <p>
            We are constantly evolving to serve you better. Here&rsquo;s a glimpse of what&rsquo;s coming to THIKANA in the 
            near future:
          </p>

          <SubSection title="8.1 Services Integration">
            <p>
              We are building a comprehensive ecosystem of property-related services directly within the THIKANA app. Soon, you 
              will be able to access <strong>home loans, legal documentation services, property valuation, interior design 
              consultations, packers and movers, home insurance, and property management services</strong> &mdash; all from one 
              convenient platform. These services will be provided by verified partners, ensuring quality and reliability.
            </p>
          </SubSection>

          <SubSection title="8.2 AI-Powered Property Matching">
            <p>
              Our upcoming AI-powered recommendation engine will analyze your search patterns, preferences, and behaviour to 
              suggest properties that perfectly match your requirements. For property owners, AI will help identify the most 
              likely buyers or tenants for your property, reducing the time to close a deal.
            </p>
          </SubSection>

          <SubSection title="8.3 Enhanced Verification Badges">
            <p>
              We are introducing multiple tiers of verification including <strong>Document Verified, Video Verified, 
              Physically Verified, and Premium Verified</strong> badges. Each tier represents a higher level of trust, giving 
              property seekers greater confidence in their choices.
            </p>
          </SubSection>

          <SubSection title="8.4 Virtual Property Tours">
            <p>
              360-degree virtual tours and augmented reality (AR) features will allow property seekers to experience properties 
              remotely before scheduling a physical visit. This will save time for both property owners and seekers.
            </p>
          </SubSection>

          <SubSection title="8.5 Pan-India Expansion">
            <p>
              While we started in Lucknow, our goal is to serve every district and major town in India. We are actively working 
              on expanding our coverage to all major cities in Uttar Pradesh and beyond, bringing the THIKANA experience to 
              millions more Indians.
            </p>
          </SubSection>

          <SubSection title="8.6 Community Features">
            <p>
              We plan to introduce neighbourhood reviews, locality insights, and community forums where users can share 
              experiences about localities, building societies, and property market trends. This will help property seekers 
              make more informed decisions about where to live.
            </p>
          </SubSection>

          <SubSection title="8.7 Smart Contracts &amp; Digital Documentation">
            <p>
              In the long term, we are exploring the use of smart contracts and digital documentation to streamline the property 
              transaction process. This includes digital rent agreements, e-stamping, and online registration assistance &mdash; 
              making the entire process paperless and hassle-free.
            </p>
          </SubSection>
        </Section>

        {/* 9. Contact Information */}
        <Section title="9. Contact Us">
          <p>
            We would love to hear from you! Whether you have a question, feedback, partnership inquiry, or just want to say hello, 
            our team is here to help.
          </p>

          <div className="bg-gray-50 rounded-xl p-4 space-y-3 mt-3">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Support Phone</p>
                <p className="text-gray-600 text-sm">Available through in-app calling</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Email</p>
                <p className="text-gray-600 text-sm">support@thikana.app</p>
                <p className="text-gray-600 text-sm">contact@thikana.app</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Address</p>
                <p className="text-gray-600 text-sm">RAMANOVA RENEWAL ENERGY PRIVATE LIMITED</p>
                <p className="text-gray-600 text-sm">Lucknow, Uttar Pradesh, India</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Website</p>
                <p className="text-gray-600 text-sm">www.thikana.app</p>
              </div>
            </div>
          </div>

          <p className="mt-4">
            Our support team is available Monday to Friday, 10:00 AM to 6:00 PM IST. We typically respond to all queries within 
            24 hours. For urgent matters, please use the in-app support feature for the fastest response.
          </p>
        </Section>

        {/* 10. Social Media Links */}
        <Section title="10. Connect With Us">
          <p>
            Follow us on social media to stay updated with the latest property trends, platform updates, success stories, and 
            exclusive offers:
          </p>

          <div className="grid grid-cols-2 gap-3 mt-3">
            <a 
              href="#" 
              className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 hover:bg-emerald-50 transition-colors"
              onClick={(e) => { e.preventDefault(); }}
            >
              <ExternalLink className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-800">Facebook</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 hover:bg-emerald-50 transition-colors"
              onClick={(e) => { e.preventDefault(); }}
            >
              <ExternalLink className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-800">Instagram</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 hover:bg-emerald-50 transition-colors"
              onClick={(e) => { e.preventDefault(); }}
            >
              <ExternalLink className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-800">Twitter / X</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 hover:bg-emerald-50 transition-colors"
              onClick={(e) => { e.preventDefault(); }}
            >
              <ExternalLink className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-800">YouTube</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 hover:bg-emerald-50 transition-colors"
              onClick={(e) => { e.preventDefault(); }}
            >
              <ExternalLink className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-800">LinkedIn</span>
            </a>
            <a 
              href="#" 
              className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 hover:bg-emerald-50 transition-colors"
              onClick={(e) => { e.preventDefault(); }}
            >
              <ExternalLink className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-800">WhatsApp Channel</span>
            </a>
          </div>

          <p className="mt-4">
            Join our growing community of property owners and seekers. Share your THIKANA success stories with us using the 
            hashtag <strong>#ThikanaSuccess</strong> and get featured on our social media channels!
          </p>
        </Section>

        {/* 11. Tagline */}
        <Section title={t('ourPromise')}>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
            <p className="text-xl font-bold text-emerald-800 mb-2">
              &ldquo;घर हो या जमीन &mdash; भरोसे का ठिकाना&rdquo;
            </p>
            <p className="text-base text-emerald-700 font-medium">
              Home or Land &mdash; A Trusted Destination
            </p>
            <p className="text-sm text-gray-600 mt-3">
              Whether you are searching for your dream home, a plot of land to build your future, a commercial space for your 
              business, or looking to sell or rent your property &mdash; THIKANA is your trusted partner in every property 
              journey. No brokers. No hidden fees. Just direct connections, transparent dealings, and a platform that puts 
              <strong> you </strong> first.
            </p>
          </div>
        </Section>

        {/* Closing */}
        <section className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            {t('madeWithCareIn')}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            &copy; 2025 RAMANOVA RENEWAL ENERGY PRIVATE LIMITED. {t('allRightsReserved')}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {t('registeredTrademark')}
          </p>
        </section>
      </div>
    </div>
  );
}
