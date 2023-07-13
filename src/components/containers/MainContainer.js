import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import HeaderContainer from './HeaderContainer';
import TopContainer from './TopContainer';
import BottomContainer from './BottomContainer';
import SideContainer from './SideContainer';
import FilterContainer from './FilterContainer';
import chalk from 'chalk';

const MainContainer = ({ currentUser, calls, departments, cities, concessions, lastUpdated }) => {
  const [city, setCity] = useState('ALL');
  const [concession, setConcession] = useState('ALL');
  const [department, setDepartment] = useState('ALL');
  const [filteredConcessions, setFilteredConcessions] = useState([]);

  // Controller for changing filter states
  const changeFilter = (type, filter) => {
    switch (type) {
      case 'city':
        setCity(filter);
        console.log(filter)
        break;
      case 'concession':
        setConcession(filter);
        break;
      case 'department':
        setDepartment(filter);
        break;
      default:
        console.log(chalk.dark.bgRed('Invalid type for changeFilter function'));
    }
  }

  // Use effect controller to change the concessions associated to selected city
  useEffect(() => {
    let filteredConcessions = [];

    if (city === 'ALL') {
      filteredConcessions = concessions;
    } else {
      filteredConcessions = concessions.filter((concession) => concession.includes(city))
    }

    setFilteredConcessions(filteredConcessions);
  }, [city, concessions])

  return (
    <div className='app'>
      <Container fluid className='p-3'>
        <Row className='full-height-row' >
          {lastUpdated && (
            <Col xs={12} style={{ height: '100%' }}>
              <HeaderContainer lastUpdated={lastUpdated} />
              <FilterContainer
                currentUser={currentUser}
                cities={cities}
                concessions={filteredConcessions}
                departments={departments}
                changeFilter={changeFilter}
              />
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