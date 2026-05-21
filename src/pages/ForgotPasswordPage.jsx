import React, { useState } from 'react';
import { Grid, Column, Form, TextInput, Button, Tile, Stack } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './ForgotPasswordPage.scss';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Grid className="forgot-password-page">
      <Column sm={4} md={8} lg={{ span: 8, offset: 4 }} xlg={{ span: 6, offset: 5 }}>
        <div className="forgot-password-container">
          <Tile className="forgot-password-card">
            <Stack gap={6}>
              <Form onSubmit={handleSubmit}>
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
                    className="forgot-password-submit"
                  >
                    Submit
                  </Button>
                </Stack>
              </Form>
            </Stack>
          </Tile>
        </div>
      </Column>
    </Grid>
  );
}
