import React, { useState } from 'react';
import { Form, Input, DatePicker, TimePicker, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BACKENDURL } from '../../../helper/Urls';

const { TextArea } = Input;
const { Option } = Select;

const NewReportForm = ({ reload, openModalFun }) => {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]); // Local state for uploaded files

    const handleFinish = async (values) => {
        setLoading(true);

        const formData = new FormData();
        formData.append('userId', values.userId);
        formData.append('date', values.date.format('YYYY-MM-DD'));
        formData.append('shiftTime', `${values.shift[0].format('HH:mm')} - ${values.shift[1].format('HH:mm')}`);
        formData.append('location', values.location);
        formData.append('report', values.report);
        formData.append('description', values.description); // Add description to form data
        formData.append('reportMeasurement', values.reportMeasurement); // Add report measurement to form data
        formData.append('status', 'Pending'); // Default status
        formData.append('attachments', 'default-path'); // Just to match your existing schema

        try {
            await axios.post(`${BACKENDURL}/reports/reports`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            message.success('Report submitted successfully!');
            reload();
            openModalFun(false);
        } catch (error) {
            message.error('Failed to submit the report.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onFinish={handleFinish}>
            <Form.Item name="userId" label="User ID" rules={[{ required: true, message: 'Please input User ID!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date!' }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item name="shift" label="Shift" rules={[{ required: true, message: 'Please select a shift!' }]}>
                <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
            <Form.Item name="location" label="Location" rules={[{ required: true, message: 'Please input location!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="report" label="Report" rules={[{ required: true, message: 'Please input report!' }]}>
                <TextArea />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input a description!' }]}>
                <TextArea />
            </Form.Item>
            <Form.Item name="reportMeasurement" label="Report Measurement" rules={[{ required: true, message: 'Please select report measurement!' }]}>
                <Select placeholder="Select measurement">
                    <Option value="High">High</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="Low">Low</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Attachments">
                <Upload
                    beforeUpload={(file) => {
                        setFileList((current) => [...current, file]); // Add file to local state
                        return false; // Prevent automatic upload
                    }}
                    onRemove={(file) => {
                        setFileList((current) => current.filter(item => item.uid !== file.uid)); // Remove file from local state
                    }}
                    fileList={fileList} // Controlled fileList
                >
                    <Button icon={<UploadOutlined />}>Upload Files</Button>
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default NewReportForm;