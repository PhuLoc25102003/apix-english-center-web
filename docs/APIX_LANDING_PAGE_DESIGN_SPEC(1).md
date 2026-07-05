# APIX English Landing Page Design Specification

> Purpose: This file is a production-ready design and implementation brief for an AI coding assistant to generate a modern landing page for **APIX English**, a private English center for children and teenagers.  
> Target stack: **Next.js 15 + React 19 + TypeScript + TailwindCSS + Shadcn UI + Framer Motion**.  
> Design direction: **Modern liquid glass**, premium education brand, energetic but trustworthy, using APIX red as the main brand signal.

---

## 1. Project Context

### Brand

**APIX English** is a private English center for children and teenagers. The center focuses on practical English communication, confidence, academic support, and visible learning progress for parents.

### Product Goal

Create a high-converting landing page that introduces APIX English, builds trust with parents, presents courses clearly, and encourages visitors to register for a trial class or contact the center.

### Audience

Primary users:

- Parents of kindergarten, primary, and secondary school students.
- Teenagers who want better English communication.
- Parents who care about learning progress, teacher quality, class size, and regular reports.

### Page Objective

The landing page must persuade users to take one of these actions:

1. Register for a free placement test or trial class.
2. Contact the center via phone, Zalo, or form.
3. Learn about programs, teachers, facilities, and student outcomes.

---

## 2. Design Philosophy

This landing page must feel custom-designed for APIX English, not like a generic SaaS template.

The visual system should combine:

- **Liquid glass surfaces** for a modern, premium interface.
- **Bold APIX red** for brand recognition and confidence.
- **White space and soft depth** to make the page readable for parents.
- **Motion with purpose**, not random decoration.
- **Friendly educational energy**, suitable for children and teenagers.

The design may take inspiration from modern education centers and premium English center websites, but it must **not copy VUS, ILA, Apollo, Wall Street English, or any other brand directly**. Do not copy layout, wording, section order, graphics, icons, or visual composition exactly from any existing center.

---

## 3. Visual Identity

### 3.1 Color Tokens

Use APIX red as the central brand color. The landing page should feel bright, confident, and premium.

```ts
export const brandColors = {
  apixRed: '#FF161A',
  deepRed: '#B80012',
  softRed: '#FFE7E8',
  glassWhite: 'rgba(255, 255, 255, 0.72)',
  pureWhite: '#FFFFFF',
  inkBlack: '#111318',
  graphite: '#2A2D34',
  mutedGray: '#6B7280',
  lineGray: 'rgba(17, 19, 24, 0.08)',
  warmSurface: '#FFF8F8',
  successGreen: '#16A34A',
  warningAmber: '#F59E0B'
}
```

### 3.2 Color Usage

- Use `#FF161A` for primary CTA buttons, active states, important highlights, and brand markers.
- Use white and translucent glass panels for section cards.
- Use red gradients carefully, mainly in the hero background and CTA section.
- Avoid making the entire page red. Red should act as a strong signature, not visual noise.
- Background should be mostly light with subtle red glow or mesh gradients.

### 3.3 Suggested Background System

Use a soft radial gradient background:

```css
background:
  radial-gradient(circle at 15% 10%, rgba(255, 22, 26, 0.22), transparent 32%),
  radial-gradient(circle at 85% 20%, rgba(255, 120, 120, 0.20), transparent 28%),
  linear-gradient(180deg, #fff8f8 0%, #ffffff 45%, #fff5f5 100%);
```

Add decorative blurred blobs behind glass cards, but keep the interface readable.

---

## 4. Typography

### 4.1 Font Strategy

Use a modern, readable Vietnamese-compatible type system.

Recommended:

```ts
const fonts = {
  display: 'SVN-Gilroy, Be Vietnam Pro, Inter, sans-serif',
  body: 'Be Vietnam Pro, Inter, sans-serif',
  utility: 'Inter, Be Vietnam Pro, sans-serif'
}
```

If custom local font is not available, use Google Font:

- **Be Vietnam Pro** for Vietnamese readability.
- **Inter** for dashboard-like clarity and UI controls.

### 4.2 Type Scale

```ts
const typeScale = {
  heroTitle: 'clamp(3rem, 8vw, 7.5rem)',
  sectionTitle: 'clamp(2rem, 4vw, 4rem)',
  cardTitle: '1.25rem',
  bodyLarge: '1.125rem',
  body: '1rem',
  caption: '0.875rem'
}
```

### 4.3 Typography Personality

Hero title should be bold, confident, and memorable.

