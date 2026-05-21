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
  InlineNotification,
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { forgotPassword } from '../api/auth';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await forgotPassword(email);
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <Grid className="login-page">
      <Column sm={4} md={8} lg={{ span: 8, offset: 4 }} xlg={{ span: 6, offset: 5 }}>
        <div className="login-container">
          <Tile className="login-card">
            <Stack gap={6} className="login-content">
              <div className="login-header">
                <Heading className="login-title">Forgot Password</Heading>
                <p className="login-subtitle">
                  Enter your email and we'll send you a reset link.
                </p>
              </div>

              {submitted ? (
                <InlineNotification
                  kind="success"
                  title="Email sent"
                  subtitle={`Check ${email} for a password reset link.`}
                  hideCloseButton
                />
              ) : (
                <Form onSubmit={handleSubmit} className="login-form">
                  <Stack gap={5}>
                    <TextInput
                      id="forgot-email"
                      labelText="Email Address"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      required
                    />
                    <Button
                      type="submit"
                      kind="primary"
                      size="lg"
                      renderIcon={ArrowRight}
                      className="login-button"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                  </Stack>
                </Form>
              )}

              <div className="login-footer">
                <p className="signup-prompt">
                  Remember your password?{' '}
                  <Link
                    href="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/login');
                    }}
                  >
                    Back to sign in
                  </Link>
                </p>
              </div>
            </Stack>
          </Tile>
        </div>
      </Column>
    </Grid>
  );
}
