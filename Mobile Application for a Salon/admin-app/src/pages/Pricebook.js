import React from 'react'
import {  Table } from 'antd';
const columns = [
    {
      title: 'No',
      dataIndex: 'key',
    },
  
    {
      title: ' Product Name',
      dataIndex: 'product_name',
    },
    {
        title: 'Product Code',
        dataIndex: 'product_code',
      },
    {
      title: 'Price Rs.',
      dataIndex: 'price',
    },
    
    
  ];
  const data1 = [];
  for (let i = 1; i < 15; i++) {
    data1.push({
      key: i,
      no:1,
      product_name: `Edward King ${i}`,
      product_code: 123,
      price: 3200,
      
    });
  }

const Pricebook = () => {
  return (
    <div>
        <h3 className='mb-4'>Price Book</h3>
        <div>
        <Table columns={columns} dataSource={data1}/>
        </div>
        </div>
  )
}

export default Pricebook