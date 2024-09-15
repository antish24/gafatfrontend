import {Button, DatePicker, Form, Input, Select} from 'antd';
import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {AlertContext} from '../../../context/AlertContext';
import {BACKENDURL} from '../../../helper/Urls';

const InterviewApplicantsForm = ({id, openModalFun, reload}) => {
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);
  const [loadingQ, setLoadingQ] = useState (false);
  const [form] = Form.useForm ();

  const [question, setQuestions] = useState ([
    {
      name: '',
      max: '',
      min: '',
    },
  ]);

  const [questionScore, setQuestionScore] = useState ([
    {
      name: '',
      score: '',
    },
  ]);

  const onFinish = async values => {
    setLoading (true);
    try {
      const res = await axios.post (`${BACKENDURL}/interview/new`, {
        questions: questionScore,
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

  const getInterviewData = async () => {
    setLoadingQ (true);
    try {
      const res = await axios.get (`${BACKENDURL}/interview/detail?id=${id}`);
      setQuestions (
        res.data.interviewQ.map (question => ({
          name: question.name,
          max: question.maxValue,
          min: question.minValue,
        }))
      );
      setLoadingQ (false);
    } catch (error) {
      setLoadingQ (false);
      openNotification ('error', error.response.data.message, 3, 'red');
    }
  };

  useEffect (
    () => {
      getInterviewData ();
    },
    [id]
  );

  return (
    <div>
        {question ? (
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
        {question.map ((questions, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              width: '100%',
              borderBottom: '1px solid gray',
              padding: '5px 0',
            }}
          >
            <Form.Item style={{margin: '0', width: '84%'}} label="Question">
              <Input disabled value={questions.name} 
              onChange={e => {
                const value = e.target.value;
                setQuestionScore (prev => {
                  const updatedQuestion = [...prev];
                  updatedQuestion[index].name = value;
                  return updatedQuestion;
                });
              }}/>
            </Form.Item>
            <Form.Item
              style={{margin: '0', width: '15%'}}
              label="Score"
              rules={[{required: true, message: 'Min Required'}]}
            >
              <Input
                placeholder="3"
                type="number"
                min={questions.min}
                max={questions.max}
                onChange={e => {
                  const value = e.target.value;
                  setQuestionScore (prev => {
                    const updatedQuestion = [...prev];
                    updatedQuestion[index].score = value;
                    return updatedQuestion;
                  });
                }}
              />
            </Form.Item>
          </div>
        ))}
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
    </Form>):'Loading Questions'}
    </div>
  );
};

export default InterviewApplicantsForm;
