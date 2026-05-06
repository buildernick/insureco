import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Column, Tag } from "@carbon/react";
import {
  Play,
  Idea,
  PaintBrush,
  UserMultiple,
  ChevronRight,
  Code,
  ListChecked,
  Rocket,
  Lightning,
  Copy,
} from "@carbon/icons-react";
import "./WorkshopPage.scss";

const sections = [
  { id: "overview", label: "Overview", icon: Rocket },
  { id: "interact", label: "Interact Mode", icon: Play },
  { id: "plan", label: "Plan Mode", icon: Idea },
  { id: "style", label: "Style Mode", icon: PaintBrush },
  { id: "collaboration", label: "Collaboration", icon: UserMultiple },
  { id: "prompts", label: "Prompt Ideas", icon: Lightning },
];

function PromptBlock({ children }) {
  return (
    <div className="workshop-prompt-block">
      <Code size={16} className="workshop-prompt-icon" />
      <p className="workshop-prompt-text">{children}</p>
    </div>
  );
}

function StepCard({ number, title, children }) {
  return (
    <div className="workshop-step-card">
      <div className="workshop-step-number">{number}</div>
      <div className="workshop-step-content">
        <h3 className="workshop-step-title">{title}</h3>
        <div className="workshop-step-body">{children}</div>
      </div>
    </div>
  );
}

function BonusCard({ children }) {
  return (
    <div className="workshop-bonus-card">
      <Tag type="cyan" className="workshop-bonus-tag">BONUS</Tag>
      <div className="workshop-bonus-content">{children}</div>
    </div>
  );
}

