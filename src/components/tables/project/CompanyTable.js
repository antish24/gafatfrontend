import React from 'react';
import { Table, Image } from 'antd';
import { BACKENDURL } from '../../../helper/Urls';

const CompanyTable = ({loading,companyData}) => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'TIN',
      dataIndex: 'TIN',
      key: 'TIN',
    },
    {
      title: 'VAT',
      dataIndex: 'VAT',
      key: 'VAT',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'City',
      key: 'companyAddress',
      render: (_, record) => record.companyAddress ? record.companyAddress.city : 'N/A',
    },
    {
      title: 'Sub City',
      key: 'companyAddress',
      render: (_, record) => record.companyAddress ? record.companyAddress.subCity : 'N/A',
    },
    {
      title: 'Wereda',
      key: 'companyAddress',
      render: (_, record) => record.companyAddress ? record.companyAddress.wereda : 'N/A',
    },
    {
      title: 'Kebele',
      key: 'companyAddress',
      render: (_, record) => record.companyAddress ? record.companyAddress.kebele : 'N/A',
    },
    {
      title: 'House Number',
      key: 'companyAddress',
      render: (_, record) => record.companyAddress ? record.companyAddress.houseNo : 'N/A',
    },
    {
      title: 'License',
      dataIndex: 'license',
      key: 'license',
      render: (r) => r ? <Image width={30} height={30} src={`${BACKENDURL}/uploads/${r}`}/> : 'No Profile',
    },
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
      render: (r) => r ? <Image width={30} height={30} src={`${BACKENDURL}/uploads/${r}`}/> : 'No Profile',
    },
    
  ];

  return (
        <Table
          columns={columns}
          dataSource={companyData}
          loading={loading}
          scroll={{
            x: 500,
          }}
          pagination={{ pageSize: 10 }}
        />
  );
};

export default CompanyTable;
