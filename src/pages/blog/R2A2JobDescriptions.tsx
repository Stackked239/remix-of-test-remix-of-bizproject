import GlobalNavigation from "@/components/GlobalNavigation";
import GlobalFooter from "@/components/GlobalFooter";
import PromotionalBanner from "@/components/PromotionalBanner";
import SEO from "@/components/SEO";
import BlogHeroSection from "@/components/BlogHeroSection";
import SocialShareButtons from "@/components/SocialShareButtons";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Users, Target, Shield, Key } from "lucide-react";
import heroImage from "@/assets/images/r2a2-job-descriptions-role-clarity-small-business-teams.jpg";

const R2A2JobDescriptions = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "R2A2 Job Descriptions: How Modern Role Clarity Transforms Small Business Teams",
    "description": "Learn how R2A2 job descriptions—Role, Responsibilities, Accountability, and Authority—transform small business teams with better hiring, faster onboarding, and stronger retention.",
    "image": "https://bizhealth.ai/og-images/og-r2a2-job-descriptions-role-clarity.jpg",
    "author": {
      "@type": "Organization",
      "name": "BizHealth.ai Research Team",
      "url": "https://bizhealth.ai/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BizHealth.ai",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bizhealth.ai/lovable-uploads/3e34ee5c-64f6-4ef4-94c5-c8f6caee8783.png"
      }
    },
    "datePublished": "2026-01-12",
    "dateModified": "2026-01-12",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://bizhealth.ai/blog/r2a2-job-descriptions-role-clarity-small-business-teams"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="R2A2 Job Descriptions: Role Clarity for SMB Teams | BizHealth.ai"
        description="Learn how R2A2 job descriptions—Role, Responsibilities, Accountability, and Authority—transform small business teams with better hiring, faster onboarding, and stronger retention."
        keywords="R2A2 job descriptions, role clarity small business, job description framework, employee accountability, delegation authority, SMB hiring, team management, employee retention, job roles responsibilities, role definition framework, small business HR, team performance, onboarding best practices, role accountability, decision authority"
        canonical="https://bizhealth.ai/blog/r2a2-job-descriptions-role-clarity-small-business-teams"
        ogImage="/og-images/og-r2a2-job-descriptions-role-clarity.jpg"
      />
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>

      <PromotionalBanner />
      <GlobalNavigation />

      <main>
        <BlogHeroSection
          title="R2A2 Job Descriptions: How Modern Role Clarity Transforms Small Business Teams"
          author="BizHealth.ai Research Team"
          publishDate="January 12, 2026"
          readTime="10 min read"
          heroImage={heroImage}
          heroImageAlt="Small business team collaborating in manufacturing facility - role clarity and accountability in action through R2A2 job descriptions framework"
          categories={[
            { label: "Operations", href: "/blog/operations" },
            { label: "Business Leadership", href: "/blog/business-leadership" },
            { label: "Business Strategy", href: "/blog/business-strategy" },
          ]}
          shareDescription="Learn how R2A2 job descriptions—Role, Responsibilities, Accountability, and Authority—transform small business teams."
        />

        {/* Article Content */}
        <article className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto prose prose-lg">
              
              {/* The Problem Section */}
              <h2 className="text-3xl font-bold text-foreground mb-6">The Problem with Traditional Job Descriptions (and Why Your Team Feels Stuck)</h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Most small and mid-sized businesses are running on job descriptions that look and feel like they were cloned from a generic HR template.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                They list tasks. They list skills. They might even list years of experience and a few bullet points about "team player" and "fast-paced environment."
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                And then, a few weeks after hiring, the same pattern shows up:
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">A new hire keeps asking, "Is this mine or someone else's?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Decisions stall because no one is sure who has the final say.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">People are "responsible" for outcomes but don't have the authority to make changes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">You still get pulled into decisions you thought you'd delegated.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Frustration grows on both sides—yours and theirs.</span>
                </li>
              </ul>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nothing is explicitly broken, but nothing is truly working either.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                This is where <strong className="text-foreground">R2A2 job descriptions</strong> come in. Instead of job descriptions that only describe tasks, R2A2 designs roles around <strong className="text-foreground">Roles, Responsibilities, Accountability, and Authority</strong>—the four elements that actually drive performance, ownership, and retention in a growing business.
              </p>

              {/* What Is R2A2 Section */}
              <h2 className="text-3xl font-bold text-foreground mb-6">What Is R2A2? The Four Pieces Traditional JDs Ignore</h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                R2A2 stands for:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-muted rounded-lg p-6 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-primary" />
                    <h3 className="font-bold text-foreground">Role</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">Where this seat fits in the bigger picture</p>
                </div>
                <div className="bg-muted rounded-lg p-6 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-6 h-6 text-primary" />
                    <h3 className="font-bold text-foreground">Responsibilities</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">What this role actually does</p>
                </div>
                <div className="bg-muted rounded-lg p-6 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="w-6 h-6 text-primary" />
                    <h3 className="font-bold text-foreground">Accountability</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">What this role ultimately owns</p>
                </div>
                <div className="bg-muted rounded-lg p-6 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <Key className="w-6 h-6 text-primary" />
                    <h3 className="font-bold text-foreground">Authority</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">What this role is empowered to decide</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Most traditional job descriptions cover only pieces of the first two, and then vaguely imply the rest. R2A2 makes each element explicit, so both the business and the employee know where this role fits, what this role does, what this role owns, and what this role is empowered to decide.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                Think of it as moving from a task list to a clarity framework.
              </p>

              {/* 1. Role Section */}
              <h2 className="text-3xl font-bold text-foreground mb-6">1. Role: Where This Seat Fits in the Bigger Picture</h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong className="text-foreground">Question this quadrant answers:</strong> "Why does this job exist and how does it contribute to the business?"
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                This goes beyond the title. It explains how the role connects to strategy, customers, and the rest of the team.
              </p>
              
              <div className="bg-muted/50 border-l-4 border-destructive p-6 mb-6">
                <p className="text-muted-foreground mb-2"><strong className="text-foreground">Instead of just:</strong></p>
                <p className="text-muted-foreground italic">"Title: Operations Coordinator"</p>
              </div>
              
              <div className="bg-muted/50 border-l-4 border-primary p-6 mb-8">
                <p className="text-muted-foreground mb-2"><strong className="text-foreground">R2A2 defines:</strong></p>
                <p className="text-muted-foreground italic">"As our Operations Coordinator, you are the link between sales, scheduling, and delivery. Your role is to keep work moving smoothly from customer commitment through completion so clients experience reliable, on-time service—and our team can plan their week without chaos."</p>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">Why this matters:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">New hires immediately understand why the job matters, not just what to do.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Existing employees see how their work connects to results, not just tasks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Leaders have a clear answer when someone asks, "Do we really need this role?"</span>
                </li>
              </ul>

              {/* 2. Responsibilities Section */}
              <h2 className="text-3xl font-bold text-foreground mb-6">2. Responsibilities: What This Role Actually Does</h2>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong className="text-foreground">Question this quadrant answers:</strong> "What are the core activities and outputs of this job?"
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Traditional job descriptions often stop here, and even here they go wrong in two ways: either they're so high-level they're useless, or they're so detailed they become unmanageable and outdated in three months.
              </p>
              
              <h3 className="text-xl font-bold text-foreground mb-4">R2A2 responsibilities are:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Action-oriented</strong> (verbs like coordinate, analyze, prepare, follow up).</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Outcome-linked</strong> (not just "send reports," but "send weekly service reports so leadership can spot trends and schedule capacity").</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground"><strong className="text-foreground">Prioritized</strong> (5–10 core responsibilities, not 40 scattered tasks).</span>
                </li>
              </ul>
              
              <div className="bg-muted/50 border-l-4 border-primary p-6 mb-8">
                <p className="text-muted-foreground mb-2"><strong className="text-foreground">Example:</strong></p>
                <p className="text-muted-foreground">Instead of "Responsible for customer scheduling and communication," R2A2 frames it as: <em>"Owns the weekly customer schedule: confirms service appointments, adjusts routes based on capacity, and communicates changes to customers within 24 hours."</em></p>
              </div>

              {/* 3. Accountability Section */}
              <h2 className="text-3xl font-bold text-foreground mb-6">3. Accountability: What This Role Ultimately Owns</h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                This is where most businesses quietly break their own culture. People are "responsible" for tasks, but no one is clearly accountable for outcomes.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong className="text-foreground">Question this quadrant answers:</strong> "If this goes well or badly, whose name is on it?"
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">Accountability is not about blame.</strong> It's about clarity: what success looks like for this role, which metrics or outcomes are theirs to own, and what they're expected to drive, not just support.
              </p>
              
              <div className="bg-muted rounded-lg p-6 mb-8 border border-border">
                <h4 className="font-bold text-foreground mb-4">Example: Service Manager Accountability</h4>
                <ul className="space-y-2">
                  <li className="text-muted-foreground">• "Owns on-time completion of scheduled jobs."</li>
                  <li className="text-muted-foreground">• "Owns customer satisfaction scores for service calls."</li>
                  <li className="text-muted-foreground">• "Owns first-visit fix rate."</li>
                </ul>
                <p className="text-muted-foreground text-sm mt-4 italic">This doesn't mean they personally do all the work. It means they are the one who makes sure the outcomes happen.</p>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-8 font-semibold">
                When everyone is "kind of accountable," no one is.
              </p>

              {/* 4. Authority Section */}
              <h2 className="text-3xl font-bold text-foreground mb-6">4. Authority: What This Role Can Decide Without Asking Permission</h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                This is the most neglected part of most roles—and where burnout and bottlenecks are created.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong className="text-foreground">Question this quadrant answers:</strong> "What decisions can this person make on their own, and where do they need to check in?"
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Without clarity on authority, you get people who are accountable for outcomes but must ask permission for every decision, owners and managers pulled into endless tactical choices, and teams afraid to act because they don't know if they're "allowed."
              </p>
              
              <h3 className="text-xl font-bold text-foreground mb-4">R2A2 makes authority explicit:</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">"Can approve customer credits up to $200 without manager sign-off."</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">"Can adjust daily schedule to address urgent customer issues, as long as changes are logged and customers are informed."</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">"Can select and onboard vendors within the approved list; new vendor additions require leadership approval."</span>
                </li>
              </ul>
              
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mb-8">
                <p className="text-foreground font-semibold mb-2">When accountability and authority are misaligned:</p>
                <p className="text-muted-foreground italic">"I'm responsible if it fails, but I'm not allowed to fix it."</p>
              </div>

              {/* Why R2A2 Outperforms Section */}
              <h2 className="text-3xl font-bold text-foreground mb-6">Why R2A2 Outperforms Traditional Job Descriptions</h2>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                Switching from traditional JDs to R2A2 isn't just an HR formatting tweak. It changes outcomes in five important ways:
              </p>
              
              <h3 className="text-xl font-bold text-foreground mb-4">1. Better Hiring Decisions</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Candidates no longer see a vague "laundry list of tasks." They see how the role fits in the business, what they'll be expected to own, and what level of decision-making they'll have. That clarity attracts candidates who want ownership, filters out candidates who want direction but not accountability, and reduces "surprise" mismatches once they start.
              </p>
              
              <h3 className="text-xl font-bold text-foreground mb-4">2. Faster Onboarding and Ramp-Up</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                New hires don't spend the first 60–90 days asking "Is this my decision or yours?" or "Who owns this outcome?" Instead, they have a clear map of their work, known metrics or outcomes they're accountable for, and clear boundaries for decision-making. Managers spend less time clarifying and more time coaching.
              </p>
              
              <h3 className="text-xl font-bold text-foreground mb-4">3. Stronger Retention and Engagement</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                People rarely leave jobs just because of pay. They leave because of role confusion, constant second-guessing, and feeling powerless to fix what they're blamed for. R2A2 gives employees a defined lane, the keys to that lane, and a visible connection between their work and business success.
              </p>
              
              <h3 className="text-xl font-bold text-foreground mb-4">4. Less Bottlenecking Around the Owner</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                For many small businesses, the owner is the bottleneck—every decision flows through them. R2A2 lets you push decisions downward without losing control, because you're clear about what decisions are safe to delegate, people know when to escalate and when not to, and you're no longer the default decision-maker for everything.
              </p>
              
              <h3 className="text-xl font-bold text-foreground mb-4">5. More Effective Performance Management</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Vague expectations make performance conversations emotional and subjective. R2A2 reframes performance reviews around questions like: "Are the outcomes you're accountable for being met?" "Are you using the authority you've been given effectively?" Now feedback is anchored in clarity, not opinion.
              </p>

              {/* Implementation Steps */}
              <h2 className="text-3xl font-bold text-foreground mb-6">How to Implement R2A2 in Your Business (Step-by-Step)</h2>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                You don't need a full HR department to adopt R2A2. Start simple and scale.
              </p>
              
              <div className="space-y-8 mb-8">
                <div className="bg-muted rounded-lg p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">Step 1: Pick One Critical Role</h3>
                  <p className="text-muted-foreground">Start where the pain is highest: a role with lots of "gray area," a chronic bottleneck position, or a key role where turnover or misalignment is high. Trying to fix every role at once guarantees inertia.</p>
                </div>
                
                <div className="bg-muted rounded-lg p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">Step 2: Map the Four Quadrants</h3>
                  <p className="text-muted-foreground mb-4">Open a doc or whiteboard and create four quadrants. For that one position, answer:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong className="text-foreground">Role:</strong> Why does this role exist? How does it contribute to customers and the business?</li>
                    <li>• <strong className="text-foreground">Responsibilities:</strong> What 5–10 core responsibilities define their weekly work?</li>
                    <li>• <strong className="text-foreground">Accountability:</strong> What outcomes or metrics are they ultimately responsible for?</li>
                    <li>• <strong className="text-foreground">Authority:</strong> What decisions and resources do they control?</li>
                  </ul>
                </div>
                
                <div className="bg-muted rounded-lg p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">Step 3: Validate with the Person in the Role</h3>
                  <p className="text-muted-foreground">Sit down with the person currently in that role. Ask: "Does this reflect reality?" Where are you responsible but lack authority? This conversation often reveals misalignments you didn't know existed.</p>
                </div>
                
                <div className="bg-muted rounded-lg p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">Step 4: Align Accountability and Authority</h3>
                  <p className="text-muted-foreground mb-4">Where you see gaps, adjust until:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Whoever owns an outcome also has the power to influence it.</li>
                    <li>• Decisions are delegated at the lowest sensible level without unnecessary risk.</li>
                  </ul>
                </div>
                
                <div className="bg-muted rounded-lg p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">Step 5: Socialize with Adjacent Roles</h3>
                  <p className="text-muted-foreground">Share this R2A2 with the person's manager and key colleagues. Ask: "Does this match how you interact with this role? Where do you see overlap or confusion?" You're not just clarifying one job—you're clarifying how it connects with others.</p>
                </div>
                
                <div className="bg-muted rounded-lg p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-3">Step 6: Move R2A2 Into Your Hiring and Onboarding</h3>
                  <p className="text-muted-foreground">Update your job posting and interview process. Share the Role and Responsibilities sections with candidates early. Discuss Accountability and Authority with finalists. Use R2A2 as the backbone of onboarding.</p>
                </div>
              </div>

              {/* BizHealth Section */}
              <h2 className="text-3xl font-bold text-foreground mb-6">Where BizHealth.ai Fits In</h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                R2A2 is a powerful framework—but most small and mid-sized businesses discover, once they get into it, that unclear roles are just one part of a bigger pattern: overlapping responsibilities, gaps in accountability, and decision authority concentrated at the top.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                <Link to="/how-it-works" className="text-primary hover:underline font-semibold">BizHealth.ai</Link> helps business owners run a comprehensive business health assessment across operations, leadership, HR, finance, sales, and technology—surfacing where role confusion, accountability gaps, and authority bottlenecks are silently draining performance.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                Instead of guessing where to apply R2A2, you get a clear picture of which functions are over-reliant on one person, where decisions are getting stuck, and where teams lack the authority to deliver on the outcomes you expect.
              </p>

              {/* Final Thought */}
              <h2 className="text-3xl font-bold text-foreground mb-6">Final Thought: R2A2 Isn't More Paperwork—It's Permission and Power</h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Most small and mid-sized businesses don't fail because people don't care. They struggle because expectations are vague, decision rights are unclear, and accountability is implied, not defined.
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                R2A2 job descriptions change that. They give every role a clear place in the story (Role), a clear set of core duties (Responsibilities), a clear outcome to own (Accountability), and a clear set of decisions to make (Authority).
              </p>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                The result is not just better job descriptions. It's better hires, stronger retention, faster decisions, less owner bottlenecking, and teams that own outcomes instead of waiting for instructions.
              </p>
              
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-8">
                <p className="text-foreground font-semibold">
                  For a growing business, that clarity is not a nice-to-have. It's the difference between scaling with intention and getting stuck in permanent firefighting mode.
                </p>
              </div>

              {/* CTA */}
              <div className="bg-muted rounded-xl p-8 text-center border border-border">
                <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Build Role Clarity Across Your Organization?</h3>
                <p className="text-muted-foreground mb-6">Discover where role confusion, accountability gaps, and authority bottlenecks are holding your business back.</p>
                <Link 
                  to="/how-it-works" 
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Take the Business Health Assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Social Share */}
              <div className="mt-12 pt-8 border-t border-border">
                <h4 className="text-lg font-semibold text-foreground mb-4">Share this article</h4>
                <SocialShareButtons 
                  title="R2A2 Job Descriptions: How Modern Role Clarity Transforms Small Business Teams"
                  description="Learn how R2A2 job descriptions—Role, Responsibilities, Accountability, and Authority—transform small business teams."
                />
              </div>
              
            </div>
          </div>
        </article>
      </main>

      <GlobalFooter />
    </div>
  );
};

export default R2A2JobDescriptions;