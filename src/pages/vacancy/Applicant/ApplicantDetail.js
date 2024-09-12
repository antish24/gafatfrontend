import {Button, Descriptions, Image} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const ApplicantDetail = () => {
  const EmployeeInfoData = [
    {key: '4', label: 'Full Name', children: 'Abebe Balch Mulu'},
    {key: '5', label: 'Date of Birth', children: '02 jun 1889'},
    {key: '6', label: 'Gender', children: 'Male'},
    {key: '8', label: 'Nationality', children: 'Ethiopia'},
    {key: '12', label: 'Email', children: 'abebebalch@gmail.com'},
    {key: '13', label: 'Phone', children: '0911755025'},
    {
      key: '1',
      label: 'Cover Letter',
      children: <TextArea style={{height: '200px', resize: 'none'}} disabled />,
      span: 3,
    },
    {key: '2', label: 'Position', children: 'Security'},
    {key: '7', label: 'CV', children: ''},
    {key: '3', label: 'Educational Doc', children: ''},
    {key: '14', label: 'Rank', children: '0'},
    {key: '15', label: 'Score', children: '0'},
  ];
  return (
    <div>
      <div style={{display:'flex',gap:'10px',justifyContent:'flex-end',marginBottom:'5px'}}>
        <Button>Interview</Button>
        <Button>Shortlist</Button>
      </div>
      <Descriptions
        style={{width: '100%'}}
        column={{xs: 1, sm: 1}}
        bordered
        size="small"
        items={EmployeeInfoData}
      />
    </div>
  );
};

export default ApplicantDetail;