Example hero title:

```text
English that feels alive in class.
```

Vietnamese alternative:

```text
Học tiếng Anh để tự tin nói thật.
```

Do not use vague slogans such as:

```text
Your future starts here.
Best English Center.
Learn English easily.
```

Use specific and parent-friendly copy.

---

## 5. Layout Direction

### 5.1 Page Structure

The page should be a single landing page with smooth scroll sections.

Recommended sections:

1. Header / Navigation
2. Hero
3. Trust Bar
4. Program Overview
5. Learning Method
6. Student Progress / Parent Visibility
7. Course Pathway
8. Teachers and Classroom Support
9. Facilities / Campus
10. Testimonials or Results
11. Trial Class CTA
12. FAQ
13. Footer

### 5.2 Hero Wireframe

```text
┌────────────────────────────────────────────────────────────┐
│ Logo        Programs Method Teachers Campus Contact  CTA   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  [small glass badge: English for kids & teens]             │
│                                                            │
│  Học tiếng Anh để tự tin nói thật.                         │
│  Practical English classes for children and teenagers.     │
│                                                            │
│  [Book trial class] [View programs]                        │
│                                                            │
│  Glass stats:                                              │
│  Small class | Parent report | Speaking-focused            │
│                                                            │
│                          [Liquid glass classroom card]     │
│                          [Student progress preview]        │
└────────────────────────────────────────────────────────────┘
```

### 5.3 Signature Element

The page needs one memorable custom visual signature:

**APIX Learning Orbit**

A circular or curved glass visual in the hero showing the learning loop:

```text
Placement → Class → Practice → Report → Improve
```

This orbit can use red curved strokes inspired by the APIX logo shape, but do not directly redraw the logo as decoration. The orbit should represent progress and continuous learning.

---

## 6. Liquid Glass Design System

### 6.1 Glass Card Style

Use a reusable class for glass panels.

```css
.apix-glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.78),
    rgba(255, 255, 255, 0.42)
  );
  border: 1px solid rgba(255, 255, 255, 0.72);
  box-shadow:
    0 24px 80px rgba(255, 22, 26, 0.10),
    inset 0 1px 0 rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(24px) saturate(145%);
  -webkit-backdrop-filter: blur(24px) saturate(145%);
  border-radius: 32px;
}
```

### 6.2 Glass Button

```css
.apix-glass-button {
  background: rgba(255, 255, 255, 0.64);
  border: 1px solid rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(18px);
  border-radius: 999px;
  box-shadow: 0 16px 40px rgba(255, 22, 26, 0.14);
}
```

### 6.3 Primary CTA

```css
.apix-primary-cta {
  background: linear-gradient(135deg, #ff161a 0%, #c90013 100%);
  color: white;
  border-radius: 999px;
  box-shadow: 0 18px 50px rgba(255, 22, 26, 0.32);
}
```

### 6.4 Design Rules

- Use large border radius: `24px`, `32px`, `40px`.
- Use transparent borders to create glass edge lighting.
- Keep text contrast strong. Do not put low-contrast gray text over complex glass backgrounds.
- Glass effect must support fallback for browsers where `backdrop-filter` is weak.

---

## 7. Animation Direction

Use animations to make the page feel premium and alive. Do not over-animate every element.

### 7.1 Libraries

Recommended:

```bash
npm install framer-motion lenis lucide-react
```

Optional:

```bash
npm install gsap
```

Use **Framer Motion** for component entrance and interaction animations. Use **Lenis** for smooth scrolling if appropriate.

### 7.2 Animation Principles

- Hero content should enter in a controlled sequence.
- Glass cards should float subtly.
- CTA buttons should have micro-interactions.
- Program cards should reveal on scroll.
- Stats should count up once when visible.
- Respect reduced motion.

### 7.3 Required Animations

#### Header

- Sticky glass header.
- Header background becomes more opaque after scrolling.
- Mobile menu slides down with glass blur.

#### Hero

- Logo/brand enters first.
- Badge fades and slides up.
- Headline reveals line by line.
- CTA buttons fade in after headline.
- Hero glass cards float slowly with very small movement.

#### Program Cards

- Cards reveal with staggered animation.
- On hover: slight lift, red glow, glass border highlight.

#### Learning Orbit

- The orbit line can slowly draw itself on page load.
- Dots around the orbit pulse one by one.

#### CTA Section

- Background red glow moves subtly.
- Form card slides up when entering viewport.

### 7.4 Motion Settings

