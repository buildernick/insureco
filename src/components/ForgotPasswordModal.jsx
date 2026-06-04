import React, { useState } from 'react';
import {
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TextInput,
  Button,
  InlineNotification,
  Link,
  Stack,
} from '@carbon/react';
import { ArrowRight, ArrowLeft } from '@carbon/icons-react';
import './ForgotPasswordModal.scss';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordModal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    if (!email.trim()) {
      setEmailError('Email address is required.');
      return false;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setEmail('');
    setEmailError('');
    setSubmitted(false);
    onClose();
  };

  return (
    <ComposedModal open={open} onClose={handleClose} className="forgot-password-modal">
      <ModalHeader title="Forgot Password" />

      <ModalBody>
        {submitted ? (
          <Stack gap={5}>
            <InlineNotification
              kind="success"
              title="Magic link sent!"
              subtitle={`Check ${email} for a link to sign in.`}
              hideCloseButton
              className="modal-success-notification"
            />
            <p className="modal-hint-text">
              Didn't receive it? Check your spam folder or request a new link.
            </p>
          </Stack>
        ) : (
          <form id="forgot-password-form" onSubmit={handleSubmit} noValidate>
            <Stack gap={5}>
              <p className="modal-description">
                Enter your email address and we'll send you a magic link to sign in instantly — no password needed.
              </p>
              <TextInput
                id="modal-forgot-email"
                labelText="Email Address"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                invalid={!!emailError}
                invalidText={emailError}
                autoComplete="email"
                autoFocus
              />
            </Stack>
          </form>
        )}

        <div className="modal-help-row">
          <Link
            href="https://www.insureco.com/help"
            target="_blank"
            rel="noopener noreferrer"
            className="modal-help-link"
          >
            Still having trouble?
          </Link>
        </div>
      </ModalBody>

      <ModalFooter>
        {submitted ? (
          <Button
            kind="primary"
            onClick={handleClose}
            renderIcon={ArrowLeft}
            className="modal-back-button"
          >
            Back to Login
          </Button>
        ) : (
          <>
            <Button kind="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="forgot-password-form"
              kind="primary"
              renderIcon={ArrowRight}
            >
              Send Magic Link
            </Button>
          </>
        )}
      </ModalFooter>
    </ComposedModal>
  );
}
