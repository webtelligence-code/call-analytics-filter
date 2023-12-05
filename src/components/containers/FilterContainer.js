import { faBuilding, faBuildingUser, faCity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import chalk from 'chalk'
import React from 'react'
import { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Select from 'react-select'

const FilterContainer = ({
  currentUser,
  cities,
  departments,
  concessions,
  changeFilter,
  selectedCity,
  selectedConcession,
  selectedDepartment,
}) => {
  // Full access departments 
  const departmentFullAccess = ['Informática', 'Contact Center', 'Administrativo'];

  // State to determine if user has access to department select filter
  const hasDepartmentAccess = departmentFullAccess.includes(currentUser.departamento);

  // Select options
  const cityOptions = cities.map((key) => ({
    value: key,
    label: <label>{key} <FontAwesomeIcon icon={faCity} className='ms-2' /></label>
  }))
  const concessionOptions = concessions.map((key) => ({
    value: key,
    label: <label key={key}>{key} <FontAwesomeIcon icon={faBuilding} /></label>
  }));
  const departmentOptions = departments.map((key) => ({
    value: key,
    label: <label>{key} <FontAwesomeIcon icon={faBuildingUser} /></label>
  }));

  // Find the selected concession option
  const selectedConcessionOption = selectedConcession
    ? concessionOptions.find((option) => option.value === selectedConcession)
    : null;

  // OnChange event Listeners
  const handleCityOnChange = (selectedCity) => {
    changeFilter('city', selectedCity ? selectedCity.value : null)
  }
  const handleConcessionOnChange = (selectedConcession) => {
    changeFilter('concession', selectedConcession ? selectedConcession.value : null)
  }
  const handleDepartmentOnChange = (selectedDepartament) => {
    changeFilter('department', selectedDepartament ? selectedDepartament.value : null)
  }

  return (
    <Card
      className='mb-3 shadow p-0'
      style={{ borderBottomWidth: 0 }}
    >
      <Card.Header
        style={{
          backgroundColor: 'white',
          borderRadius: '5px',
        }}
      >
        <Row className='text-center justify-content-center'>
          <Col md={12} lg={4}>
            <Select
              className="basic-single w-100"
              classNamePrefix="select"
              onChange={handleCityOnChange}
              placeholder={<label>Filtrar Cidade<FontAwesomeIcon icon={faCity} className='ms-2' /></label>}
              name='city'
              isClearable
              options={cityOptions}
              defaultValue={selectedCity}
            />
          </Col>

          <Col md={12} lg={4}>
            <Select
              className="basic-single w-100"
              classNamePrefix="select"
              onChange={handleConcessionOnChange}
              placeholder={<label>Filtrar Concessão<FontAwesomeIcon icon={faBuilding} className='ms-2' /></label>}
              name='concession'
              isClearable
              options={concessionOptions}
              value={selectedConcessionOption}
              isDisabled={concessionOptions.length <= 1}
              formatGroupLabel={(data) => (
                <div>
                  <span>{data.label}</span>
                </div>
              )}
            />
          </Col>

          {hasDepartmentAccess && (
            <Col md={12} lg={4}>
              <Select
                className="basic-single w-100"
                classNamePrefix="select"
                onChange={handleDepartmentOnChange}
                placeholder={<label>Filtrar departamento<FontAwesomeIcon icon={faBuilding} className='ms-2' /></label>}
                name='department'
                isClearable
                options={departmentOptions}
                defaultValue={selectedDepartment}
              />
            </Col>
          )}
        </Row>
      </Card.Header>
    </Card>
  )
}

export default FilterContainer