```ts
export const motionConfig = {
  easing: [0.22, 1, 0.36, 1],
  durationFast: 0.22,
  durationNormal: 0.55,
  durationSlow: 0.9,
  stagger: 0.08
}
```

### 7.5 Reduced Motion

Always support reduced motion:

```ts
const shouldReduceMotion = useReducedMotion();
```

If reduced motion is enabled:

- Disable floating animations.
- Disable parallax.
- Keep simple fade-in or no animation.

---

## 8. Content Requirements

Use content that sounds real and specific. Avoid generic marketing language.

### 8.1 Header Navigation

```text
Programs
Method
Progress
Teachers
Campus
FAQ
```

Primary CTA:

```text
Book a trial class
```

Vietnamese CTA alternative:

```text
Đăng ký học thử
```

### 8.2 Hero Section

Recommended copy:

```text
Eyebrow:
English for kids & teens

Headline:
Học tiếng Anh để tự tin nói thật.

Subheadline:
APIX English helps children and teenagers build real communication skills through small classes, guided practice, caring teachers, and clear progress updates for parents.

Primary CTA:
Đăng ký học thử

Secondary CTA:
Xem chương trình học
```

### 8.3 Trust Bar

Use 3 to 5 concise trust items:

```text
Small class size
Progress reports for parents
Speaking-focused lessons
Teacher + teaching assistant support
Placement test before enrollment
```

### 8.4 Program Cards

Programs should include:

1. Kindergarten English
2. Primary English
3. Secondary English
4. Communication Booster
5. Grammar & School Support
6. Test Preparation Foundation

Each card must show:

- Age or grade range.
- Main learning goal.
- Class format.
- Parent-visible outcome.

Example:

```text
Primary English
For grades 1–5
Build vocabulary, sentence patterns, classroom confidence, and basic speaking habits.
Parents receive attendance, homework, and progress updates.
```

### 8.5 Learning Method Section

Present APIX method as a process:

```text
1. Check level
2. Learn in small steps
3. Practice speaking every class
4. Review with homework
5. Report progress to parents
```

Use a horizontal glass timeline on desktop and vertical timeline on mobile.

### 8.6 Parent Visibility Section

This is important for an English center management system.

Show a mock parent app/report card:

```text
Attendance
Homework
Speaking score
Teacher comment
Tuition reminder
Next class schedule
```

Emphasize:

```text
Parents do not need to guess how their child is doing.
```

### 8.7 Teacher Section

Important rule:

- Teachers focus on teaching, attendance, homework, scores, and learning reports.
- Office staff handle parent communication.

Landing page copy:

```text
Teachers focus on the classroom. Office staff keep parents updated clearly and consistently.
```

### 8.8 Campus Section

Because the center has multiple campuses/buildings in the same residential area, use the word **Campus**, not Branch.

Show:

```text
Campus A
Room 101, Room 102

Campus B
Room 201, Room 202
```

Do not describe the center as a multi-branch franchise or SaaS organization.

### 8.9 Final CTA

```text
Ready to find the right class for your child?
Book a placement test or trial class. APIX staff will help recommend the right level, schedule, and learning path.
```

CTA buttons:

```text
Book a trial class
Call APIX English
Chat via Zalo
```

---

## 9. Component Architecture

Use feature-based and section-based architecture.

```text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   ├── layout/
│   │   ├── LandingHeader.tsx
│   │   ├── LandingFooter.tsx
│   │   └── MobileNav.tsx
│   │
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ProgramSection.tsx
│   │   ├── LearningMethodSection.tsx
│   │   ├── ParentProgressSection.tsx
│   │   ├── TeacherSection.tsx
│   │   ├── CampusSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   ├── TrialClassSection.tsx
│   │   └── FAQSection.tsx
│   │
│   ├── brand/
│   │   ├── ApixLogo.tsx
│   │   ├── ApixGlassCard.tsx
│   │   ├── ApixButton.tsx
│   │   └── LearningOrbit.tsx
│   │
│   └── motion/
│       ├── FadeIn.tsx
│       ├── StaggerGroup.tsx
│       └── FloatingElement.tsx
│
├── constants/
│   ├── landing-content.ts
│   ├── navigation.ts
│   └── design-tokens.ts
│
├── lib/
│   ├── cn.ts
│   └── motion.ts
│
└── types/
    └── landing.ts
```

---

## 10. SOLID-Friendly Frontend Rules

### 10.1 Single Responsibility Principle

Each component should do one job.

Good:

