import { Table, Popconfirm, Button, Divider, Form, Input, Modal, Upload } from 'antd';
import React, { useState } from 'react';
import productService from '../features/product/productService';
import { image_url } from '../utils/base_url';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';




const Productlist = () => {
  const [dataList, setDataList] = React.useState([]);
  const [image1, setImage1] = React.useState(undefined);
  const [name, setName] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectData, setSelectData] = React.useState(null);

  React.useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    setDataList(await productService.getProducts())
  }

  const selectFileOnChange = async (event) => {
    console.log("event", event);
    setImage1(event);
  }

  const showModal = (data) => {
    setSelectData(data);
    setName(data.name);
    setPrice(data.price);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {

    const formData = new FormData();
    formData.append('item_id', selectData._id);
    formData.append('img', image1);
    formData.append('name', name);
    formData.append('price', price);

    try {
      const response = await productService.updateProduct(formData)
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }

    setIsModalOpen(false);
    loadData();
  };

  const onDelete = async (data) => {
    try {
      const response = await productService.deleteProduct(
        {
          item_id: data._id,
          is_deleted: true
        })
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
    loadData();
  }




  const columns = [
    {
      title: ' ',
      render: (row) => (
        <span>
          <img
            height={50}
            src={image_url + row.image}
            alt=""
          />
        </span>
      ),
      align: 'center'
    },

    {
      title: 'Product',
      dataIndex: 'name',
    },
    {
      title: 'Price (Rs.)',
      dataIndex: 'price',
      align: 'right'
    },

    {
      title: 'Action',
      render: (row) => (
        <span>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showModal(row)}
          />
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure Delete?"
            onConfirm={() => onDelete(row)}
            okText="Yes"
            cancelText="No">
            <Button
              type="primary"
              style={{ backgroundColor: '#d72727' }}
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </span>
      ), align: 'center'
    },
  ];

  return (
    <div>
      <h3 className='mb-4'>Product List</h3>


      <Modal title="Update Product" open={isModalOpen} onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>
        ]}>
        <Form >
          <Form.Item style={{ marginBottom: 0 }}
            rules={[{
              required: true,
              message: "Product name is required ",
            },
            ]}

            name={"productname"} label="Product Name"></Form.Item>
          <Input placeholder="Product Name"
            value={name}
            onChange={e => setName(e.target.value)} />
        </Form>

        <Form >
          <Form.Item
            style={{ marginBottom: 0 }}
            name={"price"} label="Price"></Form.Item>
          <Input placeholder="Rs."
            value={price}
            onChange={e => setPrice(e.target.value)} />
        </Form>

        <Form.List>
          {(fields, Operation) => (
            <>
              {fields.map((field, index) => {
                return (

                  <Form.Item name={[field.name]}
                    label="Product Code">
                    <Input placeholder="Product Code" />
                  </Form.Item>
                );
              })}
            </>
          )}
        </Form.List>
        <br />

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {selectData && !image1 &&
            <img
              height={80}
              src={image_url + selectData.image}
              alt=""
              style={{ margin: 20 }}
            />
          }
          <Upload action={selectFileOnChange} listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload Image
              </div>
            </div>
          </Upload>
        </div>

      </Modal>

      <div>
        <Table columns={columns} dataSource={dataList} />
      </div>
    </div>
  )
}



export default Productlist