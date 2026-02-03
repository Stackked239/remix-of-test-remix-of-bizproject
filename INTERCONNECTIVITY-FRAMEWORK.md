# BizHealth.ai Interconnectivity & Lovable.dev Framework (v2)

**Updated:** January 2, 2026  
**Hubs:** BizHealth.ai / BizGrowth / BizGuides / BizTools / BizLeaDeR  
**Core Primary Color:** BizBlue `#242553` (replaces BizNavy `#212653`)

---

## 1. Executive Overview

BizHealth.ai is the "Business Health Coach" for SMBs (1–250 employees, $100K–$50M revenue).  
The platform is an **Integrated Growth Suite** composed of five interconnected hubs:

1. **BizHealth.ai (Core Platform)** – AI diagnostics across 12 business categories (Strategy, Financials, Ops, HR, etc.)
2. **BizGrowth** – Courses and learning paths aligned to growth stages
3. **BizGuides** – 1:1 and group coaching aligned to diagnostic gaps
4. **BizTools** – Templates, checklists, and digital tools to implement changes
5. **BizLeaDeR** – Leadership development and executive/cohort programs

**Non‑negotiable goals:**

- **Interconnectivity:** At least **30% of users move between hubs** in a given window
- **UX:** Fast, intuitive, mobile‑first experience
- **SEO:** Internal linking, metadata, schema, and site structure designed for growth

This document is your **single source of truth** for how interconnectivity, UI/UX, and SEO should be structured for Lovable.dev builds.

---

## 2. Hub Definitions & Roles

### 2.1 Hubs

| Hub         | Domain (Example)                | Primary Role                                     | Primary CTA              |
|------------|----------------------------------|--------------------------------------------------|--------------------------|
| BizHealth.ai (Core) | `https://bizhealth.ai`           | Diagnostics & reports                            | Take Assessment          |
| BizGrowth  | `https://bizgrowth.bizhealth.ai` | Courses & learning paths                         | Enroll / Start Path      |
| BizGuides  | `https://bizguides.bizhealth.ai` | 1:1 and group coaching                           | Book Session             |
| BizTools   | `https://biztools.bizhealth.ai`  | Templates, tools, checklists, bundles            | Download / Get Template  |
| BizLeaDeR  | `https://bizleader.bizhealth.ai` | Leadership development, executive/cohort programs| Join Program / Join Cohort |

> NOTE: Domains are illustrative. Actual DNS/subdomain decisions can follow this pattern.

### 2.2 Hub Interactions (Conceptual Graph)

```text
                         BIZHEALTH.AI (CORE)
                     (Diagnostics + Reports)
                               |
                               v
 ┌─────────────┬──────────────┴───────────────┬──────────────┐
 v             v                              v              v
BizGrowth   BizGuides                     BizTools       BizLeaDeR
(Courses)   (Coaching)                    (Templates)    (Leadership)
```

- **Core → Hubs:** Diagnostics recommend which hub(s) to visit next.
- **Hubs ↔ Hubs:** Every hub suggests complementary resources in the others.
- **Blog / Content:** Lives at BizHealth.ai and deep‑links into all hubs.

---

## 3. Core Design System (UI/UX)

### 3.1 Colors

**Core Palette (Used ~80% Everywhere):**

- **BizBlue** `#242553` – Primary brand color (replaces BizNavy)
  - Use for headings, primary text accents, key background bands
- **BizGrey** `#7C7C7C` – Secondary text, borders, muted UI
- **BizWhite** `#FFFFFF` – Backgrounds, cards, high‑contrast surfaces

**Hub‑Specific Accent Colors (Used ~10–15% Per Hub):**

| Hub        | Accent Name | Hex      | Usage                                    |
|-----------|-------------|----------|------------------------------------------|
| BizGrowth | GrowthGold  | `#FFD700`| Course CTAs, progress badges, highlights |
| BizGuides | GuideTeal   | `#008080`| Coaching CTAs, guidance icons            |
| BizTools  | ToolsCopper | `#D2691E`| Download buttons, bundle highlights      |
| BizLeaDeR | LeaderMagenta| `#A64D79`| Leadership badges, cohort CTAs          |

**Primary CTA Color (Shared):**

- **BizGreen** `#008080` – Primary CTA fill (Assessment, Start, Enroll, Book)

