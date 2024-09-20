import {Button, DatePicker, Form, Input, Select} from 'antd';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {AlertContext} from '../../../../context/AlertContext';
import {BACKENDURL} from '../../../../helper/Urls';

const NewAssignSalaryStructureForm = ({openModalFun, reload}) => {
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);
  const [form] = Form.useForm ();

  const onFinish = async values => {
    setLoading (true);
    try {
      const res = await axios.post (`${BACKENDURL}/salary/assignment/new`, {
        employee: values.employee,
        structure: values.structure,
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

  const [SalaryComponentData, setSalaryComponentData] = useState ([]);
  const [loadingSalaryCom, setLoadingSalaryCom] = useState (false);
  const [employeesData, setEmployeeData] = useState ([]);
  const [loadingEmployee, setLoadingEmployee] = useState (false);
  const [assignmentMethod, setAssignmentMethod] = useState ('');

  const getSalaryComponentData = async () => {
    setLoadingSalaryCom (true);
    try {
      const res = await axios.get (`${BACKENDURL}/salary/structure/all`);
      setLoadingSalaryCom (false);
      setSalaryComponentData (res.data.all);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoadingSalaryCom (false);
    }
  };

  const salaryComponentOpt = SalaryComponentData.length
    ? SalaryComponentData.map (branch => ({
        value: branch.id,
        label: branch.name,
      }))
    : [];

  const getEmployeeData = async () => {
    setLoadingEmployee (true);
    try {
      const res = await axios.get (`${BACKENDURL}/employee/names`);
      setLoadingEmployee (false);
      setEmployeeData (res.data.employees);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setEmployeeData (false);
    }
  };

  const employeesOpt = employeesData.length
    ? employeesData.map (branch => ({
        value: branch.id,
        label: branch.IDNO +
          '-' +
          branch.fName +
          ' ' +
          branch.mName +
          ' ' +
          (branch.lName ? branch.lName : ''),
      }))
    : [];

  useEffect (() => {
    getSalaryComponentData ();
    getEmployeeData ();
  }, []);

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
          style={{margin: '5px', width: '47%'}}
          label="Branch"
          rules={[
            {
              required: true,
              message: 'Please input Branch',
            },
          ]}
          name="branch"
        >
          <Select
            placeholder="Search to Select"
            options={employeesOpt}
            loading={loadingEmployee}
            disabled={loadingEmployee}
          />
        </Form.Item>

        <Form.Item
          style={{margin: '5px', width: '47%'}}
          label="Department"
          rules={[
            {
              required: true,
              message: 'Please input Department',
            },
          ]}
          name="department"
        >
          <Select
            placeholder="Search to Select"
            options={employeesOpt}
            loading={loadingEmployee}
            disabled={loadingEmployee}
          />
        </Form.Item>

        <Form.Item
          style={{margin: '5px', width: '100%'}}
          label="Assignment Method"
          rules={[
            {
              required: true,
              message: 'Please input Method',
            },
          ]}
          name="assignmentMethod"
        >
          <Select
            placeholder="Search to Select"
            onChange={(e)=>setAssignmentMethod(e)}
            options={[
              {
                value: 'Position',
                label: 'By Position',
              },
              {
                value: 'Employee',
                label: 'By Employee',
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          style={{margin: '5px', width:assignmentMethod==='Position'?"100%":'35%'}}
          label="Position"
          rules={[
            {
              required: true,
              message: 'Please input Position',
            },
          ]}
          name="position"
        >
          <Select
            placeholder="Search to Select"
            options={employeesOpt}
            loading={loadingEmployee}
            disabled={loadingEmployee}
          />
        </Form.Item>

        <Form.Item
          style={{margin: '5px', width: '60%',display:assignmentMethod==='Position'&&'none'}}
          label="Employee"
          rules={[
            {
              required: true,
              message: 'Please input Name',
            },
          ]}
          name="employee"
        >
          <Select
            placeholder="Search to Select"
            mode='multiple'
            maxTagCount='responsive'
            options={employeesOpt}
            loading={loadingEmployee}
            disabled={loadingEmployee}
          />
        </Form.Item>

        <Form.Item
          style={{margin: '0', width: '100%'}}
          name="structure"
          label="Structure"
          rules={[{required: true, message: 'Structure'}]}
        >
          <Select
            placeholder="Search to Select"
            options={salaryComponentOpt}
            loading={loadingSalaryCom}
            disabled={loadingSalaryCom}
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
          Assign
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewAssignSalaryStructureForm;
