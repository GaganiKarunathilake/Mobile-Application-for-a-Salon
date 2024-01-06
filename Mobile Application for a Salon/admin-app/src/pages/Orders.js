import React from 'react'
import { Table, Popconfirm, Button, Divider, Modal } from 'antd';
import orderService from '../features/orders/orderService'
import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import moment from 'moment/moment';
import { image_url } from '../utils/base_url';



const Orders = () => {
  const [dataList, setDataList] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectData, setSelectData] = React.useState(null);

  React.useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    setDataList(await orderService.getOrders())
  }


  const showModal = (data) => {
    setSelectData(data);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };




  const columns = [
    {
      title: 'Date',
      render: (row) => (
        <span>{moment(row.created).format("yyyy MMM DD")}</span>
      ),
    },
    {
      title: 'Customer name',
      dataIndex: 'customer_name',
    },
    
    {
      title: 'Total',
      dataIndex: 'total',
      align: 'right'
    },
    {
      title: 'Action',
      render: (row) => (
        <span>
          <Button
            type="primary"
            icon={<UnorderedListOutlined />}
            title="View Items"
            onClick={() => showModal(row)}
          />
          <Divider type="vertical" />
          {/* <Button
            type="primary"
            icon={<EditOutlined />}
            title="Edit"
          />
          <Divider type="vertical" /> */}
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

  const itemColumns = [
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
  ];


  return (
    <div>
      <h3 className='mb-4'>Orders</h3>
      <div>
        <Table columns={columns} dataSource={dataList} />
      </div>


      <Modal title="Product List" open={isModalOpen} onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>
        ]}>

        <Table columns={itemColumns} dataSource={selectData ? selectData.items : []} />
      </Modal>
    </div>
  )
}

export default Orders