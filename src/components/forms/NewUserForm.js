import {Button, Form, Input, Select} from 'antd';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import { AlertContext } from '../../context/AlertContext';
import { BACKENDURL } from '../../helper/Urls';

const NewUserForm = ({openModalFun,reload}) => {
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);
  const [form] = Form.useForm();

  const onFinish = async values => {
    setLoading (true);
    try {
      const res = await axios.post (`${BACKENDURL}/users/new`,{
        email: values.email,
        phone: values.phone,
        gender: values.sex,
        fullname: values.fullName,
        access: values.access,
      });
      reload()
      setLoading (false);
      openModalFun(false)
      openNotification ('success', res.data.message, 3, 'green');
      form.resetFields()
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
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        style={{margin: '5px'}}
        label="Full Name"
        rules={[
          {
            required: true,
            message: 'Please input Name',
          },
        ]}
        name="fullName"
      >
        <Input />
      </Form.Item>

      <div style={{display: 'flex', justifyContent: 'space-between'}}>

      <Form.Item
          style={{margin: '5px', width: '48%'}}
          label="Gender"
          name="sex"
          rules={[
            {
              required: true,
              message: 'Please input Gender',
            },
          ]}
        >
          <Select
            placeholder="Search to Select"
            options={[
              {
                value: 'Male',
                label: 'Male',
              },
              {
                value: 'Female',
                label: 'Female',
              },
            ]}
          />
        </Form.Item>
        
        <Form.Item
          style={{margin: '5px', width: '48%'}}
          label="Access"
          rules={[
            {
              required: true,
              message: 'Please input Access',
            },
          ]}
          name="access"
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[
              {
                value: 'R',
                label: 'Read',
              },
              {
                value: 'RW',
                label: 'Read Write',
              },
              {
                value: 'FULL',
                label: 'Full Access',
              },
            ]}
          />
        </Form.Item>
      </div>
      <Form.Item style={{margin:'5px'}}
        label="Phone"
        name="phone" 
        rules={[
          {
            required: true,
            message: 'Please input phone number',
          },
          {
            min: 10,
            message: 'Phone number must be 10 digits', 
          },
          {
            max: 10, 
            message: 'Phone number must be 10 digits'
          },
          {
            pattern: new RegExp('^\\d+$'),
            message: 'Phone number must contain only digits'
          }
        ]} 
      >
        <Input type='number'/>
      </Form.Item>


      <Form.Item
        style={{margin: '5px'}}
        rules={[
          {
            required: true,
            type:'email',
            message: 'Please input your email!',
          },
        ]}
        label="Email"
        name="email"
      >
        <Input />
      </Form.Item>
      <Form.Item
        style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}
      >
        <Button
          type="primary"
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewUserForm;
