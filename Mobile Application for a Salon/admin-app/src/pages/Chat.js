import React from 'react'
import { Table, Popconfirm, Button, Divider, Form, Input, Modal, } from 'antd';
import customerService from "../features/customers/customerService";
import { DeleteOutlined, WechatOutlined } from '@ant-design/icons';
import chatService from '../features/chat/chatService';



const Chat = () => {
  const [userList, setUserList] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [chatList, setChatList] = React.useState([]);
  const [message, setMessage] = React.useState(null);

  const [selectData, setSelectData] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    loadData()
  }, []);



  const loadData = async () => {
    setUserList(await customerService.getUsers())
  }

  const showModal = async (data) => {

    setSelectData(data);
    setName(data.name);
    setMessage(null)
    setUser(await JSON.parse(localStorage.getItem("user")))
    console.log(user);
    setChatList(await chatService.getChat({ user_id: data._id, sendby_id: user.data._id }))
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const empData = {
      user_id: selectData._id,
      sendby_id: user.data._id,
      message: message
    }
    try {
      const response = await chatService.setChat(empData)
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }

    setIsModalOpen(false);
    loadData();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };




  const columns = [
    {
      title: ' Customer Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },

    {
      title: 'View Chat',
      render: (row) => (
        <span>
          <Button
            type="primary"
            icon={<WechatOutlined />}
            onClick={() => showModal(row)}
            title="View Chat"
          />
        </span>
      ), align: 'center'
    },
  ];

  return (
    <div>
      <h3 className='mb-4'>Chats</h3>
      <Modal title={name} open={isModalOpen} onCancel={handleCancel}
        footer={[
        ]}>

        <div>
          <hr />
          {chatList.map(data => (
            <p style={{ textAlign: (user.data._id == data.sendby_id ? "right" : "left") }}>
              {/* {user.data._id == data.sendby_id ? user.data.name : name} : */}
               {data.message}</p>
          ))}
        </div>

        <hr />
        <Form style={{ display: 'flex' }}>
          <Input placeholder="message"
            value={message}
            onChange={e => setMessage(e.target.value)} />
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>
        </Form>
      </Modal>

      <div>
        <Table columns={columns} dataSource={userList} />
      </div>
    </div>
  )
}

export default Chat