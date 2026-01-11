import { Shield, Lock, Key, FileCheck, Activity, Users, Cloud, TrendingUp, BookOpen, Mail, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import StructuredData from '@/components/StructuredData';
import GlobalNavigation from '@/components/GlobalNavigation';
import PromotionalBanner from '@/components/PromotionalBanner';
import { Button } from '@/components/ui/button';
import SecurityHero from '@/components/security/SecurityHero';
import SecuritySection from '@/components/security/SecuritySection';
import CalloutBox from '@/components/security/CalloutBox';
import VendorCards from '@/components/security/VendorCards';
import SecurityChecklist from '@/components/security/SecurityChecklist';
import GlobalFooter from '@/components/GlobalFooter';

const Security = () => {
  return (
    <>
      <SEO
        title="Security & Data Protection"
        description="Learn how BizHealth.ai protects your sensitive business data with bank-level encryption, enterprise partners like Google Cloud and Stripe, and transparent security practices built for SMBs."
        keywords="security, data protection, risk, secure, data security, security protection, business data security, SaaS security, SMB data protection, secure business intelligence, data encryption, compliance"
        canonical="https://bizhealth.ai/security"
        ogImage="/og-images/og-security.jpg"
      />

      <StructuredData type="organization" />

      <PromotionalBanner />
      <GlobalNavigation />

      <main className="min-h-screen bg-background pt-12">
        <SecurityHero />

        {/* Security Commitment Section */}
        <section className="py-10 bg-background">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="border-l-4 border-biz-green pl-8">
              <p className="text-lg text-foreground leading-relaxed mb-6">
                We built BizHealth.ai specifically for small and mid-sized business owners—many using professional business intelligence tools for the first time. We know you need clear answers about security, not technical jargon.
              </p>
              <p className="text-lg text-muted-foreground italic leading-relaxed">
                Here's our promise: We'll always be transparent about our security practices, we'll never overstate our capabilities, and we'll continuously work to protect the trust you place in us.
              </p>
            </div>
          </div>
        </section>

        {/* Data Encryption & Protection */}
        <SecuritySection
          icon={Lock}
          title="Data Encryption & Protection"
          iconColor="text-biz-green"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-biz-navy mb-3">Encryption in Transit</h3>
              <p className="text-foreground leading-relaxed">
                Every piece of data you send to BizHealth.ai travels through an encrypted connection using industry-standard TLS 1.3 protocol. This means that even if someone intercepts your data while it's traveling over the internet, they cannot read it.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-biz-navy mb-3">Encryption at Rest</h3>
              <p className="text-foreground leading-relaxed">
                All data stored in our systems is encrypted using AES-256 encryption—the same standard used by banks and government agencies. Your financial reports, questionnaire responses, and business documents are stored in an encrypted format that makes them unreadable without proper authorization.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-biz-navy mb-3">Data Isolation</h3>
              <p className="text-foreground leading-relaxed">
                Your business data is completely isolated from other customers. We use database-level isolation and access controls to ensure that your information can never be accessed by another BizHealth.ai customer, even accidentally.
              </p>
            </div>

            <CalloutBox title="What This Means for You">
              <p className="text-sm text-muted-foreground">
                Your sensitive business information—financial data, operational metrics, strategic plans—is protected both when you're sending it to us and when we're storing it. We use the same encryption technology that protects your online banking transactions.
              </p>
            </CalloutBox>
          </div>
        </SecuritySection>

        {/* Access Controls & Authentication */}
        <SecuritySection
          icon={Key}
          title="Access Controls & Authentication"
          iconColor="text-biz-green"
          bgColor="bg-muted/30"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-biz-navy mb-3">Your Account Security</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span><strong>Multi-Factor Authentication (MFA):</strong> Available for all accounts. We strongly recommend enabling MFA to add an extra layer of protection beyond your password.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span><strong>Strong Password Requirements:</strong> Our system enforces minimum password complexity to prevent weak passwords that could be easily guessed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span><strong>Session Management:</strong> Automatic logout after periods of inactivity. You can also manually log out from all devices if needed.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-biz-navy mb-3">Our Internal Controls</h3>
              <p className="text-foreground leading-relaxed mb-4">
                Our team follows strict internal security protocols:
              </p>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span><strong>Role-Based Access Control (RBAC):</strong> Team members only have access to systems and data necessary for their role.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span><strong>Zero-Trust Architecture:</strong> Every access request is verified, even for internal team members.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span><strong>Comprehensive Logging:</strong> All access to customer data is logged and regularly audited.</span>
                </li>
              </ul>
            </div>

            <CalloutBox title="What This Means for You">
              <p className="text-sm text-muted-foreground">
                You control who can access your business data through account permissions. We protect your account with strong authentication options, and our team follows strict protocols to ensure they never access your data without proper authorization.
              </p>
            </CalloutBox>
          </div>
        </SecuritySection>

        {/* Compliance & Privacy Standards */}
        <SecuritySection
          icon={FileCheck}
          title="Compliance & Privacy Standards"
          iconColor="text-biz-green"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-biz-navy mb-3">Current Compliance Efforts</h3>
              <p className="text-foreground leading-relaxed mb-4">
                As a growing SaaS platform, we're committed to meeting industry-standard security and privacy requirements. Here's where we stand:
              </p>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span><strong>GDPR-Ready Infrastructure:</strong> Our systems are designed to support GDPR requirements including data portability, right to deletion, and consent management.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span><strong>CCPA Compliance:</strong> California residents have enhanced privacy rights under CCPA, which we honor for all users.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>SOC 2 Type II (In Progress):</strong> We're actively working toward SOC 2 Type II certification, which validates our security controls through independent audit.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-biz-navy mb-3">Your Data Rights</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <h4 className="font-semibold text-biz-navy mb-2">Access Your Data</h4>
                  <p className="text-sm text-muted-foreground">Request a copy of all data we have about you and your business.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <h4 className="font-semibold text-biz-navy mb-2">Data Portability</h4>
                  <p className="text-sm text-muted-foreground">Export your data in standard formats to use elsewhere.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <h4 className="font-semibold text-biz-navy mb-2">Right to Deletion</h4>
                  <p className="text-sm text-muted-foreground">Request deletion of your account and all associated data.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border border-border">
                  <h4 className="font-semibold text-biz-navy mb-2">Transparency</h4>
                  <p className="text-sm text-muted-foreground">Clear information about how we use your data.</p>
                </div>
              </div>
            </div>

            <CalloutBox title="What This Means for You">
              <p className="text-sm text-muted-foreground">
                You have full control over your data. You can access it, export it, or delete it at any time. We're transparent about our practices and actively working toward industry-recognized certifications.
              </p>
            </CalloutBox>
          </div>
        </SecuritySection>

        {/* Incident Response & Monitoring */}
        <SecuritySection
          icon={Activity}
          title="Incident Response & Monitoring"
          iconColor="text-biz-green"
          bgColor="bg-muted/30"
        >
          <div className="space-y-6">
            <p className="text-foreground leading-relaxed">
              We continuously monitor our systems for security threats and have established procedures to respond quickly if an incident occurs.
            </p>

            <div className="grid md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-background rounded-lg border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-biz-green/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-biz-green">1</span>
                </div>
                <h4 className="font-semibold text-biz-navy mb-2">Detection</h4>
                <p className="text-sm text-muted-foreground">24/7 monitoring identifies potential threats immediately</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-biz-green/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-biz-green">2</span>
                </div>
                <h4 className="font-semibold text-biz-navy mb-2">Response</h4>
                <p className="text-sm text-muted-foreground">Our team investigates and contains the issue</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-biz-green/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-biz-green">3</span>
                </div>
                <h4 className="font-semibold text-biz-navy mb-2">Communication</h4>
                <p className="text-sm text-muted-foreground">We notify affected customers promptly and transparently</p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-biz-green/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-biz-green">4</span>
                </div>
                <h4 className="font-semibold text-biz-navy mb-2">Prevention</h4>
                <p className="text-sm text-muted-foreground">We implement fixes to prevent future occurrences</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-biz-navy mb-3">Our Monitoring Includes</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span>Real-time threat detection and alerting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span>Regular security scanning and vulnerability assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span>Automated backup verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span>Access log analysis for suspicious activity</span>
                </li>
              </ul>
            </div>

            <CalloutBox title="What This Means for You">
              <p className="text-sm text-muted-foreground">
                We're watching for problems 24/7 so you don't have to. If something happens, we'll respond quickly, tell you what's going on, and fix it. Your trust is our priority.
              </p>
            </CalloutBox>
          </div>
        </SecuritySection>

        {/* Third-Party Security */}
        <SecuritySection
          icon={Users}
          title="Third-Party Security & Infrastructure Partners"
          iconColor="text-biz-green"
        >
          <div className="space-y-6">
            <p className="text-foreground leading-relaxed">
              We partner with industry-leading providers to ensure enterprise-grade security and reliability. Each partner has been carefully selected based on their security certifications and track record.
            </p>

            <VendorCards />

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-biz-navy mb-3">Our Vendor Security Standards</h3>
              <p className="text-foreground leading-relaxed mb-4">
                Every third-party service we use must meet our security requirements:
              </p>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span>SOC 2 Type II or equivalent certification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span>Data encryption in transit and at rest</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span>Regular third-party security audits</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span>Contractual data protection commitments</span>
                </li>
              </ul>
            </div>

            <CalloutBox title="What This Means for You">
              <p className="text-sm text-muted-foreground">
                Your data benefits from the security expertise of the world's leading cloud and payment providers. We only work with partners who meet the same high security standards we set for ourselves.
              </p>
            </CalloutBox>
          </div>
        </SecuritySection>

        {/* Your Security Responsibilities */}
        <SecuritySection
          icon={Shield}
          title="Your Security Responsibilities"
          iconColor="text-biz-green"
          bgColor="bg-muted/30"
        >
          <div className="space-y-6">
            <p className="text-foreground leading-relaxed">
              Security is a partnership between BizHealth.ai and you. While we protect your data with enterprise-grade security, there are important steps you can take to keep your account secure:
            </p>

            <SecurityChecklist />

            <div className="mt-6 p-6 bg-biz-navy text-white rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Security is a Partnership</h3>
              <p className="text-white/90 leading-relaxed">
                We're committed to protecting your data with the best technology available. But even the strongest security system can be compromised by weak passwords or phishing attacks. By following these best practices, you're helping us keep your business information safe.
              </p>
            </div>
          </div>
        </SecuritySection>

        {/* Data Backup & Business Continuity */}
        <SecuritySection
          icon={Cloud}
          title="Data Backup & Business Continuity"
          iconColor="text-biz-green"
        >
          <div className="space-y-6">
            <p className="text-foreground leading-relaxed">
              Your business data is too important to lose. We maintain multiple layers of backup and redundancy to ensure your information is always available when you need it.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="text-center p-6 bg-muted/50 rounded-lg border border-border">
                <Cloud className="w-12 h-12 mx-auto mb-4 text-biz-green" />
                <h4 className="font-semibold text-biz-navy mb-2">Regular Backups</h4>
                <p className="text-sm text-muted-foreground">Automated backups run daily with point-in-time recovery capabilities</p>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg border border-border">
                <Activity className="w-12 h-12 mx-auto mb-4 text-biz-green" />
                <h4 className="font-semibold text-biz-navy mb-2">Geographic Redundancy</h4>
                <p className="text-sm text-muted-foreground">Data replicated across multiple geographic regions to prevent regional outages</p>
              </div>
              <div className="text-center p-6 bg-muted/50 rounded-lg border border-border">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-biz-green" />
                <h4 className="font-semibold text-biz-navy mb-2">Recovery Testing</h4>
                <p className="text-sm text-muted-foreground">Regular testing ensures backups can be restored quickly when needed</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-biz-navy mb-3">Our Backup Strategy</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span><strong>Daily Automated Backups:</strong> All customer data backed up every 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span><strong>30-Day Retention:</strong> Backups retained for 30 days for point-in-time recovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span><strong>Encrypted Backups:</strong> All backups encrypted with same standards as live data</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                  <span><strong>Multi-Region Storage:</strong> Backups stored in geographically separated data centers</span>
                </li>
              </ul>
            </div>

            <CalloutBox title="What This Means for You">
              <p className="text-sm text-muted-foreground">
                If something goes wrong—whether it's a technical failure, human error, or natural disaster—we can restore your data. You won't lose months of work because of a single incident.
              </p>
            </CalloutBox>
          </div>
        </SecuritySection>

        {/* Ongoing Security Improvements */}
        <SecuritySection
          icon={TrendingUp}
          title="Ongoing Security Improvements"
          iconColor="text-biz-green"
          bgColor="bg-muted/30"
        >
          <div className="space-y-6">
            <p className="text-foreground leading-relaxed">
              Security is not a one-time achievement—it's an ongoing commitment. We continuously invest in improving our security posture as we grow and as new threats emerge.
            </p>

            <div className="space-y-4 mt-6">
              <div className="p-4 bg-background rounded-lg border-l-4 border-biz-green">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-biz-green mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-biz-navy mb-1">Currently Implemented</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• AES-256 encryption for data at rest</li>
                      <li>• TLS 1.3 for data in transit</li>
                      <li>• Multi-factor authentication (MFA)</li>
                      <li>• Role-based access control</li>
                      <li>• Daily automated backups</li>
                      <li>• 24/7 security monitoring</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background rounded-lg border-l-4 border-amber-600">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-biz-navy mb-1">In Progress</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• SOC 2 Type II certification (audit in progress)</li>
                      <li>• Advanced threat detection with AI/ML</li>
                      <li>• Enhanced audit logging</li>
                      <li>• Penetration testing program</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-background rounded-lg border-l-4 border-blue-600">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-biz-navy mb-1">Roadmap (Next 12 Months)</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• ISO 27001 certification</li>
                      <li>• Bug bounty program</li>
                      <li>• Security awareness training certification</li>
                      <li>• Advanced DDoS protection</li>
                      <li>• Enhanced logging and forensics capabilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <CalloutBox title="What This Means for You">
              <p className="text-sm text-muted-foreground">
                We're not standing still. As BizHealth.ai grows, we're continuously investing in better security tools, more rigorous processes, and industry-recognized certifications. Your data will be more secure tomorrow than it is today.
              </p>
            </CalloutBox>
          </div>
        </SecuritySection>

        {/* Transparency & Limitations */}
        <SecuritySection
          icon={BookOpen}
          title="Transparency & Limitations"
          iconColor="text-biz-green"
        >
          <div className="space-y-6">
            <p className="text-foreground leading-relaxed">
              We believe in honest communication about our security practices. Here's what we do well and where we're still growing:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-xl font-semibold text-biz-navy mb-4 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-biz-green" />
                  What We Do Well
                </h3>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                    <span>Enterprise-grade encryption (AES-256, TLS 1.3)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                    <span>Strong authentication options including MFA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                    <span>Daily automated backups with 30-day retention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                    <span>24/7 security monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                    <span>Industry-leading infrastructure partners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-biz-green mt-0.5 flex-shrink-0" />
                    <span>Transparent communication about security</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-biz-navy mb-4 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-amber-600" />
                  What We're Working On
                </h3>
                <ul className="space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>SOC 2 Type II certification (in progress)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Regular third-party penetration testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Advanced threat detection with AI/ML</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>ISO 27001 certification (planned)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <span>Bug bounty program (planned)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-6 bg-muted/50 rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-biz-navy mb-3">Important Context</h3>
              <p className="text-foreground leading-relaxed mb-4">
                BizHealth.ai is a growing SaaS platform. While we implement enterprise-grade security measures and partner with industry leaders (Google Cloud, Stripe, Anthropic), we're not yet SOC 2 certified.
              </p>
              <p className="text-foreground leading-relaxed">
                We're actively working toward SOC 2 Type II certification and other industry standards. We want you to make an informed decision based on your business's risk tolerance and security requirements.
              </p>
            </div>

            <CalloutBox title="What This Means for You">
              <p className="text-sm text-muted-foreground">
                We're committed to transparency. We won't claim certifications we don't have or overstate our capabilities. We're building strong security from day one and continuously improving. If you have specific compliance requirements, please contact us to discuss whether BizHealth.ai is the right fit for your business.
              </p>
            </CalloutBox>
          </div>
        </SecuritySection>

        {/* Questions & Support Section */}
        <section className="py-12 bg-biz-navy text-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Have Security Questions? We're Here to Help.</h2>
            <p className="text-xl text-white/90 text-center mb-12 max-w-3xl mx-auto">
              Security is important to you, and we take your concerns seriously. Our team is ready to answer your questions.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
                <Mail className="w-12 h-12 text-biz-green mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">General Security Questions</h3>
                <p className="text-white/80 mb-4">
                  For general questions about our security practices, certifications, or policies:
                </p>
                <p className="text-white font-semibold mb-2">security@bizhealth.ai</p>
                <p className="text-white/70 text-sm">Response time: Within 1 business day</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Report a Security Issue</h3>
                <p className="text-white/80 mb-4">
                  If you've discovered a potential security vulnerability, please report it immediately:
                </p>
                <p className="text-white font-semibold mb-2">security@bizhealth.ai</p>
                <p className="text-white/70 text-sm mb-4">We take all reports seriously and will respond within 24 hours.</p>
                <p className="text-white/70 text-xs italic">
                  Please do not publicly disclose vulnerabilities until we've had a chance to address them.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button
                variant="default"
                size="lg"
                className="bg-biz-green hover:bg-biz-green/90 text-white"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Security Team
              </Button>
            </div>
          </div>
        </section>

        {/* Updates Section */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> November 22, 2025
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                We update this page regularly as our security practices evolve. Significant changes will be communicated via email to all customers.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="/privacy" className="text-biz-green hover:underline">Privacy Policy</a>
              <span className="text-muted-foreground">•</span>
              <a href="/terms" className="text-biz-green hover:underline">Terms of Service</a>
              <span className="text-muted-foreground">•</span>
              <a href="/contact" className="text-biz-green hover:underline">Contact Us</a>
              <span className="text-muted-foreground">•</span>
              <a href="/faqs" className="text-biz-green hover:underline">FAQs</a>
            </div>
          </div>
        </section>
      </main>

      <GlobalFooter />
    </>
  );
};

export default Security;
