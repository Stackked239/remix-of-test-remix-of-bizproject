import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Phone, Star, MessageCircle, Mail, TrendingUp, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Module2Component2Props {
  userSegment: string | null;
  onComplete: () => void;
}

const Module2Component2 = ({ userSegment, onComplete }: Module2Component2Props) => {
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const channels = [
    {
      id: 'customer-service',
      icon: Phone,
      title: 'Customer Service Interactions',
      color: 'bg-blue-500',
      methods: ['Support tickets', 'Live chat transcripts', 'Phone call notes', 'Help desk systems'],
      reveals: 'Operational pain points, product confusion, broken processes'
    },
    {
      id: 'reviews',
      icon: Star,
      title: 'Online Reviews',
      color: 'bg-amber-500',
      methods: ['Google Business Profile', 'Yelp', 'Industry platforms (Trustpilot, G2, Capterra)'],
      reveals: 'Public sentiment, competitive positioning, deal-breakers'
    },
    {
      id: 'social',
      icon: MessageCircle,
      title: 'Social Media',
      color: 'bg-pink-500',
      methods: ['Direct mentions (@yourcompany)', 'Brand hashtags', 'Comments on your posts', 'Industry discussions'],
      reveals: 'Real-time sentiment, trending issues, organic advocacy'
    },
    {
      id: 'email',
      icon: Mail,
      title: 'Email & Direct Communication',
      color: 'bg-emerald-500',
      methods: ['Customer emails', 'Newsletter replies', 'Contact form submissions'],
      reveals: 'Detailed issues, feature requests, relationship insights'
    },
    {
      id: 'sales',
      icon: TrendingUp,
      title: 'Sales & Onboarding',
      color: 'bg-purple-500',
      methods: ['Sales call notes', 'Demo feedback', 'Onboarding session notes'],
      reveals: 'Buying objections, expectations, early experience issues'
    },
  ];

  const segmentRecommendations: Record<string, { title: string; channels: { name: string; reason: string }[] }> = {
    launch: {
      title: 'Top 3 Channels for Launch Stage',
      channels: [
        { name: 'Support Tickets', reason: 'Catch product issues early' },
        { name: 'Google Reviews', reason: 'Build early reputation' },
        { name: 'Customer Interviews', reason: 'Deep insights, small volume' },
      ]
    },
    growth: {
      title: 'Top 3 Channels for Growth Stage',
      channels: [
        { name: 'Support Tickets', reason: 'Your growing base needs support' },
        { name: 'Google Reviews', reason: 'Track reputation as you scale' },
        { name: 'Email Feedback', reason: 'Personal feedback from expanding relationships' },
      ]
    },
    scaling: {
      title: 'Top 3 Channels for Scaling Stage',
      channels: [
        { name: 'Social Media', reason: 'Monitor brand sentiment at scale' },
        { name: 'Support Data', reason: 'Identify systemic issues' },
        { name: 'Sales Notes', reason: 'Understand deal blockers' },
      ]
    },
    enterprise: {
      title: 'Top 3 Channels for Enterprise Stage',
      channels: [
        { name: 'All Channels Integrated', reason: 'Full omnichannel system' },
        { name: 'Strategic Account Feedback', reason: 'Key customer relationships' },
        { name: 'Competitive Intelligence', reason: 'Market positioning data' },
      ]
    },
  };

  const currentRecommendation = userSegment ? segmentRecommendations[userSegment] : segmentRecommendations['growth'];

  const handleConfirm = () => {
    setConfirmed(true);
    onComplete();
  };

  return (
    <section id="component-2" className="py-16 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">
            2
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Omnichannel Listening
          </h2>
        </motion.div>

        {/* The Problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2">THE PROBLEM: Single-Channel Blindness</h3>
              <p className="text-amber-700 dark:text-amber-300 mb-3">
                Collecting feedback from one or two places and thinking you're done.
              </p>
              <p className="text-amber-800 dark:text-amber-200 font-medium mb-3">
                Reality: Customers share feedback EVERYWHERE. If you're only looking in one place, you have massive blind spots.
              </p>
              <div className="bg-amber-100 dark:bg-amber-900/30 rounded-lg p-4 mt-3">
                <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-2">Different customers use different channels:</p>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• Your happiest customers → leave Google reviews</li>
                  <li>• Frustrated customers → vent on social media</li>
                  <li>• Your biggest spenders → email directly</li>
                  <li>• Technical users → post on forums</li>
                </ul>
                <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mt-2">
                  If you only monitor one channel, you only hear one voice.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5 Channel Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">The 5 Channel Categories</h3>
          <div className="space-y-3">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="bg-card border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedChannel(expandedChannel === channel.id ? null : channel.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${channel.color} rounded-lg flex items-center justify-center`}>
                      <channel.icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-foreground">{channel.title}</span>
                  </div>
                  {expandedChannel === channel.id ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                
                {expandedChannel === channel.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-4 border-t"
                  >
                    <div className="pt-4">
                      <h4 className="font-medium text-foreground mb-2">Methods:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                        {channel.methods.map((method) => (
                          <li key={method} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                            {method}
                          </li>
                        ))}
                      </ul>
                      <div className="bg-[hsl(var(--biz-green))]/10 border border-[hsl(var(--biz-green))]/20 rounded-lg p-3">
                        <p className="text-sm">
                          <span className="font-medium text-[hsl(var(--biz-green))]">What this reveals: </span>
                          <span className="text-foreground">{channel.reveals}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Network Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-card border rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-bold text-center text-foreground mb-6">Your Customer Feedback Network</h3>
          <div className="flex flex-col items-center">
            {/* Center - Business */}
            <div className="w-16 h-16 bg-[hsl(var(--biz-blue))] rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl">⭐</span>
            </div>
            <p className="font-semibold text-foreground mb-6">YOUR BUSINESS</p>
            
            {/* Channels radiating out */}
            <div className="grid grid-cols-5 gap-4 w-full max-w-lg">
              {channels.map((channel) => (
                <div key={channel.id} className="flex flex-col items-center">
                  <div className="w-2 h-8 bg-muted mb-2" />
                  <div className={`w-10 h-10 ${channel.color} rounded-lg flex items-center justify-center`}>
                    <channel.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-1">{channel.title.split(' ')[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Segment-Specific Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[hsl(var(--biz-gold))]/10 to-[hsl(var(--biz-blue))]/10 border rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-foreground mb-4">
            {currentRecommendation.title}
          </h3>
          {userSegment && (
            <p className="text-sm text-muted-foreground mb-4">
              Based on your selection from Module 1: <span className="font-medium text-foreground capitalize">{userSegment}</span> stage
            </p>
          )}
          
          <div className="space-y-3 mb-6">
            {currentRecommendation.channels.map((channel, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-background/50 rounded-lg p-4"
              >
                <div className="w-8 h-8 bg-[hsl(var(--biz-blue))] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{channel.name}</p>
                  <p className="text-sm text-muted-foreground">{channel.reason}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleConfirm}
            disabled={confirmed}
            variant="outline"
            className="w-full md:w-auto"
          >
            {confirmed ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-[hsl(var(--biz-green))]" />
                Got It!
              </span>
            ) : (
              "Got It, Moving On"
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Module2Component2;
