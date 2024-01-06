import React from 'react'
import { Button, Form, Select, DatePicker, Popconfirm } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import appointmentService from '../features/appointment/appointmentService';
import customerService from "../features/customers/customerService";
import moment from 'moment';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd/es';

const Option = Select.Option;
function AddAppoinment() {
  const [userList, setUserList] = React.useState([]);
  const [appointmentList, setAppointmentList] = React.useState([]);

  const [name, setName] = React.useState(null);
  const [date, setDate] = React.useState(null);

  React.useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    setUserList(await customerService.getEmployee())
    setAppointmentList(await appointmentService.getAppointments())
  }

  const save = async () => {
    const empData = {
      specialist_name: name,
      date: date,
    }
    console.log(empData);
    try {
      const response = await appointmentService.createappointmentdate(empData)
      console.log("response", response);

      loadData()
    } catch (error) {
      console.log(error);
    }
  }

  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  const onDelete = async (data) => {
    try {
      const response = await appointmentService.deleteAppointment(
        {
          appointment_id: data._id,
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
      title: 'Specialist Name',
      render: (row) => (
        <span>{row.specialist_name}</span>
      ),
    },
    {
      title: 'Date',
      render: (row) => (
        <span>{row.date}</span>
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
    <div className="Addproduct">
      <h3 className='mb-4'>Create Appointments</h3>
      <Form style={{ width: 500 }}>
        <Form.Item style={{ marginBottom: 0 }}
          rules={[{
            required: true,
            message: "specialist is required ",
          },
          ]}
          name={"specialist"} label="Specialist"></Form.Item>
        <Select
          showSearch
          placeholder="Select Specialist"
          optionFilterProp="children"
          filterOption={(input, option) => (option?.label ?? '').includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          onChange={(e) => setName(e)}
          style={{ width: "100%" }}
        >
          {userList.map(ap =>
            <Option value={ap.name}>{ap.name}</Option>
          )}
        </Select>
      </Form>

      <Form style={{ width: 500, marginBottom: 20 }}>
        <Form.Item
          style={{ marginBottom: 0 }}
          name={"date"} label="Date"></Form.Item>
        <DatePicker style={{ width: "100%" }}
          format="YYYY-MM-DD"
          onChange={onChange} />
      </Form>

      <Form.Item>
        <Button onClick={save} type="primary"  >
          Submit
        </Button>
      </Form.Item>

      <Table columns={columns} dataSource={appointmentList} />
    </div>
  )
};

export default AddAppoinment;