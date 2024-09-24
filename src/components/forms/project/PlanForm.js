import React, {useEffect, useState} from 'react';
import {Form, Input, Button, message, Upload, Select} from 'antd';
import axios from 'axios';
import {BACKENDURL} from '../../../helper/Urls';
import Dragger from 'antd/es/upload/Dragger';
import {FaUpload} from 'react-icons/fa';

const NewPlanForm = ({reload, openModalFun}) => {
  const [form] = Form.useForm ();
  const [companies, setCompanies] = useState ([]);
  const [companiesLoading, setCompaniesLoading] = useState (false);
  const [newLoading, setNewLoading] = useState (false);

  useEffect (() => {
    const fetchCompanies = async () => {
      setCompaniesLoading (true);
      try {
        const response = await axios.get (`${BACKENDURL}/plan/companies`);
        console.log ('Companies fetched:', response.data); // Debugging line
        setCompaniesLoading (false);
        setCompanies (response.data);
      } catch (error) {
        console.error ('Error fetching companies:', error); // Debugging line
        setCompaniesLoading (false);
        message.error ('Failed to fetch companies');
      }
    };

    fetchCompanies ();
  }, []);

  const handleSubmit = async values => {
    setNewLoading (true);
    try {
      await axios.post (`${BACKENDURL}/plan/plan/add`, {
        site: values.site,
        noSecurity: values.securityNo,
        price: values.pricePerSecurity,
        attachments: values.attachments.name,
        companyId: values.companyId,
      });
      message.success ('Plan added successfully');
      setNewLoading (false);
      openModalFun (false);
      reload ();
    } catch (error) {
      setNewLoading (false);
      console.error ('Failed to add plan:', error);
      message.error ('Failed to add plan');
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="companyId"
        label="Company"
        rules={[{required: true, message: 'Please select a company'}]}
      >
        <Select disabled={companiesLoading} loading={companiesLoading} placeholder="Select a company">
          {companies.map (company => (
            <Select.Option key={company.id} value={company.id}>
              {company.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="site"
        label="Site Name"
        rules={[{required: true, message: 'Please enter site name'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="securityNo"
        label="Employee No"
        rules={[{required: true, message: 'Please enter security number'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="pricePerSecurity"
        label="Price per Security"
        rules={[{required: true, message: 'Please enter price per security'}]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item name="attachments" label="Attachments">
        <Dragger multiple={false} maxCount={1}>
          <p className="ant-upload-drag-icon">
            <FaUpload />
          </p>

          <p className="ant-upload-hint">
            Support for a single
            {' '}
            file. Max size 3MB.
          </p>
        </Dragger>
      </Form.Item>
      <Form.Item>
        <Button disabled={newLoading} loading={newLoading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewPlanForm;
