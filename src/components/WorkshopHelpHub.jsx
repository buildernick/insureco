import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Help,
  Close,
  Play,
  Idea,
  PaintBrush,
  UserMultiple,
  Chat,
  ArrowRight,
  Rocket,
} from "@carbon/icons-react";
import "./WorkshopHelpHub.scss";

const workshopLinks = [
  {
    id: "overview",
    label: "Workshop Overview",
    desc: "Agenda & what we're doing",
    icon: Rocket,
  },
  {
    id: "interact",
    label: "Interact Mode",
    desc: "Import Figma & prompt the agent",
    icon: Play,
  },
  {
    id: "plan",
    label: "Plan Mode",
    desc: "Strategize before building",
    icon: Idea,
  },
  {
    id: "style",
    label: "Style Mode",
    desc: "Visually tweak & refine",
    icon: PaintBrush,
  },
  {
    id: "collaboration",
    label: "Collaboration",
    desc: "Share previews & review",
    icon: UserMultiple,
  },
  {
    id: "discussion",
    label: "Discussion",
    desc: "Reflection questions",
    icon: Chat,
  },
];

const samplePrompts = [
  "Add the sign up flow to my sign up page",
  "Add validation to the new sign up form",
  "Do a web search for popular insurance providers. Suggest a high-impact feature they use that I could add to drive user conversion in my new sign up flow.",
];

export default function WorkshopHelpHub() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  // Close panel on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const goToSection = (sectionId) => {
    setOpen(false);
    navigate(`/workshop?section=${sectionId}`);
  };

  return (
    <div className="help-hub">
      {/* Floating trigger button */}
      <button
        ref={buttonRef}
        className={`help-hub-trigger ${open ? "help-hub-trigger--open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close workshop help" : "Open workshop help"}
        aria-expanded={open}
        aria-controls="help-hub-panel"
      >
        {open ? <Close size={20} /> : <Help size={20} />}
        <span className="help-hub-trigger-label">Workshop Help</span>
      </button>

      {/* Panel */}
      <div
        ref={panelRef}
        id="help-hub-panel"
        className={`help-hub-panel ${open ? "help-hub-panel--open" : ""}`}
        role="dialog"
        aria-label="Workshop Help"
        aria-hidden={!open}
      >
        <div className="help-hub-panel-header">
          <div>
            <h2 className="help-hub-panel-title">Workshop Help</h2>
            <p className="help-hub-panel-subtitle">Builder.io Workflow Validation</p>
          </div>
          <button
            className="help-hub-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Close help panel"
          >
            <Close size={16} />
          </button>
        </div>

        <div className="help-hub-panel-body">
          {/* Section Links */}
          <div className="help-hub-section-label">Jump to section</div>
          <nav className="help-hub-links" aria-label="Workshop sections">
            {workshopLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  className="help-hub-link"
                  onClick={() => goToSection(link.id)}
                >
                  <div className="help-hub-link-icon">
                    <Icon size={16} />
                  </div>
                  <div className="help-hub-link-text">
                    <span className="help-hub-link-label">{link.label}</span>
                    <span className="help-hub-link-desc">{link.desc}</span>
                  </div>
                  <ArrowRight size={14} className="help-hub-link-arrow" />
                </button>
              );
            })}
          </nav>

          {/* Quick Prompts */}
          <div className="help-hub-section-label help-hub-section-label--spaced">Quick prompts to try</div>
          <div className="help-hub-prompts">
            {samplePrompts.map((prompt, i) => (
              <div key={i} className="help-hub-prompt">
                <span className="help-hub-prompt-num">{i + 1}</span>
                <p>{prompt}</p>
              </div>
            ))}
          </div>

          {/* Full page link */}
          <button
            className="help-hub-full-link"
            onClick={() => { setOpen(false); navigate("/workshop"); }}
          >
            View full workshop guide
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
