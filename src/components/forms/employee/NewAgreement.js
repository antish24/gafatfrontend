import {Button, Form, Input, Upload} from 'antd';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {AlertContext} from '../../../context/AlertContext';
import {BACKENDURL} from '../../../helper/Urls';
import {FaUpload} from 'react-icons/fa';

const NewAgreement = ({openModalFun, reload}) => {
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);
  const [form] = Form.useForm ();
  const {Dragger} = Upload;

  const onFinish = async (values) => {
    setLoading (true);
    console.log (values.agreementTitle,articles);
    try {
      const res = await axios.post (`${BACKENDURL}/users/new`);
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

  const [articles, setArticles] = useState ([
    {
      articleName: '',
      subArticles: [],
    },
  ]);

  const AddArticles = () => {
    setArticles ([
      ...articles,
      {
        articleName: '',
        subArticles: [],
      },
    ]);
  };

  const AddSubArticles = articleIndex => {
    setArticles (prevArticles => {
      const article = {...prevArticles[articleIndex]};
      article.subArticles.push ({description: ''});
      return [...prevArticles];
    });
  };

  const RemoveArticles = index => {
    setArticles (articles.filter ((article, i) => i !== index))
  };

  const RemoveSubArticles = (articleIndex, subIndex) => {
    setArticles(articles.subArticles.filter((sub, i) => i !== subIndex))
  };

  return (
    <Form
      form={form}
      layout="vertical "
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="agreementTitle"
        label="Agreement Title"
        rules={[
          {
            required: true,
            message: 'Please select Agreement Title',
          },
        ]}
      >
        <Input placeholder="Example Postion Contract" />
      </Form.Item>
      {articles.map ((article, index) => (
        <div key={index}>

          <Form.Item
            name={`articles[${index}].articleName`}
            label="Article Name"
          >
            <Input 
             value={article.articleName}
             onChange={e => {
               const value = e.target.value;
               setArticles (prevArticles => {
                 const updatedAricles = [...prevArticles];
                 updatedAricles[index].articleName = value;
                 return updatedAricles;
               });
             }}
             />
          </Form.Item>

          {article.subArticles.map ((sub, idx) => (
            <div>
              <Form.Item
                name={`articles[${index}].subArticles[${idx}].description`}
                label="Description"
              >
                <Input />
              </Form.Item>
              <Button onClick={() => RemoveSubArticles (index, idx)}>
                Remove Subarticle
              </Button>
            </div>
          ))}

          <Button onClick={() => AddSubArticles (index)}>
            Add Subarticle
          </Button>

          <Button onClick={() => RemoveArticles (index)}>
            Remove Article
          </Button>

        </div>
      ))}

      <Button style={{margin: '10px 0'}} type="primary" onClick={AddArticles}>
        Add Article
      </Button>

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
    </Form>
  );
};

export default NewAgreement;
