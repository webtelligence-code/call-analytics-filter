import React, { Fragment } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import { BsFillTelephoneXFill, BsTelephoneOutboundFill } from 'react-icons/bs'
import { FcCallback, FcPhone } from 'react-icons/fc'

const CallsInfo = ({ recebidas, devolvidas, nDevolvidas, perdidas, efetuadas, show }) => {
  return (
    <Row className='text-center'>
      {show[0] && (
        <Col>
          {recebidas >= 0 ? (
            <div className='lost-calls-container' style={{backgroundColor: 'transparent'}}>
              <h4 style={{ color: '#388e3c' }}><FcPhone size={30} /> {recebidas}</h4>
            </div >
          ) : (
            <div>
              <Spinner style={{ color: '#388e3c' }}>
                <span className='visually-hidden'>A carregar...</span>
              </Spinner>
            </div>
          )}
        </Col>
      )}

      {show[1] && (
        <Col>
          {devolvidas >= 0 ? (
            <div className='lost-calls-container' style={{backgroundColor: 'transparent'}}>
              <h4 style={{ color: '#42a5f5' }}><FcCallback size={30} /> {devolvidas}</h4>
            </div>
          ) : (
            <div>
              <Spinner style={{ color: '#42a5f5' }}>
                <span className='visually-hidden'>A carregar...</span>
              </Spinner>
            </div>
          )}
        </Col>
      )}

      {show[2] && (
        <Col>
          {nDevolvidas >= 0 ? (
            <div className='lost-calls-container' style={{backgroundColor: 'transparent'}}>
              <h4 style={{ color: '#42a5f5' }}><FcCallback size={30} /> {nDevolvidas}</h4>

            </div>
          ) : (
            <div>
              <Spinner style={{ color: '#42a5f5' }}>
                <span className='visually-hidden'>A carregar...</span>
              </Spinner>
            </div>
          )}
        </Col>
      )}

      {show[3] && (
        <Col>
          {perdidas >= 0 ? (
            <div className='lost-calls-container'>
              <h4 style={{ color: 'white', fontWeight: 'bold' }}><BsFillTelephoneXFill size={25} /> {perdidas}</h4>
            </div>
          ) : (
            <div>
              <Spinner style={{ color: '#c62828' }}>
                <span className='visually-hidden'>A carregar...</span>
              </Spinner>
            </div>
          )}
        </Col>
      )}

      {show[4] && (
        <Col>
          {efetuadas >= 0 ? (
            <div className='lost-calls-container' style={{backgroundColor: 'transparent'}}>
              <h4 style={{ color: '#388e3c' }}><BsTelephoneOutboundFill size={25} /> {efetuadas}</h4>
            </div>
          ) : (
            <div>
              <Spinner style={{ color: '#388e3c' }}>
                <span className='visually-hidden'>A carregar...</span>
              </Spinner>
            </div>
          )}
        </Col>
      )}
    </Row>
  )
}

export default CallsInfo