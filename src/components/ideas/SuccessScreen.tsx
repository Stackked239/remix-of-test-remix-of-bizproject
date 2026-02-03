import { Check, Compass, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface SuccessScreenProps {
  ideaNumber: number;
  email: string;
  onReset: () => void;
}

const SuccessScreen = ({ ideaNumber, email, onReset }: SuccessScreenProps) => {
  const nextSteps = [
    "You'll receive a confirmation email within a few minutes",
    "Our team will review your idea within 2-4 weeks",
    "We'll send status updates every two weeks until a decision is made",
    "If approved, you'll be invited to beta test (if you opted in)"
  ];

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-12 text-center">
      {/* Animated Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-biz-green to-biz-green/80 flex items-center justify-center mx-auto mb-6 shadow-lg"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Check className="w-10 h-10 text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-montserrat font-bold text-2xl sm:text-3xl text-biz-navy mb-2"
      >
        🎉 Thank You! Your Idea Is On Its Way
      </motion.h2>

      {/* Idea Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-50 rounded-xl p-4 mb-8 inline-block"
      >
        <p className="font-source-sans text-[#5C5C5C] text-sm">
          Idea <span className="font-semibold text-biz-navy">#{ideaNumber}</span>
        </p>
        <p className="font-source-sans text-[#5C5C5C] text-sm">
          Submitted to: <span className="font-semibold text-biz-navy">{email}</span>
        </p>
      </motion.div>

      {/* What Happens Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-left mb-8"
      >
        <h3 className="font-montserrat font-bold text-lg text-biz-navy mb-4 text-center">
          What Happens Next
        </h3>
        <ul className="space-y-3">
          {nextSteps.map((step, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-biz-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-biz-green" />
              </div>
              <span className="font-source-sans text-[#5C5C5C]">{step}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          onClick={onReset}
          className="flex-1 h-12 bg-gradient-to-r from-biz-green to-biz-green/90 hover:from-biz-green/90 hover:to-biz-green/80 text-white font-montserrat font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          Submit Another Idea
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <Link to="/resources" className="flex-1">
          <Button
            variant="outline"
            className="w-full h-12 border-2 border-slate-200 text-biz-navy font-montserrat font-semibold rounded-xl hover:bg-slate-50 hover:border-biz-green/50 transition-all"
          >
            <Compass className="mr-2 w-5 h-5" />
            Explore Our Resources
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default SuccessScreen;