**Color Rules:**

- 80% of UI uses BizBlue/BizGrey/BizWhite.
- Each hub uses its accent for:
  - Secondary CTAs
  - Badges/tags
  - Section highlights
- All text/background combinations must meet **WCAG AA** (4.5:1 contrast).

### 3.2 Typography

Use **web‑safe or hosted fonts** with this intention:

- Headings: Montserrat (or similar geometric sans), weights 600–700
- Body: Open Sans (or similar humanist sans), weights 400–500

**Recommended Sizes (Desktop / Mobile):**

- H1: 48px / 32px, line‑height 1.2, color BizBlue
- H2: 36px / 28px, line‑height 1.2, color BizBlue
- H3: 24px / 20px, line‑height 1.3, color BizBlue
- Body: 16px / 14px, line‑height 1.6, color BizBlue 80% opacity
- Small/Meta: 12–14px, line‑height 1.4–1.5, BizGrey

### 3.3 Layout & Responsiveness

**Breakpoints:**

- Mobile: 320–767px (single column)
- Tablet: 768–1023px (2 columns)
- Desktop: 1024px+ (3+ columns)

**Principles:**

- **Mobile‑first** CSS; progressively enhance for tablet/desktop.
- Touch targets ≥ 44×44px.
- 16px base spacing on mobile; 24–32px on larger screens.
- Use max‑width containers (e.g., 1160–1200px) for main content.

---

## 4. Interconnectivity: 3 Mandatory Patterns

Every build in Lovable MUST implement these:

### 4.1 Pattern 1 – Diagnostic Bridge

**Purpose:** Convert non‑assessed visitors into assessed users for personalization.

**Where:**  
On **BizGrowth / BizGuides / BizTools / BizLeaDeR** pages where users may arrive "cold."

**Behavior:**

- Show a banner or hero card:

  - Message:  
    "Get personalized recommendations based on your BizHealth.ai assessment."
  - Button text:  
    "Take Free Assessment" or "Discover Your Stage"
  - Link:  
    `https://bizhealth.ai/assessment` (or your live path)

**Design:**

- Background: BizBlue or BizWhite card.
- Text: BizWhite on BizBlue OR BizBlue on BizWhite.
- Button: BizGreen fill, BizWhite text.
- Dismissible if banner‑style (X icon on right).

### 4.2 Pattern 2 – Auto‑Recommended Resources (From Core Diagnostics)

**Purpose:** Move assessed users from Core → Hubs with high relevance.

**Where:**

- On the **BizHealth.ai report page** (post‑assessment).

**Behavior:**

- After the summary of scores, show a "Recommended Next Steps" component with 3 cards minimum:

  1. **BizGrowth** – Course or path based on low/high scoring category
  2. **BizGuides** – Coaching session tailored to a critical gap
  3. **BizTools** – Templates/tools to fix immediate pain

- Future: Optionally include **BizLeaDeR** when leadership/scaling is a dominant theme.

**Example Content Block (conceptual):**

```text
Your Growth Stage: Launch

Recommended Next Steps:

[BizGrowth] Baseline Finance for Founders (45 min course)
[BizGuides] 1:1 Cash Flow Coaching Session
[BizTools] Cash Flow Forecast Template Pack
```

**Implementation Notes:**

- Cards should include:
  - Hub label (e.g., "BizGrowth")
  - Resource name
  - Short description (1–2 lines)
  - CTA button ("Start Course", "Book Session", "Download Template")
- Use hub accent color for the badge/label; keep structure consistent.

### 4.3 Pattern 3 – Contextual Related Resources

**Purpose:** Keep users moving between hubs from any content surface.

**Where:**

- At the bottom (or side) of:
  - Hub landing pages
  - Course/session detail pages
  - Tool/template pages
  - Blog posts

**Behavior:**

- Display a "Related Resources" section with **3 cards**:
  - One from each of the other relevant hubs.

**Example (on a BizGrowth course page about Cash Flow):**

- BizGuides: "CFO Coaching: Cash Flow Planning"
- BizTools: "Cash Flow Template Bundle"
- BizLeaDeR: "Leadership for Financial Discipline" (if relevant)

**Design:**

