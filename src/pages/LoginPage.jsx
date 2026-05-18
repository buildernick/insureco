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
  ComposedModal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InlineLoading,
} from '@carbon/react';
import { Login, ArrowRight, Email, Checkmark } from '@carbon/icons-react';
import './LoginPage.scss';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSending, setForgotSending] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const openForgotModal = (e) => {
    e.preventDefault();
    setForgotEmail(email);
    setForgotSent(false);
    setForgotSending(false);
    setForgotOpen(true);
  };

  const closeForgotModal = () => {
    setForgotOpen(false);
  };

  const handleSendMagicLink = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSending(true);
    // Simulate sending the magic link email
    setTimeout(() => {
      setForgotSending(false);
      setForgotSent(true);
    }, 1500);
  };

  return (
    <>
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
                      <Link href="#" className="forgot-password-link" onClick={openForgotModal}>
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
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/signup');
                      }}
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

      <ComposedModal open={forgotOpen} onClose={closeForgotModal} size="sm">
        <ModalHeader
          title="Reset your password"
          label="Password recovery"
        />
        <ModalBody>
          {forgotSent ? (
            <div className="magic-link-success">
              <div className="magic-link-success-icon">
                <Checkmark size={24} />
              </div>
              <p className="magic-link-success-heading">Check your inbox</p>
              <p className="magic-link-success-text">
                We sent a magic link to <strong>{forgotEmail}</strong>. Click the link in
                the email to sign in instantly — no password needed.
              </p>
            </div>
          ) : (
            <Form onSubmit={handleSendMagicLink} className="forgot-form">
              <p className="forgot-description">
                Enter your email address and we'll send you a magic link to sign in
                without a password.
              </p>
              <TextInput
                id="forgot-email"
                labelText="Email Address"
                placeholder="you@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                type="email"
                required
                disabled={forgotSending}
              />
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          {forgotSent ? (
            <Button kind="primary" onClick={closeForgotModal}>
              Done
            </Button>
          ) : (
            <>
              <Button kind="secondary" onClick={closeForgotModal} disabled={forgotSending}>
                Cancel
              </Button>
              {forgotSending ? (
                <InlineLoading
                  className="magic-link-loading"
                  description="Sending magic link…"
                  status="active"
                />
              ) : (
                <Button
                  kind="primary"
                  renderIcon={Email}
                  onClick={handleSendMagicLink}
                  disabled={!forgotEmail}
                >
                  Send magic link
                </Button>
              )}
            </>
          )}
        </ModalFooter>
      </ComposedModal>
    </>
  );
}