function SectionOverview() {
  return (
    <div className="workshop-section-content">
      <div className="workshop-overview-hero">
        <h2 className="workshop-section-title">What We're Doing Today</h2>
        <p className="workshop-section-subtitle">
          Builder.io is an AI-powered development platform. Today's workshop walks you through
          its three core modes, so you can build and iterate with confidence.
        </p>
      </div>

      <div className="workshop-mode-cards">
        <div className="workshop-mode-card">
          <div className="workshop-mode-icon-wrap workshop-mode-icon--interact">
            <Play size={24} />
          </div>
          <div className="workshop-mode-details">
            <h3>Interact Mode</h3>
            <p>Iterate directly with the AI agent using natural language prompts and real-time preview. Build by describing what you want.</p>
          </div>
        </div>
        <div className="workshop-mode-card">
          <div className="workshop-mode-icon-wrap workshop-mode-icon--plan">
            <Idea size={24} />
          </div>
          <div className="workshop-mode-details">
            <h3>Plan Mode</h3>
            <p>Strategize enhancements before building. The agent researches, proposes a plan, and waits for your approval before executing.</p>
          </div>
        </div>
        <div className="workshop-mode-card">
          <div className="workshop-mode-icon-wrap workshop-mode-icon--style">
            <PaintBrush size={24} />
          </div>
          <div className="workshop-mode-details">
            <h3>Style Mode</h3>
            <p>Visually tweak and refine any element on the page. Click, adjust, and apply changes without writing CSS manually.</p>
          </div>
        </div>
        <div className="workshop-mode-card">
          <div className="workshop-mode-icon-wrap workshop-mode-icon--collab">
            <UserMultiple size={24} />
          </div>
          <div className="workshop-mode-details">
            <h3>Collaboration & Review</h3>
            <p>Share live preview URLs, assign reviewers, and send pull requests—all from within the Builder.io interface.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

function SectionInteract() {
  return (
    <div className="workshop-section-content">
      <div className="workshop-section-header">
        <div className="workshop-section-mode-badge workshop-section-mode-badge--interact">
          <Play size={16} /> Interact Mode
        </div>
        <h2 className="workshop-section-title">Iterate with the Agent</h2>
        <p className="workshop-section-subtitle">
          Use natural language to describe what you want to build. The agent updates the app in real-time as you chat.
        </p>
      </div>

      <div className="workshop-tips-bar">
        <ListChecked size={16} />
        <span>In Interact Mode: prompt in the chat box → watch the preview update → iterate as needed</span>
      </div>

      <div className="workshop-steps">
        <StepCard number={1} title="Import the Figma Screens">
          <ol className="workshop-ol">
            <li>
              Navigate to the{" "}
              <a
                href="https://www.figma.com/design/N9IZ3G9t4Wz2tc4PBJTJEw/Workshop---InsureCo?node-id=11147-17281"
                target="_blank"
                rel="noopener noreferrer"
                className="workshop-link"
              >
                Figma design file
              </a>
            </li>
            <li>Duplicate the design file to your personal drafts</li>
            <li>Open the <strong>Builder.io Figma plugin</strong> and log in</li>
            <li>Navigate to the <strong>"Web App – Sign Up"</strong> page and select the sign-up frames</li>
            <li>Click <strong>"Smart Export"</strong> and paste the export into your Builder.io chat</li>
            <li><em>Don't submit yet — wait until you've added the prompt in Step 2!</em></li>
          </ol>
        </StepCard>

        <StepCard number={2} title="Submit Your Initial Prompt">
          <p>Enter the following prompt alongside your Figma import and submit:</p>
          <PromptBlock>Add the sign up flow to my sign up page</PromptBlock>
          <p className="workshop-step-note">The agent will read the Figma export and implement the multi-step sign-up flow in your app.</p>
        </StepCard>

        <StepCard number={3} title="Add Form Validation">
          <p>Once the sign-up form is in place, submit this follow-up prompt:</p>
          <PromptBlock>Add validation to the new sign up form</PromptBlock>
          <p className="workshop-step-note">The agent will add required field checks, error states, and validation messages to each step of the form.</p>
        </StepCard>
      </div>

      <BonusCard>
        <h4>Bonus: Add a Map Filter</h4>
        <p>Use the "Web App – Map Filter" Figma frame to add a cascading filter to the Map page. Try this prompt:</p>
        <PromptBlock>Add this filter to the map page. Look at the data model and populate the filter with the values from Properties and Vehicles</PromptBlock>

        <h4 style={{ marginTop: "1rem" }}>Bonus: Screenshot → Prompt</h4>
        <PromptBlock>Take a screenshot of something that could look better in your new form, then send it to the agent with a prompt describing the improvement you want.</PromptBlock>
      </BonusCard>
    </div>
  );
}

function SectionPlan() {
  return (
    <div className="workshop-section-content">
      <div className="workshop-section-header">
        <div className="workshop-section-mode-badge workshop-section-mode-badge--plan">
          <Idea size={16} /> Plan Mode
        </div>
        <h2 className="workshop-section-title">Strategize on Enhancements</h2>
        <p className="workshop-section-subtitle">
          Plan Mode lets you review a proposed approach before any code is written — great for larger changes or when you want to think things through first.
        </p>
      </div>

      <div className="workshop-tips-bar">
        <ListChecked size={16} />
        <span>Switch to Plan Mode using the dropdown next to the chat box — look for the "Build" button and switch it to "Plan"</span>
      </div>

      <div className="workshop-steps">
        <StepCard number={1} title="Switch to Plan Mode">
          <p>In the chat input area, click the <strong>"Build"</strong> dropdown and switch it to <strong>"Plan"</strong>. The placeholder text will change to "Describe what you want to plan…"</p>
        </StepCard>

        <StepCard number={2} title="Submit Your Planning Prompt">
          <p>Use this prompt to have the agent research and suggest a high-impact feature:</p>
          <PromptBlock>Do a web search for popular insurance providers. Suggest a high-impact feature they use that I could add to drive user conversion in my new sign up flow.</PromptBlock>
          <p className="workshop-step-note">The agent will search the web, analyze what top insurers do, and propose an implementation plan — without writing any code yet.</p>
        </StepCard>

        <StepCard number={3} title="Review & Implement the Plan">
          <ol className="workshop-ol">
            <li>Read through the agent's proposed approach and steps</li>
            <li>Ask follow-up questions or request changes to the plan if needed</li>
            <li>When satisfied, click <strong>"Implement Plan"</strong> — the agent will begin building based on the approved plan</li>
          </ol>
        </StepCard>
      </div>

      <BonusCard>
        <h4>Bonus: Build a Variant</h4>
        <p>Use Plan Mode to design a variant of the sign-up flow, or plan out a new feature somewhere else in the app. Collaborate back-and-forth with the agent to refine the plan before implementing.</p>
      </BonusCard>

      <div className="workshop-try-block">
        <h3>More Ideas to Try</h3>
        <div className="workshop-try-items">
          <div className="workshop-try-item">
            <ChevronRight size={16} />
            <div>
              <strong>Animation Suggestion</strong>
              <p>Select an element, then prompt: <em>"Add an animation to this element"</em></p>
            </div>
          </div>
          <div className="workshop-try-item">
            <ChevronRight size={16} />
            <div>
              <strong>Design Audit</strong>
              <p>Prompt: <em>"Audit this design against WCAG 2.2. Flag any violations, suggest corrections, and explain the relevant rule for each finding."</em></p>
            </div>
          </div>
          <div className="workshop-try-item">
            <ChevronRight size={16} />
            <div>
              <strong>Component Suggestions</strong>
              <p>Prompt: <em>"Make me suggestions for a better progress bar that is optimized for mobile"</em></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionStyle() {
  return (
    <div className="workshop-section-content">
      <div className="workshop-section-header">
        <div className="workshop-section-mode-badge workshop-section-mode-badge--style">
          <PaintBrush size={16} /> Style Mode
        </div>
        <h2 className="workshop-section-title">Tweak & Refine Visually</h2>
        <p className="workshop-section-subtitle">
          Style Mode lets you click any element on the page and visually adjust its appearance — no CSS knowledge required.
        </p>
      </div>

      <div className="workshop-tips-bar">
        <ListChecked size={16} />
        <span>Switch to Style Mode via the "Style" tab in the left panel. Click any element to see its style controls.</span>
      </div>

      <div className="workshop-steps">
        <StepCard number={1} title="Fix the Login Page Layout">
          <ol className="workshop-ol">
            <li>Navigate to the <strong>/login</strong> page using the app navigation</li>
            <li>Select the <strong>"Style"</strong> tab in the left panel</li>
            <li>Click on the off-centered login box to select it</li>
            <li>Adjust the alignment controls to center the login box on the page</li>
            <li>Return to the <strong>"Agent"</strong> tab</li>
            <li>Click <strong>"Apply Visual Changes"</strong> at the top of the screen</li>
          </ol>
        </StepCard>

        <StepCard number={2} title="Style the Feature Cards">
          <ol className="workshop-ol">
            <li>Navigate to the <strong>/</strong> (home) page</li>
            <li>Select the <strong>"Style"</strong> tab</li>
            <li>Click on one of the feature cards (e.g. "Comprehensive Coverage")</li>
            <li>In the Style panel, find the <strong>Border</strong> section</li>
            <li>Increase the border size and pick a color</li>
            <li>Click <strong>"Apply Visual Changes"</strong> at the top of the screen to save</li>
          </ol>
        </StepCard>
      </div>

      <BonusCard>
        <h4>Bonus: Explore More</h4>
        <p>Try selecting other elements across different pages — headings, buttons, tiles, form fields. Experiment with shadows, border radius, spacing, and colors. All changes can be applied or reverted before saving.</p>
      </BonusCard>
    </div>
  );
}

function SectionCollaboration() {
  return (
    <div className="workshop-section-content">
      <div className="workshop-section-header">
        <div className="workshop-section-mode-badge workshop-section-mode-badge--collab">
          <UserMultiple size={16} /> Collaboration & Review
        </div>
        <h2 className="workshop-section-title">Test, Review & Ship Updates</h2>
        <p className="workshop-section-subtitle">
          Builder.io makes it easy to share your work, collect feedback, and push code — all without leaving the platform.
        </p>
      </div>

      <div className="workshop-tips-bar">
        <ListChecked size={16} />
        <span>Collaboration workflows can be tailored to align with your team's current review process and needs.</span>
      </div>

      <div className="workshop-steps">
        <StepCard number={1} title="Share a Live Preview">
          <ol className="workshop-ol">
            <li>Click the <strong>"Share"</strong> button in the top toolbar</li>
            <li>Click on your <strong>Preview URL</strong> — your functional prototype will load in a new tab</li>
            <li>Share this link with anyone — they can interact with the live prototype without any login</li>
          </ol>
        </StepCard>

        <StepCard number={2} title="Add a Reviewer">
          <ol className="workshop-ol">
            <li>Click the <strong>"Review"</strong> button in the top toolbar</li>
            <li>Under <strong>"Add Reviewers"</strong>, select <strong>"Admin"</strong></li>
            <li>Optionally add a <strong>Branch Description</strong> so reviewers know what to focus on</li>
          </ol>
        </StepCard>

        <StepCard number={3} title="Push & Create a PR">
          <ol className="workshop-ol">
            <li>When your changes are ready, click the <strong>"Send PR"</strong> button in the top right</li>
            <li>This pushes your branch and creates a pull request in your connected GitHub repository</li>
            <li>Your team can review the diff, leave comments, and merge — just like any normal PR workflow</li>
          </ol>
        </StepCard>
      </div>

      <BonusCard>
        <h4>Bonus: Branch Description</h4>
        <p>Add a descriptive branch description when creating your PR so reviewers immediately understand the context and what specifically to review. This is especially helpful when working with AI-generated changes.</p>
      </BonusCard>
    </div>
  );
}


const allPrompts = [
  {
    category: "Interact Mode",
    badge: "interact",
    items: [
      {
        label: "Add the Sign Up Flow",
        desc: "Imports a Figma design and builds out the multi-step sign-up form.",
        text: "Add the sign up flow to my sign up page",
      },
      {
        label: "Add Form Validation",
        desc: "Adds required-field checks, error states, and messages to each step.",
        text: "Add validation to the new sign up form",
      },
      {
        label: "Add a Map Filter",
        desc: "Adds a cascading filter to the Map page using Properties and Vehicles data.",
        text: "Add this filter to the map page. Look at the data model and populate the filter with the values from Properties and Vehicles",
      },
      {
        label: "Screenshot → Improve",
        desc: "Attach a screenshot and describe the visual problem you want fixed.",
        text: "Take a screenshot of something that could look better in your new form, then send it to the agent with a prompt describing the improvement you want.",
      },
    ],
  },
  {
    category: "Plan Mode",
    badge: "plan",
    items: [
      {
        label: "Research & Suggest a Feature",
        desc: "Agent searches the web, analyzes top insurers, and proposes a conversion-driving feature — without writing code.",
        text: "Do a web search for popular insurance providers. Suggest a high-impact feature they use that I could add to drive user conversion in my new sign up flow.",
      },
    ],
  },
  {
    category: "Bonus Ideas",
    badge: "bonus",
    items: [
      {
        label: "Add an Animation",
        desc: "Select an element first, then send this prompt.",
        text: "Add an animation to this element",
      },
      {
        label: "WCAG Design Audit",
        desc: "Audits the current page for accessibility violations.",
        text: "Audit this design against WCAG 2.2. Flag any violations, suggest corrections, and explain the relevant rule for each finding.",
      },
      {
        label: "Better Progress Bar",
        desc: "Get component suggestions optimised for mobile users.",
        text: "Make me suggestions for a better progress bar that is optimized for mobile",
      },
    ],
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <button className={`prompt-copy-btn ${copied ? "prompt-copy-btn--copied" : ""}`} onClick={handleCopy} aria-label="Copy prompt">
      <Copy size={14} />
      <span>{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}

function SectionPrompts() {
  return (
    <div className="workshop-section-content">
      <div className="workshop-section-header">
        <div className="workshop-section-mode-badge workshop-section-mode-badge--prompts">
          <Lightning size={16} /> Prompt Ideas
        </div>
        <h2 className="workshop-section-title">All Workshop Prompts</h2>
        <p className="workshop-section-subtitle">
          Every prompt from the workshop in one place. Click "Copy" to paste directly into the Builder.io chat.
        </p>
      </div>

      {allPrompts.map((group) => (
        <div key={group.category} className="prompt-group">
          <div className={`prompt-group-label prompt-group-label--${group.badge}`}>{group.category}</div>
          <div className="prompt-cards">
            {group.items.map((item, i) => (
              <div key={i} className="prompt-card">
                <div className="prompt-card-meta">
                  <strong className="prompt-card-label">{item.label}</strong>
                  <p className="prompt-card-desc">{item.desc}</p>
                </div>
                <div className="prompt-card-text-row">
                  <p className="prompt-card-text">{item.text}</p>
                  <CopyButton text={item.text} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WorkshopPage() {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState(() => {
    const param = searchParams.get("section");
    return sections.find((s) => s.id === param) ? param : "overview";
  });

  useEffect(() => {
    const param = searchParams.get("section");
    if (param && sections.find((s) => s.id === param)) {
      setActiveSection(param);
    }
  }, [searchParams]);

  const renderSection = () => {
    switch (activeSection) {
      case "overview": return <SectionOverview />;
      case "interact": return <SectionInteract />;
      case "plan": return <SectionPlan />;
      case "style": return <SectionStyle />;
      case "collaboration": return <SectionCollaboration />;
      case "prompts": return <SectionPrompts />;
      default: return <SectionOverview />;
    }
  };

  return (
    <div className="workshop-page">
      <div className="workshop-hero">
        <Grid>
          <Column sm={4} md={8} lg={12}>
            <div className="workshop-hero-content">
              <Tag type="red" className="workshop-hero-tag">Builder.io Workshop</Tag>
              <h1 className="workshop-hero-title">Workshop Help Guide</h1>
              <p className="workshop-hero-desc">
                New to Builder.io? This guide walks you through every step of the workshop —
                from importing Figma designs to shipping changes with a pull request.
              </p>
            </div>
          </Column>
        </Grid>
      </div>

      <div className="workshop-body">
        <div className="workshop-sidebar">
          <nav className="workshop-nav" aria-label="Workshop sections">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  className={`workshop-nav-item ${activeSection === s.id ? "workshop-nav-item--active" : ""}`}
                  onClick={() => setActiveSection(s.id)}
                >
                  <Icon size={16} />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <main className="workshop-main">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
