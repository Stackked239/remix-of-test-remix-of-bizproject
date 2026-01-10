import { BarChart3, Users, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FooterCTA = () => {
  return (
    <section 
      className="py-20"
      style={{
        background: "linear-gradient(135deg, #242553 0%, #1a1b3d 50%, #242553 100%)"
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="font-montserrat font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-4">
            Not Ready to Submit an Idea?
          </h2>
          <p className="font-source-sans text-lg text-white/80">
            Explore what we're building and stay connected
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA - Roadmap */}
          <Link to="/resources">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-white text-biz-navy hover:bg-white/90 font-montserrat font-semibold px-6 py-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              <BarChart3 className="mr-2 w-5 h-5" />
              See Our Roadmap
            </Button>
          </Link>

          {/* Secondary CTAs */}
          <Link to="/about">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white bg-transparent hover:bg-white/10 font-montserrat font-semibold px-6 py-6 rounded-xl transition-all duration-300"
            >
              <Users className="mr-2 w-5 h-5" />
              Join Our Community
            </Button>
          </Link>

          <Link to="/contact">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white bg-transparent hover:bg-white/10 font-montserrat font-semibold px-6 py-6 rounded-xl transition-all duration-300"
            >
              <Bell className="mr-2 w-5 h-5" />
              Get Product Updates
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FooterCTA;
