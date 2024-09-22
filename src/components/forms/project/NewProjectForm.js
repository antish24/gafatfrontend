import React from 'react';
import { Form, Input, Button, message, Upload } from 'antd';
import axios from 'axios';
import { BACKENDURL } from '../../../helper/Urls';
import { UploadOutlined } from '@ant-design/icons';

const NewProjectForm = ({ reload, openModalFun }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'attachments' && values[key]) {
          values[key].fileList.forEach(file => {
            formData.append('attachments', file.originFileObj);
          });
        } else {
          formData.append(key, values[key]);
        }
      });
  
  
      await axios.post(`${BACKENDURL}/project/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success('Project added successfully');
      openModalFun(false);
      reload();
    } catch (error) {
      console.error('Failed to add project:', error);
      message.error('Failed to add project');
    }
  };
  
  

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="name"
        label="Project Name"
        rules={[{ required: true, message: 'Please enter project name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="company"
        label="Company"
        rules={[{ required: true, message: 'Please enter company name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        rules={[{ required: true, message: 'Please enter location' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="noSecurity"
        label="No Security"
        rules={[{ required: true, message: 'Please enter security information' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="attachments"
        label="Attachments"
        valuePropName="fileList"
        getValueFromEvent={({ fileList }) => fileList}
      >
        <Upload
          beforeUpload={() => false} // Prevent auto upload
          listType="text"
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
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

export default NewProjectForm;