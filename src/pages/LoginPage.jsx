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
  const [resetSent, setResetSent] = useState(false);

  const openReset = (e) => {
    e.preventDefault();
    setResetEmail(email);
    setResetSent(false);
    setResetOpen(true);
  };

  const closeReset = () => setResetOpen(false);

  const submitReset = () => {
    if (resetSent) {
      closeReset();
      return;
    }
    if (!resetEmail.trim()) return;
    setResetSent(true);
  };

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
        primaryButtonText={resetSent ? 'Done' : 'Send reset link'}
        secondaryButtonText={resetSent ? undefined : 'Cancel'}
        primaryButtonDisabled={!resetSent && !resetEmail.trim()}
        onRequestClose={closeReset}
        onRequestSubmit={submitReset}
        onSecondarySubmit={closeReset}
        size="xs"
      >
        {resetSent ? (
          <p>
            We sent you a mail. Check the inbox for {resetEmail} for a link to reset your password.
          </p>
        ) : (
          <Stack gap={5}>
            <p>Enter the email address for your account and we'll send you a link to reset your password.</p>
            <TextInput
              id="reset-email"
              labelText="Email Address"
              placeholder="you@example.com"
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              data-modal-primary-focus
            />
          </Stack>
        )}
      </Modal>
    </Grid>
  );
}
