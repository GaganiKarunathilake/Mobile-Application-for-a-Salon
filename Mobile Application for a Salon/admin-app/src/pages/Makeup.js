import React from 'react'
import { Table, Button, Form, Input, Modal, Popconfirm, Divider, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import serService from '../features/service/serService';
import { image_url } from '../utils/base_url';

function Makeup() {
  const [formState, setFormState] = React.useState("Create");
  const [serviceList, setServiceList] = React.useState([]);

  const [title, setTitle] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [image1, setImage1] = React.useState(undefined);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    setServiceList(await serService.getService({ category: 'makeup' }))
  }

  const showModal = (type, data) => {
    setFormState(type)
    setIsModalOpen(true);
  };

  const selectFileOnChange = async (event) => {
    console.log("event", event);
    setImage1(event);
  }


  const handleOk = async () => {
    if (formState == "Create") {
      const formData = new FormData();
      formData.append('img', image1);
      formData.append('category', "makeup");
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);

      try {
        let response = await serService.setService(formData)
        console.log("response", response);
      } catch (error) {
        console.log(error);
      }
    }
    setIsModalOpen(false);
    loadData();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onDelete = async (data) => {
    try {
      const response = await serService.deleteService(
        {
          service_id: data._id,
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
      title: 'Title',
      render: (row) => (
        <span>{row.title}</span>
      ),
    },
    {
      title: 'description',
      render: (row) => (
        <span>{row.description}</span>
      ),
    },
    {
      title: 'Price',
      render: (row) => (
        <span>{row.price}</span>
      ),
    },
    {
      title: 'Action',
      render: (row) => (
        <span>
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
      <h3 className='mb-4'>Makeup Manage</h3>
      <div>
        <div>

          <Button type="primary" onClick={() => showModal("Create", null)} style={{ margin: '10px' }}>
            Create Makeup
          </Button>
          <Modal title={formState + " Makeup"} open={isModalOpen} onCancel={handleCancel}
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
                  message: "title is required ",
                },
                ]}

                name={"title"} label="Title"></Form.Item>
              <Input placeholder="title"
                onChange={e => setTitle(e.target.value)} />
            </Form>

            <Form >
              <Form.Item
                style={{ marginBottom: 0 }}
                name={"description"} label="Description"></Form.Item>
              <Input placeholder="Description"
                onChange={e => setDescription(e.target.value)} />
            </Form>

            <Form>
              <Form.Item
                style={{ marginBottom: 0 }}
                name={"price"} label="Price"></Form.Item>
              <Input placeholder="Rs."
                onChange={e => setPrice(e.target.value)} />
            </Form>

            <br />

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
          </Modal>
        </div>
        <Table columns={columns} dataSource={serviceList} />

      </div>
    </div>
  )
};

export default Makeup;