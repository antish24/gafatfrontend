import React, { useState } from 'react';
import { Table, Spin, Button, Space, Select, message, Modal, Form, Input, DatePicker } from 'antd';
import axios from 'axios';
import { BACKENDURL } from '../../../helper/Urls';
import { useNavigate } from 'react-router-dom'; 

const { Option } = Select;
const { TextArea } = Input;

const TenderTable = ({ datas, loading, reload }) => {
  const [status, setStatus] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTender, setCurrentTender] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const initialStatus = {};
    datas.forEach((data) => {
      initialStatus[data.id] = data.status || 'Pending';
    });
    setStatus(initialStatus);
  }, [datas]);

  const getStatus = (id) => {
    return status[id] || 'Pending';
  };

  const handleStatusChange = (id, value) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [id]: value,
    }));
  };

  const handleUpdateStatus = async (id) => {
    const newStatus = status[id] || 'Pending';
    try {
      await axios.patch(`${BACKENDURL}/tender/tender/${id}`, { status: newStatus });
      message.success('Status updated successfully');
      reload();
    } catch (error) {
      message.error('Failed to update status');
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  };

  const showEditModal = (tender) => {
    setCurrentTender(tender);
    setIsModalVisible(true);
  };

  const handleEditSubmit = async (values) => {
    try {
      const updatedValues = {
        ...values,
        deadline: values.deadline ? values.deadline.format('YYYY-MM-DD') : null,
        startingDate: values.startingDate ? values.startingDate.format('YYYY-MM-DD') : null,
      };

      await axios.put(`${BACKENDURL}/tender/${currentTender.id}`, updatedValues);
      message.success('Tender updated successfully');
      setIsModalVisible(false);
      reload();
    } catch (error) {
      message.error('Failed to update tender');
      console.error('Error details:', error.response ? error.response.data : error.message);
    }
  };
  // Navigate to NewProjectForm with company ID
  const handleGoToNewProjectForm = () => {
    navigate(`../project/company`); // Change here
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (text) => text,
    },
    {
      title: 'Starting Date',
      dataIndex: 'startingDate',
      key: 'startingDate',
      render: (text) => text,
    },
    {
      title: 'Budget Per Employee',
      dataIndex: 'budget',
      key: 'budget',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    
    {
      title: 'Attachments',
      dataIndex: 'attachments',
      key: 'attachments',
      render: (attachments) => (
        <div>
          {attachments && attachments.length > 0 ? (
            attachments.split(',').map((attachment, index) => (
              <a key={index} href={attachment} target="_blank" rel="noopener noreferrer">
                Attachment {index + 1}
              </a>
            ))
          ) : (
            <span>No attachments</span>
          )}
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Select
          value={getStatus(record.id)}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 120 }}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Success">Success</Option>
          <Option value="Failed">Failed</Option>
        </Select>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => showEditModal(record)}>Edit</Button>
          <Button
            type="primary"
            onClick={() => handleUpdateStatus(record.id)}
          >
            Update Status
          </Button>

          <Button 
            type="default" 
            onClick={() => handleGoToNewProjectForm()}
            style={{ marginLeft: 8 }}
          >
            New Company
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Table dataSource={datas} columns={columns} rowKey="id" />
          <Modal
            title="Edit Tender"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
          >
            <Form
              initialValues={{
                ...currentTender,
                deadline: currentTender ? currentTender.deadline : null,
                startingDate: currentTender ? currentTender.startingDate: null,
              }}
              onFinish={handleEditSubmit}
            >
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please input the title!' }]}
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
                name="deadline"
                label="Deadline"
                rules={[{ required: true, message: 'Please select the deadline!' }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Form.Item>
              <Form.Item
                name="startingDate"
                label="Starting Date"
                rules={[{ required: true, message: 'Please select the starting date!' }]}
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
                label="Budget per Employee"
                rules={[{ required: true, message: 'Please input the budget!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="attachments"
                label="Attachments"
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
        </>
      )}
    </div>
  );
};

export default TenderTable;