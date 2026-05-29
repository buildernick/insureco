import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Close } from '@carbon/icons-react';
import { useSignUpDrawer } from '../contexts/SignUpDrawerContext';
import SignUpPage from '../pages/SignUpPage';
import './SignUpDrawer.scss';

export default function SignUpDrawer() {
  const { isOpen, closeDrawer } = useSignUpDrawer();
  const navigate = useNavigate();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') closeDrawer(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, closeDrawer]);

  const handleComplete = (confirmationNumber) => {
    closeDrawer();
    navigate('/signup/confirmation', { state: { confirmationNumber } });
  };

  return (
    <>
      <div
        className={`signup-drawer-overlay${isOpen ? ' signup-drawer-overlay--visible' : ''}`}
        onClick={closeDrawer}
        aria-hidden="true"
      />
      <div
        className={`signup-drawer${isOpen ? ' signup-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Sign Up"
      >
        <div className="signup-drawer__header">
          <span className="signup-drawer__title">Sign Up</span>
          <button
            className="signup-drawer__close"
            onClick={closeDrawer}
            aria-label="Close sign up"
          >
            <Close size={20} />
          </button>
        </div>
        <div className="signup-drawer__body">
          {isOpen && <SignUpPage onComplete={handleComplete} isDrawer />}
        </div>
      </div>
    </>
  );
}