- 3 columns on desktop, 1 column on mobile.
- Card anatomy:
  - Hub tag (colored with hub accent)
  - Title
  - Short description
  - CTA ("Explore", "Learn More", etc.)
- Use BizBlue/BizWhite for body, hub accent for small details.

---

## 5. Hub Landing Page Template

Every hub landing (BizGrowth, BizGuides, BizTools, BizLeaDeR) should follow a consistent, high‑performing layout:

### 5.1 Core Sections

1. **Hero (Above the Fold)**  
   - H1: Hub value proposition  
   - Subheading: Pain‑oriented description
   - Primary CTA: BizGreen button (Start / Enroll / Book / Download / Join)
   - Secondary CTA: Outline or hub accent
   - Visual: Illustration or screenshot; use BizBlue and hub accent

2. **Trust/Stats Strip**  
   - Show 3–4 proof points (assessments completed, ROI, categories covered, growth stages supported)

3. **Value Proposition / How It Works**  
   - 2–3 blocks explaining:
     - What the hub does
     - Who it's for
     - How it works (3 steps max)

4. **Primary Resource Grid**  
   - Courses (BizGrowth), sessions (BizGuides), templates (BizTools), programs (BizLeaDeR)
   - Filters (by topic/level/stage) for BizGrowth and BizTools

5. **Social Proof / Testimonials**  
   - 3–5 testimonials, ideally tied to measurable outcomes

6. **Cross‑Hub Recommendation Section**  
   - "Extend Your Results" — highlight 2–3 other hubs

7. **FAQ (Accordion)**  
   - Answer common objections (time, cost, fit, ROI, pre‑reqs)

8. **Final CTA**  
   - Strong reiteration of value + primary CTA.

9. **Footer**  
   - Standard global footer, with hub links, blog, assessment, legal.

### 5.2 BizGrowth Landing Example Content Skeleton

**Hub:** BizGrowth  
**Primary Accent:** GrowthGold `#FFD700`

```text
H1: Guided Learning Paths for Every Stage of Growth
Subheading: From launch to scale, BizGrowth turns your BizHealth.ai diagnostic into a focused learning journey.

[Primary CTA] Start My Path
[Secondary CTA] View All Courses

Sections:
1. You're Likely Here If… (2–4 bullet scenarios)
2. How BizGrowth Works (3 steps)
3. Featured Paths (Launch / Growth / Scaling / Exit)
4. Course Grid (filters: Topic, Stage, Level)
5. Testimonials (quotes from SMB founders)
6. Extend Your Results (BizGuides coaching, BizTools templates, BizLeaDeR leadership)
7. FAQs
8. Final CTA
```

---

## 6. Blog & Content Structure (BizHealth.ai)

### 6.1 Blog Architecture

- Location: `https://bizhealth.ai/blog`
- Posts categorized by:
  - Topic (Cash Flow, Sales, Ops, HR, Leadership, Risk, Strategy)
  - Hub relevance (BizGrowth / BizGuides / BizTools / BizLeaDeR)

**Each blog post MUST:**

1. Have a clear **H1** aligned to a user problem.
2. Include **3–5 internal links** to:
   - At least **2 different hubs** (e.g., BizGrowth + BizGuides + BizTools).
3. End with a **"Next Steps" block** referencing:
   - A BizGrowth course
   - A BizGuides session
   - A BizTools template (and sometimes BizLeaDeR program).

### 6.2 Blog Post Structure (Template)

```markdown
# [Post Title: Problem + Outcome]

[Hero image / illustration]

[Author, date, reading time]

[Optional: mini TOC]

## Introduction
Set up the pain, why it matters now, link to at least 1 hub.

## Section 1
Explain context, back it with data, include 1–2 internal links.

## Section 2+
Each section = 1 big idea + 1 action step.
Include at least one cross‑hub link per major section.

---

## Next Steps for Your Business

- **Learn:** Link to BizGrowth course
- **Get Help:** Link to BizGuides session
- **Implement:** Link to BizTools template
- **Lead:** Optional link to BizLeaDeR for leadership topics
```

### 6.3 Internal Linking Rules

- No "click here"; always use descriptive anchor text:
  - ✅ "Explore our cash flow course in BizGrowth"
  - ✅ "Book a cash flow strategy session in BizGuides"
  - ✅ "Download the cash flow template in BizTools"
