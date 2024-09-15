import {Button, DatePicker, Form, Input, Select} from 'antd';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {AlertContext} from '../../../context/AlertContext';
import {BACKENDURL} from '../../../helper/Urls';

const UpdateInterviewForm = ({id,openModalFun, reload}) => {
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);
  const [form] = Form.useForm ();

  const [question, setQuestions] = useState ([
    {
      name: '',
      max: '',
      min: '',
    },
  ]);

  const handleAdd = () => {
    setQuestions ([
      ...question,
      {
        name: '',
        max: '',
        min: '',
      },
    ]);
  };

  const handleRemove = index => {
    setQuestions (question.filter ((_, i) => i !== index));
  };

  const onFinish = async values => {
    setLoading (true);
    try {
      const res = await axios.post (`${BACKENDURL}/interview/update`, {
        title: values.title,
        IDNO:id,
        questions: question,
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

  const [interviewData,setInterviewData]=useState([])

  const getInterviewData=async()=>{
    try {
      const res = await axios.get(`${BACKENDURL}/interview/detail?id=${id}`);
      setInterviewData(res.data.interview)
      setQuestions(res.data.interviewQ.map(question => ({
        name: question.name, 
        max: question.maxValue,
        min: question.minValue
      })))
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
    }
  }

  useEffect(()=>{
    getInterviewData()

    return setInterviewData([])
  },[id])

  return (
    <div>
    {Object.keys(interviewData).length > 0 ? (
    <Form
      layout="vertical"
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
      initialValues={interviewData}
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
          style={{margin: '5px', width: '100%'}}
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

        {question.map ((questions, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent:"space-between",
              flexWrap:"wrap",
              width:'100%',
              borderBottom: '1px solid gray',
              padding: '5px 0',
            }}
          >
            <Form.Item
              style={{margin: '0',width:"65%"}}
              label="Name"
              rules={[{required: true, message: 'Durg Name Required'}]}
            >
              <Input
                placeholder="Name"
                value={questions.name}
                onChange={e => {
                  const value = e.target.value;
                  setQuestions (prev => {
                    const updatedQuestion = [...prev];
                    updatedQuestion[index].name = value;
                    return updatedQuestion;
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              style={{margin: '0',width:'15%'}}
              label="Min"
              rules={[{required: true, message: 'Min Required'}]}
            >

              <Input
                placeholder="Min"
                type="number"
                value={questions.min}
                onChange={e => {
                  const value = e.target.value;
                  setQuestions (prev => {
                    const updatedQuestion = [...prev];
                    updatedQuestion[index].min = value;
                    return updatedQuestion;
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              style={{margin: '0',width:'15%'}}
              label="Max"
              rules={[{required: true, message: 'Max Required'}]}
            >
              <Input
                type="number"
                value={questions.max}
                onChange={e => {
                  const value = e.target.value;
                  setQuestions (prev => {
                    const updatedQuestion = [...prev];
                    updatedQuestion[index].max = value;
                    return updatedQuestion;
                  });
                }}
              />
            </Form.Item>

            {index > 0 &&
              <Button
                style={{marginTop: '5px'}}
                onClick={() => handleRemove (index)}
              >
                Remove
              </Button>}
          </div>
        ))}
        <Button style={{margin: '10px 0'}} type="primary" onClick={handleAdd}>
          Add Question
        </Button>

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
          Submit
        </Button>
      </Form.Item>
    </Form>): (
      <p>Loading Interview data...</p>
    )}
    </div>
  );
};

export default UpdateInterviewForm;
