import React from 'react'
import { Table, Popconfirm, Button, Divider } from 'antd';
import appointmentService from '../features/appointment/appointmentService';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';


const columns = [
  {
    title: ' Customer Details',
    render: (row) => (
      <span>{row.user_id.name}</span>
    ),
  },
  {
    title: 'Appointment For',
    render: (row) => (
      <span>{row.appointment_id.specialist_name}</span>
    ),
  },
  {
    title: 'Date',
    render: (row) => (
      <span>{row.appointment_id.date}</span>
    ),
  },

  {
    title: 'Time',
    render: (row) => (
      <span>{row.slot_id.time}</span>
    ),
  },

  {
    title: 'Status',
    render: (row) => (
      <span>{row.slot_id.reserved ? "Reserved" : "Open"}</span>
    ),
  },
  {
    title: 'Action',
    render: (row) => (
      <span>
        <Button
          type="primary"
          icon={<EditOutlined />}
        />
        <Divider type="vertical" />
        <Popconfirm
          title="Are you sure Delete?"
          // onConfirm={this.onDeleteItem(value, r, c)}
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


const Appointment = () => {
  const [dataList, setDataList] = React.useState([]);

  React.useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    setDataList(await appointmentService.getAllcustomerappointments())
  }

  return (
    <div>
      <h3 className='mb-4'>Customer Appointments</h3>
      <div>
        <Table columns={columns} dataSource={dataList} />
      </div>
    </div>
  )
}

export default Appointment