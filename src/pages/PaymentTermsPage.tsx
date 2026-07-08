import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';

export default function PaymentTermsPage() {
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
        <h1 className="text-base font-bold text-gray-900">Payment Terms &amp; Conditions</h1>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24">
        <div className="mb-6">
          <p className="text-xs text-gray-400">Last Updated: July 1, 2025 | GST Inclusive Pricing</p>
        </div>

        {/* 1. Accepted Payment Methods */}
        <Section title="1. Accepted Payment Methods">
          <p>
            THIKANA supports a wide range of payment methods to ensure convenient and secure transactions for our users across India. 
            All payments are processed through PCI-DSS compliant payment gateways. The following payment methods are accepted on the Platform:
          </p>

          <SubSection title="1.1 UPI (Unified Payments Interface)">
            <p>
              UPI is the preferred payment method on THIKANA due to its instant processing and high success rate. We support all UPI 
              apps including <strong>PhonePe, Google Pay (GPay), Paytm, Amazon Pay, BHIM, and all bank UPI apps</strong>. UPI payments 
              are processed instantly, and your Premium Services are activated immediately upon successful transaction.
            </p>
          </SubSection>

          <SubSection title="1.2 Credit and Debit Cards">
            <p>
              We accept all major credit and debit cards issued in India, including: <strong>Visa, Mastercard, RuPay, and 
              Maestro</strong>. Both domestic and select international cards are supported. All card transactions are processed 
              through 3D Secure authentication for enhanced security. Card payments are typically processed within minutes.
            </p>
          </SubSection>

          <SubSection title="1.3 Net Banking">
            <p>
              Net banking is supported for <strong>all major Indian banks</strong> including State Bank of India (SBI), HDFC Bank, 
              ICICI Bank, Axis Bank, Punjab National Bank (PNB), Bank of Baroda, Canara Bank, Union Bank, and 50+ other banks. 
              Net banking payments are processed instantly upon successful authentication.
            </p>
          </SubSection>

          <SubSection title="1.4 Digital Wallets">
            <p>
              We accept payments from popular digital wallets including <strong>Paytm Wallet, PhonePe Wallet, Amazon Pay Wallet, 
              Mobikwik, and Freecharge</strong>. Wallet payments are processed instantly.
            </p>
          </SubSection>

          <SubSection title="1.5 Payment Security">
            <p>
              All payment data is encrypted using industry-standard SSL/TLS encryption. We do not store your complete card numbers, 
              UPI PINs, or net banking credentials on our servers. Payment processing is handled by licensed and regulated payment 
              aggregators who comply with RBI guidelines and PCI-DSS standards.
            </p>
          </SubSection>
        </Section>

        {/* 2. Pricing & Plans */}
        <Section title="2. Pricing & Plans">
          <p>
            THIKANA offers a range of plans designed to meet the diverse needs of property owners and seekers. All prices are 
            displayed in Indian Rupees (INR) and are inclusive of applicable GST. The following plans are currently available:
          </p>

          <SubSection title="2.1 Free Plan">
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="font-semibold text-gray-800">Price: ₹0 (Free)</p>
              <p>The Free Plan includes the following features:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>List up to 2 properties per month.</li>
                <li>Standard listing visibility in search results.</li>
                <li>Receive enquiries from interested Property Seekers.</li>
                <li>Basic in-app messaging with potential buyers/renters.</li>
                <li>Standard photo upload (up to 5 photos per listing).</li>
                <li>Access to basic property analytics.</li>
              </ul>
              <p>The Free Plan is ideal for individual property owners who want to list occasionally.</p>
            </div>
          </SubSection>

          <SubSection title="2.2 Booster Plan">
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="font-semibold text-gray-800">Price: ₹49 (One-Time, GST Inclusive)</p>
              <p>The Booster Plan includes the following features:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Enhanced visibility for a single listing for 7 days.</li>
                <li>Priority placement in search results for the boosted property.</li>
                <li>&ldquo;Boosted&rdquo; badge on the listing for increased attention.</li>
                <li>Highlighted listing card in search results.</li>
                <li>Applicable to any property type (residential, commercial, land).</li>
              </ul>
              <p>The Booster Plan is a one-time purchase and does not auto-renew. Ideal for giving a quick visibility boost to 
              a specific listing.</p>
            </div>
          </SubSection>

          <SubSection title="2.3 Premium Plan">
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="font-semibold text-gray-800">Price: ₹199 (One-Time, GST Inclusive)</p>
              <p>The Premium Plan includes the following features:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Enhanced listing features for 30 days.</li>
                <li>Priority placement in search results above Free listings.</li>
                <li>Verified Owner badge on your profile and listings.</li>
                <li>Up to 15 photos per listing.</li>
                <li>Video upload capability for property tours.</li>
                <li>Priority customer support response (within 12 hours).</li>
                <li>Detailed analytics dashboard for your listings.</li>
                <li>Social media sharing features with optimized previews.</li>
              </ul>
              <p>The Premium Plan is a one-time purchase valid for 30 days from the date of activation.</p>
            </div>
          </SubSection>

          <SubSection title="2.4 Super Premium Plan">
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="font-semibold text-gray-800">Price: ₹499 (One-Time, GST Inclusive)</p>
              <p>The Super Premium Plan includes the following features:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Maximum visibility with top placement in search results for 30 days.</li>
                <li>Featured Listing status with a prominent &ldquo;Featured&rdquo; badge.</li>
                <li>Priority placement above all Free, Booster, and Premium listings.</li>
                <li>Verified Owner badge on your profile and all listings.</li>
                <li>Unlimited photos per listing.</li>
                <li>Video upload and virtual tour capability.</li>
                <li>WhatsApp integration for direct enquiries.</li>
                <li>Priority customer support response (within 6 hours).</li>
                <li>Advanced analytics with competitor insights.</li>
                <li>Featured on THIKANA&rsquo;s homepage and social media channels.</li>
              </ul>
              <p>The Super Premium Plan is our most popular plan for serious property sellers and landlords.</p>
            </div>
          </SubSection>

          <SubSection title="2.5 Premium Owner Plan (Monthly Subscription)">
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <p className="font-semibold text-gray-800">Price: ₹999 per month (GST Inclusive)</p>
              <p>The Premium Owner Plan is a monthly subscription designed for professional property owners and real estate 
              portfolio managers:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Unlimited property listings with no monthly cap.</li>
                <li>All Super Premium features applied to every listing.</li>
                <li>Top placement for all listings in search results.</li>
                <li>Advanced analytics dashboard with market trends and insights.</li>
                <li>Priority customer support with dedicated account manager.</li>
                <li>Early access to new features and platform updates.</li>
                <li>Exclusive access to owner webinars and market reports.</li>
                <li>Co-branded marketing materials for your listings.</li>
                <li>Lead management tools with CRM-like features.</li>
              </ul>
              <p>This plan auto-renews monthly unless cancelled. Cancellation must be initiated at least 48 hours before the next 
              billing cycle.</p>
            </div>
          </SubSection>

          <SubSection title="2.6 Price Changes">
            <p>
              We reserve the right to modify the pricing of any plan at any time. Any price changes will be communicated to users 
              at least 15 days in advance through in-app notifications and email. Price changes will not affect active subscriptions 
              until the next renewal period. Existing subscribers will be grandfathered at their current rate until they cancel or 
              change plans.
            </p>
          </SubSection>
        </Section>

        {/* 3. Billing & Renewal */}
        <Section title="3. Billing & Renewal">
          <SubSection title="3.1 Billing Cycle">
            <p>
              For one-time plans (Booster, Premium, Super Premium), billing occurs at the time of purchase and the plan is activated 
              immediately upon successful payment. For the Premium Owner monthly subscription, billing occurs at the beginning of 
              each billing cycle (monthly). Your billing date is the date you first subscribed to the Premium Owner Plan.
            </p>
          </SubSection>

          <SubSection title="3.2 Auto-Renewal">
            <p>
              The <strong>Premium Owner Plan (₹999/month)</strong> is a subscription service that automatically renews at the end 
              of each billing cycle unless cancelled. By subscribing, you authorize us to charge your selected payment method for 
              the renewal amount on the billing date. You will receive a renewal reminder notification at least 48 hours before 
              the auto-renewal date.
            </p>
            <p>
              One-time plans (Booster, Premium, Super Premium) do not auto-renew. You must manually purchase these plans again 
              if you wish to continue the benefits after expiry.
            </p>
          </SubSection>

          <SubSection title="3.3 Cancellation of Auto-Renewal">
            <p>
              You may cancel the auto-renewal of your Premium Owner Plan at any time through the &ldquo;My Plans&rdquo; or 
              &ldquo;Subscriptions&rdquo; section of the Platform. Cancellation must be completed at least 48 hours before the 
              next billing date to avoid being charged for the next cycle. Upon cancellation, your subscription will remain active 
              until the end of the current billing period, after which it will not renew.
            </p>
          </SubSection>

          <SubSection title="3.4 Failed Renewal Payments">
            <p>
              If we are unable to process the auto-renewal payment (due to insufficient funds, expired card, or other reasons), 
              we will notify you and attempt to process the payment up to 3 times over a 7-day grace period. During this grace 
              period, your Premium Owner Plan benefits will continue. If payment cannot be processed after 3 attempts, your 
              subscription will be downgraded to the Free Plan at the end of the grace period.
            </p>
          </SubSection>

          <SubSection title="3.5 Invoices and Receipts">
            <p>
              A digital invoice/receipt is generated for every transaction and can be accessed from the &ldquo;Payment History&rdquo; 
              section of your Account. GST invoices with our GSTIN can be downloaded for business and tax purposes. If you require 
              a physical invoice, please contact our billing team at <strong>billing@thikana.app</strong>.
            </p>
          </SubSection>
        </Section>

        {/* 4. Refund Policy */}
        <Section title="4. Refund Policy">
          <SubSection title="4.1 General Refund Principles">
            <p>
              We strive to ensure satisfaction with all our Premium Services. Refunds are governed by the following principles 
              and are subject to our discretion. All refund requests must be submitted within 7 days of the transaction date 
              unless otherwise specified.
            </p>
          </SubSection>

          <SubSection title="4.2 Eligible for Full Refund">
            <p>Full refunds will be granted under the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Technical Failure:</strong> If the Premium Service was not activated due to a technical error on our part 
                (e.g., payment was successful but the plan was not applied to your Account), a full refund will be issued upon 
                verification of the issue.
              </li>
              <li>
                <strong>Duplicate Payment:</strong> If you were accidentally charged multiple times for the same service due to 
                a payment gateway error, all duplicate charges will be fully refunded.
              </li>
              <li>
                <strong>Service Not Delivered:</strong> If the purchased Premium Service was not delivered within 24 hours of 
                successful payment and our technical team is unable to resolve the issue within 48 hours of your complaint.
              </li>
              <li>
                <strong>Unauthorized Transaction:</strong> If a transaction was made from your Account without your authorization 
                and you report it within 24 hours, subject to our investigation.
              </li>
            </ul>
          </SubSection>

          <SubSection title="4.3 Eligible for Partial Refund">
            <p>Partial refunds may be granted under the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Extended Platform Downtime:</strong> If the Platform experiences extended downtime (more than 72 consecutive 
                hours) during your active subscription period, a pro-rata refund for the affected days may be issued.
              </li>
              <li>
                <strong>Significant Service Degradation:</strong> If there is a significant and prolonged degradation of Premium 
                features that we are unable to resolve within a reasonable timeframe.
              </li>
              <li>
                <strong>Early Cancellation (Premium Owner Plan):</strong> If you cancel your Premium Owner Plan within 48 hours of 
                purchase and have not used any Premium features, a full refund may be considered. If Premium features were used, 
                a pro-rata refund for the unused portion of the current billing cycle may be issued at our discretion.
              </li>
            </ul>
          </SubSection>

          <SubSection title="4.4 Not Eligible for Refund">
            <p>Refunds will NOT be granted under the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Change of mind or no longer wanting the service.</li>
              <li>Dissatisfaction with the number of enquiries, leads, or responses received.</li>
              <li>Property being sold, rented, or becoming unavailable during the subscription period.</li>
              <li>Failure to respond to enquiries from potential buyers or renters.</li>
              <li>Violation of our Terms and Conditions resulting in Account suspension or termination.</li>
              <li>Providing inaccurate or misleading property information.</li>
              <li>Booster Plan (₹49) once activated is strictly non-refundable.</li>
              <li>Partial use of any one-time plan period.</li>
              <li>Failure to cancel auto-renewal before the billing date.</li>
              <li>Delays in payment processing due to third-party payment gateway issues.</li>
            </ul>
          </SubSection>

          <SubSection title="4.5 Refund Process">
            <p>
              To request a refund, please contact our billing team at <strong>billing@thikana.app</strong> or through the in-app 
              support feature. Your request must include: (a) your registered mobile number; (b) the transaction ID or order ID; 
              (c) the reason for the refund request; and (d) any supporting documentation or screenshots.
            </p>
            <p>
              Once your request is received, we will acknowledge it within 24 hours and begin our investigation. We aim to resolve 
              all refund requests within 7 business days. Approved refunds will be credited to the original payment method within 
              7-14 business days from the date of approval. The actual time for the refund to reflect in your account may vary 
              depending on your bank or payment provider.
            </p>
          </SubSection>

          <SubSection title="4.6 Refund Method">
            <p>
              All refunds are credited to the original payment method used for the transaction. UPI refunds are credited back to 
              the UPI ID; card refunds are credited to the card account; wallet refunds are credited to the wallet. Cash refunds 
              are not available. In case the original payment method is no longer available, we will work with you to find an 
              alternative refund method.
            </p>
          </SubSection>
        </Section>

        {/* 5. Payment Security */}
        <Section title="5. Payment Security">
          <SubSection title="5.1 Security Standards">
            <p>
              All payment transactions on THIKANA are processed through PCI-DSS (Payment Card Industry Data Security Standard) 
              Level 1 compliant payment gateways. We employ the following security measures to protect your payment information:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>SSL/TLS Encryption:</strong> All payment data transmitted between your device and our servers is encrypted 
              using 256-bit SSL/TLS encryption.</li>
              <li><strong>Tokenization:</strong> Sensitive payment data is tokenized, meaning we do not store your actual card numbers 
              or UPI credentials on our servers.</li>
              <li><strong>3D Secure Authentication:</strong> Card transactions require additional authentication through OTP (One-Time 
              Password) or 3D Secure password.</li>
              <li><strong>Fraud Detection:</strong> Real-time fraud detection systems monitor transactions for suspicious activity.</li>
              <li><strong>Secure Infrastructure:</strong> Our servers are hosted in ISO 27001 certified data centers with restricted 
              physical access.</li>
            </ul>
          </SubSection>

          <SubSection title="5.2 RBI Compliance">
            <p>
              Our payment processing complies with all Reserve Bank of India (RBI) guidelines for payment aggregators and payment 
              gateways. We work only with licensed payment service providers authorized by the RBI to operate in India.
            </p>
          </SubSection>

          <SubSection title="5.3 User Responsibilities">
            <p>
              You are responsible for: (a) ensuring that your payment details are accurate and up to date; (b) keeping your payment 
              credentials (UPI PIN, card PIN, OTP) confidential; (c) not sharing OTPs or authentication codes with anyone; and (d) 
              reporting any unauthorized transactions immediately to us and your bank.
            </p>
          </SubSection>
        </Section>

        {/* 6. Failed Transactions */}
        <Section title="6. Failed Transactions">
          <SubSection title="6.1 Reasons for Transaction Failure">
            <p>Payment transactions may fail due to various reasons, including but not limited to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Insufficient funds in the linked bank account or wallet.</li>
              <li>Incorrect UPI PIN, card PIN, or OTP entered.</li>
              <li>Expired debit or credit card.</li>
              <li>Transaction limit exceeded (daily limit, per-transaction limit).</li>
              <li>Bank server downtime or network connectivity issues.</li>
              <li>Payment gateway technical errors.</li>
              <li>Security flags raised by your bank.</li>
            </ul>
          </SubSection>

          <SubSection title="6.2 Handling of Failed Transactions">
            <p>
              If a transaction fails: (a) no amount will be deducted from your account; or (b) if the amount was deducted, it will 
              be automatically refunded by your bank or payment provider within 5-7 business days. THIKANA does not hold any amount 
              for failed transactions.
            </p>
            <p>
              If you do not receive an automatic refund for a failed transaction within 7 business days, please contact your bank 
              or payment provider first. If the issue persists, contact our support team with the transaction reference number.
            </p>
          </SubSection>

          <SubSection title="6.3 Double Debit Resolution">
            <p>
              In rare cases of double debits (amount deducted twice for a single transaction), the duplicate amount will be 
              automatically refunded by the payment gateway within 5-7 business days. If not automatically refunded, please 
              contact our billing team with both transaction IDs for manual processing.
            </p>
          </SubSection>
        </Section>

        {/* 7. Cancellation */}
        <Section title="7. Cancellation Policy">
          <SubSection title="7.1 Cancellation by User">
            <p>
              You may cancel your Premium Owner Plan subscription at any time through the Platform settings. Cancellation will 
              stop the auto-renewal of your subscription. Your Premium features will remain active until the end of the current 
              billing period. No partial refunds are provided for the remaining days of the current billing period.
            </p>
          </SubSection>

          <SubSection title="7.2 Cancellation by THIKANA">
            <p>
              We reserve the right to cancel or suspend your subscription at any time if: (a) you breach these Payment Terms or 
              our Terms and Conditions; (b) we suspect fraudulent activity; (c) you engage in prohibited conduct on the Platform; 
              or (d) required by law or regulatory order. In such cases, no refund will be provided for the remaining subscription period.
            </p>
          </SubSection>

          <SubSection title="7.3 Cooling-Off Period">
            <p>
              For the Premium Owner Plan, you have a cooling-off period of 48 hours from the date of purchase during which you 
              may cancel and request a full refund, provided you have not used any Premium features. After the cooling-off period 
              or after using Premium features, cancellations will not be eligible for refunds.
            </p>
          </SubSection>
        </Section>

        {/* 8. GST & Taxes */}
        <Section title="8. GST & Taxes">
          <SubSection title="8.1 GST Inclusive Pricing">
            <p>
              All prices displayed on the Platform are inclusive of applicable Goods and Services Tax (GST) at the prevailing rate. 
              The current GST rate for digital services is <strong>18%</strong> (CGST 9% + SGST 9% for intra-state supplies, or 
              IGST 18% for inter-state supplies). No additional taxes will be charged beyond the displayed price.
            </p>
          </SubSection>

          <SubSection title="8.2 GST Registration">
            <p>
              RAMANOVA RENEWAL ENERGY PRIVATE LIMITED is registered under the Goods and Services Tax Act. Our GSTIN is available 
              upon request and is printed on all tax invoices. GST invoices can be downloaded from the &ldquo;Payment History&rdquo; 
              section for business users claiming input tax credit.
            </p>
          </SubSection>

          <SubSection title="8.3 TDS (Tax Deducted at Source)">
            <p>
              For business customers making payments above the applicable threshold, TDS provisions under the Income Tax Act, 1961 
              may apply. It is the responsibility of the paying entity to deduct and deposit TDS as per applicable rates. A TDS 
              certificate must be furnished to us within the prescribed timeline.
            </p>
          </SubSection>

          <SubSection title="8.4 Reverse Charge Mechanism">
            <p>
              Our services are provided on a forward charge basis, and reverse charge mechanism (RCM) does not apply to individual 
              consumers. For business entities registered under GST, the tax liability follows the standard forward charge mechanism.
            </p>
          </SubSection>
        </Section>

        {/* 9. Dispute Resolution for Payments */}
        <Section title="9. Dispute Resolution for Payments">
          <SubSection title="9.1 Internal Resolution">
            <p>
              If you have any dispute regarding a payment, charge, or refund, please first contact our billing team at 
              <strong> billing@thikana.app</strong>. We will acknowledge your complaint within 24 hours and aim to resolve it within 
              7 business days. Most payment disputes can be resolved through direct communication.
            </p>
          </SubSection>

          <SubSection title="9.2 Escalation">
            <p>
              If you are not satisfied with our internal resolution, you may escalate the matter to our Grievance Officer at 
              <strong> grievance@thikana.app</strong>. The Grievance Officer will review your case and provide a response within 
              15 business days.
            </p>
          </SubSection>

          <SubSection title="9.3 External Dispute Resolution">
            <p>
              If the dispute remains unresolved after escalation, you may approach: (a) the Banking Ombudsman of the Reserve Bank 
              of India for disputes related to payment processing; (b) the appropriate Consumer Forum under the Consumer Protection 
              Act, 2019; or (c) the courts of Lucknow, Uttar Pradesh, as specified in our Terms and Conditions.
            </p>
          </SubSection>

          <SubSection title="9.4 Chargebacks">
            <p>
              If you initiate a chargeback with your bank or card issuer without first attempting to resolve the issue with us, 
              we reserve the right to suspend your Account pending resolution of the chargeback. We will cooperate with your bank 
              and provide all necessary documentation to resolve the dispute. If a chargeback is found to be fraudulent or abusive, 
              we reserve the right to terminate your Account and pursue legal remedies.
            </p>
          </SubSection>
        </Section>

        {/* 10. Contact for Billing Issues */}
        <Section title="10. Contact Information for Billing">
          <p>
            For any billing-related queries, refund requests, payment issues, or subscription management, please contact us using 
            the following channels:
          </p>
          <div className="bg-gray-50 rounded-xl p-4 space-y-3 mt-3">
            <div>
              <p className="font-semibold text-gray-800">Billing Support</p>
              <p className="text-gray-600">Email: billing@thikana.app</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">General Support</p>
              <p className="text-gray-600">Email: support@thikana.app</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Grievance Officer</p>
              <p className="text-gray-600">Mr. Devendra Tiwari</p>
              <p className="text-gray-600">Email: grievance@thikana.app</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Company Details</p>
              <p className="text-gray-600">RAMANOVA RENEWAL ENERGY PRIVATE LIMITED</p>
              <p className="text-gray-600">Registered Office: Lucknow, Uttar Pradesh, India</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Response Time</p>
              <p className="text-gray-600">Billing queries: Within 24 hours</p>
              <p className="text-gray-600">Refund requests: Within 48 hours</p>
            </div>
          </div>
          <p className="mt-4">
            When contacting us about billing issues, please include your registered mobile number, transaction ID (if applicable), 
            and a detailed description of the issue. This will help us resolve your query faster.
          </p>
          <p>
            We support communication in <strong>English, Hindi, and Hinglish</strong>. Our billing support team is available Monday 
            to Friday, 10:00 AM to 6:00 PM IST (excluding public holidays). Emergency billing issues are monitored on weekends 
            as well.
          </p>
        </Section>

        {/* Acceptance */}
        <section className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 leading-relaxed">
            <strong>BY MAKING A PAYMENT ON THE THIKANA PLATFORM, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE 
            BOUND BY THESE PAYMENT TERMS &amp; CONDITIONS. THESE TERMS ARE IN ADDITION TO OUR GENERAL TERMS &amp; CONDITIONS AND 
            PRIVACY POLICY.</strong>
          </p>
        </section>
      </div>
    </div>
  );
}
