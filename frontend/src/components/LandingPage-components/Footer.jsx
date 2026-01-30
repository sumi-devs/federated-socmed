import React from 'react';
import styled from 'styled-components';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';

/* ===== COLOR TOKENS ===== */
const WHITE = '#FFFFFF';
const INDIGO = '#0F172A';
const INDIGO_DARK = '#0F172A';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#64748B';
const BORDER_LIGHT = '#E5E7EB';

/* ===== STYLED COMPONENTS ===== */

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  background-color: ${WHITE};
  color: ${TEXT_DARK};
  width: 100%;
  font-family: 'Inter', sans-serif;
  border-top: 1px solid ${BORDER_LIGHT};
`;

const TopSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const SocialMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const SocialIconsRow = styled.div`
  display: flex;
  gap: 20px;

  & > svg {
    font-size: 28px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: ${TEXT_MUTED};

    &:hover {
      color: ${INDIGO};
      transform: translateY(-3px);
    }
  }
`;

const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: ${TEXT_DARK};
`;

const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const NewsletterForm = styled.form`
  display: flex;
  align-items: center;
`;

const NewsletterInput = styled.input`
  padding: 12px 16px;
  border-radius: 8px 0 0 8px;
  background-color: ${WHITE};
  color: ${TEXT_DARK};
  outline: none;
  font-size: 13px;
  width: 250px;
  border: 1px solid ${BORDER_LIGHT};

  &::placeholder {
    color: ${TEXT_MUTED};
  }

  &:focus {
    border-color: ${INDIGO};
  }
`;

const NewsletterButton = styled.button`
  padding: 12px 24px;
  border-radius: 0 8px 8px 0;
  border: none;
  background-color: ${INDIGO};
  color: ${WHITE};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${INDIGO_DARK};
  }
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${BORDER_LIGHT};
  width: 100%;
  margin: 0;
`;

const BottomSection = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LinksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
`;

const FooterLink = styled.a`
  font-size: 14px;
  color: ${TEXT_MUTED};
  text-decoration: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${INDIGO};
  }
`;

const CopyrightText = styled.p`
  font-size: 12px;
  color: ${TEXT_MUTED};
  text-align: center;
  margin: 5px 0;
  line-height: 1.5;
`;

/* ===== COMPONENT ===== */

const Footer = () => {
  return (
    <FooterContainer>
      <TopSection>
        <SocialMediaContainer>
          <SectionTitle>Connect with us</SectionTitle>
          <SocialIconsRow>
            <FacebookOutlinedIcon />
            <InstagramIcon />
            <XIcon />
            <YouTubeIcon />
          </SocialIconsRow>
        </SocialMediaContainer>

        <NewsletterContainer>
          <SectionTitle>Stay updated</SectionTitle>
          <NewsletterForm onSubmit={(e) => e.preventDefault()}>
            <NewsletterInput placeholder="Enter your email" type="email" />
            <NewsletterButton type="submit">
              Subscribe
            </NewsletterButton>
          </NewsletterForm>
        </NewsletterContainer>
      </TopSection>

      <Divider />

      <BottomSection>
        <LinksRow>
          <FooterLink>About Us</FooterLink>
          <FooterLink>Contact</FooterLink>
          <FooterLink>Privacy Policy</FooterLink>
          <FooterLink>Terms of Service</FooterLink>
        </LinksRow>

        <div>
          <CopyrightText>
            Built as a Software Engineering project — Federated Social Network
          </CopyrightText>
          <CopyrightText>
            © {new Date().getFullYear()} Federated Social Network Project. All rights reserved.
          </CopyrightText>
        </div>
      </BottomSection>
    </FooterContainer>
  );
};

export default Footer;