- Minimum:
  - 1 link to BizGrowth
  - 1 link to BizGuides
  - 1 link to BizTools
  - Optional to BizLeaDeR if leadership/senior topic.

---

## 7. SEO & URL Strategy

### 7.1 Hub URL Patterns

You can follow this structure:

- **Core:**
  - `/` (Home)
  - `/assessment`
  - `/report`
  - `/blog`
  - `/blog/[slug]`

- **BizGrowth:**
  - `https://bizgrowth.bizhealth.ai/`
  - `/paths/[stage-slug]` (launch, growth, scaling, exit)
  - `/courses/[course-slug]`

- **BizGuides:**
  - `https://bizguides.bizhealth.ai/`
  - `/services/[service-slug]`

- **BizTools:**
  - `https://biztools.bizhealth.ai/`
  - `/templates/[template-slug]`
  - `/bundles/[bundle-slug]`

- **BizLeaDeR:**
  - `https://bizleader.bizhealth.ai/`
  - `/programs/[program-slug]`
  - `/cohorts/[cohort-slug]`

### 7.2 Meta & Schema (Per Page)

Each page should define:

- **Meta title** (≤ 60–65 chars)
- **Meta description** (≤ 155–160 chars)
- **Open Graph** (title, description, image)
- **Schema.org** JSON‑LD in `<head>`:
  - `SoftwareApplication` for core platform
  - `Course` / `CourseInstance` for BizGrowth
  - `Service` for BizGuides
  - `CreativeWork` for BizTools templates
  - `Event` or `Course` for BizLeaDeR programs
  - `BlogPosting` for blog posts

---

## 8. Analytics: GA4 Events (Interconnectivity)

### 8.1 Core Events (Examples)

1. `hub_recommendation_click`
   - Trigger: User clicks a recommended hub card on the BizHealth.ai report page.
   - Params:
     - `from_source`: `"report"`
     - `to_hub`: `"BizGrowth" | "BizGuides" | "BizTools" | "BizLeaDeR"`
     - `category`: e.g., `"Financials"` or `"Sales"`

2. `related_resource_click`
   - Trigger: User clicks a related resource card at bottom of a page.
   - Params:
     - `page_hub`: `"BizGrowth" | "BizGuides" | ..."`
     - `destination_hub`: `"BizGrowth" | "BizGuides" | ..."`
     - `resource_type`: `"course" | "session" | "template" | "program"`

3. `assessment_to_hub`
   - Trigger: User who has completed an assessment visits any hub within 7 days.
   - Params:
     - `hub`: `"BizGrowth" | "BizGuides" | ..."`
     - `days_since_assessment`: Number

4. `blog_cross_hub_click`
   - Trigger: Blog link click to a hub page.
   - Params:
     - `post_slug`
     - `hub_destination`
     - `link_context`: e.g., `"body"` or `"next_steps"`

### 8.2 Targets (First 30–90 Days)

- Cross‑hub click rate (any hub‑to‑hub or blog‑to‑hub): **25%+**
- Assessment → hub visit (within 7 days): **30%+**
- Multi‑hub sessions: **15%+** sessions with ≥2 hubs visited
- Average session duration for multi‑hub users: **8+ minutes**

---

## 9. Lovable.dev Prompt Template (Master)

Use this structure for **every page you ask Lovable.dev to build**.

### 9.1 Generic Page Build Prompt

