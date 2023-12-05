import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'

import { CgMediaLive } from 'react-icons/cg';
import '../../styles/live.css'
import '../../styles/marquee.css'

import { BsFillTelephoneForwardFill, BsFillTelephoneXFill, BsPercent, BsTelephoneOutboundFill } from 'react-icons/bs'
import { FcCallback, FcMissedCall, FcPhone } from 'react-icons/fc'

const HeaderContainer = ({ lastUpdated }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Clean up the timer on unmount
  }, []);

  return (
    <Card
      className='mb-3 shadow text-center'
      style={{
        borderBottomWidth: 0,
      }}
    >
      <Card.Header
        as={'h6'}
        style={{
          backgroundColor: 'white',
          borderRadius: '5px',
        }}>
        <label>
          Legendas:
        </label>

        <label className='ms-1' style={{ color: '#c62828' }}>
          <BsPercent size={20} color={'#c62828'} /> Percentagem não devolvidos
        </label>

        <label className='ms-1' style={{ color: '#388e3c' }}>
          <FcPhone size={20} /> Chamadas recebidas
        </label>

        <label className='ms-1' style={{ color: '#42a5f5' }}>
          <FcCallback size={20} /> Chamadas devolvidas
        </label>

        <label className='ms-1' style={{ color: '#c62828' }}>
          <BsFillTelephoneForwardFill size={15} color='#c62828' /> Chamadas não devolvidas
        </label>

        <label className='ms-1' style={{ color: '#c62828' }}>
          <BsFillTelephoneXFill color='#c62828' size={15} /> Chamadas perdidas
        </label>

        <label className='ms-1' style={{ color: '#388e3c' }}>
          <BsTelephoneOutboundFill size={15} color='#388e3c' /> Chamadas efetuadas
        </label>
      </Card.Header>
    </Card>
  )
}

export default HeaderContainer