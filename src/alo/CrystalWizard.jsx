import React, { useState } from 'react';
import './CrystalWizard.scss';

const INTENTS = [
  {
    id: 'energy',
    label: 'Energy',
    description: 'Vitality, activation & manifestation',
    crystal: 'citrine',
  },
  {
    id: 'serenity',
    label: 'Serenity',
    description: 'Peace, calm & emotional balance',
    crystal: 'amethyst',
  },
  {
    id: 'awareness',
    label: 'Awareness',
    description: 'Clarity, focus & higher consciousness',
    crystal: 'clear-quartz',
  },
  {
    id: 'love',
    label: 'Love',
    description: 'Self-love, compassion & heart healing',
    crystal: 'rose-quartz',
  },
  {
    id: 'protection',
    label: 'Protection',
    description: 'Grounding, shielding & release',
    crystal: 'smoky-quartz-chrome',
  },
  {
    id: 'abundance',
    label: 'Abundance',
    description: 'Prosperity, flow & golden intention',
    crystal: 'smoky-quartz-gold',
  },
];

const BAG_COLORS = [
  { id: 'black', label: 'Black', color: 'rgb(26, 26, 26)', textColor: '#fff', note: 'The depth of your Black bag creates a powerful contrast that amplifies the crystal\'s energy.' },
  { id: 'espresso', label: 'Espresso', color: 'rgb(101, 67, 33)', textColor: '#fff', note: 'The warm, earthy tones of your Espresso bag ground this crystal\'s vibration beautifully.' },
  { id: 'gravel', label: 'Gravel', color: 'rgb(194, 176, 162)', textColor: '#161616', note: 'Your Gravel bag\'s neutral palette lets the crystal\'s natural beauty take center stage.' },
  { id: 'bone', label: 'Bone', color: 'rgb(231, 219, 212)', textColor: '#161616', note: 'The soft luminosity of your Bone bag harmonizes gently with this crystal\'s energy.' },
  { id: 'sundrenched-pink', label: 'Sundrenched Pink', color: 'rgb(249, 213, 212)', textColor: '#161616', note: 'The rosy warmth of your Sundrenched Pink bag pairs naturally with this crystal\'s frequency.' },
  { id: 'vintage-pink', label: 'Vintage Pink', color: 'rgb(235, 191, 199)', textColor: '#161616', note: 'Your Vintage Pink bag\'s delicate tone creates a romantic, resonant pairing.' },
  { id: 'bordeaux', label: 'Bordeaux', color: 'rgb(132, 23, 47)', textColor: '#fff', note: 'The deep richness of your Bordeaux bag amplifies the intensity of this crystal\'s presence.' },
];

