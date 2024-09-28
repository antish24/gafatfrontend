import React, { useEffect, useState } from 'react';
import { Table, Button, message, Modal, Form, InputNumber, Select, Input } from 'antd';
import axios from 'axios';
import { BACKENDURL } from '../../../helper/Urls';

const { Option } = Select;

const RequestTable = ({ loading, requestData = [], reload = () => {} }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [form] = Form.useForm();
  const [returnForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(requestData);

  useEffect(() => {
    setFilteredData(requestData);
  }, [requestData]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BACKENDURL}/request/allemp`, {
        params: { employeeName: searchText },
      });
      setFilteredData(response.data);
    } catch (error) {
      message.error('Failed to search requests');
      console.error('Search error:', error);
    }
  };

  const editRequest = (record) => {
    setCurrentItem(record);
    form.setFieldsValue({
      inventoryId: record.inventory.id,
      employeeId: record.employee.id,
      quantity: record.quantity,
    });
    setEditModalOpen(true);
  };


  const handleEditSubmit = async (values) => {
    try {
      await axios.put(`${BACKENDURL}/request/edit/${currentItem.id}`, values);
      message.success('Request item updated successfully!');
      reload();
      setEditModalOpen(false);
    } catch (error) {
      message.error('Failed to update request item');
      console.error('Edit error:', error);
    }
  };

  const deleteRequest = async (record) => {
    try {
      await axios.delete(`${BACKENDURL}/request/delete/${record.id}`);
      message.success('Request item deleted successfully!');
      reload();
    } catch (error) {
      message.error('Failed to delete request item');
      console.error('Delete error:', error);
    }
  };

  const handleReturnSubmit = async (values) => {
    try {
        await axios.post(`${BACKENDURL}/request/return`, {
            inventoryId: currentItem.inventory.id,
            quantity: values.quantity,employeeId:currentItem.employee.id,
            requestId: currentItem.id, // Include requestId in the request
        });

        // Update local request data after return
        const updatedRequestData = requestData.map((request) => {
            if (request.id === currentItem.id) {
                return {
                    ...request,
                    quantity: request.quantity - values.quantity, // Decrease the returned quantity from the request
                };
            }
            return request;
        });

        // Set the updated request data to state
        reload(updatedRequestData); // Update displayed data

        message.success('Item returned successfully!');
        setReturnModalOpen(false);
        returnForm.resetFields();
    } catch (error) {
        message.error('Failed to return item');
        console.error('Return error:', error);
    }
};

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Inventory',
      dataIndex: 'inventory',
      key: 'inventory',
      render: (inventory) => (inventory ? inventory.name : 'Unknown'),
    },
    {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
      render: (employee) => (employee ? `${employee.fName} ${employee.lName}` : 'Unknown'),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button onClick={() => editRequest(record)}>Edit</Button>
          <Button onClick={() => deleteRequest(record)} danger style={{ marginLeft: '10px' }}>Delete</Button>
          <Button onClick={() => {
            setCurrentItem(record);
            setReturnModalOpen(true);
          }} style={{ marginLeft: '10px' }}>Return</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Input
        placeholder="Search by Employee Name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onPressEnter={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table
        dataSource={filteredData}
        columns={columns}
        loading={loading}
        rowKey="id"
      />

      {/* Edit Request Modal */}
      <Modal
        title="Edit Request Item"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEditSubmit}
          initialValues={currentItem}
        >
          <Form.Item
            name="inventoryId"
            label="Inventory"
            rules={[{ required: true, message: 'Please select the inventory!' }]}
          >
            <Select placeholder="Select Inventory">
              {requestData.map((request) => (
                <Option key={request.inventory.id} value={request.inventory.id}>
                  {request.inventory.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="employeeId"
            label="Employee"
            rules={[{ required: true, message: 'Please select the employee!' }]}
          >
            <Select placeholder="Select Employee">
              {requestData.map((request) => (
                <Option key={request.employee.id} value={request.employee.id}>
                  {request.employee.fName} {request.employee.lName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{ required: true, message: 'Please input the quantity!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Return Item Modal */}
      <Modal
        title="Return Item"
        open={returnModalOpen}
        onCancel={() => setReturnModalOpen(false)}
        footer={null}
      >
        <Form
          form={returnForm}
          layout="vertical"
          onFinish={handleReturnSubmit}
        >
          <Form.Item
            name="quantity"
            label="Quantity to Return"
            rules={[{ required: true, message: 'Please input the quantity to return!' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Return
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RequestTable;