import React from 'react';
import styled from 'styled-components';

import NavBar from '../components/LandingPage-components/NavBar';
import Explore from '../components/LandingPage-components/Explore';
import Product from '../components/LandingPage-components/Product';
import FeatureCard from '../components/LandingPage-components/FeatureCard';
import Footer from '../components/LandingPage-components/Footer';
import Server from '../components/LandingPage-components/Server';

import { featuresData } from '../components/LandingPage-components/featuresData';
import Contact from '../components/LandingPage-components/Contact';

const Container = styled.div`
  width: 100vw;
`;

const FeaturesSection = styled.section`
  width: 100vw;
  padding: 100px 24px;
  background-color: #F8FAFC;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const FeaturesTitle = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: #0F172A;
  margin-bottom: 12px;

  span {
    color: #4F46E5;
  }
`;

const FeaturesSubtitle = styled.p`
  max-width: 720px;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
  color: #475569;
  margin-bottom: 64px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(260px, 1fr));
  gap: 32px;
  max-width: 1100px;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;


const LandingPage = () => {
  return (
    <Container>
      <NavBar />
      <Explore />
      <Product />

      <FeaturesSection id="features">
        <FeaturesTitle>
          Platform <span>Features</span>
        </FeaturesTitle>

        <FeaturesSubtitle>
          Built to support independent communities, meaningful conversations,
          and open collaboration — without relying on a single central platform.
        </FeaturesSubtitle>

        <FeaturesGrid>
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </FeaturesGrid>
      </FeaturesSection>
      <Server/>
      <Contact />
      <Footer />
    </Container>
  );
};

export default LandingPage;