```markdown
BUILD A PREMIUM, INTERCONNECTED PAGE FOR BIZHEALTH.AI

### PAGE CONTEXT
- Hub: [BizHealth.ai / BizGrowth / BizGuides / BizTools / BizLeaDeR]
- Page Type: [Landing / Blog Post / Course Detail / Session Detail / Template Detail / Program Detail]
- URL Path: [e.g., /blog/cash-flow-strategy, /courses/founder-finance, /services/cfo-coaching]

### OBJECTIVE
- Primary goal: [e.g., convert assessed users to BizGrowth course enrollments]
- Secondary goals: [e.g., drive coaching bookings, template downloads]

### CONTENT REQUIREMENTS
- H1: "[Main page headline here]"
- Subheading: "[Short supportive line]"
- Sections (H2):
  1. [Section title + brief description]
  2. [Section title + brief description]
  3. [Section title + brief description]
  [Add more as needed]

- Key copy points:
  - [Bullet list of critical messages, pain points, benefits, outcomes]

### INTERCONNECTIVITY REQUIREMENTS (MANDATORY)
1. Diagnostic Bridge (if user may not have taken assessment):
   - Show a banner or hero card:
     - Text: "Get personalized recommendations based on your BizHealth.ai assessment."
     - Button: "Take Free Assessment"
     - URL: https://bizhealth.ai/assessment

2. Related Resources Section:
   - Title: "Related Resources" or "Extend Your Results"
   - Display 3 resource cards, each linking to a different hub where possible:
     - Card 1: [Hub] – [Resource name] → [URL]
     - Card 2: [Hub] – [Resource name] → [URL]
     - Card 3: [Hub] – [Resource name] → [URL]

3. Internal Cross‑Hub Links in Body:
   - At least 3–5 contextual internal links to other hubs.
   - Use descriptive anchor text like:
     - "Explore our [course name] in BizGrowth"
     - "Book a [session type] in BizGuides"
     - "Download the [template] in BizTools"
     - "Join the [program name] in BizLeaDeR"

### DESIGN REQUIREMENTS
- Core palette:
  - Primary: BizBlue #242553
  - Secondary: BizGrey #7C7C7C
  - Background: BizWhite #FFFFFF
- Hub accent:
  - BizGrowth: GrowthGold #FFD700
  - BizGuides: GuideTeal #008080
  - BizTools: ToolsCopper #D2691E
  - BizLeaDeR: LeaderMagenta #A64D79
- Primary CTA button:
  - Background: BizGreen #008080
  - Text: BizWhite #FFFFFF
- Typography:
  - Headings: Montserrat (or similar), bold, BizBlue
  - Body: Open Sans (or similar), regular, BizBlue
- Layout:
  - Mobile‑first, responsive to 320 / 768 / 1024+ breakpoints
  - Use 1 column on mobile, 2 on tablet, 3+ on desktop where appropriate

### SEO REQUIREMENTS
- Meta title: "[Meta title here, ~60 chars]"
- Meta description: "[Meta description here, ~155 chars]"
- Schema type: [BlogPosting / Course / Service / CreativeWork / Event]
- Target keywords: [3–5 primary keywords]
- Internal links:
  - At least 3 internal links to hub pages or blog posts.

### ACCESSIBILITY REQUIREMENTS
- WCAG AA:
  - Color contrast ≥ 4.5:1
  - Keyboard navigable (Tab, Enter, Space, Escape)
  - Focus states clearly visible on interactive elements
- Images:
  - Provide meaningful alt text
- Forms:
  - Associate labels with fields

### ANALYTICS TAGGING (FRONTEND HOOKS)
- Add data attributes for key CTAs:
  - data-hub="[Hub name]"
  - data-cta-type="[primary | secondary | related-resource]"
- Prepare for GA4 events:
  - hub_recommendation_click
  - related_resource_click
  - blog_cross_hub_click
  - assessment_to_hub

### QUALITY CHECKLIST
Before finalizing this page, ensure:
- [ ] Diagnostic bridge present (if appropriate)
- [ ] 3 related resources cards included
- [ ] 3–5 internal cross‑hub links
- [ ] Responsive layout works at 320/768/1024+
- [ ] Meta title & description provided
- [ ] Schema markup type identified
- [ ] All interactive elements have focus states
- [ ] Color contrast passes WCAG AA
- [ ] Data attributes applied for analytics
```

---

## 10. Example Lovable Prompts

### 10.1 Example – Blog Post (BizHealth.ai)

