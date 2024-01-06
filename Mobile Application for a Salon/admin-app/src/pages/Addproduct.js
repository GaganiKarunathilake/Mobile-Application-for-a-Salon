import React from 'react'
import { Button, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import productService from '../features/product/productService';

import {
  Upload
} from 'antd';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
function Addproduct() {
  const [image1, setImage1] = React.useState(undefined);
  const [name, setName] = React.useState(null);
  const [price, setPrice] = React.useState(null);

  const onFinish = async (values) => {

    const formData = new FormData();
    formData.append('img', image1);
    formData.append('name', name);
    formData.append('price', price);

    let response = await productService.setProduct(formData)

    console.log(response);
  };

  const selectFileOnChange = async (event) => {
    console.log("event", event);
    setImage1(event);
  }

  return (
    <div className="Addproduct">
      <Form style={{ width: 500 }}>
        <Form.Item style={{ marginBottom: 0 }}
          rules={[{
            required: true,
            message: "Product name is required ",
          },
          ]}

          name={"productname"} label="Product Name"></Form.Item>
        <Input placeholder="Product Name"
          onChange={e => setName(e.target.value)} />
      </Form>

      <Form style={{ width: 500 }}>
        <Form.Item
          style={{ marginBottom: 0 }}
          name={"price"} label="Price"></Form.Item>
        <Input placeholder="Rs."
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



      <Form.Item>
        <Button onClick={onFinish} type="primary"  >
          Submit
        </Button>
      </Form.Item>


      {/* <label htmlFor="btn-upload">
        <input
          multiple
          id="btn-upload"
          name="btn-upload"
          style={{ display: 'none' }}
          type="file"
          accept="image/*"
          onChange={selectFileOnChange} />
        <Button
          className="btn-choose"
          variant="outlined"
          component="span">
          Choose Image
        </Button>
      </label> */}

      {/* {image1 && (
        <img alt=''
          src={URL.createObjectURL(image1)}
          style={{
            height: '100%', backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
          }} />
      )} */}

    </div>
  )
};

export default Addproduct;