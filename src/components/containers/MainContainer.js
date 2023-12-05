import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import HeaderContainer from './HeaderContainer';
import ExternalCallsContainer from './ExternalCallsContainer';
import InternalCallsContainer from './InternalCallsContainer';
import ConcessionCallsContainer from './ConcessionCallsContainer';
import FilterContainer from './FilterContainer';
import chalk from 'chalk';

const MainContainer = ({ currentUser, calls, departments, cities, concessions, lastUpdated, groupedConcessions, groupedCities }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedConcession, setSelectedConcession] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [filteredConcessions, setFilteredConcessions] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  console.log('Grouped Cities ->', groupedCities)

  // Controller for changing filter states
  const changeFilter = (type, filter) => {
    switch (type) {
      case 'city':
        setSelectedConcession(null);
        setSelectedCity(filter);
        setSelectedDepartment(null); // Reset selected department when concession changes
        console.log(chalk.green('Selected City ->'), filter);
        break;
      case 'concession':
        setSelectedConcession(filter);
        setSelectedDepartment(null); // Reset selected department when concession changes
        console.log(chalk.green('Selected Concession ->'), filter);
        break;
      case 'department':
        setSelectedDepartment(filter);
        console.log(chalk.green('Selected Department ->'), filter);
        break;
      default:
        console.log(chalk.dark.bgRed('Invalid type for changeFilter function'));
    }
  }

  // Use effect controller to change the concessions associated to selected city
  useEffect(() => {
    let filteredConcessions = [];

    if (!selectedCity) {
      filteredConcessions = concessions;
    } else {
      const formattedSelectedCity = selectedCity.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove accents from selected city
      filteredConcessions = concessions.filter((concession) =>
        concession.normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(formattedSelectedCity)
      );
    }

    setFilteredConcessions(filteredConcessions);

    // If only one concession is filtered, select it
    if (filteredConcessions.length === 1) {
      console.log(chalk.yellow('Only one concession filtered ->'), filteredConcessions[0])
      setSelectedConcession(filteredConcessions[0]);
    } else {
      setSelectedConcession(null);
    }
  }, [concessions, selectedCity]);

  useEffect(() => {
    let filteredDepartments = [];

    if (!selectedConcession) {
      if (groupedCities[selectedCity]) {
        filteredDepartments = groupedCities[selectedCity];
      } else {
        filteredDepartments = departments;
      }
    } else {
      const selectedConcessionObj = groupedConcessions[selectedConcession];
      filteredDepartments = selectedConcessionObj || [];
    }

    setFilteredDepartments(filteredDepartments);
  }, [selectedCity, selectedConcession, groupedConcessions, groupedCities, departments]);


  return (
    <Container className='p-3'>
      <Row>
        {lastUpdated && (
          <Col xs={12}>
            <HeaderContainer lastUpdated={lastUpdated} />
            <FilterContainer
              currentUser={currentUser}
              cities={cities}
              concessions={filteredConcessions}
              departments={filteredDepartments}
              changeFilter={changeFilter}
              selectedCity={selectedCity}
              selectedConcession={selectedConcession}
              selectedDepartment={selectedDepartment}
            />
          </Col>
        )}
        <Col xl={12}>
          <ExternalCallsContainer calls={calls} />
          <InternalCallsContainer calls={calls} />
          <ConcessionCallsContainer percentagens={calls.Percentagens} />
        </Col>
      </Row>
    </Container>
  )
}

export default MainContainer