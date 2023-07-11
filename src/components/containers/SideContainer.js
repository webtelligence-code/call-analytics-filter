import React from 'react';
import { Card } from 'react-bootstrap';
import { List } from 'antd';
import ListItemDescription from '../utility/ListItemDescription';
import { IoIosCall } from 'react-icons/io';

const SideContainer = ({ percentagens }) => {
  const extensoesArray =
    percentagens &&
    Object.entries(percentagens)
      .map(([key, value]) => ({ key, ...value }))
      .sort((a, b) => {
        const percA = Math.round(a.Percentagem * 100) / 100; // Round to two decimal places
        const percB = Math.round(b.Percentagem * 100) / 100; // Round to two decimal places
        return percB - percA; // Compare percentages in descending order
      });

  return (
    <Card className="shadow" style={{ height: '100%' }}>
      <Card.Header
        className="text-center shadow-sm"
        style={{
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          alignItems: 'center',
          backgroundColor: 'white',
        }}
        as="h5"
      >
        Piores Concessões (teste)
      </Card.Header>
      <Card.Body style={{ overflow: 'hidden', position: 'relative' }}>
        <div className={extensoesArray && 'marquee-v'}>
          <List
            itemLayout="horizontal"
            dataSource={extensoesArray}
            renderItem={(item, index) => (
              <List.Item style={{ borderBottom: '2px solid #a3a2a2', paddingBottom: 12 }}>
                <List.Item.Meta
                  title={
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      {item.Concessao}
                      <div className='list-item-title-badge ms-2' style={{ color: 'white' }}>Total: <IoIosCall className='mx-2' size={20} /> {item.total}</div>
                    </div>
                  }
                  description={
                    <ListItemDescription
                      total={item.total}
                      recebidas={item.recebidas}
                      perdidas={item.perdidas}
                      devolvidas={item.Devolvidas}
                      nDevolvidas={item.NDevolvidas}
                      efetuadas={item.efetuadas}
                      percentagem={item.Percentagem}
                    />
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default SideContainer;