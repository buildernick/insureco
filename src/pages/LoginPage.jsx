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
} from '@carbon/react';
import { Login, ArrowRight } from '@carbon/icons-react';
import './LoginPage.scss';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetOpen, setResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStep, setResetStep] = useState('email'); // 'email' | 'pin' | 'done'
  const [pin, setPin] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  const openReset = (e) => {
    e.preventDefault();
    setResetEmail(email);
    setResetStep('email');
    setPin('');
    setResetError('');
    setResetOpen(true);
  };

  const closeReset = () => setResetOpen(false);

  const post = async (url, body) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Something went wrong');
    return data;
  };

  const submitReset = async () => {
    if (resetStep === 'done') {
      closeReset();
      return;
    }
    setResetError('');
    setResetLoading(true);
    try {
      if (resetStep === 'email') {
        if (!resetEmail.trim()) return;
        await post('/api/forgot-password', { email: resetEmail });
        setResetStep('pin');
      } else {
        await post('/api/verify-otp', { email: resetEmail, pin });
        setResetStep('done');
      }
    } catch (err) {
      setResetError(err.message);
    } finally {
      setResetLoading(false);
    }
  };

  const primaryDisabled =
    resetLoading ||
    (resetStep === 'email' && !resetEmail.trim()) ||
    (resetStep === 'pin' && pin.length !== 6);

  const primaryText = { email: 'Send PIN', pin: 'Verify PIN', done: 'Done' }[resetStep];

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock authentication - no validation, just navigate to dashboard
    navigate('/dashboard');
  };

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
                    <Link href="#" className="forgot-password-link" onClick={openReset}>
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
        open={resetOpen}
        modalHeading="Reset your password"
        primaryButtonText={primaryText}
        secondaryButtonText={resetStep === 'done' ? undefined : 'Cancel'}
        primaryButtonDisabled={primaryDisabled}
        onRequestClose={closeReset}
        onRequestSubmit={submitReset}
        onSecondarySubmit={closeReset}
        size="xs"
      >
        {resetStep === 'done' && (
          <p>Your PIN was verified. You can now choose a new password.</p>
        )}
        {resetStep === 'pin' && (
          <Stack gap={5}>
            <p>We sent a one-time PIN to {resetEmail}. Enter it below to continue.</p>
            <TextInput
              id="reset-pin"
              labelText="One-time PIN"
              placeholder="6-digit PIN"
              inputMode="numeric"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              invalid={!!resetError}
              invalidText={resetError}
              data-modal-primary-focus
            />
          </Stack>
        )}
        {resetStep === 'email' && (
          <Stack gap={5}>
            <p>Enter the email address for your account and we'll send you a one-time PIN to reset your password.</p>
            <TextInput
              id="reset-email"
              labelText="Email Address"
              placeholder="you@example.com"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              invalid={!!resetError}
              invalidText={resetError}
              data-modal-primary-focus
            />
          </Stack>
        )}
      </Modal>
    </Grid>
  );
}
