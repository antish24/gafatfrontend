import React from 'react';
import IncomeTaxTable from '../../tables/payroll/IncomeTaxTable';
import {Descriptions} from 'antd';
import FilterIncomeTax from '../../forms/payroll/FilterIncomeTax';

const IncomeTax = () => {
  const CompanyInfoData = [
    {key: '1', label: 'Comapany Name', children: 'Two Z Business Plc'},
    {key: '2', label: 'TIN', children: '0064336622'},
    {key: '3', label: 'Account', children: '100865161'},
    {key: '10', label: 'Wereda', children: '09'},
    {key: '5', label: 'City / Region', children: 'Addis Abeba'},
    {key: '6', label: 'subCity / Zone', children: 'Yeka'},
    {key: '11', label: 'House No', children: 'New'},
    {key: '4', label: 'Payment Time', children: ''},
    {key: '7', label: 'Collector Office', children: 'Addis Abeab'},
    
    {key: '8', label: 'Month', children: 'Aug'},
    {key: '9', label: 'Year', children: '2016'},
    
    {key: '14', label: 'Document No', children: '206517989'},
    {key: '12', label: 'Phone', children: '011657788'},
    {key: '13', label: 'Fax', children: ''},
  ];


  const SummaryData = [
    {key: '1', label: 'Type', children: 'Person'},
    {key: '2', label: 'Religion', children: 'Ortodox'},
    {key: '3', label: 'Ethnic Group', children: 'Afar'},
    {key: '4', label: 'Blood Type', children: 'O+'},
    {key: '9', label: 'Medical Report', children: '1000152677889'},
    {key: '10', label: 'FingerPrint Report', children: '00457281'},
  ];

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
      {/* <Descriptions
      title="Company Info"
        style={{width: '100%'}}
        column={{xs: 1, sm: 1}}
        bordered
        size="small"
        items={CompanyInfoData}
      />

      <Descriptions
        style={{width: '100%'}}
        column={{xs: 1, sm: 1}}
        bordered
        size="small"
        items={SummaryData}
      /> */}
      <FilterIncomeTax/>
      <IncomeTaxTable incomeTaxDate={[]} />
    </div>
  );
};

export default IncomeTax;
