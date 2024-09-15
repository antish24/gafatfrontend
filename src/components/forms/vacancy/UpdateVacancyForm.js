import {Button, DatePicker, Form, Input, Select} from 'antd';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {AlertContext} from '../../../context/AlertContext';
import {BACKENDURL} from '../../../helper/Urls';
import TextArea from 'antd/es/input/TextArea';

const UpdateVancayForm = ({id,openModalFun, reload}) => {
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);
  const [form] = Form.useForm ();

  const onFinish = async values => {
    setLoading (true);
    try {
      const res = await axios.post (`${BACKENDURL}/vacancy/update`, {
        IDNO:id,
        title:values.title,
        position:values.position,
        vacancyType:values.vacancyType,
        employementType:values.employementType,
        interview:values.interview,
        gender:values.gender,
        location:values.location,
        sector:values.sector,
        experience:values.experience,
        deadline:values.deadline + "T00:00:00Z",
        vacancyNo:values.vacancyNo,
        salary:values.salary,
        description:values.description,
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

  const [vacancyData,setVacancyData]=useState([])

  const getVacancyData=async()=>{
    try {
      const res = await axios.get(`${BACKENDURL}/vacancy/detail?id=${id}`);
      setVacancyData(res.data.vacancy)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
    }
  }

  useEffect(()=>{
    getVacancyData()

    return setVacancyData([])
  },[id])


  const [interviewData, setInterviewData] = useState ([]);
  const [loadinginterview, setLoadinginterview] = useState (false);

  const getInterviewData = async (id) => {
    setLoadinginterview (true);
    try {
      const res = await axios.get (`${BACKENDURL}/interview/all`);
      setLoadinginterview (false);
      setInterviewData (res.data.interviews);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoadinginterview (false);
    }
  };

  const interviewOptions = interviewData.length
    ? interviewData.map (interview => ({
        value: interview.id,
        label: interview.title,
      }))
    : [];

  useEffect(() => {
    getInterviewData ();
  }, []);

  return (
    <div>
      {Object.keys(vacancyData).length > 0 ? (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
      initialValues={vacancyData}
      disabled={loading}
      autoComplete="on"
      autoFocus="true"
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
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please input Title',
            },
          ]}
          name="title"
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{margin: '5px', width: '47%'}}
          label="Position"
          rules={[
            {
              required: true,
              message: 'Please input Position',
            },
          ]}
          name="position"
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{margin: '5px', width: '47%'}}
          label="Vacancy Type"
          name="vacancyType"
          rules={[
            {
              required: true,
              message: 'Please input Type',
            },
          ]}
        >
          <Select
            placeholder="Search to Select"
            options={[
              {
                value: 'External',
                label: 'External',
              },
              {
                value: 'Internal',
                label: 'Internal',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          style={{margin: '5px', width: '47%'}}
          label="Employement Type"
          name="employementType"
          rules={[
            {
              required: true,
              message: 'Please input Type',
            },
          ]}
        >
          <Select
            placeholder="Search to Select"
            options={[
              {
                value: 'Full Time',
                label: 'Full Time',
              },
              {
                value: 'Remote',
                label: 'Remote',
              },
              {
                value: 'Contract',
                label: 'Contract',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          style={{margin: '5px', width: '40%'}}
          label="Interview"
          rules={[
            {
              required: true,
              message: 'Please input Interview',
            },
          ]}
          name="interview"
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={interviewOptions}
            loading={loadinginterview}
            disabled={loadinginterview}
          />
        </Form.Item>

        <Form.Item
          style={{margin: '5px', width: '20%'}}
          label="Gender"
          name="gender"
          rules={[
            {
              required: true,
              message: 'Please input Gender',
            },
          ]}
        >
          <Select
            placeholder="Select"
            options={[
              {
                value: 'Male',
                label: 'Male',
              },
              {
                value: 'Female',
                label: 'Female',
              },
              {
                value: 'Both',
                label: 'Both',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          style={{margin: '5px', width: '30%'}}
          label="Location"
          rules={[
            {
              required: true,
              message: 'Please input Location',
            },
          ]}
          name="location"
        >
          <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            // filterOption={(input, option) => (option?.label ?? '').includes(input)}
            // filterSort={(optionA, optionB) =>
            //   (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
            // }
            options={[
              {
                value: 'AA',
                label: 'Addis Abeba',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          style={{margin: '5px', width: '30%'}}
          label="Sector"
          rules={[
            {
              required: true,
              message: 'Please input Sector',
            },
          ]}
          name="sector"
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={{margin: '5px', width: '65%'}}
          label="Experience"
          name="experience"
          rules={[
            {
              required: true,
              message: 'Please input Experience',
            },
          ]}
        >
          <Select
            placeholder="Search to Select"
            options={[
              {
                value: 'Fresh',
                label: 'Fresh',
              },
              {
                value: '1-2 Years',
                label: '1-2 Years',
              },
              {
                value: '3-5 Years',
                label: '3-5 Years',
              },
              {
                value: '+5 Years',
                label: '+5 Years',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          style={{margin: '5px', width: '30%'}}
          label="Vacancy"
          name="vacancyNo"
          rules={[
            {
              required: true,
              message: 'Please input Vacancy',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          style={{margin: '5px', width: '30%'}}
          label="Salary"
          name="salary"
          rules={[
            {
              required: true,
              message: 'Please input Salary',
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          style={{margin: '5px', width: '30%'}}
          label="Deadline"
          name="deadline"
          rules={[
            {
              required: true,
              message: 'Please input Deadline',
            },
          ]}
        >
          <Input type='date' />
        </Form.Item>
        <Form.Item
          style={{margin: '5px', width: '100%'}}
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input Description',
            },
          ]}
        >
          <TextArea style={{height: '200px'}} />
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
          Update
        </Button>
      </Form.Item>
    </Form>
    ) : (
      <p>Loading Vacancy data...</p>
    )}
    </div>
  );
};

export default UpdateVancayForm;
