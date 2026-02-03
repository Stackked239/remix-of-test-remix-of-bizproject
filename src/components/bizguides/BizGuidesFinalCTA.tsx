import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Wrench, Users, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ScheduleSessionModal from "./ScheduleSessionModal";

const crossHubLinks = [
  {
    icon: GraduationCap,
    name: "BizGrowth Academy",
    description: "Learn and scale faster with training courses tailored to your diagnostic gaps.",
    href: "/bizgrowth"
  },
  {
    icon: Wrench,
    name: "BizTools Resource Center",
    description: "Access templates, toolkits, and playbooks to implement recommendations faster.",
    href: "/biztools"
  },
  {
    icon: Users,
    name: "BizLeaDer Development",
    description: "Build leadership skills and team capabilities with targeted development resources.",
    href: "/bizleader"
  },
  {
    icon: BarChart3,
    name: "Core BizHealth Diagnostics",
    description: "Return to take another assessment or share your report with your team.",
    href: "/pricing"
  }
];

const BizGuidesFinalCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-[hsl(var(--biz-teal))]/5 to-background">
        <div className="container mx-auto px-6">
          {/* Final CTA Block */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-3">
              Ready to Turn Insights Into Action?
            </h2>
            <p className="font-open-sans text-lg text-muted-foreground mb-8">
              Your next move is clear. Choose the path that fits your timeline and budget.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-[hsl(var(--biz-teal))] text-[hsl(var(--biz-teal))] hover:bg-[hsl(var(--biz-teal))]/10 font-montserrat font-semibold px-6"
              >
                <Link to="/blog">
                  Browse Free Resources
                </Link>
              </Button>
              
              <Button 
                size="lg"
                onClick={() => setIsModalOpen(true)}
                className="bg-[hsl(var(--biz-teal))] hover:bg-[hsl(180,100%,30%)] text-background font-montserrat font-semibold px-8 shadow-lg shadow-[hsl(var(--biz-teal))]/20"
              >
                Schedule a Coaching Session
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-[hsl(var(--biz-teal))] text-[hsl(var(--biz-teal))] hover:bg-[hsl(var(--biz-teal))]/10 font-montserrat font-semibold px-6"
              >
                <Link to="/bizguides/request-custom">
                  Request Custom Solution
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Cross-Hub Navigation */}
          <motion.div 
            className="max-w-4xl mx-auto pt-12 border-t border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-montserrat font-semibold text-lg text-muted-foreground text-center mb-8">
              Explore the Full BizHealth.ai Growth Suite
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {crossHubLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.href}
                  className="group p-4 rounded-lg hover:bg-[hsl(var(--biz-teal))]/5 transition-colors text-left"
                >
                  <link.icon className="w-7 h-7 text-[hsl(var(--biz-teal))] mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-montserrat font-semibold text-[15px] text-foreground mb-1 group-hover:text-[hsl(var(--biz-teal))] transition-colors">
                    {link.name}
                  </h4>
                  <p className="font-open-sans text-[13px] text-muted-foreground leading-snug">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule Session Modal */}
      <ScheduleSessionModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </>
  );
};

export default BizGuidesFinalCTA;
