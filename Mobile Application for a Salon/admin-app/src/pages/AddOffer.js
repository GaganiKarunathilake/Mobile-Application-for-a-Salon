import React from 'react'
import { Button, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import offerService from '../features/offer/offerService';
import {Link, useNavigate} from "react-router-dom";

import {
  Upload
} from 'antd';

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
function AddOffer() {
  const navigate = useNavigate();
  const [image1, setImage1] = React.useState(undefined);

  const onFinish = async (values) => {
    if (!undefined) {

      const formData = new FormData();
      formData.append('img', image1);

      let response = await offerService.createBanner(formData)
      if (!response.error) {
        alert("Uploaded!")
        setImage1(undefined);
        // navigate("Offer-list");
      }
    }
  };

  const selectFileOnChange = async (event) => {
    console.log("event", event);
    setImage1(event);
  }

  return (
    <div className="Addproduct">


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



    </div>
  )
};

export default AddOffer;