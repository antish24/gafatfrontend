import React, { useState } from 'react';
import { Form, Input, Button, message, DatePicker, Upload, Input as AntdInput } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BACKENDURL } from '../../../helper/Urls'; // Adjust the URL as needed

const { TextArea } = Input;

const NewTenderForm = ({ reload, openModalFun }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    try {
      const formattedValues = {
        ...values,
        deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : '',
        startingDate: values.startingDate ? values.startingDate.format('YYYY-MM-DD') : '',
        status: values.status || 'Pending',
        attachments: fileList.map(file => file.response?.url || file.url).join(','),
      };
      await axios.post(`${BACKENDURL}/tender/create`, formattedValues);
      message.success('Tender added successfully');
      form.resetFields();
      setFileList([]);
      reload();
      openModalFun(false);
    } catch (error) {
      message.error('Failed to add tender');
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  };

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    setFileList(info.fileList);
  };

  return (
    <Form
    form={form}
    layout="vertical"
    onFinish={onFinish}
    initialValues={{
      title: '',
      description: '',
      deadline: null,
      budget: '',
      status: 'Pending',
      attachments: [],
      companyName: '',
      startingDate: null,
    }}
  >
      <Form.Item
        name="title"
        label="Tender Title"
        rules={[{ required: true, message: 'Please input the tender title!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="startingDate"
        label="Starting Date"
        rules={[{ required: true, message: 'Please select the starting date!' }]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>


      <Form.Item
        name="deadline"
        label="Deadline"
        rules={[{ required: true, message: 'Please select the deadline!' }]}
      >
        <DatePicker format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item
        name="companyName"
        label="Company Name"
        rules={[{ required: true, message: 'Please input the company name!' }]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="budget"
        label="Budget Per Employee"
        rules={[{ required: true, message: 'Please input the budget!' }]}
      >
        <AntdInput type="number" />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
      >
        <Input defaultValue="Pending" />
      </Form.Item>

      <Form.Item
        name="attachments"
        label="Attachments"
        valuePropName="fileList"
        getValueFromEvent={(e) => e.fileList.map(file => file.response?.url || file.url)}
      >
        <Upload
          action={`${BACKENDURL}/upload`} // Endpoint for uploading files
          listType="picture"
          onChange={handleFileChange}
          multiple
          fileList={fileList} // Set the default file list
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

export default NewTenderForm;