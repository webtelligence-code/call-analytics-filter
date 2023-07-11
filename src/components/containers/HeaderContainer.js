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
      className='mb-3 shadow'
      style={{
        borderBottomWidth: 0,
      }}
    >
      <Card.Header
        as={'h5'}
        style={{
          backgroundColor: 'white',
          borderRadius: '5px',
          overflow: 'hidden', // Add this line
          whiteSpace: 'nowrap', // Add this line
        }}
      >
        <div className='marquee-h'>
          <label>
            Última atualização: {lastUpdated}h <CgMediaLive className='ms-2 icon' color='#c62828' />
          </label>

          <label className='ms-2'>
            A mostrar dados das 00:00h até às {lastUpdated}h <CgMediaLive className='ms-2 icon' color='#c62828' />
          </label>

          <label className='ms-2' style={{ color: '#c62828' }}>
            <BsPercent size={20} color={'#c62828'} /> Percentagem não devolvidos
          </label>

          
          <label className='vertical-bar'></label>

          <label className='ms-2' style={{ color: '#388e3c' }}>
            <FcPhone size={30} /> Chamadas recebidas
          </label>

          <label className='vertical-bar'></label>

          <label className='ms-2' style={{ color: '#42a5f5' }}>
            <FcCallback size={30} /> Chamadas devolvidas
          </label>

          <label className='vertical-bar'></label>

          <label className='ms-2' style={{ color: '#c62828' }}>
            <BsFillTelephoneForwardFill size={25} color='#c62828' /> Chamadas não devolvidas
          </label>

          <label className='vertical-bar'></label>

          <label className='ms-2' style={{ color: '#c62828' }}>
            <BsFillTelephoneXFill color='#c62828' size={25} /> Chamadas perdidas
          </label>

          <label className='vertical-bar'></label>

          <label className='ms-2' style={{ color: '#388e3c' }}>
            <BsTelephoneOutboundFill size={25} color='#388e3c' /> Chamadas efetuadas
          </label>
        </div>
      </Card.Header>
    </Card>
  )
}

export default HeaderContainer