import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import HeaderContainer from './HeaderContainer';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';
import SideContainer from './SideContainer';
import LegendContainer from './LegendContainer';

const MainContainer = ({ calls, lastUpdated }) => {
  return (
    <div className='app'>
      <Container fluid className='p-3'>
        <Row className='full-height-row' >
          {lastUpdated && (
            <Col xs={12} style={{ height: '100%' }}>
              <HeaderContainer lastUpdated={lastUpdated} />
            </Col>
          )}
          <Col lg={12} xl={8} className='d-flex flex-column' style={{ height: '100%' }}>
            <TopContainer calls={calls} />
            <BottomContainer calls={calls} />
          </Col>
          <Col lg={12} xl={4}>
            <div className='side-container-wrapper' style={{ height: '100%' }}>
              <SideContainer percentagens={calls.Percentagens} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MainContainer