// Sourced from CMS alo-product category=crystal
const CRYSTALS = {
  citrine: {
    colorway: 'Citrine',
    image: 'https://cdn.shopify.com/s/files/1/2185/2813/files/A1097U_07957_b1_s1_a1_640x.jpg?v=1769015611',
    href: 'https://www.aloyoga.com/products/a1097u-alo-intention-crystal-citrine',
    price: '$300',
    swatchColor: 'rgb(247, 236, 185)',
    properties: ['Energy', 'Abundance', 'Manifestation'],
    description: 'Known as the "Merchant\'s Stone," Citrine carries the energy of the sun — uplifting, energizing, and powerfully creative. It transforms negative thought into positive action.',
  },
  amethyst: {
    colorway: 'Amethyst',
    image: 'https://cdn.shopify.com/s/files/1/2185/2813/files/A1099U_07973_b1_s1_a1_640x.jpg?v=1769016019',
    href: 'https://www.aloyoga.com/products/a1099u-alo-intention-crystal-amethyst',
    price: '$275',
    swatchColor: 'rgb(222, 191, 214)',
    properties: ['Serenity', 'Intuition', 'Protection'],
    description: 'Amethyst soothes the mind and emotions, bringing deep calm and stillness. A guardian stone that quiets mental noise and fosters inner peace.',
  },
  'clear-quartz': {
    colorway: 'Clear Quartz',
    image: 'https://cdn.shopify.com/s/files/1/2185/2813/files/A1001U_08185_b1_s1_a1_640x.jpg?v=1769015963',
    href: 'https://www.aloyoga.com/products/a1001u-alo-intention-crystal-clear-quartz',
    price: '$275',
    swatchColor: 'rgb(248, 245, 239)',
    properties: ['Clarity', 'Amplification', 'Awareness'],
    description: 'The master healer. Clear Quartz amplifies energy and intention, bringing unparalleled clarity, heightened perception, and expanded awareness of the present moment.',
  },
  'rose-quartz': {
    colorway: 'Rose Quartz',
    image: 'https://cdn.shopify.com/s/files/1/2185/2813/files/A1002U_08049_b1_s1_a1_640x.jpg?v=1769015752',
    href: 'https://www.aloyoga.com/products/a1002u-alo-intention-crystal-rose-quartz',
    price: '$275',
    swatchColor: 'rgb(187, 149, 142)',
    properties: ['Love', 'Compassion', 'Healing'],
    description: 'The stone of unconditional love. Rose Quartz opens the heart, encouraging self-love, compassion, and deep emotional healing at the core level.',
  },
  'smoky-quartz-chrome': {
    colorway: 'Smoky Quartz / Chrome',
    image: 'https://cdn.shopify.com/s/files/1/2185/2813/files/A1098U_07959_b1_s1_a1_640x.jpg?v=1769015923',
    href: 'https://www.aloyoga.com/products/a1098u-alo-intention-crystal-smoky-quartz-chrome',
    price: '$275',
    swatchColor: 'rgb(219, 194, 164)',
    properties: ['Grounding', 'Protection', 'Release'],
    description: 'A powerful grounding stone. Smoky Quartz dissolves negative energy and shields against psychic noise, anchoring you firmly in the present with clarity.',
  },
  'smoky-quartz-gold': {
    colorway: 'Smoky Quartz / Gold',
    image: 'https://cdn.shopify.com/s/files/1/2185/2813/files/A1100U_07958_b1_s1_a1_640x.jpg?v=1769015866',
    href: 'https://www.aloyoga.com/products/a1100u-alo-intention-crystal-smoky-quartz-gold',
    price: '$275',
    swatchColor: 'rgb(210, 172, 102)',
    properties: ['Abundance', 'Prosperity', 'Grounding'],
    description: 'Merging earthy grounding energy with the frequency of gold, this crystal is a talisman for prosperity — inviting wealth, flow, and material abundance.',
  },
};

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="crystal-wizard__back-icon">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="crystal-wizard__link-icon">
      <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
    </svg>
  );
}

