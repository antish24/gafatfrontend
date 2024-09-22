import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message, Upload, Select } from 'antd';
import axios from 'axios';
import { BACKENDURL } from '../../../helper/Urls';
import { UploadOutlined } from '@ant-design/icons';

const NewPlanForm = ({ reload, openModalFun }) => {
  const [form] = Form.useForm();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/plan/companies`);
        console.log('Companies fetched:', response.data); // Debugging line
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error); // Debugging line
        message.error('Failed to fetch companies');
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'attachments' && values[key]) {
          // Ensure values[key] is defined and is an array
          values[key].fileList?.forEach((file) => {
            formData.append('attachments', file.originFileObj);
          });
        } else {
          formData.append(key, values[key]);
        }
      });
  
      await axios.post(`${BACKENDURL}/plan/plan/add`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      message.success('Plan added successfully');
      openModalFun(false);
      reload();
    } catch (error) {
      console.error('Failed to add plan:', error);
      message.error('Failed to add plan');
    }
  };
  

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="companyId"
        label="Company"
        rules={[{ required: true, message: 'Please select a company' }]}
      >
        <Select placeholder="Select a company">
          {companies.map(company => (
            <Select.Option key={company.id} value={company.id}>
              {company.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="securityNo"
        label="Security No"
        rules={[{ required: true, message: 'Please enter security number' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="pricePerSecurity"
        label="Price per Security"
        rules={[{ required: true, message: 'Please enter price per security' }]}
      >
        <Input type="number" />
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

export default NewPlanForm;