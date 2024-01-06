import React from 'react'
import { Table, Button, Form, Input, Modal, Popconfirm, Divider } from 'antd';
import customerService from "../features/customers/customerService";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';




const Employee = () => {
  const [formState, setFormState] = React.useState("Create");
  const [userList, setUserList] = React.useState([]);
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [adl1, setAddress] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [password, setPw] = React.useState(null);
  const [selectData, setSelectData] = React.useState(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    setUserList(await customerService.getEmployee())
  }

  const showModal = (type, data) => {
    if (type == "Update") {
      setSelectData(data);
      setName(data.name);
      setEmail(data.email);
      setAddress(data.adl1);
      setCity(data.city);
    } else {
      setSelectData(null);
      setName(null);
      setEmail(null);
      setAddress(null);
      setCity(null);
    }

    setFormState(type)
    setIsModalOpen(true);
  };


  const handleOk = async () => {
    if (formState == "Create") {
      const empData = {
        usertype: 'employee',
        name: name,
        email: email,
        adl1: adl1,
        city: city,
        password: password
      }
      try {
        const response = await customerService.setUser(empData)
        console.log("response", response);
      } catch (error) {
        console.log(error);
      }
    } else {
      const empData = {
        user_id: selectData._id,
        name: name,
        email: email,
        adl1: adl1,
        city: city,
      }
      try {
        const response = await customerService.updateUser(empData)
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
      const response = await customerService.deleteUser(
        {
          user_id: data._id,
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
      title: ' Emp Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'adl1',
    },

    {
      title: 'Action',
      render: (row) => (
        <span>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => showModal("Update", row)}
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
      <h3 className='mb-4'>Employee</h3>
      <div>
        <div>

          <Button type="primary" onClick={() => showModal("Create", null)} style={{ margin: '10px' }}>
            Create Employee
          </Button>
          <Modal title={formState + " Employee"} open={isModalOpen} onCancel={handleCancel}
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
                name={"name"} label="Name"></Form.Item>
              <Input placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)} />
            </Form>

            <Form >
              <Form.Item style={{ marginBottom: 0 }}
                name={"email"} label="E-mail"></Form.Item>
              <Input placeholder="e-mail"
                value={email}
                onChange={e => setEmail(e.target.value)} />
            </Form>

            <Form >
              <Form.Item style={{ marginBottom: 0 }}
                name={"adl1"} label="Address"></Form.Item>
              <Input placeholder="Address"
                value={adl1}
                onChange={e => setAddress(e.target.value)} />
            </Form>
            <Form >
              <Form.Item style={{ marginBottom: 0 }}
                name={"city"} label="City"></Form.Item>
              <Input placeholder="city"
                value={city}
                onChange={e => setCity(e.target.value)} />
            </Form>

            <Form >
              <Form.Item style={{ marginBottom: 0 }}
                name={"password"} label="Password"></Form.Item>
              <Input.Password placeholder="****"
                onChange={e => setPw(e.target.value)} />
            </Form>


            <Form.List>
              {(fields, Operation) => (
                <>
                  {fields.map((field, index) => {
                    return (

                      <Form.Item name={[field.name]}
                        label="Title">
                        <Input placeholder="Title" />
                      </Form.Item>
                    );
                  })}
                </>
              )}
            </Form.List>
          </Modal>
        </div>
        <Table columns={columns} dataSource={userList} />

      </div>
    </div>
  )
}

export default Employee