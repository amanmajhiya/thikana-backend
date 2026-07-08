import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  const navigate = useNavigate();

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
    <div className="min-h-[100dvh] bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="text-base font-bold text-gray-900">Privacy Policy</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        <div className="mb-6">
          <p className="text-xs text-gray-400">Last Updated: July 1, 2025 | DPDP Act 2023 Compliant</p>
        </div>

        {/* 1. Introduction */}
        <Section title="1. Introduction">
          <p>
            <strong>RAMANOVA RENEWAL ENERGY PRIVATE LIMITED</strong> (&ldquo;RAMANOVA,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or 
            &ldquo;our&rdquo;), the operator of the <strong>THIKANA (ठिकाना)</strong> platform (&ldquo;Platform&rdquo;), is committed 
            to protecting the privacy and personal data of our users (&ldquo;you,&rdquo; &ldquo;your,&rdquo; or &ldquo;Data Principal&rdquo;).
          </p>
          <p>
            This Privacy Policy (&ldquo;Policy&rdquo;) describes how we collect, use, process, store, share, and protect your personal 
            data when you access or use our mobile application, website, and related services (collectively, the &ldquo;Services&rdquo;). 
            This Policy is designed to comply with the <strong>Digital Personal Data Protection Act, 2023</strong> (&ldquo;DPDP Act&rdquo;) 
            of India, the Information Technology Act, 2000, and other applicable data protection laws.
          </p>
          <p>
            By accessing, registering, or using our Platform, you acknowledge that you have read and understood this Privacy Policy 
            and consent to the collection, use, processing, and sharing of your personal data as described herein. If you do not agree 
            with this Policy, please do not use our Platform.
          </p>
          <p>
            This Policy applies to all users of the Platform, including Property Owners, Property Seekers, and visitors. We may update 
            this Policy from time to time, and we will notify you of any material changes as required by law.
          </p>
        </Section>

        {/* 2. Information We Collect */}
        <Section title="2. Information We Collect">
          <p>
            We collect various types of information from and about users of our Platform. This includes information you provide directly, 
            information collected automatically, and information from third-party sources.
          </p>

          <SubSection title="2.1 Personal Information (Digital Personal Data)">
            <p>Under the DPDP Act, 2023, &ldquo;digital personal data&rdquo; refers to data about an individual who is identifiable by 
            or in relation to such data. We collect the following categories of personal information:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Identity Information:</strong> Full name, gender, date of birth, and profile photograph.</li>
              <li><strong>Contact Information:</strong> Mobile phone number, email address, and postal address.</li>
              <li><strong>Account Credentials:</strong> Login credentials, authentication tokens, and account preferences.</li>
              <li><strong>Verification Documents:</strong> Government-issued identification (Aadhaar, PAN, Passport) provided voluntarily 
              for verification purposes. These are processed securely and in compliance with applicable law.</li>
              <li><strong>Communication Records:</strong> Messages, chat logs, and call records between users through our Platform.</li>
            </ul>
          </SubSection>

          <SubSection title="2.2 Property Information">
            <p>When you list a property on our Platform, we collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Property address, location coordinates, and neighbourhood details.</li>
              <li>Property specifications including type, size (carpet area, built-up area, super built-up area), number of rooms, 
              bathrooms, and floors.</li>
              <li>Property photographs, videos, and virtual tour content.</li>
              <li>Pricing information (sale price, rent, deposit).</li>
              <li>Property amenities and features.</li>
              <li>Furnishing status and availability dates.</li>
              <li>Property ownership documents (when voluntarily provided for verification).</li>
            </ul>
          </SubSection>

          <SubSection title="2.3 Device and Technical Information">
            <p>We automatically collect certain information about your device and usage of the Platform:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Device Information:</strong> Device type, operating system, browser type, screen resolution, and unique device 
              identifiers (where permitted by law).</li>
              <li><strong>Network Information:</strong> IP address, mobile network operator, and connection type (Wi-Fi, 4G, 5G).</li>
              <li><strong>Usage Data:</strong> Pages visited, search queries, properties viewed, time spent on pages, clicks, and 
              interactions with other users.</li>
              <li><strong>App Performance Data:</strong> Crash reports, error logs, and performance metrics to help us improve the Platform.</li>
            </ul>
          </SubSection>

          <SubSection title="2.4 Location Information">
            <p>
              With your consent, we collect precise location data (GPS coordinates) from your mobile device. This helps us: (a) show 
              properties near your current location; (b) provide accurate local search results; (c) suggest relevant property listings; 
              and (d) improve our location-based services. You can disable location access at any time through your device settings, 
              though this may limit certain features of the Platform.
            </p>
          </SubSection>

          <SubSection title="2.5 Information from Third Parties">
            <p>
              We may receive information about you from third parties, including: (a) authentication services if you log in through 
              third-party platforms; (b) verification services that help us confirm your identity; (c) payment processors for transaction 
              verification; and (d) analytics providers that help us understand Platform usage.
            </p>
          </SubSection>
        </Section>

        {/* 3. How We Use Information */}
        <Section title="3. How We Use Your Information">
          <p>
            Under the DPDP Act, 2023, we process your digital personal data for lawful purposes with your consent, or where necessary 
            for certain legitimate uses. We use the information we collect for the following purposes:
          </p>

          <SubSection title="3.1 Primary Purposes (Based on Consent)">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Platform Operation:</strong> To provide, maintain, and improve the Platform and its features, including 
              property search, listing, and user communication.</li>
              <li><strong>User Authentication:</strong> To verify your identity, create and manage your Account, and ensure secure access.</li>
              <li><strong>Property Matching:</strong> To connect Property Seekers with relevant listings and Property Owners with 
              potential buyers or tenants.</li>
              <li><strong>Communication:</strong> To facilitate direct communication between Property Owners and Seekers through our 
              in-app messaging and calling features.</li>
              <li><strong>Customer Support:</strong> To respond to your inquiries, troubleshoot issues, and provide technical assistance.</li>
              <li><strong>Payments:</strong> To process payments for Premium Services and issue invoices and receipts.</li>
            </ul>
          </SubSection>

          <SubSection title="3.2 Secondary Purposes (Based on Consent)">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Personalization:</strong> To personalize your experience by showing content and property recommendations 
              tailored to your preferences and search history.</li>
              <li><strong>Marketing and Promotions:</strong> To send you promotional communications, updates about new features, and 
              special offers (you may opt out at any time).</li>
              <li><strong>Analytics:</strong> To analyse usage patterns, measure Platform performance, and generate aggregated, 
              anonymized insights.</li>
              <li><strong>Product Development:</strong> To develop new features, products, and services based on user behaviour and feedback.</li>
            </ul>
          </SubSection>

          <SubSection title="3.3 Legitimate Uses (Without Consent, as permitted by DPDP Act)">
            <p>Under Section 7 of the DPDP Act, 2023, we may process your personal data without obtaining your consent for the following 
            &ldquo;Certain Legitimate Uses&rdquo;:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Performing any function under any law enacted by the Parliament or State Legislature.</li>
              <li>Responding to medical emergencies involving a threat to life or severe threat to health.</li>
              <li>Employment-related purposes as permitted under the Act.</li>
              <li>Fraud prevention, detection, and investigation.</li>
              <li>Cybersecurity incidents and threat mitigation.</li>
              <li>Compliance with judicial or regulatory orders.</li>
            </ul>
          </SubSection>

          <SubSection title="3.4 Legal Basis for Processing">
            <p>
              The legal bases for processing your personal data under the DPDP Act, 2023 include: (a) your explicit consent; (b) 
              performance of a contract with you; (c) compliance with legal obligations; (d) protection of your vital interests; 
              and (e) legitimate interests pursued by us or a third party, provided such interests are not overridden by your 
              fundamental rights and freedoms.
            </p>
          </SubSection>
        </Section>

        {/* 4. Data Sharing & Third Parties */}
        <Section title="4. Data Sharing & Third Parties">
          <SubSection title="4.1 Data Fiduciary and Data Processors">
            <p>
              Under the DPDP Act, 2023, <strong>RAMANOVA RENEWAL ENERGY PRIVATE LIMITED</strong> is the &ldquo;Data Fiduciary&rdquo; 
              responsible for determining the means and purposes of processing your personal data. We may engage &ldquo;Data Processors&rdquo; 
              (third-party service providers) to process personal data on our behalf, under contractual obligations that ensure compliance 
              with this Policy and applicable law.
            </p>
          </SubSection>

          <SubSection title="4.2 Categories of Recipients">
            <p>We may share your personal data with the following categories of recipients:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Other Users:</strong> When you list a property, certain information (your name, contact details, property 
              details) is shared with interested Property Seekers. When you enquire about a property, your contact information is 
              shared with the Property Owner.</li>
              <li><strong>Service Providers:</strong> Third-party vendors who provide services on our behalf, including cloud hosting 
              (AWS/Google Cloud), payment processing, SMS and email delivery, analytics, customer support, and verification services.</li>
              <li><strong>Legal and Regulatory Authorities:</strong> Government agencies, law enforcement, and regulatory bodies when 
              required by law, court order, or legal process.</li>
              <li><strong>Professional Advisors:</strong> Lawyers, auditors, and insurers in connection with the protection and 
              enforcement of our legal rights.</li>
              <li><strong>Business Transferees:</strong> In the event of a merger, acquisition, or sale of all or a portion of our 
              assets, your personal data may be transferred to the acquiring entity, subject to the same privacy protections.</li>
            </ul>
          </SubSection>

          <SubSection title="4.3 Data Sharing Restrictions">
            <p>
              We do not sell, rent, or trade your personal data to third parties for their marketing purposes without your explicit 
              consent. All third-party processors are contractually bound to process personal data only for specified purposes and 
              to implement appropriate security measures.
            </p>
          </SubSection>

          <SubSection title="4.4 Consent Managers">
            <p>
              Where required under the DPDP Act, 2023, we may work with registered Consent Managers to facilitate your consent 
              management. You have the right to withdraw consent at any time through the Platform settings or by contacting our 
              Data Protection Officer.
            </p>
          </SubSection>
        </Section>

        {/* 5. Data Security Measures */}
        <Section title="5. Data Security Measures">
          <SubSection title="5.1 Security Framework">
            <p>
              We implement a comprehensive information security framework designed to protect your personal data against unauthorized 
              access, alteration, disclosure, or destruction. Our security measures are aligned with ISO 27001 standards and include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted using TLS 1.3. 
              Sensitive personal data stored in our databases is encrypted at rest using AES-256 encryption.</li>
              <li><strong>Access Controls:</strong> Role-based access controls ensure that only authorized personnel can access 
              personal data, and only to the extent necessary for their job functions.</li>
              <li><strong>Firewalls and Network Security:</strong> Multi-layered network security including firewalls, intrusion 
              detection systems, and DDoS protection.</li>
              <li><strong>Regular Security Audits:</strong> Periodic vulnerability assessments, penetration testing, and security 
              audits by third-party experts.</li>
              <li><strong>Incident Response:</strong> A documented incident response plan to detect, respond to, and recover from 
              data security breaches.</li>
              <li><strong>Employee Training:</strong> Regular data protection and privacy training for all employees and contractors 
              who handle personal data.</li>
            </ul>
          </SubSection>

          <SubSection title="5.2 Data Breach Notification">
            <p>
              In the event of a personal data breach that is likely to cause harm to you, we will notify the <strong>Data Protection 
              Board of India</strong> and affected Data Principals in accordance with the DPDP Act, 2023. The notification will include 
              details of the breach, the data affected, the likely consequences, and the measures taken or proposed to address the breach.
            </p>
          </SubSection>

          <SubSection title="5.3 Your Security Responsibilities">
            <p>
              You are responsible for maintaining the confidentiality of your Account credentials and for all activities that occur 
              under your Account. We recommend using a strong, unique password and enabling two-factor authentication where available. 
              Please notify us immediately of any unauthorized access to or use of your Account.
            </p>
          </SubSection>

          <SubSection title="5.4 Disclaimer">
            <p>
              While we implement industry-standard security measures, no method of transmission over the internet or electronic storage 
              is 100% secure. Therefore, we cannot guarantee absolute security of your personal data. You acknowledge and accept this 
              risk when using the Platform.
            </p>
          </SubSection>
        </Section>

        {/* 6. User Rights (DPDP Act Rights) */}
        <Section title="6. User Rights (Data Principal Rights)">
          <p>
            Under the DPDP Act, 2023, as a Data Principal, you have the following rights regarding your personal data. These rights 
            are subject to any exemptions or limitations provided under applicable law.
          </p>

          <SubSection title="6.1 Right to Access">
            <p>
              You have the right to request confirmation of whether we process your personal data and, if so, to obtain a summary of 
              such data, the processing purposes, the categories of recipients, and the retention period. You may access most of your 
              personal data through the &ldquo;Profile&rdquo; section of the Platform.
            </p>
          </SubSection>

          <SubSection title="6.2 Right to Correction and Erasure">
            <p>
              You have the right to request correction of inaccurate or misleading personal data, completion of incomplete personal data, 
              updating of outdated personal data, and erasure of personal data that is no longer necessary for the purpose for which 
              it was collected. You may update or correct certain information directly through the Platform. For other requests, please 
              contact our Data Protection Officer.
            </p>
          </SubSection>

          <SubSection title="6.3 Right to Grievance Redressal">
            <p>
              You have the right to have readily available means of registering a grievance with us regarding our processing of your 
              personal data. Our Grievance Officer details are provided in Section 12. We will acknowledge grievances within 24 hours 
              and endeavour to resolve them within 15 business days.
            </p>
          </SubSection>

          <SubSection title="6.4 Right to Nominate">
            <p>
              You have the right to nominate any other individual who shall, in the event of your death or incapacity, exercise your 
              rights as a Data Principal. You may register a nominee through the Platform settings or by contacting our Data Protection 
              Officer.
            </p>
          </SubSection>

          <SubSection title="6.5 Right to Withdraw Consent">
            <p>
              Where we process your personal data based on consent, you have the right to withdraw your consent at any time. The 
              withdrawal of consent will not affect the lawfulness of processing based on consent before its withdrawal. To withdraw 
              consent, please contact our Data Protection Officer or adjust your privacy settings in the Platform. Please note that 
              withdrawing consent may limit your ability to use certain features of the Platform.
            </p>
          </SubSection>

          <SubSection title="6.6 Exercising Your Rights">
            <p>
              To exercise any of your rights, please contact us using the details provided in Section 12. We may need to verify your 
              identity before processing your request. We will respond to your request within the timeframe required by applicable law. 
              There is no fee for exercising your rights unless your requests are manifestly unfounded or excessive.
            </p>
          </SubSection>
        </Section>

        {/* 7. Cookies & Tracking Technologies */}
        <Section title="7. Cookies & Tracking Technologies">
          <SubSection title="7.1 What Are Cookies">
            <p>
              Cookies are small text files that are placed on your device when you visit a website or use a mobile application. They 
              are widely used to make websites and apps work more efficiently, as well as to provide information to the owners of the 
              site or app.
            </p>
          </SubSection>

          <SubSection title="7.2 Types of Cookies We Use">
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Essential Cookies:</strong> These cookies are necessary for the Platform to function properly. They enable 
              core features such as user authentication, account management, and security. Without these cookies, the Platform cannot 
              operate correctly.</li>
              <li><strong>Functional Cookies:</strong> These cookies allow the Platform to remember choices you make (such as your 
              preferred language, region, and search filters) and provide enhanced, personalized features.</li>
              <li><strong>Analytics Cookies:</strong> These cookies help us understand how users interact with the Platform by 
              collecting and reporting information anonymously. We use this data to improve the Platform&rsquo;s functionality and user experience.</li>
              <li><strong>Advertising Cookies:</strong> These cookies are used to deliver relevant advertisements and track the 
              effectiveness of our marketing campaigns. They may be set by us or by third-party advertising partners.</li>
            </ul>
          </SubSection>

          <SubSection title="7.3 Other Tracking Technologies">
            <p>
              In addition to cookies, we may use web beacons, pixel tags, local storage, and similar technologies to collect 
              information about your usage of the Platform. These technologies work alongside cookies to help us analyse Platform 
              traffic and improve our services.
            </p>
          </SubSection>

          <SubSection title="7.4 Managing Cookies">
            <p>
              Most web browsers and mobile devices allow you to control cookies through their settings. You can choose to accept, 
              reject, or delete cookies. However, if you disable cookies, some features of the Platform may not function properly. 
              For mobile apps, you can manage tracking preferences through your device settings.
            </p>
          </SubSection>

          <SubSection title="7.5 Third-Party Analytics">
            <p>
              We use third-party analytics services, including Google Analytics, to help us analyse how users use the Platform. 
              These services use cookies and similar technologies to collect and analyse information about usage patterns. The 
              information collected is used to compile statistical reports on Platform activity.
            </p>
          </SubSection>
        </Section>

        {/* 8. Children's Privacy */}
        <Section title="8. Children's Privacy">
          <p>
            The Platform is not intended for use by individuals under the age of 18 (&ldquo;Children&rdquo; or &ldquo;Minor&rdquo;). 
            We do not knowingly collect personal data from Children. If you are a parent or guardian and become aware that your Child 
            has provided us with personal data without your consent, please contact us immediately at <strong>privacy@thikana.app</strong>. 
            Upon becoming aware that we have collected personal data from a Child without verifiable parental consent, we will take 
            steps to delete such information from our servers as soon as possible.
          </p>
          <p>
            Under the DPDP Act, 2023, we recognize the special protections required for processing personal data of children. 
            Verifiable parental consent is required before we process any personal data of a Child. If you believe we might have 
            any information from or about a Child, please contact us immediately.
          </p>
          <p>
            For the avoidance of doubt, property listings and transactions on the Platform require the user to be of legal age 
            to enter into binding contracts under the Indian Contract Act, 1872.
          </p>
        </Section>

        {/* 9. Data Retention */}
        <Section title="9. Data Retention">
          <SubSection title="9.1 Retention Periods">
            <p>
              We retain your personal data only for as long as is necessary to fulfill the purposes for which it was collected, 
              including to satisfy legal, regulatory, tax, accounting, and reporting requirements. The specific retention periods are:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Account Information:</strong> Retained for the duration of your Account plus 3 years after Account 
              deletion, unless a longer retention period is required by law.</li>
              <li><strong>Property Listings:</strong> Retained for the duration of the listing plus 1 year after removal, for 
              fraud prevention and quality assurance purposes.</li>
              <li><strong>Communication Records:</strong> Retained for 2 years to facilitate dispute resolution and legal compliance.</li>
              <li><strong>Payment Records:</strong> Retained for 7 years as required by the Income Tax Act, 1961 and GST laws.</li>
              <li><strong>Verification Documents:</strong> Retained for the duration of the verification status plus 2 years.</li>
              <li><strong>Usage Data and Analytics:</strong> Retained in anonymized form for up to 3 years for business analysis 
              and Platform improvement.</li>
            </ul>
          </SubSection>

          <SubSection title="9.2 Deletion and Anonymization">
            <p>
              Upon expiry of the applicable retention period, or upon your request for deletion (where applicable), we will securely 
              delete, anonymize, or pseudonymize your personal data in accordance with our data retention policy. In some cases, we 
              may retain certain information as necessary for our legitimate business purposes or to comply with legal obligations.
            </p>
          </SubSection>

          <SubSection title="9.3 Data Retention Upon Account Deletion">
            <p>
              When you delete your Account, we will delete or anonymize your personal data within 30 days, except where retention 
              is required by law or necessary for our legitimate interests, such as fraud prevention, security, and legal compliance. 
              Aggregated and anonymized data that does not identify you may be retained indefinitely.
            </p>
          </SubSection>
        </Section>

        {/* 10. International Transfers */}
        <Section title="10. International Data Transfers">
          <SubSection title="10.1 Data Storage Location">
            <p>
              Our primary data servers are located in India. However, we may use third-party cloud service providers (such as 
              Amazon Web Services or Google Cloud Platform) that may have data centers in multiple jurisdictions. By using the 
              Platform, you consent to the transfer, storage, and processing of your data to servers located within India and, 
              where necessary, to other countries.
            </p>
          </SubSection>

          <SubSection title="10.2 Cross-Border Transfers">
            <p>
              In the event that personal data is transferred outside India, we ensure that appropriate safeguards are in place 
              to protect your data in accordance with the DPDP Act, 2023 and other applicable data protection laws. These safeguards 
              may include: (a) adequacy decisions by the Central Government of India; (b) standard contractual clauses approved 
              by relevant authorities; (c) intra-group data transfer agreements; and (d) obtaining your explicit consent for 
              specific transfers.
            </p>
          </SubSection>

          <SubSection title="10.3 Government Access">
            <p>
              We acknowledge that under the DPDP Act, 2023, the Government of India may direct that personal data may be processed 
              in the interest of sovereignty and integrity of India, security of the State, friendly relations with foreign States, 
              maintenance of public order, or prevention of incitement to any cognizable offence. We will comply with any such 
              lawful directions as required by law.
            </p>
          </SubSection>
        </Section>

        {/* 11. Changes to Privacy Policy */}
        <Section title="11. Changes to This Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, 
            and other factors. When we make material changes to this Policy, we will notify you through one or more of the following 
            means: (a) a notice within the Platform; (b) an email to the address associated with your Account; or (c) a push 
            notification to your device.
          </p>
          <p>
            The &ldquo;Last Updated&rdquo; date at the top of this Policy indicates when the Policy was last revised. We encourage 
            you to review this Policy periodically to stay informed about our data protection practices. Your continued use of the 
            Platform after any changes to this Policy constitutes your acceptance of the revised Policy.
          </p>
          <p>
            If we make material changes that significantly affect how we process your personal data, we will seek your fresh consent 
            where required by the DPDP Act, 2023.
          </p>
        </Section>

        {/* 12. Contact DPO */}
        <Section title="12. Contact Information">
          <SubSection title="12.1 Data Protection Officer (DPO)">
            <p>
              We have appointed a Data Protection Officer who is responsible for overseeing our data protection practices and 
              ensuring compliance with the DPDP Act, 2023. If you have any questions, concerns, or requests regarding this Privacy 
              Policy or our data processing activities, please contact our Data Protection Officer:
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3 mt-3">
              <div>
                <p className="font-semibold text-gray-800">Data Protection Officer</p>
                <p className="text-gray-600">RAMANOVA RENEWAL ENERGY PRIVATE LIMITED</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Address</p>
                <p className="text-gray-600">Lucknow, Uttar Pradesh, India</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600">privacy@thikana.app</p>
                <p className="text-gray-600">dpo@thikana.app</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Response Time</p>
                <p className="text-gray-600">Within 48 hours of receipt</p>
              </div>
            </div>
          </SubSection>

          <SubSection title="12.2 Grievance Officer">
            <p>
              In accordance with the Information Technology Act, 2000 and the Information Technology (Intermediary Guidelines and 
              Digital Media Ethics Code) Rules, 2021, we have appointed a Grievance Officer to address your concerns:
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3 mt-3">
              <div>
                <p className="font-semibold text-gray-800">Grievance Officer</p>
                <p className="text-gray-600">Mr. Devendra Tiwari, Founder &amp; Director</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Email</p>
                <p className="text-gray-600">grievance@thikana.app</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Working Hours</p>
                <p className="text-gray-600">Monday to Friday, 10:00 AM to 6:00 PM IST</p>
              </div>
            </div>
          </SubSection>

          <SubSection title="12.3 Regulatory Authority">
            <p>
              If you believe that your data protection rights have been violated and you are not satisfied with our response, you 
              have the right to file a complaint with the <strong>Data Protection Board of India</strong> as established under the 
              DPDP Act, 2023. You may also approach the appropriate consumer dispute redressal forum or civil court in Lucknow, 
              Uttar Pradesh.
            </p>
          </SubSection>

          <SubSection title="12.4 Communication Languages">
            <p>
              We welcome communications in English, Hindi, and Hinglish. Our support team will endeavour to respond in your 
              preferred language.
            </p>
          </SubSection>
        </Section>

        {/* DPDP Compliance Statement */}
        <section className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong>DPDP ACT 2023 COMPLIANCE STATEMENT:</strong> This Privacy Policy is drafted in compliance with the Digital 
            Personal Data Protection Act, 2023 (India). We are committed to processing your personal data lawfully, fairly, and 
            transparently. We process personal data only for lawful purposes, with your consent or as otherwise permitted by law. 
            We implement reasonable safeguards to protect your personal data and respect all rights granted to you as a Data Principal 
            under the DPDP Act, 2023.
          </p>
        </section>
      </div>
    </div>
  );
}
