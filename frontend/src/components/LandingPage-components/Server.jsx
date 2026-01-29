import React from 'react';
import styled from 'styled-components';

/* ===== COLORS ===== */
const WHITE = '#FFFFFF';
const INDIGO = '#4F46E5';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#475569';
const BG_LIGHT = '#F8FAFC';

/* ===== LAYOUT ===== */

const Section = styled.section`
  width: 100vw;
  padding: 100px 24px;
  background-color: ${BG_LIGHT};

  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 60px;
  }
`;

/* ===== LEFT CONTENT ===== */

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 700;
  color: ${TEXT_DARK};

  span {
    color: ${INDIGO};
  }
`;

const Description = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: ${TEXT_MUTED};
`;

const Points = styled.ul`
  margin-top: 12px;
  padding-left: 18px;
  color: ${TEXT_MUTED};

  li {
    margin-bottom: 10px;
    font-size: 16px;
  }
`;

/* ===== RIGHT IMAGES ===== */

const ImagesWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 420px;

  @media (max-width: 900px) {
    height: 360px;
  }
`;

const ImageOne = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 70%;
  height: 100%;
  object-fit: cover;

  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
`;

const ImageTwo = styled.img`
  position: absolute;
  bottom: -20px;
  right: 0;
  width: 65%;
  height: 85%;
  object-fit: cover;

  border-radius: 16px;
  border: 6px solid ${WHITE};
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
`;

/* ===== COMPONENT ===== */

const ServersSection = () => {
  return (
    <Section id="servers">
      <Container>
        {/* LEFT SIDE */}
        <Content>
          <Title>
            Communities Powered by <span>Servers</span>
          </Title>

          <Description>
            Every community on the platform runs on its own server.
            Servers operate independently while still being able to
            communicate with one another.
          </Description>

          <Description>
            Users choose a home server, join communities, and interact
            across servers without a single central authority controlling
            the entire network.
          </Description>

          <Points>
            <li>Each server hosts its own community and data</li>
            <li>Servers communicate securely with each other</li>
            <li>No single server controls the entire platform</li>
            <li>Communities grow independently and naturally</li>
          </Points>
        </Content>

        {/* RIGHT SIDE */}
        <ImagesWrapper>
          <ImageOne
            src="https://images.unsplash.com/photo-1526378722484-bd91ca387e72"
            alt="Server illustration"
          />
          <ImageTwo
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31"
            alt="Multiple servers illustration"
          />
        </ImagesWrapper>
      </Container>
    </Section>
  );
};

export default ServersSection;
