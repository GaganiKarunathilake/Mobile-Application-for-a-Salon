import React from 'react'
import { Table, Button, Form, Input, Modal, Popconfirm, Divider, Select, TimePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import appointmentService from '../features/appointment/appointmentService';
const Option = Select.Option;
const format = 'HH:mm';
function AddSlots() {
  const [formState, setFormState] = React.useState("Create");
  const [slotList, setSlotList] = React.useState([]);
  const [appointmentList, setAppointmentList] = React.useState([]);
  const [appointment_id, setApiId] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [selectData, setSelectData] = React.useState(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    setSlotList(await appointmentService.getAllAppSlots())
    setAppointmentList(await appointmentService.getAppointments())
  }

  const showModal = (type, data) => {
    if (type == "Update") {
      setSelectData(data);

    } else {
      setSelectData(null);

    }
    setFormState(type)
    setIsModalOpen(true);
  };


  const handleOk = async () => {
    if (formState == "Create") {
      const empData = {
        appointment_id: appointment_id,
        time: time,
      }
      console.log(empData);
      try {
        const response = await appointmentService.createappointmentslot(empData)
        console.log("response", response);
      } catch (error) {
        console.log(error);
      }
    } else {
      const empData = {
        appointment_id: appointment_id,
        time: time,
      }
      try {
        //   const response = await appointmentService.updateUser(empData)
        //   console.log("response", response);
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
      const response = await appointmentService.deleteSlot(
        {
          slot_id: data._id,
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
      render: (row) => (
        <span>{row.appointment_id.specialist_name}</span>
      ),
    },
    {
      title: 'Time',
      render: (row) => (
        <span>{row.time}</span>
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
      <h3 className='mb-4'>Slots Manage</h3>
      <div>
        <div>

          <Button type="primary" onClick={() => showModal("Create", null)} style={{ margin: '10px' }}>
            Create Slot
          </Button>
          <Modal title={formState + " Slot"} open={isModalOpen} onCancel={handleCancel}
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
                  message: "Appointment is required ",
                },
                ]}
                name={"productname"} label="Appointment"></Form.Item>
              <Select
                showSearch
                placeholder="Select Appointment"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                onChange={(e) => setApiId(e)}
                style={{ width: "100%" }}
              >
                {appointmentList.map(ap =>
                  <Option value={ap._id}>{ap.specialist_name} - {ap.date}</Option>
                )}
              </Select>
            </Form>

            <Form>
              <Form.Item
                style={{ marginBottom: 0 }}
                name={"time"} label="Time"></Form.Item>
              <TimePicker.RangePicker format={format}
                style={{ width: "100%" }}
                onChange={async (a, e) => await setTime(e[0] + " - " + e[1])} />
            </Form>

          </Modal>
        </div>
        <Table columns={columns} dataSource={slotList} />

      </div>
    </div>
  )
};

export default AddSlots;