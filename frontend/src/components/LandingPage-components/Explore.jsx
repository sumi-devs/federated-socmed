import styled from "styled-components"
import { Link } from 'react-router-dom'
import backgroundImage from '../../Images/Image2.png'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


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

const ExploreButton = styled(Link)`
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    background-color: #4F46E5;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;

    &:hover {
        scale: 1.05;
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
                <ExploreButton to="/servers">Explore Now <ArrowForwardIcon style={{ verticalAlign: 'middle' }} /></ExploreButton>
            </ExploreContent>

        </ExploreContainer>
    )
}

export default Explore