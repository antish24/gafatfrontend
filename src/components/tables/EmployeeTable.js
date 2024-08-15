import React, { useRef, useState } from 'react';
import {Badge, Button, Input, Space, Table} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { FormatDateTime } from '../../helper/FormatDate';
import { FormatDay } from '../../helper/FormateDay';

const EmployeeTable = ({userData,loading}) => {

  const [searchedColumn, setSearchedColumn] = useState('');
  const navigate=useNavigate()
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        searchText
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'ID Number',
      fixed: 'left',
      dataIndex: 'idNumber',
      rowScope: 'idNumber',
      ...getColumnSearchProps('idNumber'),
    },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          ...getColumnSearchProps('firstName'),
          key: 'firstName',
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          ...getColumnSearchProps('lastName'),
          key: 'lastName',
        },
        {
          title: 'Sex',
          dataIndex: 'gender',
          key: 'gender',
        },
        {
          title: 'Birth Date',
          dataIndex: 'dateOfBirth',
          render:r=>(<span>{FormatDay(r)}</span>)
        },
        {
          title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
          },
    {
     fixed: 'right',
     title: 'Status',
      key: 'status',
      render: (r) => <Badge status={r.status==="Innocent"?"success":'error'} text={r.status} />,
    },
    {
      title: 'Guilty Count',
      dataIndex: 'guilty',
      key: 'guilty',
    },
    {
      title: 'Total Reports',
      dataIndex: 'reports',
      key: 'reports',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render:r=>(<span>{FormatDateTime(r)}</span>)
    },
    {
     title: 'Action',
     width:'80px',
     fixed: 'right',
     key: 'operation',
     render: (r) => <Button style={{border:'none',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>navigate(`/employee/${r.idNumber}`)}><FaEye/></Button>,
    },
  ];


  return (
    <Table
      size='small'
      columns={columns}
      scroll={{
        x: 1500,
      }}
      pagination={{
        defaultPageSize: 7,
        showSizeChanger: false 
      }}
      dataSource={userData}
      loading={loading}
    />
  );
};
export default EmployeeTable;
