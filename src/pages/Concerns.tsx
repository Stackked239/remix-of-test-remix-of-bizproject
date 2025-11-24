import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { HandHeart, Lightbulb, Wrench, TrendingUp, FileText, Mail, CheckCircle2, Users, Clock, Target } from 'lucide-react';
import GlobalNavigation from '@/components/GlobalNavigation';
import GlobalFooter from '@/components/GlobalFooter';
import PromotionalBanner from '@/components/PromotionalBanner';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  companyName: z.string().trim().max(100, 'Company name must be less than 100 characters').optional(),
  accountEmail: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters').optional().or(z.literal('')),
  concernType: z.string().min(1, 'Please select the nature of your concern'),
  description: z.string().trim().min(20, 'Please provide at least 20 characters').max(1500, 'Description must be less than 1500 characters'),
  desiredOutcome: z.string().min(1, 'Please select your desired outcome'),
  contactMethod: z.enum(['email', 'phone', 'video'], { required_error: 'Please select a contact method' }),
  phoneNumber: z.string().trim().optional(),
  bestTime: z.string().optional(),
  acknowledgement: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge our policy to proceed',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Concerns = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      companyName: '',
      accountEmail: '',
      concernType: '',
      description: '',
      desiredOutcome: '',
      contactMethod: 'email',
      phoneNumber: '',
      bestTime: '',
      acknowledgement: false,
    },
  });

  const contactMethod = form.watch('contactMethod');
  const showPhoneFields = contactMethod === 'phone' || contactMethod === 'video';

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Store in database
      const { error } = await supabase.from('email_subscribers').insert({
        email: data.email,
        source: 'client_concerns',
        metadata: {
          fullName: data.fullName,
          companyName: data.companyName,
          accountEmail: data.accountEmail,
          concernType: data.concernType,
          description: data.description,
          desiredOutcome: data.desiredOutcome,
          contactMethod: data.contactMethod,
          phoneNumber: data.phoneNumber,
          bestTime: data.bestTime,
        },
      });

      if (error) throw error;

      setIsSuccess(true);
      form.reset();
      window.scrollTo({ top: 0, behavior: 'smooth' });

      toast({
        title: 'Concern Submitted Successfully',
        description: 'Our Client Success team will reach out within 1-2 business days.',
      });
    } catch (error) {
      console.error('Error submitting concern:', error);
      toast({
        title: 'Submission Error',
        description: 'There was an issue submitting your concern. Please try again or email us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <SEO
          title="Thank You - Client Support | BizHealth.ai"
          description="Your concern has been received. Our Client Success team will be in touch soon."
          noindex={true}
        />
        <PromotionalBanner />
        <GlobalNavigation />
        <main className="min-h-screen bg-background pt-40 pb-20">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-biz-green/10 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-biz-green" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-biz-navy mb-6">
              Thank You for Reaching Out
            </h1>
            <p className="text-lg text-biz-grey mb-4">
              We've received your concern and a member of our Client Success team will be in touch within 1-2 business days.
            </p>
            <p className="text-base text-biz-grey mb-8">
              In the meantime, you can explore our Help Center or continue using your BizHealth.ai dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg">
                <Link to="/portal">Return to Dashboard</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/faqs">Visit Help Center</Link>
              </Button>
            </div>
          </div>
        </main>
        <GlobalFooter />
      </>
    );
  }

  return (
    <>
      <SEO
        title="Client Support & Concerns | BizHealth.ai"
        description="Having an issue with BizHealth.ai? Our Client Success team is here to help. Share your concerns and let's work together toward a solution."
        keywords="BizHealth.ai support, client concerns, business health analysis help, customer service, technical support"
        canonical="https://bizhealth.ai/concerns"
      />
      <PromotionalBanner />
      <GlobalNavigation />

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-biz-navy to-[#2a3168] pt-40 pb-16 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <div className="mb-6 flex justify-center">
            <HandHeart className="w-16 h-16 text-biz-green" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            We're Here to Help
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Your success matters to us. If something isn't working the way you expected, let's work together to make it right.
          </p>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-16 bg-background">
        <div className="max-w-[720px] mx-auto px-6 text-center">
          <p className="text-lg text-biz-grey leading-relaxed mb-6">
            At BizHealth.ai, we're committed to delivering real value to every business owner who trusts us with their business health journey. We understand that investing in tools for your business is a significant decision, and we take that trust seriously.
          </p>
          <p className="text-lg text-biz-grey leading-relaxed">
            If your experience hasn't met your expectations, we genuinely want to understand why—and explore every option to help you get the results you're looking for.
          </p>
        </div>
      </section>

      {/* How We Can Help */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-biz-navy text-center mb-12">
            How We Can Help
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow p-8">
              <div className="mb-4">
                <Lightbulb className="w-10 h-10 text-biz-green" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-biz-navy mb-3">
                Personalized Guidance
              </h3>
              <p className="text-biz-grey">
                Not sure how to get the most from your Business Health Analysis? Our team can walk you through your reports, explain insights, and help you take action on recommendations.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow p-8">
              <div className="mb-4">
                <Wrench className="w-10 h-10 text-biz-green" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-biz-navy mb-3">
                Technical Support
              </h3>
              <p className="text-biz-grey">
                Experiencing technical issues or errors? We'll investigate promptly and ensure you have full access to the features and functionality you've subscribed to.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow p-8">
              <div className="mb-4">
                <TrendingUp className="w-10 h-10 text-biz-green" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-biz-navy mb-3">
                Plan Optimization
              </h3>
              <p className="text-biz-grey">
                Wondering if your current plan is the right fit? We can review your needs and recommend adjustments that better align with your business goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Our Policy */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-biz-navy mb-8">
            A Note on Our Policy
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-biz-grey leading-relaxed mb-4">
              BizHealth.ai operates on a digital service model where value is delivered immediately upon access to our platform and reports. Because of the nature of digital products and the proprietary insights generated specifically for your business, we do not offer refunds or money-back guarantees.
            </p>
            <p className="text-biz-grey leading-relaxed mb-4">
              However, this policy doesn't mean we'll leave you without support. Quite the opposite—we're motivated to ensure every client finds genuine value in our platform. If something isn't working, we'd much rather fix it than lose a business owner we could be helping.
            </p>
            <p className="text-biz-grey leading-relaxed">
              That's why we encourage you to share your concerns with us. In many cases, what feels like a reason to request a refund is actually something we can resolve together.
            </p>
          </div>

          {/* Callout Box */}
          <div className="mt-8 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border-l-4 border-biz-green p-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-biz-green flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-biz-grey">
                  <strong className="text-biz-navy">Before submitting a concern,</strong> you might find quick answers in our Help Center or FAQ. Many common questions—from understanding your reports to adjusting your subscription—are addressed there.
                </p>
                <Link to="/faqs" className="text-biz-green hover:underline font-medium mt-2 inline-block">
                  Visit Help Center →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Concerns Form */}
      <section className="py-16 bg-background">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="bg-background rounded-lg shadow-lg p-8 md:p-10 border">
            <h2 className="text-3xl font-bold text-biz-navy mb-3">
              Share Your Concerns
            </h2>
            <p className="text-biz-grey mb-8">
              Tell us what's on your mind, and a member of our Client Success team will personally review your situation and respond within 1-2 business days.
            </p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@company.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your business name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accountEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Email (if different) (Optional)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email used for BizHealth.ai account" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="concernType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nature of Your Concern *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Please select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="understanding-reports">I need help understanding my reports</SelectItem>
                          <SelectItem value="technical-issues">I'm experiencing technical issues</SelectItem>
                          <SelectItem value="expectations">The platform isn't meeting my expectations</SelectItem>
                          <SelectItem value="billing">I have questions about my subscription or billing</SelectItem>
                          <SelectItem value="plan-options">I'd like to discuss my plan options</SelectItem>
                          <SelectItem value="other">Other concern</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please Describe Your Concern *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please share the details of your concern. The more context you provide, the better we can assist you."
                          className="min-h-[120px]"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setCharCount(e.target.value.length);
                          }}
                        />
                      </FormControl>
                      <div className="text-sm text-biz-grey text-right">
                        {charCount} / 1500 characters
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="desiredOutcome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What Outcome Would Help You Most? *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Please select..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="call-meeting">A call or meeting to walk through my questions</SelectItem>
                          <SelectItem value="technical-support">Technical support to resolve an issue</SelectItem>
                          <SelectItem value="guidance">Guidance on how to better use the platform</SelectItem>
                          <SelectItem value="subscription-info">Information about changing my subscription</SelectItem>
                          <SelectItem value="discuss-options">I'm not sure—I'd like to discuss options</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Preferred Contact Method *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="email" id="email" />
                            <Label htmlFor="email" className="font-normal cursor-pointer">Email</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="phone" id="phone" />
                            <Label htmlFor="phone" className="font-normal cursor-pointer">Phone call</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="video" id="video" />
                            <Label htmlFor="video" className="font-normal cursor-pointer">Video call</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {showPhoneFields && (
                  <>
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bestTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Best Time to Reach You *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a time..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9am-12pm EST)</SelectItem>
                              <SelectItem value="afternoon">Afternoon (12pm-5pm EST)</SelectItem>
                              <SelectItem value="flexible">I'm flexible</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <FormField
                  control={form.control}
                  name="acknowledgement"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I understand that BizHealth.ai does not offer refunds, and I'm submitting this form to explore how the team can help address my concerns. *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit My Concern'}
                </Button>

                <p className="text-sm text-biz-grey text-center">
                  Your information is handled in accordance with our{' '}
                  <Link to="/privacy" className="text-biz-green hover:underline">
                    Privacy Policy
                  </Link>
                  . We'll only use these details to respond to your inquiry and improve your experience.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-biz-navy text-center mb-12">
            What Happens After You Submit
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-biz-green/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-biz-green" />
                </div>
              </div>
              <div className="mb-2 text-biz-green font-bold text-lg">Step 1</div>
              <h3 className="text-xl font-bold text-biz-navy mb-3">
                We Review Your Concern
              </h3>
              <p className="text-biz-grey">
                A member of our Client Success team will personally read your submission and assess how we can best help.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-biz-green/10 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-biz-green" />
                </div>
              </div>
              <div className="mb-2 text-biz-green font-bold text-lg">Step 2</div>
              <h3 className="text-xl font-bold text-biz-navy mb-3">
                We Reach Out
              </h3>
              <p className="text-biz-grey">
                Within 1-2 business days, you'll hear from us via your preferred contact method with options and next steps.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-biz-green/10 flex items-center justify-center">
                  <Target className="w-8 h-8 text-biz-green" />
                </div>
              </div>
              <div className="mb-2 text-biz-green font-bold text-lg">Step 3</div>
              <h3 className="text-xl font-bold text-biz-navy mb-3">
                We Work Toward Resolution
              </h3>
              <p className="text-biz-grey">
                Whether it's a walkthrough call, technical fix, or plan adjustment, we'll do everything we can to ensure you find value in BizHealth.ai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Resources */}
      <section className="py-16 bg-background">
        <div className="max-w-[1000px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-biz-navy text-center mb-12">
            Other Ways to Get Help
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resource Card 1 */}
            <div className="bg-muted/50 rounded-lg p-8 hover:shadow-md transition-shadow">
              <div className="mb-4">
                <FileText className="w-10 h-10 text-biz-green" />
              </div>
              <h3 className="text-xl font-bold text-biz-navy mb-3">
                Help Center & FAQ
              </h3>
              <p className="text-biz-grey mb-4">
                Find answers to common questions about reports, subscriptions, and platform features.
              </p>
              <Link to="/faqs" className="text-biz-green hover:underline font-medium inline-flex items-center">
                Browse Help Articles →
              </Link>
            </div>

            {/* Resource Card 2 */}
            <div className="bg-muted/50 rounded-lg p-8 hover:shadow-md transition-shadow">
              <div className="mb-4">
                <Mail className="w-10 h-10 text-biz-green" />
              </div>
              <h3 className="text-xl font-bold text-biz-navy mb-3">
                Direct Support
              </h3>
              <p className="text-biz-grey mb-4">
                For general inquiries, reach our support team directly.
              </p>
              <a href="mailto:support@bizhealth.ai" className="text-biz-green hover:underline font-medium inline-flex items-center">
                Email support@bizhealth.ai →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Reassurance */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <p className="text-lg text-biz-grey leading-relaxed mb-6">
            We know that behind every concern is a business owner working hard to build something meaningful. That's exactly who BizHealth.ai was created to serve. Whatever brought you to this page, we're grateful you're giving us the opportunity to make things right.
          </p>
          <p className="text-xl font-semibold text-biz-navy mb-4">
            Your success is our success. Let's figure this out together.
          </p>
          <p className="text-base text-biz-grey italic">
            — The BizHealth.ai Client Success Team
          </p>
        </div>
      </section>

      <GlobalFooter />
    </>
  );
};

export default Concerns;
