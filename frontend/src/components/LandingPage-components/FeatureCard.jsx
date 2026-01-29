import React from 'react';
import styled from 'styled-components';

const WHITE = '#FFFFFF';
const INDIGO = '#4F46E5';
const TEXT_DARK = '#0F172A';
const TEXT_MUTED = '#475569';
const BORDER_LIGHT = '#E5E7EB';

const Card = styled.div`
  background-color: ${WHITE};
  border: 1px solid ${BORDER_LIGHT};
  border-radius: 16px;
  padding: 32px 24px;

  display: flex;
  flex-direction: column;
  gap: 14px;

  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    border-color: #192746;
  }
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;

  background-color: rgba(79, 70, 229, 0.1);
  color: ${INDIGO};

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 26px;
    color: #192746;
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${TEXT_DARK};
  margin: 0;
`;

const Description = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${TEXT_MUTED};
  margin: 0;
`;

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <Card>
      <IconWrapper>
        <Icon />
      </IconWrapper>

      <Title>{title}</Title>
      <Description>{description}</Description>
    </Card>
  );
};


export default FeatureCard;