```text
HeroSection = hero layout only
ProgramCard = one program card only
TrialForm = form only
```

Bad:

```text
LandingPage.tsx contains all sections, all data, all animations, all form logic.
```

### 10.2 Open/Closed Principle

Add new sections or cards by adding data, not rewriting components.

Good:

```ts
const programs = [
  { title: 'Primary English', age: 'Grades 1–5', ... },
  { title: 'Secondary English', age: 'Grades 6–9', ... }
]
```

Then render with:

```tsx
{programs.map((program) => (
  <ProgramCard key={program.title} program={program} />
))}
```

### 10.3 Interface Segregation

Do not pass huge props to components.

Good:

```ts
export type ProgramCardProps = {
  title: string
  ageRange: string
  description: string
  highlights: string[]
}
```

Bad:

```ts
export type ProgramCardProps = {
  pageData: EntireLandingPageData
}
```

### 10.4 Dependency Inversion

Components should depend on data props, not hardcoded global data.

Good:

```tsx
<ProgramSection programs={programs} />
```

Bad:

```tsx
ProgramSection imports and mutates global program state directly.
```

---

## 11. Page Data Model

Create data in `constants/landing-content.ts`.

```ts
export const landingContent = {
  hero: {
    eyebrow: 'English for kids & teens',
    title: 'Học tiếng Anh để tự tin nói thật.',
    description:
      'APIX English helps children and teenagers build real communication skills through small classes, guided practice, caring teachers, and clear progress updates for parents.',
    primaryCta: 'Đăng ký học thử',
    secondaryCta: 'Xem chương trình học'
  },
  trustItems: [
    'Small class size',
    'Progress reports for parents',
    'Speaking-focused lessons',
    'Teacher + assistant support'
  ],
  programs: [
    {
      title: 'Kindergarten English',
      ageRange: 'Ages 4–6',
      description:
        'Build early listening, speaking, classroom routines, and confidence through songs, stories, games, and guided interaction.',
      highlights: ['Play-based learning', 'Visual vocabulary', 'Parent-managed progress']
    },
    {
      title: 'Primary English',
      ageRange: 'Grades 1–5',
      description:
        'Develop vocabulary, sentence patterns, phonics, school support, and basic communication confidence.',
      highlights: ['Speaking every class', 'Homework tracking', 'Progress updates']
    },
    {
      title: 'Secondary English',
      ageRange: 'Grades 6–9',
      description:
        'Improve grammar, speaking, reading, writing, and confidence for school and real-life communication.',
      highlights: ['Grammar foundation', 'Speaking practice', 'Skill reports']
    }
  ]
}
```

---

## 12. Required UI Components

### 12.1 LandingHeader

Requirements:

- Sticky top.
- Glass background after scroll.
- Logo on the left.
- Navigation in the center or right.
- CTA button on the right.
- Mobile hamburger menu.
- Active section state optional.

### 12.2 HeroSection

Requirements:

- Large headline.
- CTA group.
- Liquid glass preview card.
- Learning Orbit visual.
- Decorative red glow.
- Responsive layout.

### 12.3 ProgramCard

Requirements:

- Glass card.
- Icon or small visual marker.
- Age range badge.
- Description.
- Highlights.
- Hover animation.

### 12.4 TrialClassForm

Fields:

```text
Parent name
Phone number
Student age / grade
Interested program
Preferred contact method
Message
```

Validation:

- Parent name required.
- Phone number required.
- Student age or grade required.
- Phone format should support Vietnamese phone numbers.

### 12.5 FAQAccordion

Use Shadcn Accordion.

Suggested questions:

```text
How does APIX place students into the right class?
Can young students study without their own phone or account?
How do parents receive progress updates?
How many students are in one class?
What happens if a student misses a class?
```

---

## 13. Technical Stack

Use:

```text
Next.js 15
React 19
TypeScript
TailwindCSS
Shadcn UI
Framer Motion
React Hook Form
Zod
Lucide React
Lenis optional
```

Install suggestion:

```bash
npm install framer-motion react-hook-form zod @hookform/resolvers lucide-react
npm install lenis
```

---

## 14. Tailwind Theme Extension

Add these tokens to Tailwind config or global CSS variables.

```ts
theme: {
  extend: {
    colors: {
      brand: {
        red: '#FF161A',
        deepRed: '#B80012',
        softRed: '#FFE7E8',
        ink: '#111318',
        graphite: '#2A2D34'
      }
    },
    borderRadius: {
      glass: '32px',
      pill: '999px'
    },
    boxShadow: {
      glass: '0 24px 80px rgba(255, 22, 26, 0.10)',
      redGlow: '0 18px 50px rgba(255, 22, 26, 0.32)'
    }
  }
}
```