```markdown
BUILD A PREMIUM, INTERCONNECTED BLOG POST FOR BIZHEALTH.AI

### PAGE CONTEXT
- Hub: BizHealth.ai (Core)
- Page Type: Blog Post
- URL Path: /blog/cash-flow-squeezes-2026

### OBJECTIVE
- Educate SMB owners on cash flow squeezes in 2026
- Drive clicks to BizGrowth (course), BizGuides (coaching), BizTools (template)

### CONTENT REQUIREMENTS
- H1: "5 Ways to Overcome Cash Flow Squeezes in 2026"
- Subheading: "Practical strategies for SMBs to stabilize cash flow, plus tools and coaching to implement them."
- Sections (H2):
  1. Why Cash Flow Squeezes Are Worse in 2026
  2. Strategy #1: Monthly Cash Flow Forecasting
  3. Strategy #2: Faster Invoicing & Collections
  4. Strategy #3: Smarter Payment Terms
  5. Strategy #4: Building a 90‑Day Cash Cushion
  6. Strategy #5: Using Credit Strategically (Not Desperately)
  7. Bringing It All Together

### INTERCONNECTIVITY REQUIREMENTS
1. Diagnostic Bridge:
   - Banner near top:
     - Text: "Want personalized cash flow recommendations? Take the BizHealth.ai assessment."
     - Button: "Take Free Assessment"
     - URL: https://bizhealth.ai/assessment

2. Related Resources Section:
   Title: "Take the Next Step"
   Cards:
   - BizGrowth: "Founder Finance Fundamentals" → https://bizgrowth.bizhealth.ai/courses/founder-finance
   - BizGuides: "1:1 Cash Flow Coaching Session" → https://bizguides.bizhealth.ai/services/cash-flow-coaching
   - BizTools: "Cash Flow Forecast Template Pack" → https://biztools.bizhealth.ai/templates/cash-flow-pack

3. Internal Cross‑Hub Links in Body:
   - In Strategy #1 section: link to BizGrowth course (anchor text: "our Founder Finance Fundamentals course in BizGrowth")
   - In Strategy #2 section: link to BizTools templates (anchor text: "Cash Flow Forecast Template Pack in BizTools")
   - In "Bringing It All Together": link to BizGuides coaching (anchor text: "1:1 Cash Flow Coaching Session in BizGuides")

### DESIGN REQUIREMENTS
- Core palette:
  - BizBlue #242553 for headings
  - BizGrey #7C7C7C for body text & meta
  - BizWhite #FFFFFF background
- Buttons:
  - Primary CTA: BizGreen #008080 with BizWhite text
- Layout:
  - Blog layout with hero image, readable line length, whitespace

### SEO REQUIREMENTS
- Meta title: "5 Ways to Overcome Cash Flow Squeezes in 2026 | BizHealth.ai"
- Meta description: "Discover 5 proven strategies SMBs use to manage cash flow squeezes in 2026, plus templates and coaching to implement them."
- Schema type: BlogPosting
- Target keywords:
  - "cash flow squeezes 2026"
  - "SMB cash flow strategies"
  - "how to improve cash flow"

### ACCESSIBILITY REQUIREMENTS
- 4.5:1 contrast for text vs background
- Meaningful alt text for hero image
- Keyboard accessible TOC and related resources

### ANALYTICS TAGGING
- data-hub="BizHealth.ai" on page container
- data-cta-type="primary" on the "Take Free Assessment" button
- Prepare GA4 events: blog_cross_hub_click, related_resource_click

### QUALITY CHECKLIST
- [ ] Diagnostic bridge banner implemented
- [ ] 3 related resources cards included (BizGrowth, BizGuides, BizTools)
- [ ] 3+ internal cross‑hub links in body
- [ ] Meta tags & schema in place
- [ ] Responsive design verified
```

### 10.2 Example – BizGrowth Landing Page

