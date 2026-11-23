import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  InlineNotification,
} from '@carbon/react';
import { Password, ArrowRight } from '@carbon/icons-react';
import './LoginPage.scss';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || '');
  const [sent, setSent] = useState(false);

  const emailValid = /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValid) setSent(true);
  };

  const goToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <Grid className="login-page">
      <Column sm={4} md={8} lg={{ span: 8, offset: 4 }} xlg={{ span: 6, offset: 5 }}>
        <div className="login-container">
          <Tile className="login-card">
            <div className="login-icon">
              <div className="login-icon-circle">
                <Password size={32} />
              </div>
            </div>

            <Stack gap={6} className="login-content">
              <div className="login-header">
                <Heading className="login-title">
                  {sent ? 'Check your email' : 'Reset your password'}
                </Heading>
                <p className="login-subtitle">
                  {sent
                    ? 'We sent you instructions to reset your password'
                    : "Enter the email address associated with your account and we'll send you a link to reset your password."}
                </p>
              </div>

              {sent ? (
                <Stack gap={5}>
                  <InlineNotification
                    kind="success"
                    lowContrast
                    hideCloseButton
                    title="Reset link sent"
                    subtitle={`If an account exists for ${email}, you'll receive a password reset link shortly.`}
                  />
                  <Button
                    kind="primary"
                    size="lg"
                    renderIcon={ArrowRight}
                    className="login-button"
                    onClick={() => navigate('/login')}
                  >
                    Back to sign in
                  </Button>
                </Stack>
              ) : (
                <Form onSubmit={handleSubmit} className="login-form">
                  <Stack gap={5}>
                    <TextInput
                      id="reset-email"
                      labelText="Email Address"
                      placeholder="you@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button
                      type="submit"
                      kind="primary"
                      size="lg"
                      renderIcon={ArrowRight}
                      className="login-button"
                      disabled={!emailValid}
                    >
                      Send reset link
                    </Button>
                  </Stack>
                </Form>
              )}

              {!sent && (
                <div className="login-footer">
                  <p className="signup-prompt">
                    Remembered your password?{' '}
                    <Link href="/login" onClick={goToLogin}>
                      Back to sign in
                    </Link>
                  </p>
                </div>
              )}
            </Stack>
          </Tile>
        </div>
      </Column>
    </Grid>
  );
}
