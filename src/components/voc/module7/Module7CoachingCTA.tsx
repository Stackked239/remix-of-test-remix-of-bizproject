import { Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Module7CoachingCTA = () => {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[hsl(var(--biz-navy))]/10 to-[hsl(var(--biz-green))]/10 border-2 border-[hsl(var(--biz-green))] rounded-2xl p-8 md:p-10">
          <div className="text-center mb-6">
            <span className="inline-block px-3 py-1 rounded-full bg-[hsl(var(--biz-gold))]/20 text-[hsl(var(--biz-gold))] text-sm font-bold mb-4">
              Expert Support
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Ready to Take Your VoC Program to Scale?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get expert help setting up advanced dashboards, training your team, and building the culture that makes listening stick.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 max-w-xl mx-auto">
            {[
              "1-on-1 strategy session with VoC expert",
              "Custom dashboard setup",
              "Team training workshop",
              "90-day implementation support"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-foreground">
                <Check className="w-5 h-5 text-[hsl(var(--biz-green))]" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-[hsl(var(--biz-green))] hover:bg-[hsl(var(--biz-green))]/90 text-white gap-2">
              <Link to="/bizguides">
                <Calendar className="w-5 h-5" />
                Schedule VoC Coaching Session
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-3">Free 30-minute discovery call</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module7CoachingCTA;