---

## 15. Accessibility Requirements

The page must be accessible and usable.

Requirements:

- All buttons and links must have visible focus states.
- Text must pass contrast requirements.
- Mobile menu must be keyboard accessible.
- Images must have meaningful alt text.
- Forms must have labels, validation messages, and clear error states.
- Animations must respect `prefers-reduced-motion`.
- Do not rely only on color to communicate status.

---

## 16. Performance Requirements

The landing page must feel fast.

Requirements:

- Use Next.js Image for real images.
- Avoid loading heavy animation libraries unless needed.
- Lazy load below-the-fold sections if appropriate.
- Keep hero optimized.
- Do not use large video backgrounds by default.
- Use CSS gradients instead of heavy image backgrounds where possible.
- Avoid excessive blur layers on mobile because backdrop blur can be expensive.

Mobile glass fallback:

```css
@media (max-width: 768px) {
  .apix-glass {
    backdrop-filter: blur(14px);
  }
}
```

---

## 17. Responsive Requirements

### Desktop

- Hero should use two-column layout.
- Cards should use 3-column grids where appropriate.
- Header navigation visible.

### Tablet

- Hero can remain two-column if space allows.
- Cards should use 2-column layout.

### Mobile

- Hero becomes single-column.
- Header uses hamburger menu.
- CTA buttons stack vertically or become full-width.
- Glass cards should have reduced blur and simpler shadows.
- Avoid tiny text; minimum body text 16px.

---

## 18. Do Not Copy Rules

The page may be inspired by the quality level of established English centers, but must not copy:

- VUS layout.
- VUS wording.
- VUS section order exactly.
- VUS colors or visual identity.
- Any exact icons, banners, characters, mascots, or card compositions from competitor websites.

The design must feel like APIX:

- Bold red brand presence.
- Liquid glass modern interface.
- Parent-focused progress visibility.
- Practical communication-focused English learning.

---

## 19. Suggested Microcopy

Use clear, parent-friendly microcopy.

### Buttons

```text
Đăng ký học thử
Xem lộ trình học
Nhận tư vấn lớp phù hợp
Gọi trung tâm
Chat Zalo
```

### Empty/Form Success State

```text
Thank you. APIX staff will contact you soon to recommend a suitable class.
```

Vietnamese:

```text
Cảm ơn phụ huynh. APIX sẽ liên hệ để tư vấn lớp học phù hợp cho bé.
```

### Form Error Examples

```text
Please enter parent name.
Please enter a valid phone number.
Please choose the student's age or grade.
```

---

## 20. Implementation Prompt for AI Coding Assistant

Use the following prompt when asking an AI coding tool to create the landing page:

```text
Create a modern responsive landing page for APIX English using Next.js 15, React 19, TypeScript, TailwindCSS, Shadcn UI, and Framer Motion.

Follow the APIX_LANDING_PAGE_DESIGN_SPEC.md file exactly.

Design direction:
- Premium liquid glass interface.
- Main brand color #FF161A.
- White/red modern education brand.
- Parent-friendly, trustworthy, energetic.
- Do not copy VUS or any competitor website.

Required sections:
1. Sticky glass header
2. Hero with headline, CTA, learning orbit, glass preview card
3. Trust bar
4. Program overview
5. Learning method timeline
6. Parent progress visibility section
7. Teacher and classroom support section
8. Campus section
9. Testimonials/results section
10. Trial class form
11. FAQ
12. Footer

Architecture:
- Use section-based components under components/landing.
- Use reusable brand components under components/brand.
- Store content in constants/landing-content.ts.
- Use SOLID-friendly component design.
- No huge page.tsx file.
- Use Framer Motion but respect reduced motion.
- Ensure mobile responsiveness and accessibility.

Output production-quality code, not a prototype.
```

---

## 21. Definition of Done

The landing page is complete only when:

- It looks like a custom APIX English landing page, not a template.
- It uses the APIX red and liquid glass direction consistently.
- It has smooth but controlled animations.
- It is responsive on desktop, tablet, and mobile.
- It has accessible navigation and forms.
- It does not copy VUS or any competitor.
- Content is stored separately from components.
- Components follow single responsibility.
- The hero section is visually memorable.
- CTA is clear and visible above the fold.
- Form validation works.
- Reduced motion is respected.
- The page is ready to connect to backend API later.
```
