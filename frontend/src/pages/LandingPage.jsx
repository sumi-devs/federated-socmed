import React from 'react'
import styled from 'styled-components'
import Footer from '../components/LandingPage-components/Footer'
import Explore from '../components/LandingPage-components/Explore'
import NavBar from '../components/LandingPage-components/NavBar'

const Container = styled.div`
    width: 100vw;
`

const LandingPage = () => {
  return (
    <Container>
        <NavBar/>
        <Explore/>
        <Footer/>
    </Container>
  )
}

export default LandingPage
