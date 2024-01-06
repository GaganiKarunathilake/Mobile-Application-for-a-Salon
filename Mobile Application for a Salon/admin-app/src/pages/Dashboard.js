import React from 'react'
import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import { Column } from '@ant-design/plots';
import { Table, Popconfirm, Button, Divider } from 'antd';
import appointmentService from '../features/appointment/appointmentService';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import orderService from '../features/orders/orderService';
import customerService from '../features/customers/customerService';




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
];

const Dashboard = () => {
  const [appointmentList, setAppoinmentList] = React.useState([]);
  const [orderList, setOrderList] = React.useState([]);
  const [empList, setEmpList] = React.useState([]);
  const [userList, setUserList] = React.useState([]);

  React.useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    setAppoinmentList(await appointmentService.getAllcustomerappointments())
    setOrderList(await orderService.getOrders())
    setEmpList(await customerService.getEmployee())
    setUserList(await customerService.getUsers())
  }



  const data = [
    {
      type: 'Jan',
      sales: 50,
    },
    {
      type: 'Feb',
      sales: 34,
    },
    {
      type: 'Mar',
      sales: 61,
    },
    {
      type: 'Apr',
      sales: 60,
    },
    {
      type: 'May',
      sales: 145,
    },
    {
      type: 'June',
      sales: 100,
    },
    {
      type: 'July',
      sales: 110,
    },
    {
      type: 'Aug',
      sales: 80,
    },
    {
      type: 'Sep',
      sales: 70,
    },
    {
      type: 'Oct',
      sales: 70,
    },
    {
      type: 'Nov',
      sales: 65,
    },
    {
      type: 'Des',
      sales: 120,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return "#d13bc9";
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-item-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p >Appointment</p>  <h4 className="mb-0">{appointmentList.length}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {/* <h6><BsArrowDownRight />35%</h6>
            <p className="mb-0">Compared To June 2022</p> */}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p >Orders</p>  <h4 className="mb-0">{orderList.length}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {/* <h6 className="red">
              <BsArrowDownRight />35%</h6>
            <p className="mb-0">Compared To June 2022</p> */}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p >Employee</p>  <h4 className="mb-0">{empList.length}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {/* <h6 className="green">
              <BsArrowDownRight />35%</h6>
            <p className="mb-0">Compared To June 2022</p> */}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p >Customers</p>  <h4 className="mb-0">{userList.length}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            {/* <h6 className="green">
              <BsArrowDownRight />35%</h6>
            <p className="mb-0">Compared To June 2022</p> */}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Income Statics</h3>
        <div>
          <Column {...config} />;
        </div>
        <div className="mt-4">
          <h3 className="mb-4">Recent Appointments</h3>
          <div>
            <Table
              columns={columns}
              dataSource={appointmentList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;