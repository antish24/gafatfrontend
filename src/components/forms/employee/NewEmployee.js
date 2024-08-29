import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
  Steps,
  Upload,
} from 'antd';
import axios from 'axios';
import React, {useContext, useState} from 'react';
import {AlertContext} from '../../../context/AlertContext';
import {BACKENDURL} from '../../../helper/Urls';
import {FaUpload} from 'react-icons/fa';

const NewEmployee = ({openModalFun, reload}) => {
  const {openNotification} = useContext (AlertContext);
  const [loading, setLoading] = useState (false);
  const [form] = Form.useForm ();
  const [formValues, setFormValues] = useState ({});
  const {Dragger} = Upload;

  const onFinish = async () => {
    setLoading (true);
    console.log (formValues);
    try {
      const res = await axios.post (`${BACKENDURL}/users/new`, {formValues});
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

  const [currentSlide, setCurrentSlide] = useState (0);
  const formInfos = [
    {
      title: 'Personal Information',
      key: 1,
      children: [
        {lable: 'First Name', name: 'fName', type: 'Input', width: '30%'},
        {
          lable: 'Middle Name',
          name: 'mName',
          type: 'Input',
          width: '30%',
          notRequired: true,
        },
        {lable: 'Last Name', name: 'lName', type: 'Input', width: '30%'},
        {
          lable: 'Profile Photo',
          name: 'profilePhoto',
          type: 'File',
          req: 'image/*',
          width: '30%',
        },
        {
          lable: 'ID Front',
          name: 'IDF',
          type: 'File',
          req: 'image/*',
          width: '30%',
        },
        {
          lable: 'ID Back',
          name: 'IDB',
          type: 'File',
          req: 'image/*',
          width: '30%',
        },
        {
          lable: 'Date Of Birth',
          name: 'dateOfBirth',
          type: 'Date',
          width: '30%',
        },
        {
          lable: 'Sex',
          name: 'sex',
          type: 'Select',
          options: [
            {value: 'Male', lable: 'Male'},
            {value: 'Female', lable: 'Female'},
          ],
          width: '30%',
        },
        {
          lable: 'Nationality',
          name: 'nationality',
          type: 'Select',
          options: [
            {value: 'Ethiopian', lable: 'Ethiopian'},
            {value: 'Kenya', lable: 'Kenya'},
          ],
          width: '30%',
        },
      ],
    },

    {
      title: 'Address Information',
      key: 2,
      children: [
        {lable: 'City / Region', name: 'city', type: 'Input', width: '47%'},
        {
          lable: 'Sub City / Zone',
          name: 'subCity',
          type: 'Input',
          width: '47%',
        },
        {lable: 'Wereda', name: 'wereda', type: 'Input', width: '30%'},
        {lable: 'Kebele', name: 'kebele', type: 'Input', width: '30%'},
        {lable: 'House No', name: 'houseNo', type: 'Input', width: '30%'},
        {lable: 'Phone', name: 'phone', type: 'Input', width: '47%'},
        {
          lable: 'Alternate Phone',
          name: 'alternatePhone',
          type: 'Input',
          width: '47%',
          notRequired: true,
        },
        {
          lable: 'Email',
          name: 'email',
          type: 'Input',
          width: '100%',
          notRequired: true,
        },
      ],
    },

    {
      title: 'Work Information',
      key: 3,
      children: [
        {
          lable: 'Branch',
          name: 'branch',
          width: '47%',
          type: 'Select',
          options: [
            {value: 'Yeka', lable: 'Yeka'},
            {value: 'Arada', lable: 'Arada'},
          ],
        },
        {
          lable: 'Department',
          name: 'department',
          width: '47%',
          type: 'Select',
          options: [
            {value: 'Marketing', lable: 'Marketing'},
            {value: 'Accounting', lable: 'Accounting'},
          ],
        },
        {
          lable: 'Postion',
          name: 'postion',
          width: '47%',
          type: 'Select',
          options: [
            {value: 'Accountant', lable: 'Accountant'},
            {value: 'Sales', lable: 'Sales'},
          ],
        },
        {
          lable: 'Employment Type',
          name: 'employemmentType',
          type: 'Select',
          options: [
            {value: 'Accountant', lable: 'Accountant'},
            {value: 'Sales', lable: 'Sales'},
          ],
          width: '47%',
        },
        {
          lable: 'Shift',
          name: 'shift',
          type: 'Select',
          options: [
            {value: 'Accountant', lable: 'Accountant'},
            {value: 'Sales', lable: 'Sales'},
          ],
          width: '31%',
        },
        {
          lable: 'Salary',
          name: 'salary',
          type: 'Input',
          width: '31%',
          req: 'number',
          notRequired: true,
        },
        {lable: 'Start Date', name: 'startDate', type: 'Date', width: '31%'},
        {
          lable: 'Agreement',
          name: 'agreement',
          type: 'File',
          req: 'application/pdf',
          width: '100%',
        },
        {
          lable: 'Bank Name',
          name: 'bankName',
          type: 'Select',
          width: '31%',
          notRequired: true,
        },
        {
          lable: 'Account Number',
          name: 'accountNumber',
          type: 'Input',
          req: 'number',
          width: '31%',
          notRequired: true,
        },
        {
          lable: 'Tin Number',
          name: 'tinNumber',
          type: 'Input',
          req: 'number',
          width: '31%',
          notRequired: true,
        },
      ],
    },

    {
      title: 'Related Information',
      key: 4,
      children: [
        {
          lable: 'Marital status',
          name: 'maritalStatus',
          type: 'Input',
          width: '47%',
          notRequired: true,
        },
        {
          lable: 'Religion',
          name: 'religion',
          type: 'Input',
          width: '47%',
          notRequired: true,
        },
        {
          lable: 'Ethnic Group',
          name: 'ethnicGroup',
          type: 'Input',
          width: '47%',
          notRequired: true,
        },
        {
          lable: 'Blood Group',
          name: 'bloodGroup',
          type: 'Input',
          width: '47%',
          notRequired: true,
        },
        {
          lable: 'Medical Report',
          name: 'medicalReport',
          type: 'File',
          req: 'application/pdf',
          width: '100%',
        },
        {
          lable: 'FingerPrint Report',
          name: 'fingerPrintReport',
          type: 'File',
          req: 'application/pdf',
          width: '100%',
        },
      ],
    },
  ];

  const onFieldChange = (name, e) => {
    setFormValues ({
      ...formValues,
      [name]: e,
    });
  };

  const onNext = () => {
    setCurrentSlide (c => c + 1);
  };
  return (
    <Form
      layout="vertical"
      onFinish={onNext}
      form={form}
      onFinishFailed={onFinishFailed}
    >
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Steps
            current={currentSlide}
            items={formInfos.map ((l, k) => [{title: l.title}])}
          />
          <Divider>{formInfos[currentSlide].title}</Divider>
          {formInfos[currentSlide].children.map ((data, key) => (
            <Form.Item
              key={key}
              style={{margin: '5px', width: `${data.width}`}}
              label={data.lable}
              name={data.name}
              rules={[
                {
                  // required: data.notRequired ? false : true,
                  message: `Please input ${data.lable}`,
                },
              ]}
            >
              {data.type === 'Input'
                ? <Input
                    onChange={e => onFieldChange (data.name, e.target.value)}
                    type={data.req && data.req}
                  />
                : data.type === 'Date'
                    ? <DatePicker
                        onChange={e => {
                          onFieldChange (data.name, e && e.toISOString ());
                        }}
                      />
                    : data.type === 'Select'
                        ? <Select
                            options={data.options}
                            onChange={e => onFieldChange (data.name, e)}
                          />
                        : data.type === 'File' &&
                            <Dragger
                              name={data.name}
                              accept={data.req}
                              onChange={e => {
                                onFieldChange (data.name, e.file);
                              }}
                              multiple={false}
                              maxCount={1}
                            >
                              <p className="ant-upload-drag-icon">
                                <FaUpload />
                              </p>
                              <p className="ant-upload-text">
                                {formValues.name === data.name
                                  ? 'Click or drag file to this area to upload'
                                  : formValues.name}
                              </p>
                              <p className="ant-upload-hint">
                                Support for a single
                                {' '}
                                {data.req === 'image/*' ? 'image' : 'Pdf'}
                                {' '}
                                file. Max size 3MB.
                              </p>
                            </Dragger>}
            </Form.Item>
          ))}
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            height: '50px',
            alignItems: 'center',
          }}
        >
          {currentSlide !== 0 &&
            <Button
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide (c => c - 1)}
            >
              Back
            </Button>}
          {currentSlide !== formInfos.length - 1 &&
            <Form.Item
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '15px',
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                disabled={currentSlide === formInfos.length - 1}
              >
                Next
              </Button>
            </Form.Item>}
        </div>
        {formInfos.length - 1 === currentSlide &&
          <Button
            type="primary"
            style={{width: '100%'}}
            onClick={onFinish}
            disabled={loading}
            loading={loading}
          >
            Register
          </Button>}
      </div>
    </Form>
  );
};

export default NewEmployee;
