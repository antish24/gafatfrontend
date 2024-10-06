import {Button, DatePicker, Form, Input, Select} from 'antd';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {AlertContext} from '../../../context/AlertContext';
import {BACKENDURL} from '../../../helper/Urls';
import TextArea from 'antd/es/input/TextArea';

const NewUserForm = ({openModalFun, reload}) => {
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);
  const [form] = Form.useForm ();

  const [employeeData, setemployeeData] = useState ([]);
  const [employeeId, setemployeeId] = useState ('');
  const [loadingEmployee, setloadingEmployee] = useState (false);

  const getemployeeData = async () => {
    setloadingEmployee (true);
    try {
      const res = await axios.get (`${BACKENDURL}/employee/names`);
      setloadingEmployee (false);
      setemployeeData (res.data.employees);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setloadingEmployee (false);
    }
  };

  const employeeOptions = employeeData.length
  ? employeeData.map(emp => ({
    value: emp.empId,
    label: emp.IDNO +"-"+emp.fName+" "+emp.mName+" "+(emp.lName?emp.lName:"") 
  }))
  : [];

  useEffect(() => {
    getemployeeData ();
  }, []);

  const onFinish = async values => {
    setLoading (true);
    try {
      const res = await axios.post (`${BACKENDURL}/user/new`, {
        userName: values.userName,
        email: values.email,
        access: values.access,
        employee: values.employee
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
      onFinishFailed={onFinishFailed}
    >

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Form.Item
          style={{margin: '5px 0', width: '40%'}}
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input Username',
            },
          ]}
          name="userName"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          style={{margin: '5px 0', width: '59%'}}
          label="Email"
          rules={[
            {
              required: true,
              type:'email',
              message: 'Please input Email!',
            },
          ]}
          name="email"
        >
          <Input/>
        </Form.Item>

        <Form.Item
          style={{margin: '5px 0', width: '100%'}}
          label="Tasks"
          rules={[
            {
              required: true,
              message: 'Please input Tasks',
            },
          ]}
          name="tasks"
        >
          <Select
            showSearch
            mode='multiple'
            maxTagCount='responsive'
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[
              {
                value: 'Employee',
                label: 'Employee',
              },
              {
                value: 'Vacancy',
                label: 'Vacancy',
              },
              {
                value: 'Organzation',
                label: 'Organzation',
              },
              {
                value: 'Project',
                label: 'Project',
              },
              {
                value: 'Leave',
                label: 'leave',
              },
              {
                value: 'Asset',
                label: 'Asset',
              },
              {
                value: 'Attendance',
                label: 'Attendance',
              },
              {
                value: 'Payroll',
                label: 'Payroll',
              },
              {
                value: 'Daily Report',
                label: 'Daily Report',
              },
              {
                value: 'Doc',
                label: 'Doc',
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          style={{margin: '5px 0', width: '49%'}}
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
        
        <Form.Item
          style={{margin: '5px 0', width: '49%'}}
          label="Effective Till"
          rules={[
            {
              required: true,
              message: 'Please input Effective Till',
            },
          ]}
          name="effectiveTill"
        >
          <DatePicker style={{width:'100%'}}/>
        </Form.Item>

        <Form.Item
          style={{margin: '5px 0', width: '100%'}}
          label="Link to Employee"
          name="employee"
        >
          <Select
            placeholder="Search to Select"
            onChange={(e)=>setemployeeId(e)}
            options={employeeOptions}
            loading={loadingEmployee}
            disabled={loadingEmployee}
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

export default NewUserForm;