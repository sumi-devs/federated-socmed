import React from 'react';
import styled from 'styled-components';

/* ===== COLORS ===== */
const WHITE = '#FFFFFF';
const INDIGO = '#4F46E5';
const INDIGO_DARK = '#4338CA';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#475569';
const BG_LIGHT = '#F8FAFC';

/* ===== SECTION ===== */

const Section = styled.section`
  width: 100vw;
  padding: 100px 24px;
  background-color: ${BG_LIGHT};

  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 900px;
  width: 100%;
  background-color: ${WHITE};
  border-radius: 20px;
  padding: 64px 48px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    padding: 48px 24px;
  }
`;

/* ===== TEXT ===== */

const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  color: ${TEXT_DARK};
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: ${TEXT_MUTED};
  max-width: 600px;
  margin-bottom: 36px;
`;

/* ===== BUTTON ===== */

const ContactButton = styled.a`
  padding: 14px 32px;
  font-size: 16px;
  font-weight: 600;

  background-color: ${INDIGO};
  color: ${WHITE};
  border-radius: 12px;
  text-decoration: none;

  transition: background-color 0.25s ease, transform 0.2s ease;

  &:hover {
    background-color: ${INDIGO_DARK};
    transform: translateY(-2px);
  }
`;

/* ===== COMPONENT ===== */

const ContactCTA = () => {
  return (
    <Section id="contact">
      <Container>
        <Title>Need help or have questions?</Title>

        <Description>
          If you’d like more information, need assistance, or have any questions
          about the platform, we’re here to help.
        </Description>

        <ContactButton href="/contact">
          Get in Touch
        </ContactButton>
      </Container>
    </Section>
  );
};

export default ContactCTA;
