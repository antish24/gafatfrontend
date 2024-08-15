import {Button, Form, Input, Select} from 'antd';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import { AlertContext } from '../../context/AlertContext';
import { BACKENDURL } from '../../helper/Urls';

const UpdateUserForm = ({openModalFun,reload,id}) => {
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);
  const [form] = Form.useForm();

  const onFinish = async values => {
    setLoading (true);
    try {
      const res = await axios.post (`${BACKENDURL}/users/update`,{
        email: values.email,
        phone: values.phone,
        gender: values.sex,
        fullname: values.fullname,
        access: values.access,
      });
      reload()
      setLoading (false);
      openModalFun(false)
      openNotification ('success', res.data.message, 3, 'green');
      form.resetFields()
    } catch (error) {
      setLoading (false);
      console.log(error)
      openNotification ('error', error.response.data.message, 3, 'red');
    }
  };
  const onFinishFailed = errorInfo => {
    console.log ('Failed:', errorInfo);
  };

  const [userData,setUserData]=useState([])

  const getUserData=async()=>{
    try {
      const res = await axios.get(`${BACKENDURL}/users/detail?id=${id}`);
      setUserData(res.data.user)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
    }
  }

  useEffect(()=>{
    getUserData()

    return setUserData([])
  },[id])

  return (
    <div>
      {Object.keys(userData).length > 0 ? (
      <Form
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={userData}
      disabled={loading}
      autoComplete="on"
      autoFocus="true"
    >
      <div style={{display:'grid',gridTemplateColumns:'auto auto'}}>
      <Form.Item
        style={{margin: '5px'}}
        label="IDNO"
        name="IDNO"
      >
        <Input disabled/>
      </Form.Item>

      <Form.Item
        style={{margin: '5px'}}
        label="Email"
        name="email"
      >
        <Input disabled/>
      </Form.Item>

      <Form.Item
        style={{margin: '5px'}}
        label="fullname"
        rules={[
          {
            required: true,
            message: 'Please input fullname',
          },
        ]}
        name="fullname"
      >
        <Input />
      </Form.Item>

      <Form.Item
        style={{margin: '5px'}}
        label="Gender"
        name="gender"
        rules={[
          {
            required: true,
            message: 'Please input gender',
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
          style={{margin: '5px'}}
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
                value: 'Full',
                label: 'Full Access',
              },
            ]}
          />
        </Form.Item>
      <Form.Item
        style={{margin: '5px'}}
        label="Phone"
        rules={[
          {
            required: true,
            message: 'Please input Phone',
          },
        ]}
        name="phone"
      >
        <Input />
      </Form.Item>

      </div>
      <Form.Item
        style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}
      >
        <Button
          type="primary"
          style={{marginRight:'10px'}}
          htmlType="submit"
          disabled={loading}
          loading={loading}
        >
          Update
        </Button>
        <Button
          type='default'
          onClick={()=>openModalFun(false)}
        >
          Cancel
        </Button>
      </Form.Item>
    </Form>
    ) : (
      <p>Loading User data...</p>
    )}
    </div>
  );
};

export default UpdateUserForm;
