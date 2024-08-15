import React, { useRef, useState } from 'react';
import {Badge, Button, Input, Space, Table, Tag} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { FaEye } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { FormatDateTime } from '../../helper/FormatDate';

const IncidentsTable = ({incidents,loading}) => {

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
      title: 'Employee IDNO',
      dataIndex: 'employeeIdNo',
      ...getColumnSearchProps('employeeIdNo'),
      key: 'employeeIdNo',
    },
    {
      title: 'Employee First Name',
      ...getColumnSearchProps('employeeFistname'),
      dataIndex: 'employeeFistname',
      key: 'employeeFistname',
    },
    {
      title: 'Employee Last Name',
      ...getColumnSearchProps('employeeLastname'),
      dataIndex: 'employeeLastname',
      key: 'employeeLastname',
    },
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
    },

    {
      title: 'Incidents',
      dataIndex: 'incidents',
      key: 'incidents',
      render:r=>(<Tag color='yellow'>{r}</Tag>)
    },
    {
      title: 'Magnitude',
      dataIndex: 'incidentMagnitude',
      key: 'incidentMagnitude',
      render:r=>(<Tag color={r==="High"?"red":'warning'}>{r}</Tag>)
    },
    {
      title: 'Incident Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render:r=>(<span>{FormatDateTime(r)}</span>)
    },
    {
      title: 'Reported Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render:r=>(<span>{FormatDateTime(r)}</span>)
    },
    {
     fixed: 'right',
     title: 'Status',
      key: 'status',
      render: (r) => <Badge status={r.status==="Approved"?"success":r.status==="Pending"?"warning":'error'} text={r.status} />,
    },
    {
     title: 'Action',
     width:'80px',
     fixed: 'right',
     key: 'operation',
     render: (r) => <Button style={{border:'none',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>navigate(`/incident/${r.id}`)}><FaEye/></Button>,
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
      dataSource={incidents}
      loading={loading}
    />
  );
};
export default IncidentsTable;
