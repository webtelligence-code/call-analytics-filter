import { Badge, Space } from 'antd'
import React, { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
import { BsFillTelephoneForwardFill, BsFillTelephoneXFill, BsPercent, BsTelephoneOutboundFill } from 'react-icons/bs'
import { FcCallback, FcMissedCall, FcPhone } from 'react-icons/fc'

const ListItemDescription = ({ recebidas, perdidas, devolvidas, nDevolvidas, efetuadas, percentagem }) => {

  const getPercentageRate = () => {
    const roundedPercentage = Math.round(percentagem * 10) / 10; // Round to one decimal place
    return Number.isInteger(roundedPercentage) ? roundedPercentage.toFixed(0) : roundedPercentage.toFixed(1);
  }

  return (
    <Fragment>
      <Row className='justify-content-between text-center'>
        <Col style={{borderRight: '#a3a2a2 solid 1px'}}><BsPercent size={20} color={getPercentageRate() >= 5 ? '#c62828' : '#388e3c'} /> <Badge count={getPercentageRate() + '%'} color={getPercentageRate() >= 5 ? '#c62828' : '#388e3c'} showZero /></Col>
        <Col style={{borderRight: '#a3a2a2 solid 1px'}}><FcCallback size={20} /> <Badge count={devolvidas} color='#42a5f5' showZero overflowCount={devolvidas} /></Col>
        <Col style={{borderRight: '#a3a2a2 solid 1px'}}><BsFillTelephoneForwardFill size={20} color='#c62828' /> <Badge count={nDevolvidas} color='#c62828' showZero overflowCount={nDevolvidas} /></Col>
      </Row>
      <div className='horizontal-bar'></div>
      <Row className='justify-content-between text-center'>
        <Col style={{borderRight: '#a3a2a2 solid 1px'}}><FcPhone size={20} /> <Badge count={recebidas} color='#388e3c' showZero overflowCount={recebidas} /></Col>
        <Col style={{borderRight: '#a3a2a2 solid 1px'}}><BsFillTelephoneXFill color='#c62828' size={20} /> <Badge count={perdidas} color='#c62828' showZero overflowCount={perdidas} /></Col>
        <Col style={{borderRight: '#a3a2a2 solid 1px'}}><BsTelephoneOutboundFill size={20} color='#388e3c' /> <Badge count={efetuadas} color='#388e3c' showZero overflowCount={efetuadas} /></Col>
      </Row>
    </Fragment>
  )
}

export default ListItemDescription