```markdown
BUILD A PREMIUM, INTERCONNECTED LANDING PAGE FOR BIZGROWTH

### PAGE CONTEXT
- Hub: BizGrowth
- Page Type: Hub Landing
- URL Path: /

### OBJECTIVE
- Convert BizHealth.ai diagnostic users to BizGrowth course enrollments
- Drive awareness of learning paths (Launch, Growth, Scaling, Exit)

### CONTENT REQUIREMENTS
- H1: "Guided Learning Paths for Every Growth Stage"
- Subheading: "Turn your BizHealth.ai diagnostic into a focused learning journey. Master strategy, financials, operations, and more at your pace."
- Sections (H2):
  1. You're Likely Here If…
  2. How BizGrowth Works
  3. Featured Learning Paths (Launch / Growth / Scaling / Exit)
  4. Course Grid (with filters)
  5. Success Stories (testimonials)
  6. Extend Your Results (related hubs)
  7. FAQs
  8. Final CTA

### INTERCONNECTIVITY REQUIREMENTS
1. Diagnostic Bridge:
   - Hero card (right side):
     - Text: "Get personalized learning recommendations based on your BizHealth.ai assessment."
     - Button: "Discover Your Path"
     - URL: https://bizhealth.ai/assessment

2. Related Resources Section:
   Title: "Extend Your Results"
   Cards:
   - BizGuides: "Get 1:1 Coaching" → https://bizguides.bizhealth.ai/
   - BizTools: "Download Templates" → https://biztools.bizhealth.ai/
   - BizLeaDeR: "Join Leadership Programs" → https://bizleader.bizhealth.ai/

3. Internal Cross‑Hub Links in Body:
   - In "How BizGrowth Works": mention BizGuides as "acceleration partner"
   - In course descriptions: "Implement faster with our templates in BizTools"
   - In success stories: quote mentions BizGuides coaching

### DESIGN REQUIREMENTS
- Core palette:
  - BizBlue #242553 for headings
  - BizGrey #7C7C7C for secondary text
  - BizWhite #FFFFFF background
- Hub accent:
  - GrowthGold #FFD700 for CTAs, badges, progress indicators
- Primary CTA button:
  - Background: BizGreen #008080
  - Text: BizWhite #FFFFFF
  - Hover: darker green
- Layout:
  - Hero section: 60/40 split (text / illustration)
  - Course grid: 3 columns (desktop), 1 column (mobile)
  - Testimonials: carousel (3 visible desktop, 1 mobile)

### SEO REQUIREMENTS
- Meta title: "BizGrowth: Guided Learning Paths for SMB Growth | BizHealth.ai"
- Meta description: "Courses and learning paths for every growth stage (Launch, Growth, Scaling, Exit). Master business fundamentals with personalized recommendations."
- Schema type: Course
- Target keywords:
  - "SMB courses"
  - "founder education"
  - "business growth courses"

### ACCESSIBILITY REQUIREMENTS
- 4.5:1 contrast (BizBlue text on BizWhite, GrowthGold accents on white)
- Keyboard navigation for course grid & carousel
- Focus states on all interactive elements
- Alt text on illustration

### ANALYTICS TAGGING
- data-hub="BizGrowth" on page container
- data-cta-type="primary" on "Start My Path" button
- data-cta-type="diagnostic-bridge" on "Discover Your Path"
- GA4 events: hub_recommendation_click, related_resource_click

### QUALITY CHECKLIST
- [ ] Diagnostic bridge visible & functional
- [ ] 3 related resources cards (Guides, Tools, LeaDeR)
- [ ] 3+ internal cross‑hub links in body
- [ ] Course grid responsive (3 cols → 2 cols → 1 col)
- [ ] Testimonials carousel auto‑scrolls
- [ ] Meta title & description provided
- [ ] Schema.org Course markup in place
```

### 10.3 Example – BizGuides Landing Page

