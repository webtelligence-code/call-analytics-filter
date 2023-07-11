import React from 'react'
import { Card } from 'react-bootstrap'

const LegendContainer = () => {
  return (
    <Card
      className='mb-3 shadow'
      style={{
        borderBottomWidth: 0,
      }}
    >
      <Card.Header
        as={'h5'}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          borderRadius: '5px',
          overflow: 'hidden', // Add this line
          whiteSpace: 'nowrap', // Add this line
        }}
      >
      </Card.Header>
    </Card>
  )
}

export default LegendContainer