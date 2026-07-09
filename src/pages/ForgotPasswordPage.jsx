import React, { useState } from 'react';
import {
  Grid,
  Column,
  Form,
  TextInput,
  Button,
  Tile,
  Stack,
  InlineNotification,
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './ForgotPasswordPage.scss';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Grid className="forgot-password-page">
      <Column sm={4} md={8} lg={{ span: 8, offset: 4 }} xlg={{ span: 6, offset: 5 }}>
        <div className="forgot-password-container">
          <Tile className="forgot-password-card">
            <Stack gap={6} className="forgot-password-content">

              {submitted ? (
                <InlineNotification
                  kind="success"
                  title="Check your email for a magic link"
                  subtitle=""
                  hideCloseButton
                  className="magic-link-notice"
                />
              ) : (
                <Form onSubmit={handleSubmit} className="forgot-password-form">
                  <Stack gap={5}>
                    <TextInput
                      id="forgot-email"
                      labelText="Email Address"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                    />

                    <Button
                      type="submit"
                      kind="primary"
                      size="lg"
                      renderIcon={ArrowRight}
                      className="forgot-password-button"
                    >
                      Send Magic Link
                    </Button>
                  </Stack>
                </Form>
              )}
            </Stack>
          </Tile>
        </div>
      </Column>
    </Grid>
  );
}
