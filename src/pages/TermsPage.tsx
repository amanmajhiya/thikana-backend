import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
        <h1 className="text-base font-bold text-gray-900">Terms &amp; Conditions</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        <div className="mb-6">
          <p className="text-xs text-gray-400">Last Updated: July 1, 2025 | Effective Date: July 1, 2025</p>
        </div>

        {/* 1. Introduction & Definitions */}
        <Section title="1. Introduction & Definitions">
          <p>
            Welcome to <strong>THIKANA (ठिकाना)</strong> (&ldquo;THIKANA,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), 
            a broker-free property listing platform owned and operated by <strong>RAMANOVA RENEWAL ENERGY PRIVATE LIMITED</strong>, 
            a company incorporated under the Companies Act, 2013, having its registered office in Lucknow, Uttar Pradesh, India 
            (&ldquo;Company,&rdquo; &ldquo;RAMANOVA&rdquo;).
          </p>
          <p>
            These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User,&rdquo; 
            &ldquo;you,&rdquo; or &ldquo;your&rdquo;) and RAMANOVA RENEWAL ENERGY PRIVATE LIMITED regarding your access to and use 
            of the THIKANA mobile application, website, and related services (collectively, the &ldquo;Platform&rdquo; or &ldquo;Services&rdquo;).
          </p>
          <p>
            By accessing, registering, or using the Platform in any manner, you acknowledge that you have read, understood, and 
            agree to be bound by these Terms, our Privacy Policy, and all applicable laws and regulations. If you do not agree 
            with any provision of these Terms, you must immediately discontinue use of the Platform.
          </p>

          <SubSection title="1.1 Definitions">
            <p>For the purposes of these Terms, the following definitions shall apply:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>&ldquo;Account&rdquo;</strong> means the registered user account created on the Platform.</li>
              <li><strong>&ldquo;Content&rdquo;</strong> means all text, images, photographs, videos, data, and other materials posted, uploaded, or transmitted through the Platform.</li>
              <li><strong>&ldquo;Listing&rdquo;</strong> means a property advertisement posted by a Property Owner on the Platform.</li>
              <li><strong>&ldquo;Property Owner&rdquo;</strong> means a User who lists, advertises, or offers a property for sale, rent, or lease through the Platform.</li>
              <li><strong>&ldquo;Property Seeker&rdquo;</strong> means a User who browses, searches, or enquires about properties listed on the Platform.</li>
              <li><strong>&ldquo;Premium Services&rdquo;</strong> means paid subscription plans and boosted listing services offered by THIKANA.</li>
              <li><strong>&ldquo;Verification Badge&rdquo;</strong> means a mark or indicator displayed on a Listing indicating that the Property Owner has undergone additional verification.</li>
            </ul>
          </SubSection>
        </Section>

        {/* 2. User Eligibility & Registration */}
        <Section title="2. User Eligibility & Registration">
          <SubSection title="2.1 Eligibility">
            <p>
              By registering for an Account, you represent and warrant that: (a) you are at least 18 years of age or the age of 
              majority in your jurisdiction; (b) you have the legal capacity to enter into a binding contract; (c) you are not 
              barred from using the Platform under any applicable law; (d) all information provided during registration is true, 
              accurate, current, and complete; and (e) you will maintain and promptly update your registration information to 
              keep it accurate.
            </p>
            <p>
              Persons who are &ldquo;incompetent to contract&rdquo; within the meaning of the Indian Contract Act, 1872, including 
              minors and undischarged insolvents, are not eligible to use the Platform. We reserve the right to terminate your 
              Account and refuse access to the Platform if we discover that you are under 18 years of age.
            </p>
          </SubSection>

          <SubSection title="2.2 Account Registration">
            <p>
              To access certain features of the Platform, you must register for an Account using a valid mobile number. You may 
              also be required to provide additional information including your name, email address, and location. You are solely 
              responsible for maintaining the confidentiality of your Account credentials and for all activities that occur under 
              your Account.
            </p>
            <p>
              You agree to: (a) immediately notify us of any unauthorized use of your Account or any other breach of security; 
              (b) ensure that you exit from your Account at the end of each session; and (c) not share your Account credentials 
              with any third party. We shall not be liable for any loss or damage arising from your failure to comply with these 
              obligations.
            </p>
          </SubSection>

          <SubSection title="2.3 Account Security">
            <p>
              We employ reasonable security measures to protect your Account. However, you acknowledge that no system is completely 
              secure, and you agree to use the Platform at your own risk. You must not use another user&rsquo;s Account without 
              permission. We reserve the right to disable any user identification code or password at any time if you fail to comply 
              with any of these Terms.
            </p>
          </SubSection>
        </Section>

        {/* 3. Property Listing Rules & Responsibilities */}
        <Section title="3. Property Listing Rules & Responsibilities">
          <SubSection title="3.1 Listing Requirements">
            <p>
              All property listings on the Platform must comply with the following requirements: (a) the property must be located 
              within the geographic areas serviced by the Platform, primarily in Lucknow, Uttar Pradesh, and surrounding regions; 
              (b) the listing must include accurate and truthful information about the property, including but not limited to 
              property type, size, price, location, and availability; (c) all photographs and media must be genuine, current, and 
              must not misrepresent the property; (d) the listing must comply with all applicable laws, including local municipal 
              regulations, RERA guidelines (where applicable), and the Real Estate (Regulation and Development) Act, 2016.
            </p>
          </SubSection>

          <SubSection title="3.2 Property Owner Responsibilities">
            <p>
              As a Property Owner, you represent and warrant that: (a) you are the lawful owner of the property or have been duly 
              authorized by the owner to list the property; (b) the property is free from any encumbrances, disputes, or legal 
              restrictions that would prevent its sale, lease, or rental; (c) all information provided in the listing is accurate, 
              complete, and not misleading; (d) you will respond to enquiries from Property Seekers in a timely and professional 
              manner; and (e) you will update or remove the listing within 48 hours of the property being sold, rented, or becoming 
              unavailable.
            </p>
            <p>
              You agree to indemnify and hold harmless RAMANOVA RENEWAL ENERGY PRIVATE LIMITED, its directors, officers, employees, 
              and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses arising out of or 
              relating to: (i) any inaccuracy or misrepresentation in your listing; (ii) any dispute between you and a Property Seeker; 
              (iii) any violation of applicable law; or (iv) any breach of these Terms.
            </p>
          </SubSection>

          <SubSection title="3.3 Verification Process">
            <p>
              THIKANA may, at its sole discretion, offer verification services for Property Owners and listings. Verification may 
              include document verification, phone verification, and physical property verification. While we strive to ensure the 
              accuracy of verification results, we do not guarantee the authenticity of any listing or user. The Verification Badge 
              is provided as an additional layer of trust and should not be considered as a guarantee of the property&rsquo;s quality 
              or legality.
            </p>
          </SubSection>

          <SubSection title="3.4 Listing Duration and Renewal">
            <p>
              Standard listings remain active for a period of 60 days from the date of posting, unless removed earlier by the 
              Property Owner. Upon expiry, listings may be renewed at the discretion of the Property Owner. Premium and boosted 
              listings have their own specified durations as outlined in the respective plan descriptions.
            </p>
          </SubSection>
        </Section>

        {/* 4. Prohibited Content & Activities */}
        <Section title="4. Prohibited Content & Activities">
          <p>
            You agree not to use the Platform for any unlawful purpose or in any way that violates these Terms. The following 
            activities are strictly prohibited:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Fraudulent or Misleading Content:</strong> Posting listings with false, inaccurate, or misleading information, 
              including manipulated photographs, incorrect pricing, fabricated property details, or impersonation of another person or entity.
            </li>
            <li>
              <strong>Duplicate Listings:</strong> Creating multiple listings for the same property, or reposting a listing that has 
              not been materially changed, for the purpose of gaining unfair visibility.
            </li>
            <li>
              <strong>Broker or Intermediary Activities:</strong> Using the Platform to act as a broker, agent, or intermediary 
              between property owners and seekers. THIKANA is a broker-free platform, and any attempt to facilitate broker services 
              is strictly prohibited.
            </li>
            <li>
              <strong>Spam and Unsolicited Communication:</strong> Sending unsolicited messages, spam, or promotional content to 
              other users. Using automated systems or bots to interact with the Platform or other users.
            </li>
            <li>
              <strong>Illegal Properties:</strong> Listing properties that are involved in illegal activities, or properties that 
              cannot be legally sold, leased, or rented under applicable law.
            </li>
            <li>
              <strong>Discriminatory Content:</strong> Posting content that discriminates against any person based on religion, 
              caste, race, gender, nationality, disability, or any other protected characteristic.
            </li>
            <li>
              <strong>Intellectual Property Infringement:</strong> Posting content that infringes upon the intellectual property 
              rights of any third party, including copyrights, trademarks, and trade secrets.
            </li>
            <li>
              <strong>Harmful Activities:</strong> Attempting to gain unauthorized access to the Platform, its servers, or user 
              accounts. Introducing viruses, malware, or other harmful code. Interfering with the proper working of the Platform.
            </li>
            <li>
              <strong>Data Mining and Scraping:</strong> Using any robot, spider, scraper, or other automated means to access the 
              Platform for any purpose without our express written permission.
            </li>
            <li>
              <strong>Off-Platform Transactions:</strong> Circumventing the Platform to complete transactions that should occur 
              through the Platform&rsquo;s communication features, for the purpose of avoiding fees or violating these Terms.
            </li>
          </ul>
          <p>
            Violation of any of these prohibitions may result in immediate suspension or termination of your Account, removal of 
            your listings, and may be reported to the appropriate legal authorities. We reserve the right to investigate and take 
            appropriate legal action against anyone who violates these provisions.
          </p>
        </Section>

        {/* 5. Payment Terms */}
        <Section title="5. Payment Terms (Premium Plans)">
          <SubSection title="5.1 Overview of Premium Services">
            <p>
              THIKANA offers various premium subscription plans and add-on services (&ldquo;Premium Services&rdquo;) that provide 
              enhanced visibility and additional features to Users. These services are optional, and Users may continue to use basic 
              features of the Platform free of charge.
            </p>
          </SubSection>

          <SubSection title="5.2 Pricing and Plans">
            <p>The following Premium Services are currently offered (prices inclusive of applicable taxes):</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Booster Plan (₹49):</strong> One-time boost for enhanced listing visibility for 7 days.</li>
              <li><strong>Premium Plan (₹199):</strong> Enhanced listing features including priority placement and verified badge for 30 days.</li>
              <li><strong>Super Premium Plan (₹499):</strong> Maximum visibility, top placement in search results, featured listing status, and verified badge for 30 days.</li>
              <li><strong>Premium Owner Plan (₹999/month):</strong> Monthly subscription for property owners with multiple listings, including all Super Premium features, analytics dashboard, and priority support.</li>
            </ul>
            <p>
              All prices are in Indian Rupees (INR). Prices are subject to change at any time at our sole discretion. Any price 
              changes will be communicated to Users in advance and will not affect subscriptions already paid for.
            </p>
          </SubSection>

          <SubSection title="5.3 Payment Processing">
            <p>
              All payments for Premium Services are processed through secure third-party payment gateways. We accept payments via 
              UPI (Unified Payments Interface), credit and debit cards (Visa, Mastercard, RuPay), net banking, and digital wallets 
              (Paytm, PhonePe, Google Pay, etc.). By making a payment, you authorize us to charge the applicable fees to your 
              selected payment method.
            </p>
            <p>
              You represent and warrant that: (a) the payment information you provide is true, accurate, and complete; (b) you are 
              authorized to use the payment method; and (c) the payment will be honored. All payments must be made in Indian Rupees.
            </p>
          </SubSection>

          <SubSection title="5.4 Taxes">
            <p>
              All fees are inclusive of applicable Goods and Services Tax (GST) at the prevailing rate. You are responsible for 
              all applicable taxes associated with your use of the Premium Services. A GST invoice will be provided upon request 
              to the registered email address.
            </p>
          </SubSection>
        </Section>

        {/* 6. Refund Policy */}
        <Section title="6. Refund Policy">
          <SubSection title="6.1 General Refund Terms">
            <p>
              Refunds for Premium Services are governed by the following policy. By purchasing any Premium Service, you agree to 
              these refund terms. All refund requests must be submitted within the specified timeframes and will be processed at 
              the sole discretion of RAMANOVA RENEWAL ENERGY PRIVATE LIMITED.
            </p>
          </SubSection>

          <SubSection title="6.2 Eligible Refunds">
            <p>Refunds may be granted under the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Technical Failures:</strong> If the Premium Service was not activated due to a technical error on our 
                part, a full refund will be issued upon verification.
              </li>
              <li>
                <strong>Duplicate Charges:</strong> If you were accidentally charged multiple times for the same service, the 
                duplicate amount will be refunded.
              </li>
              <li>
                <strong>Service Not Delivered:</strong> If the purchased Premium Service was not delivered within 24 hours of 
                successful payment and the issue cannot be resolved within a reasonable timeframe.
              </li>
              <li>
                <strong>Platform Unavailability:</strong> If the Platform experiences extended downtime (more than 72 consecutive 
                hours) during your active subscription period, a pro-rata refund may be issued for the affected period.
              </li>
            </ul>
          </SubSection>

          <SubSection title="6.3 Non-Refundable Circumstances">
            <p>Refunds will NOT be granted under the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Change of mind or decision not to use the Platform.</li>
              <li>Dissatisfaction with the number of enquiries or responses received.</li>
              <li>Property being sold or rented outside the Platform during the subscription period.</li>
              <li>Violation of these Terms resulting in Account suspension or termination.</li>
              <li>Failure to provide accurate property information leading to poor performance.</li>
              <li>Partial use of the subscription period.</li>
              <li>Booster plans (₹49) once activated are non-refundable.</li>
            </ul>
          </SubSection>

          <SubSection title="6.4 Refund Process">
            <p>
              To request a refund, contact our support team at <strong>support@thikana.app</strong> within 7 days of the transaction. 
              Your request must include: (a) the transaction ID; (b) the reason for the refund request; and (c) any supporting 
              documentation. Approved refunds will be processed within 7-14 business days and credited to the original payment method. 
              The actual time for the refund to reflect in your account may vary depending on your bank or payment provider.
            </p>
          </SubSection>
        </Section>

        {/* 7. Intellectual Property */}
        <Section title="7. Intellectual Property">
          <SubSection title="7.1 Platform Ownership">
            <p>
              The Platform and its entire contents, features, and functionality (including but not limited to all information, 
              software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned 
              by RAMANOVA RENEWAL ENERGY PRIVATE LIMITED, its licensors, or other providers of such material and are protected 
              by Indian and international copyright, trademark, patent, trade secret, and other intellectual property or 
              proprietary rights laws.
            </p>
            <p>
              The THIKANA name, logo, and all related names, logos, product and service names, designs, and slogans are 
              trademarks of RAMANOVA RENEWAL ENERGY PRIVATE LIMITED or its affiliates or licensors. You must not use such marks 
              without the prior written permission of RAMANOVA RENEWAL ENERGY PRIVATE LIMITED.
            </p>
          </SubSection>

          <SubSection title="7.2 User Content License">
            <p>
              By posting, uploading, or submitting any Content to the Platform, you grant THIKANA a non-exclusive, royalty-free, 
              perpetual, irrevocable, worldwide, sublicensable, and transferable license to use, reproduce, modify, adapt, publish, 
              translate, create derivative works from, distribute, and display such Content in connection with operating, promoting, 
              and improving the Platform. This license survives termination of your Account.
            </p>
            <p>
              You represent and warrant that: (a) you own or control all rights in and to the Content you post; (b) the Content 
              is accurate and not misleading; and (c) the posting of your Content does not violate the privacy rights, publicity 
              rights, copyrights, contract rights, or any other rights of any person or entity.
            </p>
          </SubSection>

          <SubSection title="7.3 Limited License to Users">
            <p>
              We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Platform for your 
              personal, non-commercial use in accordance with these Terms. This license does not include: (a) any resale or 
              commercial use of the Platform or its Content; (b) any derivative use of the Platform or its Content; (c) any 
              downloading or copying of account information for the benefit of another merchant; or (d) any use of data mining, 
              robots, or similar data gathering and extraction tools.
            </p>
          </SubSection>
        </Section>

        {/* 8. Limitation of Liability */}
        <Section title="8. Limitation of Liability">
          <SubSection title="8.1 Disclaimer of Warranties">
            <p>
              THE PLATFORM AND ALL CONTENT, SERVICES, AND FEATURES AVAILABLE THROUGH THE PLATFORM ARE PROVIDED ON AN &ldquo;AS IS&rdquo; 
              AND &ldquo;AS AVAILABLE&rdquo; BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT 
              PERMITTED BY APPLICABLE LAW, RAMANOVA RENEWAL ENERGY PRIVATE LIMITED DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, 
              INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND 
              NON-INFRINGEMENT.
            </p>
            <p>
              WE DO NOT WARRANT THAT: (A) THE PLATFORM WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (B) THE RESULTS 
              THAT MAY BE OBTAINED FROM THE USE OF THE PLATFORM WILL BE ACCURATE OR RELIABLE; (C) ANY ERRORS IN THE PLATFORM 
              WILL BE CORRECTED; OR (D) THE PLATFORM IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
            </p>
          </SubSection>

          <SubSection title="8.2 Limitation of Damages">
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL RAMANOVA RENEWAL ENERGY PRIVATE LIMITED, 
              ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, PARTNERS, OR SUPPLIERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, 
              CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER 
              INTANGIBLE LOSSES, RESULTING FROM: (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE PLATFORM; 
              (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE PLATFORM; (C) ANY CONTENT OBTAINED FROM THE PLATFORM; OR 
              (D) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
            </p>
            <p>
              IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR YOUR 
              USE OF THE PLATFORM EXCEED THE AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING THE PLATFORM DURING THE TWELVE (12) MONTH 
              PERIOD IMMEDIATELY PRECEDING THE DATE ON WHICH THE CLAIM AROSE. FOR USERS OF THE FREE VERSION OF THE PLATFORM, 
              OUR TOTAL LIABILITY SHALL NOT EXCEED ₹1,000 (ONE THOUSAND INDIAN RUPEES).
            </p>
          </SubSection>

          <SubSection title="8.3 No Broker Guarantee">
            <p>
              THIKANA is a technology platform that facilitates direct communication between property owners and seekers. We do 
              not act as a broker, agent, or intermediary in any property transaction. We do not guarantee the accuracy of any 
              listing, the creditworthiness of any user, or the completion of any transaction. Users are solely responsible for 
              verifying all information and conducting due diligence before entering into any property transaction.
            </p>
          </SubSection>
        </Section>

        {/* 9. Dispute Resolution */}
        <Section title="9. Dispute Resolution (Arbitration)">
          <SubSection title="9.1 Good Faith Negotiation">
            <p>
              In the event of any dispute, controversy, or claim arising out of or relating to these Terms, the Privacy Policy, 
              or your use of the Platform (&ldquo;Dispute&rdquo;), the parties shall first attempt to resolve the Dispute through 
              good faith negotiation for a period of 30 days. Either party may initiate negotiation by providing written notice 
              to the other party describing the nature of the Dispute.
            </p>
          </SubSection>

          <SubSection title="9.2 Arbitration">
            <p>
              If the Dispute cannot be resolved through negotiation within 30 days, the Dispute shall be finally resolved by 
              binding arbitration administered by a sole arbitrator appointed in accordance with the Arbitration and Conciliation 
              Act, 1996 of India. The arbitration proceedings shall be conducted in the English language and shall take place in 
              <strong> Lucknow, Uttar Pradesh, India</strong>.
            </p>
            <p>
              The arbitrator shall have expertise in technology and commercial disputes. The arbitral award shall be final and 
              binding on both parties. Judgment upon the award rendered by the arbitrator may be entered in any court having 
              jurisdiction thereof. Each party shall bear its own costs and expenses in connection with the arbitration, and the 
              arbitrator&rsquo;s fees shall be shared equally by the parties unless the arbitrator directs otherwise.
            </p>
          </SubSection>

          <SubSection title="9.3 Exceptions">
            <p>
              Notwithstanding the foregoing, either party may bring an action in a court of competent jurisdiction: (a) for 
              injunctive or other equitable relief to protect intellectual property rights or confidential information; or (b) 
              where the dispute involves a claim for an amount below ₹1,00,000 (One Lakh Rupees), which may be resolved through 
              the appropriate consumer forum or small causes court in Lucknow, Uttar Pradesh.
            </p>
          </SubSection>

          <SubSection title="9.4 Class Action Waiver">
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, YOU AGREE THAT ANY PROCEEDINGS TO RESOLVE DISPUTES WILL BE CONDUCTED ONLY 
              ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. YOU WAIVE ANY RIGHT TO 
              PARTICIPATE IN CLASS ACTIONS AGAINST RAMANOVA RENEWAL ENERGY PRIVATE LIMITED.
            </p>
          </SubSection>
        </Section>

        {/* 10. Termination */}
        <Section title="10. Termination">
          <SubSection title="10.1 Termination by User">
            <p>
              You may terminate your Account at any time by following the Account deletion process within the Platform or by 
              contacting our support team. Upon termination, your right to use the Platform will immediately cease. Any listings 
              associated with your Account will be removed from the Platform. Please note that certain provisions of these Terms 
              shall survive termination, including but not limited to intellectual property rights, limitation of liability, and 
              dispute resolution.
            </p>
          </SubSection>

          <SubSection title="10.2 Termination by THIKANA">
            <p>
              We reserve the right to suspend or terminate your Account, remove your listings, and deny you access to the Platform, 
              with or without cause, and with or without prior notice, at our sole discretion. Grounds for termination include, 
              but are not limited to: (a) breach of these Terms; (b) violation of any applicable law; (c) fraudulent, abusive, or 
              illegal activity; (d) prolonged inactivity; (e) non-payment of fees; or (f) behaviour that we determine to be harmful 
              to other users, the Platform, or third parties.
            </p>
            <p>
              Upon termination, all licenses and other rights granted to you under these Terms will immediately cease. We shall 
              not be liable to you or any third party for any claims or damages arising out of any termination of your Account.
            </p>
          </SubSection>

          <SubSection title="10.3 Effect of Termination">
            <p>
              Upon termination of your Account: (a) your access to the Platform will be immediately revoked; (b) all your active 
              listings will be removed; (c) any pending Premium Services will be forfeited without refund; and (d) we may retain 
              certain information as required by law or as necessary for our legitimate business purposes, as described in our 
              Privacy Policy.
            </p>
          </SubSection>
        </Section>

        {/* 11. Governing Law */}
        <Section title="11. Governing Law">
          <SubSection title="11.1 Applicable Law">
            <p>
              These Terms and any Dispute arising out of or in connection with these Terms shall be governed by and construed 
              in accordance with the laws of the Republic of India, without regard to its conflict of law principles. Specifically, 
              the following Indian laws shall apply: the Information Technology Act, 2000 (as amended); the Information Technology 
              (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021; the Digital Personal Data Protection Act, 2023; 
              the Consumer Protection Act, 2019; the Indian Contract Act, 1872; and the Real Estate (Regulation and Development) 
              Act, 2016.
            </p>
          </SubSection>

          <SubSection title="11.2 Jurisdiction">
            <p>
              Subject to the arbitration provisions in Section 9, any legal suit, action, or proceeding arising out of or related 
              to these Terms or the Platform shall be instituted exclusively in the courts of <strong>Lucknow, Uttar Pradesh, India</strong>. 
              You waive any objection to this venue and irrevocably submit to the exclusive jurisdiction of such courts.
            </p>
          </SubSection>

          <SubSection title="11.3 Compliance with IT Act">
            <p>
              THIKANA operates as an intermediary within the meaning of Section 2(1)(w) of the Information Technology Act, 2000. 
              We comply with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, and 
              have appointed a Grievance Officer as required under the Act. Details of the Grievance Officer are provided in 
              Section 12 below.
            </p>
          </SubSection>
        </Section>

        {/* 12. Contact Information */}
        <Section title="12. Contact Information">
          <p>
            If you have any questions, concerns, or grievances regarding these Terms or the Platform, please contact us using 
            the following information:
          </p>
          <div className="bg-gray-50 rounded-xl p-4 space-y-3 mt-3">
            <div>
              <p className="font-semibold text-gray-800">Company Name</p>
              <p className="text-gray-600">RAMANOVA RENEWAL ENERGY PRIVATE LIMITED</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Platform Name</p>
              <p className="text-gray-600">THIKANA (ठिकाना)</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Registered Office</p>
              <p className="text-gray-600">Lucknow, Uttar Pradesh, India</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Grievance Officer</p>
              <p className="text-gray-600">Mr. Devendra Tiwari, Founder &amp; Director</p>
              <p className="text-gray-600">Email: grievance@thikana.app</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Support Email</p>
              <p className="text-gray-600">support@thikana.app</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">General Inquiries</p>
              <p className="text-gray-600">contact@thikana.app</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Website</p>
              <p className="text-gray-600">www.thikana.app</p>
            </div>
          </div>
          <p className="mt-4">
            We will make every effort to respond to your queries within 48 hours of receipt. For grievances under the 
            Information Technology Act, 2000, we will acknowledge receipt within 24 hours and endeavor to resolve the matter 
            within 15 business days.
          </p>
          <p>
            <strong>Communication in Hindi, English, and Hinglish is welcome.</strong>
          </p>
        </Section>

        {/* Acceptance */}
        <section className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong>BY USING THE THIKANA PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY 
            THESE TERMS AND CONDITIONS. THESE TERMS CONSTITUTE A BINDING LEGAL AGREEMENT BETWEEN YOU AND RAMANOVA RENEWAL 
            ENERGY PRIVATE LIMITED.</strong>
          </p>
        </section>
      </div>
    </div>
  );
}
