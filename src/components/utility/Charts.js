import React, { Fragment } from 'react'
import { Col, Row } from 'react-bootstrap'
import { BsFillTelephoneForwardFill } from 'react-icons/bs';
import { FcCallback } from 'react-icons/fc';
import { VictoryPie } from 'victory';



const Charts = ({ show, recebidas, devolvidas, nDevolvidas, perdidas, efetuadas, total, personTypeLabel }) => {

  // Chamadas Recebidas
  const chamadasRecebidas = () => {
    const totalCalls = recebidas + (total - recebidas);
    const recebidasPercentage = (recebidas / totalCalls) * 100;
    const totalPercentage = ((total - recebidas) / totalCalls) * 100;

    const data = [
      { x: 'Recebidas', y: recebidasPercentage },
      { x: 'Total', y: totalPercentage },
    ];

    return data;
  }

  // Chamadas Devolvidas
  const chamadasDevolvidas = () => {
    const totalCalls = devolvidas + nDevolvidas;
    const devolvidasPercentage = (devolvidas / totalCalls) * 100;
    const totalPercentage = 100 - devolvidasPercentage;

    const data = [
      { x: 'Recebidas', y: devolvidasPercentage, z: devolvidas },
      { x: 'Total Devolvidas', y: totalPercentage },
    ];

    return data;
  }

  // Chamadas Não Devolvidas
  const chamadasNDevolvidas = () => {
    const totalCalls = nDevolvidas + devolvidas;
    const nDevolvidasPercentage = (nDevolvidas / totalCalls) * 100;
    const totalPercentage = 100 - nDevolvidasPercentage;

    const data = [
      { x: 'Recebidas', y: nDevolvidasPercentage, z: nDevolvidas },
      { x: 'Total Não Devolvidas', y: totalPercentage },
    ];

    return data;
  }

  // Chamadas Perdidas
  const chamadasPerdidas = () => {
    const totalCalls = perdidas + (total - perdidas);
    const perdidasPercentage = (perdidas / totalCalls) * 100;
    const totalPercentage = ((total - perdidas) / totalCalls) * 100;

    const data = [
      { x: 'Recebidas', y: perdidasPercentage },
      { x: 'Total perdidas', y: totalPercentage },
    ];

    return data;
  }

  // Chamadas Efetuadas
  const chamadasEfetuadas = () => {
    const totalCalls = efetuadas + (total - efetuadas);
    const efetuadasPercentage = (efetuadas / totalCalls) * 100;
    const totalPercentage = ((total - efetuadas) / totalCalls) * 100;

    const data = [
      { x: 'Recebidas', y: efetuadasPercentage },
      { x: 'Total', y: totalPercentage },
    ];

    return data;
  }

  const getPercentageRate = (value) => {
    const total = devolvidas + nDevolvidas;
    const percentageRate = (value / total) * 100;

    return parseInt(percentageRate.toFixed(0), 10); // Convert to integer without decimals
  }

  return (
    <Row className='justify-content-around'>
      {show[0] && (
        <Col md={2}>
          <VictoryPie
            origin={{ y: 250 }}
            data={chamadasRecebidas()}
            innerRadius={80}
            colorScale={['#388e3c', '#e6e6e6']}
            startAngle={-90}
            endAngle={90}
            labelComponent={<Fragment />} // If Frafgment provided then labels will not be rendered
          />
        </Col>
      )}

      {show[1] && (
        <Col md={3} className='text-center mb-3'>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <VictoryPie
              height={200}
              width={400}
              origin={{ x: 200, y: 150 }}
              data={chamadasDevolvidas()}
              innerRadius={110}
              colorScale={['#42a5f5', '#e6e6e6']}
              startAngle={-90}
              endAngle={90}
              labelComponent={<Fragment />}
              style={{ labels: { fontSize: 35, fill: 'white' } }}
            />
            <h5 style={{ display: 'block', color: '#42a5f5', marginTop: -25 }}>{getPercentageRate(devolvidas)}%</h5>
            <label className='text-center' style={{marginTop: 0}}>
              <FcCallback size={25} className='me-2' />
              <label style={{ fontWeight: 'bold', color: '#42a5f5' }}>{devolvidas}</label> {personTypeLabel} devolvidos</label>
          </div>

        </Col>
      )}

      {show[2] && (
        <Col md={3} className='text-center mb-3'>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <VictoryPie
              height={200}
              width={400}
              origin={{ x: 200, y: 150 }}
              data={chamadasNDevolvidas()}
              innerRadius={110}
              colorScale={['#c62828', '#e6e6e6']}
              startAngle={-90}
              endAngle={90}
              labelComponent={<Fragment />}
              style={{ labels: { fontSize: 35, fill: 'white' } }}
            />
          </div>
          <h5 style={{ display: 'block', color: '#c62828', marginTop: -25 }}>{getPercentageRate(nDevolvidas)}%</h5>
          <label style={{ display: 'block', marginTop: 0 }}>
            <BsFillTelephoneForwardFill size={20} className='me-2' color='#c62828' />
            <label style={{ fontWeight: 'bold', color: '#c62828' }}>{nDevolvidas}</label> {personTypeLabel} não devolvidos
          </label>
        </Col>


      )}

      {show[3] && (
        <Col md={2}>
          <VictoryPie
            origin={{ y: 250 }}
            data={chamadasPerdidas()}
            innerRadius={80}
            colorScale={['#c62828', '#e6e6e6']}
            startAngle={-90}
            endAngle={90}
            labelComponent={<Fragment />} // If Frafgment provided then labels will not be rendered
          />
        </Col>
      )}

      {show[4] && (
        <Col md={2}>
          <VictoryPie
            origin={{ y: 250 }}
            data={chamadasEfetuadas()}
            innerRadius={80}
            colorScale={['#388e3c', '#e6e6e6']}
            startAngle={-90}
            endAngle={90}
            labelComponent={<Fragment />} // If Frafgment provided then labels will not be rendered
          />
        </Col>
      )}
    </Row>
  )
}

export default Charts