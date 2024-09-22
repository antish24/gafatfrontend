import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Input, InputNumber } from 'antd';
import axios from 'axios';
import { BACKENDURL } from '../../../helper/Urls';

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [form] = Form.useForm();
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  // Fetch all inventory data
  const fetchInventoryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKENDURL}/inventory/all`);
      setInventoryData(response.data.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to load inventory data');
      setLoading(false);
    }
  };

  // Fetch inventory data based on search term
  const fetchInventoryByName = async (name) => {
    setLoading(true);
    console.log('search')
    try {
      const response = await axios.get(`${BACKENDURL}/inventory/searchinv`, {
        params: { search: name },
      });
      setInventoryData(response.data.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to search inventory');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData(); // Initial fetch for all inventory
  }, []);

  // Handle edit button click
  const editInventory = (record) => {
    setCurrentItem(record);
    form.setFieldsValue({
      name: record.name,
      quantity: record.quantity,
      price: record.price,
      description: record.description,
    });
    setEditModalVisible(true);
  };

  // Handle form submission for editing
  const handleEditSubmit = async (values) => {
    try {
      await axios.put(`${BACKENDURL}/inventory/edit/${currentItem.id}`, values);
      message.success('Inventory item updated successfully!');
      setInventoryData((prevData) =>
        prevData.map((item) =>
          item.id === currentItem.id ? { ...item, ...values } : item
        )
      );
      setEditModalVisible(false);
    } catch (error) {
      message.error('Failed to update inventory item');
    }
  };

  // Handle search input change
 // Handle search input change
const handleSearchChange = (e) => {
  const value = e.target.value;
  setSearchTerm(value);
  
  if (value.trim()) {
    console.log('hhhhhh')
    fetchInventoryByName(value.trim()); // Fetch inventory by name
  } else {
    console.log('yyyyyy')
    fetchInventoryData(); // If search input is cleared, fetch all inventory
  }
};


  // Define table columns
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
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button onClick={() => editInventory(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      {/* <Input
        placeholder="Search Inventory by Name"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: 16 }}
      /> */}
      <Table
        dataSource={inventoryData}
        columns={columns}
        loading={loading}
        rowKey="id"
      />
      <Modal
        title="Edit Inventory Item"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
          initialValues={currentItem}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please input the quantity!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the price!' }]}
          >
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
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

export default InventoryTable;