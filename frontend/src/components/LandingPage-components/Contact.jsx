import React from 'react';
import styled from 'styled-components';
import contactIllustration from '../../Images/image5.png';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const WHITE = '#FFFFFF';
const INDIGO = '#4F46E5';
const INDIGO_DARK = '#4338CA';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#475569';


const Section = styled.section`
  width: 100vw;
  padding: 100px 24px;
  background-color: ${WHITE};

  display: flex;
  justify-content: center;
`;


const Container = styled.div`
  max-width: 1200px;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 72px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;


const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 520px;

  @media (max-width: 900px) {
    text-align: center;
    align-items: center;
    max-width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: ${TEXT_DARK};
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: ${TEXT_MUTED};
`;


const ContactButton = styled.a`
  margin-top: 16px;
  width: fit-content;
  padding: 14px 32px;

  font-size: 16px;
  font-weight: 600;
  text-decoration: none;

  background-color: ${INDIGO};
  color: ${WHITE};
  border-radius: 12px;

  transition: all 0.25s ease;

  &:hover {
    background-color: ${INDIGO_DARK};
    transform: translateY(-2px);
  }
`;


const IllustrationWrapper = styled.div`


  img {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 850px;
    height: auto;
  }
`;


/* ===== COMPONENT ===== */

const ContactCTA = () => {
  return (
    <Section id="contact">
      <Container>
        <Content>
          <Title>Need help or have questions?</Title>

          <Description>
            Reach out if you need assistance, clarification, or have any
            enquiries about the platform. We’re happy to help.
          </Description>

          <ContactButton href="/contact">
            Get in Touch <ArrowForwardIcon style={{ verticalAlign: 'middle' }} />
          </ContactButton>
        </Content>

        <IllustrationWrapper>
          <img
            src={contactIllustration}
            alt="Contact and support illustration"
          />
        </IllustrationWrapper>
      </Container>
    </Section>
  );
};

export default ContactCTA;
