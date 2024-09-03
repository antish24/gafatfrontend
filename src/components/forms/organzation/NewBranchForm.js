import {Button, Form, Input, Select} from 'antd';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import { AlertContext } from '../../../context/AlertContext';
import { BACKENDURL } from '../../../helper/Urls';

const NewBranchForm = ({openModalFun,reload}) => {
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
        label="Branch Name"
        rules={[
          {
            required: true,
            message: 'Please input Name',
          },
        ]}
        name="name"
      >
        <Input />
      </Form.Item>

      <div style={{display: 'flex', justifyContent: 'space-between',flexWrap:'wrap'}}>

      <Form.Item
          style={{margin: '5px', width: '47%'}}
          label="City"
          name="city"
          rules={[
            {
              required: true,
              message: 'Please input City',
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
          style={{margin: '5px', width: '47%'}}
          label="Sub City / Zone"
          rules={[
            {
              required: true,
              message: 'Please input Sub City',
            },
          ]}
          name="subCity"
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

        <Form.Item
          style={{margin: '5px', width: '47%'}}
          label="Wereda"
          rules={[
            {
              required: true,
              message: 'Please input wereda',
            },
          ]}
          name="wereda"
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

export default NewBranchForm;