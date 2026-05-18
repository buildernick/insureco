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
import { Login, ArrowRight, ArrowLeft } from '@carbon/icons-react';
import './LoginPage.scss';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetSubmitted, setResetSubmitted] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setResetSubmitted(true);
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setResetSubmitted(false);
    setForgotEmail('');
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

            {showForgotPassword ? (
              <Stack gap={6} className="login-content">
                <div className="login-header">
                  <Heading className="login-title">Reset Password</Heading>
                  <p className="login-subtitle">
                    {resetSubmitted
                      ? 'Check your inbox for a reset link.'
                      : "Enter your email and we'll send you a reset link."}
                  </p>
                </div>

                {!resetSubmitted && (
                  <Form onSubmit={handleForgotPassword} className="login-form">
                    <Stack gap={5}>
                      <TextInput
                        id="forgot-email"
                        labelText="Email Address"
                        placeholder="you@example.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
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
                )}

                <div className="back-to-login">
                  <Link href="#" onClick={(e) => { e.preventDefault(); handleBackToLogin(); }} className="back-link">
                    <ArrowLeft size={16} />
                    Back to sign in
                  </Link>
                </div>
              </Stack>
            ) : (
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
                        onClick={(e) => { e.preventDefault(); setShowForgotPassword(true); }}
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
            )}
          </Tile>
        </div>
      </Column>
    </Grid>
  );
}
