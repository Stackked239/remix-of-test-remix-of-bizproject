import { Shield, Lock, Users, CheckCircle } from 'lucide-react';

const SecurityHero = () => {
  return (
    <section className="relative bg-biz-navy text-white py-20 md:py-32 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated shield icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Shield className="w-20 h-20 text-biz-green animate-pulse" strokeWidth={1.5} />
              <div className="absolute inset-0 bg-biz-green/20 blur-xl rounded-full animate-pulse" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your Business Data Deserves Protection
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-6 leading-relaxed">
            At BizHealth.ai, we understand that you're trusting us with your most sensitive business information—financial records, operational data, and strategic plans. We take that responsibility seriously.
          </p>

          <p className="text-lg text-white/80 leading-relaxed max-w-3xl mx-auto">
            This page explains exactly how we protect your data, what security measures we've implemented, and what we're continuously improving to keep your information safe.
          </p>

          {/* Trust signals */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-biz-green/10 flex items-center justify-center border-2 border-biz-green">
                <Lock className="w-8 h-8 text-biz-green" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Bank-Level Encryption</h3>
              <p className="text-sm text-white/70">
                AES-256 encryption protects your data at rest and TLS 1.3 secures it in transit
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-biz-green/10 flex items-center justify-center border-2 border-biz-green">
                <Users className="w-8 h-8 text-biz-green" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Enterprise Partners</h3>
              <p className="text-sm text-white/70">
                Built on Google Cloud, Stripe, and Anthropic—industry leaders in security
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-biz-green/10 flex items-center justify-center border-2 border-biz-green">
                <CheckCircle className="w-8 h-8 text-biz-green" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Your Data, Your Control</h3>
              <p className="text-sm text-white/70">
                Access, export, or delete your data at any time—complete transparency
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecurityHero;
