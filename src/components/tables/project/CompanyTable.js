import React, { useState, useEffect } from 'react';
import { Table, Button, Spin, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import { BACKENDURL } from '../../../helper/Urls';

const CompanyTable = () => {
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [form] = Form.useForm();

  // Fetch company data from the server
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`${BACKENDURL}/company/all`);
        setCompanyData(response.data);
      } catch (error) {
        message.error('Failed to fetch company data');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  // Handle edit button click
  const handleEdit = (record) => {
    setCurrentItem(record);
    form.setFieldsValue(record); // Populate the form with existing company data
    setEditModalVisible(true);
  };

  // Handle update company form submission
  const handleUpdateCompany = async (values) => {
    try {
      await axios.put(`${BACKENDURL}/company/${currentItem.id}`, values); // Send PUT request to update
      message.success('Company updated successfully');
      setEditModalVisible(false);
      // Refresh the data
      const response = await axios.get(`${BACKENDURL}/company/all`);
      setCompanyData(response.data);
    } catch (error) {
      message.error('Failed to update company');
    }
  };

  // Table columns definition
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'TIN',
      dataIndex: 'tin',
      key: 'tin',
    },
    {
      title: 'VAT',
      dataIndex: 'vat',
      key: 'vat',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Subcity',
      dataIndex: 'subcity',
      key: 'subcity',
    },
    {
      title: 'Woreda',
      dataIndex: 'woreda',
      key: 'woreda',
    },
    {
      title: 'House Number',
      dataIndex: 'houseNo',
      key: 'houseNo',
    },
    {
      title: 'License',
      dataIndex: 'license',
      key: 'license',
      render: (license) => license ? <a href={`${BACKENDURL}/uploads/${license}`}>View License</a> : 'No License',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={companyData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}

      <Modal
        title="Edit Company"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpdateCompany}
          initialValues={currentItem}
        >
          <Form.Item
            name="name"
            label="Company Name"
            rules={[{ required: true, message: 'Please enter company name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="tin"
            label="TIN"
            rules={[{ required: true, message: 'Please enter TIN' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="vat"
            label="VAT"
            rules={[{ required: true, message: 'Please enter VAT' }]}
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
            name="city"
            label="City"
            rules={[{ required: true, message: 'Please enter city' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subcity"
            label="Subcity"
            rules={[{ required: true, message: 'Please enter subcity' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="woreda"
            label="Woreda"
            rules={[{ required: true, message: 'Please enter woreda' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="houseNo"
            label="House Number"
            rules={[{ required: true, message: 'Please enter house number' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompanyTable;