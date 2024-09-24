import React, { useState } from 'react';
import { Form, Input, Button, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BACKENDURL } from '../../../helper/Urls'; // Adjust the URL as needed

const NewCompanyForm = ({ reload, openModalFun }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]); // Manage uploaded files

  const onFinish = async (values) => {
    const formData = new FormData();
    message.success('Company Adding');

    for (const key in values) {
      formData.append(key, values[key]);
    }
    
    // Check if a file is uploaded for license and append it to formData
    if (fileList.length > 0) {
      formData.append('license', fileList[0].originFileObj);
    } else {
      formData.append('license', null); // Pass null if no file is uploaded
    }
  
    try {
      await axios.post(`${BACKENDURL}/company/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Company added successfully');
      form.resetFields();
      reload(); // Reload the data after adding a new company
      openModalFun(false); // Close the modal
      setFileList([]); // Reset the file list
    } catch (error) {
      message.error('Failed to add company');
    }
  };
  

  // Handle file changes for Upload component
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList); // Update file list
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        name: '',
        location: '',
        tin: '',
        vat: '',
        city: '',
        subcity: '',
        wereda: '',
        houseNo: '',
        phone: '',
        email: '',
      }}
    >
      <Form.Item
        name="name"
        label="Company Name"
        rules={[{ required: true, message: 'Please input the company name!' }]}
      >
        <Input />
 
      </Form.Item>

      <Form.Item
  name="phone"
  label="Phone"
  rules={[
    { required: true, message: 'Please input the phone number!' },
    { pattern: /^[0-9]+$/, message: 'Please input a valid phone number!' }
  ]}
>
  <Input />
</Form.Item>


<Form.Item
  name="email"
  label="Email"
  rules={[
    { required: true, message: 'Please input the email!' },
    { type: 'email', message: 'Please input a valid email!' }
  ]}
>
  <Input />
</Form.Item>


      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: true, message: 'Please input the location!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="tin"
        label="TIN"
        rules={[{ required: true, message: 'Please input the TIN!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="vat"
        label="VAT"
        rules={[{ required: true, message: 'Please input the VAT!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="city"
        label="City"
        rules={[{ required: true, message: 'Please input the city!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="subcity"
        label="Subcity"
        rules={[{ required: true, message: 'Please input the subcity!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="woreda"
        label="Woreda"
        rules={[{ required: true, message: 'Please input the woreda!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="houseNo"
        label="House Number"
        rules={[{ required: true, message: 'Please input the house number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="license"
        label="Company License"
        valuePropName="file"
        getValueFromEvent={(e) => (Array.isArray(e) ? e[0] : e && e.fileList[0])}
      >
        <Upload
          beforeUpload={() => false} // Prevents auto-upload
          fileList={fileList} // Show uploaded file
          onChange={handleFileChange} // Handle file change
        >
          <Button icon={<UploadOutlined />}>Click to Upload License (optional)</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewCompanyForm;