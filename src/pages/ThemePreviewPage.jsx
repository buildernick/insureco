import React, { useState } from 'react';
import {
  Grid,
  Column,
  Button,
  TextInput,
  Select,
  SelectItem,
  Checkbox,
  RadioButton,
  RadioButtonGroup,
  Toggle,
  Tile,
  ProgressIndicator,
  ProgressStep,
  Heading,
  Stack,
  Tag,
  Link,
  InlineNotification,
  NumberInput,
  TileGroup,
  RadioTile,
} from '@carbon/react';
import { ArrowRight, Home as HomeIcon, Car } from '@carbon/icons-react';
import './ThemePreviewPage.scss';

export default function ThemePreviewPage() {
  const [textValue, setTextValue] = useState('Sample text');
  const [selectValue, setSelectValue] = useState('');
  const [radioValue, setRadioValue] = useState('option1');
  const [tileValue, setTileValue] = useState('');

  return (
    <div className="theme-preview-page">
      <Grid className="theme-preview-container">
        <Column lg={16} md={8} sm={4}>
          <div className="theme-preview-header">
            <Heading className="theme-preview-title">Theme Preview</Heading>
            <p className="theme-preview-subtitle">
              Visual reference for all design tokens and components in light and dark modes.
              Use the theme toggle in the header to switch between themes.
            </p>
          </div>

          {/* Color Tokens Section */}
          <section className="preview-section">
            <Heading className="section-heading">Color Tokens</Heading>
            
            <div className="token-group">
              <h4>Text Colors</h4>
              <div className="color-samples">
                <div className="color-sample">
                  <div className="sample-box" style={{ color: 'var(--text-primary)' }}>
                    <p className="large-text">Aa</p>
                    <span className="token-name">--text-primary</span>
                  </div>
                </div>
                
                <div className="color-sample">
                  <div className="sample-box" style={{ color: 'var(--text-secondary)' }}>
                    <p className="large-text">Aa</p>
                    <span className="token-name">--text-secondary</span>
                  </div>
                </div>
                
                <div className="color-sample">
                  <div className="sample-box" style={{ color: 'var(--text-tertiary)' }}>
                    <p className="large-text">Aa</p>
                    <span className="token-name">--text-tertiary</span>
                  </div>
                </div>
                
                <div className="color-sample">
                  <div className="sample-box" style={{ 
                    backgroundColor: 'var(--interactive-primary)',
                    color: 'var(--text-on-color)',
                    padding: 'var(--spacing-05)'
                  }}>
                    <p className="large-text">Aa</p>
                    <span className="token-name" style={{ color: 'var(--text-on-color)' }}>--text-on-color</span>
                  </div>
                </div>

                <div className="color-sample">
                  <div className="sample-box" style={{ color: 'var(--text-error)' }}>
                    <p className="large-text">Aa</p>
                    <span className="token-name">--text-error</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="token-group">
              <h4>Background Colors</h4>
              <div className="color-samples">
                <div className="color-sample">
                  <div className="sample-box bg-sample" style={{ 
                    backgroundColor: 'var(--background-primary)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <span className="token-name">--background-primary</span>
                  </div>
                </div>
                
                <div className="color-sample">
                  <div className="sample-box bg-sample" style={{ 
                    backgroundColor: 'var(--background-secondary)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <span className="token-name">--background-secondary</span>
                  </div>
                </div>
                
                <div className="color-sample">
                  <div className="sample-box bg-sample" style={{ 
                    backgroundColor: 'var(--background-tertiary)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <span className="token-name">--background-tertiary</span>
                  </div>
                </div>

                <div className="color-sample">
                  <div className="sample-box bg-sample" style={{ 
                    backgroundColor: 'var(--background-selected)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <span className="token-name">--background-selected</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="token-group">
              <h4>Interactive Colors</h4>
              <div className="color-samples">
                <div className="color-sample">
                  <div className="sample-box bg-sample" style={{ backgroundColor: 'var(--interactive-primary)' }}>
                    <span className="token-name" style={{ color: 'var(--text-on-color)' }}>--interactive-primary</span>
                  </div>
                </div>
                
                <div className="color-sample">
                  <div className="sample-box bg-sample" style={{ backgroundColor: 'var(--interactive-hover)' }}>
                    <span className="token-name" style={{ color: 'var(--text-on-color)' }}>--interactive-hover</span>
                  </div>
                </div>
                
                <div className="color-sample">
                  <div className="sample-box bg-sample" style={{ backgroundColor: 'var(--interactive-active)' }}>
                    <span className="token-name" style={{ color: 'var(--text-on-color)' }}>--interactive-active</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="token-group">
              <h4>Brand Colors</h4>
              <div className="color-samples">
                <div className="color-sample">
                  <div className="sample-box bg-sample" style={{ backgroundColor: 'var(--color-brand-red-60)' }}>
                    <span className="token-name" style={{ color: 'white' }}>Brand Red</span>
                  </div>
                </div>
                
                <div className="color-sample">
                  <div className="sample-box bg-sample" style={{ backgroundColor: 'var(--color-success)' }}>
                    <span className="token-name" style={{ color: 'white' }}>Success Green</span>
                  </div>
                </div>
                
                <div className="color-sample">
                  <div className="sample-box bg-sample" style={{ backgroundColor: 'var(--color-warning)' }}>
                    <span className="token-name" style={{ color: 'white' }}>Warning</span>
                  </div>
                </div>

                <div className="color-sample">
                  <div className="sample-box bg-sample" style={{ backgroundColor: 'var(--color-error)' }}>
                    <span className="token-name" style={{ color: 'white' }}>Error</span>
                  </div>
                </div>

                <div className="color-sample">
                  <div className="sample-box bg-sample" style={{ backgroundColor: 'var(--color-info)' }}>
                    <span className="token-name" style={{ color: 'white' }}>Info</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Typography Section */}
          <section className="preview-section">
            <Heading className="section-heading">Typography</Heading>
            <Stack gap={5}>
              <div>
                <h1 style={{ fontSize: 'var(--heading-h1-size)', fontWeight: 'var(--heading-h1-weight)' }}>
                  Heading 1 - The quick brown fox
                </h1>
                <code>--heading-h1-size</code>
              </div>
              
              <div>
                <h2 style={{ fontSize: 'var(--heading-h2-size)', fontWeight: 'var(--heading-h2-weight)' }}>
                  Heading 2 - The quick brown fox
                </h2>
                <code>--heading-h2-size</code>
              </div>
              
              <div>
                <h3 style={{ fontSize: 'var(--heading-h3-size)', fontWeight: 'var(--heading-h3-weight)' }}>
                  Heading 3 - The quick brown fox
                </h3>
                <code>--heading-h3-size</code>
              </div>
              
              <div>
                <h4 style={{ fontSize: 'var(--heading-h4-size)', fontWeight: 'var(--heading-h4-weight)' }}>
                  Heading 4 - The quick brown fox
                </h4>
                <code>--heading-h4-size</code>
              </div>

              <div>
                <p style={{ fontSize: 'var(--body-lg-size)' }}>
                  Body Large - The quick brown fox jumps over the lazy dog
                </p>
                <code>--body-lg-size</code>
              </div>
              
              <div>
                <p style={{ fontSize: 'var(--body-md-size)' }}>
                  Body Medium - The quick brown fox jumps over the lazy dog
                </p>
                <code>--body-md-size</code>
              </div>
              
              <div>
                <p style={{ fontSize: 'var(--body-sm-size)' }}>
                  Body Small - The quick brown fox jumps over the lazy dog
                </p>
                <code>--body-sm-size</code>
              </div>
            </Stack>
          </section>

          {/* Buttons Section */}
          <section className="preview-section">
            <Heading className="section-heading">Buttons</Heading>
            <Stack gap={5}>
              <div className="component-row">
                <Button>Primary Button</Button>
                <Button kind="secondary">Secondary Button</Button>
                <Button kind="tertiary">Tertiary Button</Button>
                <Button kind="ghost">Ghost Button</Button>
              </div>
              
              <div className="component-row">
                <Button disabled>Disabled</Button>
                <Button kind="danger">Danger Button</Button>
                <Button renderIcon={ArrowRight}>With Icon</Button>
              </div>
            </Stack>
          </section>

          {/* Form Fields Section */}
          <section className="preview-section">
            <Heading className="section-heading">Form Fields</Heading>
            <Stack gap={6}>
              <TextInput
                id="preview-text"
                labelText="Text Input"
                placeholder="Enter text here"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                helperText="Helper text for guidance"
              />

              <TextInput
                id="preview-text-error"
                labelText="Text Input with Error"
                placeholder="Enter text here"
                invalid
                invalidText="This field has an error"
              />

              <Select
                id="preview-select"
                labelText="Select Dropdown"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
              >
                <SelectItem value="" text="Choose an option" />
                <SelectItem value="option1" text="Option 1" />
                <SelectItem value="option2" text="Option 2" />
                <SelectItem value="option3" text="Option 3" />
              </Select>

              <NumberInput
                id="preview-number"
                label="Number Input"
                min={0}
                max={100}
                value={50}
              />

              <div>
                <Checkbox
                  id="preview-checkbox-1"
                  labelText="Checkbox Option 1"
                  defaultChecked
                />
                <Checkbox
                  id="preview-checkbox-2"
                  labelText="Checkbox Option 2"
                />
              </div>

              <RadioButtonGroup
                name="preview-radio"
                legendText="Radio Button Group"
                valueSelected={radioValue}
                onChange={(value) => setRadioValue(value)}
              >
                <RadioButton
                  id="radio-1"
                  labelText="Option 1"
                  value="option1"
                />
                <RadioButton
                  id="radio-2"
                  labelText="Option 2"
                  value="option2"
                />
                <RadioButton
                  id="radio-3"
                  labelText="Option 3"
                  value="option3"
                />
              </RadioButtonGroup>

              <Toggle
                id="preview-toggle"
                labelText="Toggle Switch"
                labelA="Off"
                labelB="On"
              />
            </Stack>
          </section>

          {/* Tiles Section */}
          <section className="preview-section">
            <Heading className="section-heading">Tiles</Heading>
            <Stack gap={5}>
              <Tile>
                <h4>Standard Tile</h4>
                <p>This is a standard tile with some content inside.</p>
              </Tile>

              <TileGroup
                legend="Selectable Tiles"
                name="tile-group"
                valueSelected={tileValue}
                onChange={(value) => setTileValue(value)}
              >
                <RadioTile id="tile-1" value="car">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)' }}>
                    <Car size={24} />
                    <div>
                      <h4>Car Insurance</h4>
                      <p>Protect your vehicle</p>
                    </div>
                  </div>
                </RadioTile>
                
                <RadioTile id="tile-2" value="home">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-04)' }}>
                    <HomeIcon size={24} />
                    <div>
                      <h4>Home Insurance</h4>
                      <p>Secure your property</p>
                    </div>
                  </div>
                </RadioTile>
              </TileGroup>
            </Stack>
          </section>

          {/* Progress Indicator Section */}
          <section className="preview-section">
            <Heading className="section-heading">Progress Indicator</Heading>
            <div style={{ background: 'var(--background-secondary)', padding: 'var(--spacing-06)', borderRadius: 'var(--radius-md)' }}>
              <ProgressIndicator currentIndex={2} spaceEqually>
                <ProgressStep label="Step 1" description="Complete" />
                <ProgressStep label="Step 2" description="Complete" />
                <ProgressStep label="Step 3" description="Current" />
                <ProgressStep label="Step 4" description="" />
                <ProgressStep label="Step 5" description="" />
              </ProgressIndicator>
            </div>
          </section>

          {/* Tags Section */}
          <section className="preview-section">
            <Heading className="section-heading">Tags</Heading>
            <div className="component-row">
              <Tag type="red">Red Tag</Tag>
              <Tag type="green">Green Tag</Tag>
              <Tag type="blue">Blue Tag</Tag>
              <Tag type="gray">Gray Tag</Tag>
              <Tag type="purple">Purple Tag</Tag>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="preview-section">
            <Heading className="section-heading">Notifications</Heading>
            <Stack gap={4}>
              <InlineNotification
                kind="info"
                title="Info notification"
                subtitle="This is an informational message"
                hideCloseButton
                lowContrast
              />
              
              <InlineNotification
                kind="success"
                title="Success notification"
                subtitle="The action completed successfully"
                hideCloseButton
                lowContrast
              />
              
              <InlineNotification
                kind="warning"
                title="Warning notification"
                subtitle="Please review this warning"
                hideCloseButton
                lowContrast
              />
              
              <InlineNotification
                kind="error"
                title="Error notification"
                subtitle="An error occurred"
                hideCloseButton
                lowContrast
              />
            </Stack>
          </section>

          {/* Links Section */}
          <section className="preview-section">
            <Heading className="section-heading">Links</Heading>
            <Stack gap={3}>
              <p>
                This is a paragraph with a <Link href="#preview">standard link</Link> inside it.
              </p>
              <p>
                This is a paragraph with a <Link href="#preview" visited>visited link</Link> inside it.
              </p>
              <p>
                This is a paragraph with a <Link href="#preview" disabled>disabled link</Link> inside it.
              </p>
            </Stack>
          </section>

          {/* Contrast Examples Section */}
          <section className="preview-section">
            <Heading className="section-heading">Contrast Examples</Heading>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-05)' }}>
              These examples demonstrate proper text/background contrast in the current theme.
            </p>
            
            <Stack gap={5}>
              <div className="contrast-example" style={{ 
                background: 'var(--background-primary)',
                color: 'var(--text-primary)',
                padding: 'var(--spacing-06)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)'
              }}>
                <h4>Primary Background + Primary Text</h4>
                <p>This combination should always be readable in both themes.</p>
                <code>background: var(--background-primary) | color: var(--text-primary)</code>
              </div>

              <div className="contrast-example" style={{ 
                background: 'var(--background-secondary)',
                color: 'var(--text-primary)',
                padding: 'var(--spacing-06)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)'
              }}>
                <h4>Secondary Background + Primary Text</h4>
                <p>Cards and secondary surfaces use this combination.</p>
                <code>background: var(--background-secondary) | color: var(--text-primary)</code>
              </div>

              <div className="contrast-example" style={{ 
                background: 'var(--interactive-primary)',
                color: 'var(--text-on-color)',
                padding: 'var(--spacing-06)',
                borderRadius: 'var(--radius-md)'
              }}>
                <h4>Primary Red + On-Color Text</h4>
                <p>Always use --text-on-color for colored backgrounds.</p>
                <code>background: var(--interactive-primary) | color: var(--text-on-color)</code>
              </div>

              <div className="contrast-example" style={{ 
                background: 'var(--field-background)',
                color: 'var(--field-text)',
                padding: 'var(--spacing-06)',
                border: '2px solid var(--border-strong)',
                borderRadius: 'var(--radius-md)'
              }}>
                <h4>Form Field Background + Field Text</h4>
                <p>Input fields use dedicated field tokens for proper contrast.</p>
                <code>background: var(--field-background) | color: var(--field-text)</code>
              </div>
            </Stack>
          </section>

          <div className="preview-footer">
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
              Switch between light and dark themes using the toggle in the header to verify all components maintain proper contrast.
            </p>
          </div>
        </Column>
      </Grid>
    </div>
  );
}
