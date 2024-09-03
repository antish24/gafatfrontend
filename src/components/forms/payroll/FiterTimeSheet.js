import {Button, Form, Input, Select} from 'antd';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {AlertContext} from '../../../context/AlertContext';
import {BACKENDURL} from '../../../helper/Urls';

const FiterTimeSheet = ({openModalFun, reload}) => {
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);
  const [form] = Form.useForm ();

  const onFinish = async values => {
    setLoading (true);
    try {
      const res = await axios.post (`${BACKENDURL}/users/new`, {
        email: values.email,
        phone: values.phone,
        gender: values.sex,
        fullname: values.fullName,
        access: values.access,
      });
      reload ();
      setLoading (false);
      openModalFun (false);
      openNotification ('success', res.data.message, 3, 'green');
      form.resetFields ();
    } catch (error) {
      setLoading (false);
      openNotification ('error', error.response.data.message, 3, 'red');
    }
  };
  const onFinishFailed = errorInfo => {
    console.log ('Failed:', errorInfo);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      style={{display: 'flex'}}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        style={{margin: '5px', width: '200px'}}
        rules={[
          {
            required: true,
            message: 'Select Month',
          },
        ]}
        name="selectMonth"
      >
        <Select
          placeholder="Select Month"
          options={[
            {
              value: 'Jun',
              label: 'Jun',
            },
            {
              value: 'Jul',
              label: 'Jul',
            },
            {
              value: 'Aug',
              label: 'Aug',
            },
            {
              value: 'Sept',
              label: 'Sept',
            },
          ]}
        />
      </Form.Item>

      <Form.Item
        name="site"
        style={{margin: '5px', width: '200px'}}
        rules={[
          {
            required: true,
            message: 'Select Site',
          },
        ]}
      >
        <Select
          placeholder="Select Site"
          options={[
            {
              value: 'Addis Abeba',
              label: 'Addis Abeba',
            },
            {
              value: 'Gonder',
              label: 'Gonder',
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        style={{margin: '5px', width: '200px'}}
        name="type"
        rules={[
          {
            required: true,
            message: 'Select Type',
          },
        ]}
      >
        <Select
          placeholder="Select Type"
          options={[
            {
              value: 'Permanent',
              label: 'Permanent',
            },
            {
              value: 'Temporary',
              label: 'Temporary',
            },
          ]}
        />
      </Form.Item>

      <Form.Item style={{margin: '5px'}}>
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          Filter
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FiterTimeSheet;