export default function CrystalWizard() {
  const [step, setStep] = useState(0);
  const [selectedIntent, setSelectedIntent] = useState(null);
  const [selectedBagColor, setSelectedBagColor] = useState(null);

  const intent = INTENTS.find((i) => i.id === selectedIntent);
  const bagColor = BAG_COLORS.find((b) => b.id === selectedBagColor);
  const crystal = intent ? CRYSTALS[intent.crystal] : null;

  function handleIntentSelect(intentId) {
    setSelectedIntent(intentId);
    setTimeout(() => setStep(1), 120);
  }

  function handleBagColorSelect(colorId) {
    setSelectedBagColor(colorId);
    setTimeout(() => setStep(2), 120);
  }

  function handleBack() {
    if (step === 1) {
      setStep(0);
      setSelectedBagColor(null);
    } else if (step === 2) {
      setStep(1);
    }
  }

  function handleReset() {
    setStep(0);
    setSelectedIntent(null);
    setSelectedBagColor(null);
  }

  const trackTranslate = `translateX(${step * -33.3333}%)`;

  return (
    <div className="crystal-wizard">
      <div className="crystal-wizard__progress">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`crystal-wizard__dot${i === step ? ' crystal-wizard__dot--active' : ''}${i < step ? ' crystal-wizard__dot--done' : ''}`}
          />
        ))}
      </div>

      <div className="crystal-wizard__viewport">
        <div
          className="crystal-wizard__track"
          style={{ transform: trackTranslate }}
        >
          {/* ── Step 1: Intent ── */}
          <div className="crystal-wizard__slide" aria-hidden={step !== 0}>
            <div className="crystal-wizard__slide-inner">
              <p className="crystal-wizard__eyebrow">Step 1 of 3</p>
              <h2 className="crystal-wizard__heading">What are you seeking?</h2>
              <p className="crystal-wizard__subheading">Choose the intention that resonates with you right now.</p>
              <div className="crystal-wizard__intent-grid">
                {INTENTS.map((intent) => (
                  <button
                    key={intent.id}
                    type="button"
                    className={`crystal-wizard__intent-card${selectedIntent === intent.id ? ' crystal-wizard__intent-card--selected' : ''}`}
                    onClick={() => handleIntentSelect(intent.id)}
                  >
                    <span className="crystal-wizard__intent-swatch" style={{ backgroundColor: CRYSTALS[intent.crystal].swatchColor }} />
                    <span className="crystal-wizard__intent-label">{intent.label}</span>
                    <span className="crystal-wizard__intent-desc">{intent.description}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Step 2: Bag Color ── */}
          <div className="crystal-wizard__slide" aria-hidden={step !== 1}>
            <div className="crystal-wizard__slide-inner">
              <button type="button" className="crystal-wizard__back" onClick={handleBack}>
                <ArrowLeftIcon />
                Back
              </button>
              <p className="crystal-wizard__eyebrow">Step 2 of 3</p>
              <h2 className="crystal-wizard__heading">What color is your bag?</h2>
              <p className="crystal-wizard__subheading">We'll pair your crystal to complement your bag's energy.</p>
              <div className="crystal-wizard__color-grid">
                {BAG_COLORS.map((bag) => (
                  <button
                    key={bag.id}
                    type="button"
                    className={`crystal-wizard__color-option${selectedBagColor === bag.id ? ' crystal-wizard__color-option--selected' : ''}`}
                    onClick={() => handleBagColorSelect(bag.id)}
                  >
                    <span
                      className="crystal-wizard__color-swatch"
                      style={{ backgroundColor: bag.color }}
                    />
                    <span className="crystal-wizard__color-label">{bag.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Step 3: Recommendation ── */}
          <div className="crystal-wizard__slide" aria-hidden={step !== 2}>
            <div className="crystal-wizard__slide-inner">
              <button type="button" className="crystal-wizard__back" onClick={handleBack}>
                <ArrowLeftIcon />
                Back
              </button>
              {crystal && (
                <div className="crystal-wizard__result">
                  <p className="crystal-wizard__eyebrow">Your Crystal</p>
                  <div className="crystal-wizard__result-layout">
                    <div className="crystal-wizard__result-image-wrap">
                      <img
                        src={crystal.image}
                        alt={crystal.colorway}
                        className="crystal-wizard__result-image"
                      />
                    </div>
                    <div className="crystal-wizard__result-info">
                      <h2 className="crystal-wizard__result-name">ALO Intention Crystal</h2>
                      <p className="crystal-wizard__result-colorway">{crystal.colorway}</p>
                      <div className="crystal-wizard__result-tags">
                        {crystal.properties.map((prop) => (
                          <span key={prop} className="crystal-wizard__result-tag">{prop}</span>
                        ))}
                      </div>
                      <p className="crystal-wizard__result-description">{crystal.description}</p>
                      {bagColor && (
                        <p className="crystal-wizard__result-pairing">
                          <strong>Style pairing:</strong> {bagColor.note}
                        </p>
                      )}
                      <p className="crystal-wizard__result-price">{crystal.price}</p>
                      <div className="crystal-wizard__result-actions">
                        <a
                          href={crystal.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="crystal-wizard__cta"
                        >
                          Shop This Crystal
                          <ExternalLinkIcon />
                        </a>
                        <button
                          type="button"
                          className="crystal-wizard__restart"
                          onClick={handleReset}
                        >
                          Start over
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