```markdown
BUILD A PREMIUM, INTERCONNECTED LANDING PAGE FOR BIZGUIDES

### PAGE CONTEXT
- Hub: BizGuides
- Page Type: Hub Landing
- URL Path: /

### OBJECTIVE
- Drive coaching session bookings
- Highlight how coaching complements learning (BizGrowth) and implementation (BizTools)

### CONTENT REQUIREMENTS
- H1: "Expert Coaching Aligned to Your Business Health"
- Subheading: "1:1 and group coaching sessions designed for busy founders. Get personalized roadmaps from experienced business advisors."
- Sections (H2):
  1. Coaching That Fits Your Gaps
  2. How It Works (3 steps)
  3. Featured Coaching Services (Strategy, Finance, Sales, HR, Leadership)
  4. Meet Your Coaches (team carousel)
  5. Real Results (testimonials)
  6. Extend Your Impact (related hubs)
  7. FAQs
  8. Final CTA

### INTERCONNECTIVITY REQUIREMENTS
1. Diagnostic Bridge:
   - Hero banner (sticky top):
     - Text: "Get coaching recommendations based on your diagnostic results."
     - Button: "Take Assessment"
     - URL: https://bizhealth.ai/assessment

2. Related Resources Section:
   Title: "Complement Your Coaching"
   Cards:
   - BizGrowth: "Self-Paced Courses" → https://bizgrowth.bizhealth.ai/
   - BizTools: "Implementation Templates" → https://biztools.bizhealth.ai/
   - BizLeaDeR: "Leadership Cohorts" → https://bizleader.bizhealth.ai/

3. Internal Cross‑Hub Links in Body:
   - In "How It Works": "...we pair coaching with courses from BizGrowth..."
   - In service cards: "Coach recommends courses & templates to accelerate progress"
   - In testimonials: quote mentions using BizGrowth courses alongside coaching

### DESIGN REQUIREMENTS
- Core palette:
  - BizBlue #242553 for headings
  - BizGrey #7C7C7C for secondary text
  - BizWhite #FFFFFF background
- Hub accent:
  - GuideTeal #008080 for CTAs, coaching badges, guidance icons
- Primary CTA button:
  - Background: BizGreen #008080
  - Text: BizWhite #FFFFFF
- Layout:
  - Service cards: 2 columns (desktop), 1 column (mobile)
  - Coach carousel: show 3 coach profiles visible (desktop)
  - Testimonials: carousel format

### SEO REQUIREMENTS
- Meta title: "Business Coaching for SMBs | 1:1 Sessions | BizGuides"
- Meta description: "Expert coaching for strategy, cash flow, sales, and leadership. Personalized sessions aligned to your BizHealth.ai diagnostic."
- Schema type: Service
- Target keywords:
  - "business coach SMB"
  - "startup coaching"
  - "fractional CFO"

### ACCESSIBILITY REQUIREMENTS
- 4.5:1 contrast (BizBlue on BizWhite, GuideTeal accents tested)
- Keyboard navigation for carousels
- Focus states on all buttons
- Alt text on coach photos & testimonials

### ANALYTICS TAGGING
- data-hub="BizGuides" on page container
- data-cta-type="primary" on "Book a Session" buttons
- data-cta-type="diagnostic-bridge" on assessment link
- GA4 events: hub_recommendation_click, related_resource_click

### QUALITY CHECKLIST
- [ ] Diagnostic bridge banner visible
- [ ] 3 related resources cards (Growth, Tools, LeaDeR)
- [ ] 3+ cross‑hub links in body
- [ ] Coach carousel responsive
- [ ] Coaching service cards filterable (optional)
- [ ] Testimonials carousel functional
- [ ] Meta & schema complete
```

---

## 11. Color Reference Quick Card

```
┌─────────────────────────────────────────────────────────────────┐
│              BIZHEALTH.AI COLOR PALETTE (v2)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  CORE PALETTE (80% usage)                                      │
│  ─────────────────────────────────                             │
│  BizBlue      #242553  (rgb: 36, 37, 83)    [Primary]         │
│  BizGrey      #7C7C7C  (rgb: 124, 124, 124) [Secondary]       │
│  BizWhite     #FFFFFF  (rgb: 255, 255, 255) [Background]      │
│                                                                 │
│  HUB ACCENTS (10–15% usage)                                    │
│  ─────────────────────────────────                             │
│  BizGrowth    GrowthGold    #FFD700  [Course CTAs]            │
│  BizGuides    GuideTeal     #008080  [Coaching CTAs]          │
│  BizTools     ToolsCopper   #D2691E  [Download CTAs]          │
│  BizLeaDeR    LeaderMagenta #A64D79  [Program CTAs]           │
│                                                                 │
│  PRIMARY CTA (All hubs)                                        │
│  ─────────────────────────────────                             │
│  BizGreen     #008080  (rgb: 0, 128, 128)  [Assessment CTAs]  │
│                                                                 │
│  WCAG AA COMPLIANCE: All combos tested 4.5:1 contrast minimum  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 12. Summary

- **Hubs:** BizHealth.ai / BizGrowth / BizGuides / BizTools / BizLeaDeR  
- **Core Color:** BizBlue `#242553` (replacing BizNavy), with BizGrey & BizWhite  
- **Interconnectivity:** Every relevant page uses diagnostic bridges, recommended resources, and cross‑hub links  
- **Lovable Usage:** Always provide:
  - Hub
  - Page type
  - Content structure
  - Interconnectivity requirements
  - Design constraints (colors, typography)
  - SEO and accessibility requirements
  - Analytics tags

This single markdown file can be handed directly to Lovable.dev as your **master build spec** for BizHealth.ai's interconnected experience.
