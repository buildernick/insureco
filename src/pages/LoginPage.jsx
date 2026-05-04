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
} from '@carbon/react';
import { Login, ArrowRight, ArrowLeft, Checkmark } from '@carbon/icons-react';
import './LoginPage.scss';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Forgot password state: 'login' | 'forgot' | 'sent'
  const [view, setView] = useState('login');
  const [resetEmail, setResetEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setView('sent');
  };

  const handleBackToLogin = () => {
    setResetEmail('');
    setView('login');
  };

  if (view === 'forgot') {
    return (
      <Grid className="login-page">
        <Column sm={4} md={8} lg={{ span: 8, offset: 4 }} xlg={{ span: 6, offset: 5 }}>
          <div className="login-container">
            <Tile className="login-card">
              <Stack gap={6} className="login-content">
                <div className="login-header">
                  <Heading className="login-title">Reset Password</Heading>
                  <p className="login-subtitle">
                    Enter your email and we'll send you a reset link
                  </p>
                </div>

                <Form onSubmit={handleForgotSubmit} className="login-form">
                  <Stack gap={5}>
                    <TextInput
                      id="reset-email"
                      labelText="Email Address"
                      placeholder="you@example.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      type="email"
                      required
                    />

                    <Button
                      type="submit"
                      kind="primary"
                      size="lg"
                      renderIcon={ArrowRight}
                      className="login-button"
                    >
                      Send Reset Link
                    </Button>
                  </Stack>
                </Form>

                <div className="login-footer">
                  <Link
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleBackToLogin(); }}
                    className="back-to-login-link"
                  >
                    <ArrowLeft size={16} />
                    Back to sign in
                  </Link>
                </div>
              </Stack>
            </Tile>
          </div>
        </Column>
      </Grid>
    );
  }

  if (view === 'sent') {
    return (
      <Grid className="login-page">
        <Column sm={4} md={8} lg={{ span: 8, offset: 4 }} xlg={{ span: 6, offset: 5 }}>
          <div className="login-container">
            <Tile className="login-card">
              <Stack gap={6} className="login-content">
                <div className="reset-success-icon">
                  <div className="reset-success-circle">
                    <Checkmark size={32} />
                  </div>
                </div>

                <div className="login-header">
                  <Heading className="login-title">Check your email</Heading>
                  <p className="login-subtitle">
                    If <strong>{resetEmail}</strong> is associated with an account, you'll
                    receive a password reset link shortly.
                  </p>
                </div>

                <div className="login-footer">
                  <Link
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleBackToLogin(); }}
                    className="back-to-login-link"
                  >
                    <ArrowLeft size={16} />
                    Back to sign in
                  </Link>
                </div>
              </Stack>
            </Tile>
          </div>
        </Column>
      </Grid>
    );
  }

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
                <Heading className="login-title">Welcome Back</Heading>
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
                      onClick={(e) => { e.preventDefault(); setView('forgot'); }}
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
                  <Link
                    href="/signup"
                    onClick={(e) => { e.preventDefault(); navigate('/signup'); }}
                  >
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
    </Grid>
  );
}
