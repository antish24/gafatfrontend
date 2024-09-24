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
    setEditModalVisible(true);
    form.setFieldsValue({
      ...record,
      city: record?.companyAddress?.city,
      subcity: record?.companyAddress?.subCity,
      woreda: record?.companyAddress?.wereda,
      kebele: record?.companyAddress?.kebele,
      houseNo: record?.companyAddress?.houseNo,
    });
  };

  // Handle update company form submission
  const handleUpdateCompany = async (values) => {
    try {
      const { name, tin, vat, phone, email, city, subcity, wereda, kebele, houseNo } = values;

      // Prepare the updated company data
      const companyData = {
        name,
        TIN: tin,
        VAT: vat,
        phone,
        email,
      };

      // Prepare the updated address data
      const companyAddressData = {
        city,
        subCity: subcity,
        wereda,
        kebele,
        houseNo,
      };

      // Send PUT request to update both company and address
      await axios.put(`${BACKENDURL}/company/${currentItem.id}`, {
        company: companyData,
        address: companyAddressData,
      });

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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'TIN',
      dataIndex: 'TIN',
      key: 'TIN',
    },
    {
      title: 'VAT',
      dataIndex: 'VAT',
      key: 'VAT',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'City',
      key: 'companyAddress',
      render: (_, record) => record.companyAddress ? record.companyAddress.city : 'N/A',
    },
    {
      title: 'Subcity',
      key: 'companyAddress',
      render: (_, record) => record.companyAddress ? record.companyAddress.subCity : 'N/A',
    },
    {
      title: 'Woreda',
      key: 'companyAddress',
      render: (_, record) => record.companyAddress ? record.companyAddress.wereda : 'N/A',
    },
    {
      title: 'Kebele',
      key: 'companyAddress',
      render: (_, record) => record.companyAddress ? record.companyAddress.kebele : 'N/A',
    },
    {
      title: 'House Number',
      key: 'companyAddress',
      render: (_, record) => record.companyAddress ? record.companyAddress.houseNo : 'N/A',
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
          scroll={{
            x: 500,
          }}
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
          <Form.Item name="name" label="Company Name">
            <Input />
          </Form.Item>
          <Form.Item name="TIN" label="TIN">
            <Input />
          </Form.Item>
          <Form.Item name="VAT" label="VAT">
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input />
          </Form.Item>
          <Form.Item name="subcity" label="Subcity">
            <Input />
          </Form.Item>
          <Form.Item name="wereda" label="Woreda">
            <Input />
          </Form.Item>
          <Form.Item name="kebele" label="Kebele">
            <Input />
          </Form.Item>
          <Form.Item name="houseNo" label="House Number">
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
