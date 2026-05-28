import React from 'react';
import { Grid, Column } from '@carbon/react';
import './Footer.scss';

const columns = [
  {
    heading: 'InsureCo',
    body: 'Protecting what matters most since 2020.',
  },
  {
    heading: 'Products',
    links: ['Car Insurance', 'Home Insurance', 'Bundle & Save'],
  },
  {
    heading: 'Company',
    links: ['About Us', 'Careers', 'Contact'],
  },
  {
    heading: 'Support',
    links: ['Help Center', 'File a Claim', 'FAQ'],
  },
  {
    heading: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  },
];

export default function Footer({ copyright = '© 2024 InsureCo. All rights reserved.' }) {
  return (
    <footer className="site-footer">
      <Grid>
        {columns.map((col) => (
          <Column lg={3} md={2} sm={4} key={col.heading}>
            <div className="site-footer__col">
              <h4 className="site-footer__col-heading">{col.heading}</h4>
              {col.body && <p className="site-footer__col-body">{col.body}</p>}
              {col.links && (
                <ul className="site-footer__col-links">
                  {col.links.map((link) => (
                    <li key={link}>{link}</li>
                  ))}
                </ul>
              )}
            </div>
          </Column>
        ))}
      </Grid>
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <p className="site-footer__copyright">{copyright}</p>
        </Column>
      </Grid>
    </footer>
  );
}
