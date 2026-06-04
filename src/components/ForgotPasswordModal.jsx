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
import { ArrowRight } from '@carbon/icons-react';
import './ForgotPasswordModal.scss';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordModal({ open, onClose }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validate = (value) => {
    if (!value.trim()) return 'Email address is required';
    if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError(validate(e.target.value));
  };

  const handleSubmit = () => {
    const error = validate(email);
    if (error) {
      setEmailError(error);
      return;
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    setEmail('');
    setEmailError('');
    setSubmitted(false);
    onClose();
  };

  return (
    <ComposedModal open={open} onClose={handleClose} className="forgot-password-modal">
      <ModalHeader title="Forgot Password Reset Link" />

      <ModalBody>
        {submitted ? (
          <Stack gap={6}>
            <InlineNotification
              kind="success"
              title="Check your email for a magic link"
              subtitle="We've sent a password reset link to your email address."
              hideCloseButton
              className="reset-success-notice"
            />
            <div className="modal-footer-links">
              <Link href="/login" onClick={handleClose}>
                Back to Login
              </Link>
              <Link
                href="https://support.insureco.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Still having trouble? Contact Support
              </Link>
            </div>
          </Stack>
        ) : (
          <Stack gap={5}>
            <p className="reset-description">
              Enter your email address then check your email for a magic link!
            </p>
            <TextInput
              id="reset-email"
              labelText="Email Address"
              placeholder="you@example.com"
              type="email"
              value={email}
              onChange={handleEmailChange}
              invalid={!!emailError}
              invalidText={emailError}
            />
            <div className="modal-footer-links">
              <Link href="/login" onClick={handleClose}>
                Back to Login
              </Link>
              <Link
                href="https://support.insureco.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Still having trouble? Contact Support
              </Link>
            </div>
          </Stack>
        )}
      </ModalBody>

      {!submitted && (
        <ModalFooter>
          <Button kind="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button kind="primary" renderIcon={ArrowRight} onClick={handleSubmit}>
            Send Reset Link
          </Button>
        </ModalFooter>
      )}
    </ComposedModal>
  );
}
