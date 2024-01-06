import { Table, Popconfirm, Button, Divider, Form, Input, Modal, Upload } from 'antd';
import React, { useState } from 'react';
import { image_url } from '../utils/base_url';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import offerService from '../features/offer/offerService';




const OfferList = () => {
  const [dataList, setDataList] = React.useState([]);

  React.useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    setDataList(await offerService.getBanners())
  }


  return (
    <div>
      <h3 className='mb-4'>Offers List</h3>

      <div>
        {dataList.map(data => (
          <div>
            <img
              height={80}
              src={image_url + data.image}
              alt=""
              style={{ margin: 20 }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}



export default OfferList