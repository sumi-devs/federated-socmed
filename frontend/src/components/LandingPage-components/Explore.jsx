import styled from "styled-components"
import backgroundImage from '../../Images/Image2.png'


const ExploreContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 50px 20px;
    width: 100vw;
    height: 100vh;
    background-color: #000000;
    color: white;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

const ExploreContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    max-width: 600px;
    margin-bottom: 40px;
`;

const TagLine = styled.h2`
    font-size: 36px;
    margin-bottom: 20px;
`;

const SuportingText = styled.p`
    font-size: 18px;
    margin-bottom: 30px;
    line-height: 1.5;
`;

const ExploreButton = styled.button`
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    background-color: #192746;
    color: white;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
        opacity: 0.95;
    }
`;

const SloganText = styled.h3`
    font-size: 14px;
    font-style: italic;
    text-align: center;
    max-width: 800px;
`;

const Explore = () => {
  return (
    <ExploreContainer>
        <ExploreContent>
            <TagLine>Follow people. Join conversations.</TagLine>
            <SuportingText>Connect with people, follow conversations, and participate in topic-driven channels designed for thoughtful interaction.</SuportingText>
            <ExploreButton>Explore Now</ExploreButton>
        </ExploreContent>
 
    </ExploreContainer>
  )
}

export default Explore