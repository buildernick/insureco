import React, { useState, useEffect } from 'react';
import { Button, TextInput } from '@carbon/react';
import { Close, ArrowRight } from '@carbon/icons-react';
import StepBreadcrumb from './StepBreadcrumb';
import './SignUpDrawer.scss';

const STEPS = [
  { label: 'Personal Info', key: 'personal' },
  { label: 'Address', key: 'address' },
  { label: 'Insurance', key: 'insurance' },
  { label: 'Coverage', key: 'coverage' },
];

export default function SignUpDrawer({ isOpen, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Tiny delay so the CSS transition fires after mount
      requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = 'hidden';
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen && !visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`signup-drawer__backdrop ${visible ? 'signup-drawer__backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={`signup-drawer ${visible ? 'signup-drawer--open' : ''}`}
        aria-label="Sign up form"
        role="dialog"
        aria-modal="true"
      >
        {/* Header banner */}
        <div className="signup-drawer__banner">
          <button className="signup-drawer__close" onClick={onClose} aria-label="Close sign-up form">
            <Close size={20} />
          </button>
          <h2 className="signup-drawer__banner-title">Sign Up for InsureCo</h2>
          <p className="signup-drawer__banner-subtitle">
            Get started with your insurance coverage in just a few steps
          </p>
        </div>

        {/* Progress */}
        <div className="signup-drawer__progress">
          <StepBreadcrumb steps={STEPS} currentIndex={0} />
        </div>

        {/* Form body */}
        <div className="signup-drawer__body">
          <div className="signup-drawer__section-header">
            <h3 className="signup-drawer__section-title">Personal Information</h3>
            <div className="signup-drawer__divider" />
          </div>
          <p className="signup-drawer__section-desc">
            Let's start with some basic information about you.
          </p>

          <div className="signup-drawer__fields">
            <TextInput
              id="drawer-first-name"
              labelText="First Name"
              placeholder="Enter your first name"
              size="lg"
            />
            <TextInput
              id="drawer-last-name"
              labelText="Last Name"
              placeholder="Enter your last name"
              size="lg"
            />
            <TextInput
              id="drawer-email"
              labelText="Email Address"
              placeholder="your.email@example.com"
              type="email"
              size="lg"
            />
            <TextInput
              id="drawer-phone"
              labelText="Phone Number"
              placeholder="(555) 123-4567"
              type="tel"
              size="lg"
            />
            <TextInput
              id="drawer-dob"
              labelText="Date of Birth"
              placeholder="mm/dd/yyyy"
              type="date"
              size="lg"
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="signup-drawer__footer">
          <Button
            kind="primary"
            size="lg"
            renderIcon={ArrowRight}
            className="signup-drawer__next-btn"
          >
            Next
          </Button>
        </div>
      </aside>
    </>
  );
}
