import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Upload, message, Space } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { BACKENDURL } from '../../../helper/Urls';
import { UploadOutlined } from '@ant-design/icons';
import { FormatDay } from '../../../helper/FormateDay';

const ProjectTable = ({ loading, datas, setProjectData }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Hook for navigation
console.log(datas)
  // Handle edit button click
  const handleEdit = (record) => {
    setCurrentItem(record);
    form.setFieldsValue({
      ...record,
      attachments: [] // Reset attachments field for editing
    });
    setEditModalVisible(true);
  };

  // Handle "Details" button click
  const handleDetails = (record) => {
    navigate(`/project/list/${record.id}`); // Navigate to the project details page
  };

  // Handle update project form submission
  const handleUpdateProject = async (values) => {
    try {
      // Create a FormData object
      const formData = new FormData();
      
      // Append fields to FormData
      Object.keys(values).forEach(key => {
        if (key === 'attachments' && values[key]) {
          // Ensure `fileList` exists and is an array
          const fileList = values[key]?.fileList || [];
          fileList.forEach(file => {
            if (file.originFileObj) {
              formData.append('attachments', file.originFileObj);
            }
          });
        } else {
          formData.append(key, values[key]);
        }
      });
  
      // Make the PUT request
      await axios.put(`${BACKENDURL}/project/edit/${currentItem.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      message.success('Project updated successfully');
      setEditModalVisible(false);
      
      // Fetch new data and update state
      const response = await axios.get(`${BACKENDURL}/project/all`);
      setProjectData(response.data || response.data.data);
    } catch (error) {
      message.error('Failed to update project');
      console.error('Update Error:', error);
    }
  };
  

  const columns = [
    {
      title: 'Site',
      dataIndex: 'site',
      key: 'site',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render:r=>r?r.name:''
    },
    {
      title: 'Number of Security',
      dataIndex: 'noSecurity',
      key: 'noSecurity',
    },
    {
      title: 'From',
      dataIndex: 'startDate',
      key: 'startDate',
      render:r=>FormatDay(r)
    },
    {
      title: 'To',
      dataIndex: 'endDate',
      key: 'endDate',
      render:r=>FormatDay(r)
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="primary" onClick={() => handleDetails(record)}>
            Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={datas}
        loading={loading}
        rowKey="id"
        scroll={{
          x: 500,
        }}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title="Edit Project"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateProject}
          initialValues={currentItem}
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
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProjectTable;