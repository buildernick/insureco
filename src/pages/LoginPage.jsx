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
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

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
                    <Link
                      href="#"
                      className="forgot-password-link"
                      onClick={(e) => { e.preventDefault(); setForgotPasswordOpen(true); }}
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
        onRequestClose={() => setForgotPasswordOpen(false)}
        modalHeading="Check your email"
        passiveModal
      >
        <p>We've sent a magic link to your email address. Click the link in the email to sign in — no password needed.</p>
      </Modal>
    </Grid>
  );
}
