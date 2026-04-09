import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Form,
  TextInput,
  Button,
  Tile,
  Heading,
  Stack,
  Link,
  Modal,
  InlineNotification,
} from '@carbon/react';
import { Login, ArrowRight, Email, Checkmark } from '@carbon/icons-react';
import './LoginPage.scss';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState('enter-email'); // 'enter-email' | 'email-sent'
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotEmailError, setForgotEmailError] = useState('');
  const [resentNotice, setResentNotice] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const openForgotPassword = (e) => {
    e.preventDefault();
    setForgotStep('enter-email');
    setForgotEmail('');
    setForgotEmailError('');
    setResentNotice(false);
    setForgotPasswordOpen(true);
  };

  const closeForgotPassword = () => {
    setForgotPasswordOpen(false);
    setForgotStep('enter-email');
    setForgotEmail('');
    setForgotEmailError('');
    setResentNotice(false);
  };

  const handleSendResetLink = () => {
    if (!forgotEmail.trim()) {
      setForgotEmailError('Please enter your email address.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(forgotEmail)) {
      setForgotEmailError('Please enter a valid email address.');
      return;
    }
    setForgotEmailError('');
    setResentNotice(false);
    setForgotStep('email-sent');
  };

  const handleResend = () => {
    setForgotStep('enter-email');
    setForgotEmailError('');
    setResentNotice(true);
  };

  const isEnterEmailStep = forgotStep === 'enter-email';

  return (
    <Grid className="login-page">
      <Column sm={4} md={8} lg={{ span: 8, offset: 4 }} xlg={{ span: 6, offset: 5 }}>
        <div className="login-container">
          <Tile className="login-card">
            <div className="login-icon">
              <div className="login-icon-circle">
                <Login size={32} />
              </div>
            </div>

            <Stack gap={6} className="login-content">
              <div className="login-header">
                <Heading className="login-title">
                  Welcome Back
                </Heading>
                <p className="login-subtitle">
                  Sign in to access your InsureCo dashboard
                </p>
              </div>

              <Form onSubmit={handleLogin} className="login-form">
                <Stack gap={5}>
                  <TextInput
                    id="email"
                    labelText="Email Address"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                  />
                  
                  <TextInput
                    id="password"
                    labelText="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    required
                  />

                  <div className="login-options">
                    <Link
                      href="#"
                      className="forgot-password-link"
                      onClick={openForgotPassword}
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    kind="primary"
                    size="lg"
                    renderIcon={ArrowRight}
                    className="login-button"
                  >
                    Sign In
                  </Button>
                </Stack>
              </Form>

              <div className="login-footer">
                <p className="signup-prompt">
                  Don't have an account?{' '}
                  <Link href="/signup" onClick={(e) => {
                    e.preventDefault();
                    navigate('/signup');
                  }}>
                    Sign up now
                  </Link>
                </p>
              </div>

              <div className="demo-notice">
                <p className="demo-text">
                  <strong>Demo Mode:</strong> Enter any email and password to sign in
                </p>
              </div>
            </Stack>
          </Tile>
        </div>
      </Column>

      <Modal
        open={forgotPasswordOpen}
        onRequestClose={closeForgotPassword}
        modalHeading={isEnterEmailStep ? 'Reset your password' : 'Check your email'}
        primaryButtonText={isEnterEmailStep ? 'Send Reset Link' : undefined}
        secondaryButtonText={isEnterEmailStep ? 'Cancel' : undefined}
        onRequestSubmit={isEnterEmailStep ? handleSendResetLink : undefined}
        onSecondarySubmit={isEnterEmailStep ? closeForgotPassword : undefined}
        passiveModal={!isEnterEmailStep}
        size="sm"
      >
        {isEnterEmailStep ? (
          <div className="forgot-password-body">
            {resentNotice && (
              <InlineNotification
                kind="info"
                title="Confirm your email"
                subtitle="Please confirm the address below before we resend the link."
                lowContrast
                hideCloseButton
                className="resend-notice"
              />
            )}
            <p className="forgot-password-description">
              Enter the email address associated with your account and we'll send you a reset link.
            </p>
            <TextInput
              id="forgot-email"
              labelText="Email Address"
              placeholder="you@example.com"
              value={forgotEmail}
              onChange={(e) => {
                setForgotEmail(e.target.value);
                if (forgotEmailError) setForgotEmailError('');
              }}
              type="email"
              invalid={!!forgotEmailError}
              invalidText={forgotEmailError}
              autoFocus
            />
          </div>
        ) : (
          <div className="email-sent-body">
            <div className="email-sent-icon">
              <div className="email-sent-icon-circle">
                <Email size={24} />
              </div>
            </div>
            <p className="email-sent-description">
              We've sent a reset link to <strong>{forgotEmail}</strong>. Check your inbox and click the link to reset your password.
            </p>
            <p className="email-sent-note">
              Didn't receive it?{' '}
              <Link href="#" onClick={(e) => { e.preventDefault(); handleResend(); }}>
                Resend the link
              </Link>
            </p>
          </div>
        )}
      </Modal>
    </Grid>
  );
}
