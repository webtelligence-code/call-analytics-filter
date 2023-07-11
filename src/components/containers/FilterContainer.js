import { faBuilding, faBuildingUser, faCity } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import chalk from 'chalk'
import React from 'react'
import { Card } from 'react-bootstrap'
import Select from 'react-select'

const FilterContainer = () => {


  // Select options
  const cityOptions = [
    { value: 'Portalegre', label: <label>Portalegre<FontAwesomeIcon icon={faCity} className='ms-2' /></label> },
    { value: 'Beja', label: <label>Beja<FontAwesomeIcon icon={faCity} className='ms-2' /></label> },
    { value: 'Castelo Branco', label: <label>Castelo Branco<FontAwesomeIcon icon={faCity} className='ms-2' /></label> },
    { value: 'Guarda', label: <label>Guarda<FontAwesomeIcon icon={faCity} className='ms-2' /></label> },
  ];

  const departmentOptions = [
    { value: 'Informática', label: <label>Informática<FontAwesomeIcon icon={faBuilding} className='ms-2' /></label> }
  ];

  const concessionOptions = [
    { value: 'Beja IIKH', label: <label>Beja IIKH<FontAwesomeIcon icon={faBuildingUser} className='ms-2' /></label> }
  ]

  // OnChange event Listeners
  const handleCityOnChange = (selectedConcession) => {
    if (selectedConcession) console.log(chalk.green(selectedConcession.value))
    else console.log(chalk.red('No city selected.'))
  }

  const handleDepartmentOnChange = (selectedDepartament) => {
    if (selectedDepartament) console.log(chalk.green(selectedDepartament.value))
    else console.log(chalk.red('No department selected.'))
  }

  const handleConcessionOnChange = (selectedConcession) => {
    if (selectedConcession) console.log(chalk.green(selectedConcession.value))
    else console.log(chalk.red('No concession selected.'))
  }

  return (
    <Card
      className='mb-3 shadow'
      style={{
        borderBottomWidth: 0
      }}
    >
      <Card.Header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '5px',
        }}
      >
        <Select
          className='w-100 mx-1'
          onChange={handleCityOnChange}
          placeholder={<label>Filtrar Cidade<FontAwesomeIcon icon={faCity} className='ms-2' /></label>}
          name='city'
          isClearable
          options={cityOptions}
        />

        <Select
          className='w-100 mx-1'
          onChange={handleConcessionOnChange}
          placeholder={<label>Filtrar Concessão<FontAwesomeIcon icon={faBuilding} className='ms-2' /></label>}
          name='concession'
          isClearable
          options={concessionOptions}
        />

        <Select
          className='w-100 mx-1'
          onChange={handleDepartmentOnChange}
          placeholder={<label>Filtrar departamento<FontAwesomeIcon icon={faBuilding} className='ms-2' /></label>}
          name='department'
          isClearable
          options={departmentOptions}
        />
      </Card.Header>

    </Card>
  )
}

export default FilterContainer