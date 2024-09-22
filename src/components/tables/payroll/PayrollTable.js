import React, {useContext, useRef, useState} from 'react';
import {
  Badge,
  Button,
  DatePicker,
  Divider,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {MdDelete, MdEdit, MdFilterAltOff} from 'react-icons/md';
import {AlertContext} from '../../../context/AlertContext';
import {BACKENDURL} from '../../../helper/Urls';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import {FaFileCsv, FaFileExcel} from 'react-icons/fa6';
import {TbReload} from 'react-icons/tb';
import { FormatDay } from '../../../helper/FormateDay';

const PayrollTable = ({payrollData, loading, reload}) => {
  const {openNotification} = useContext (AlertContext);
  const [searchedColumn, setSearchedColumn] = useState ('');
  const [searchText, setSearchText] = useState ('');
  const searchInput = useRef (null);
  const [modalOpen, setModalOpen] = useState (false);
  const [modalContent, setModalContent] = useState ([]);
  const [deleteLoading, setDeleteLoading] = useState (false);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm ();
    setSearchText (selectedKeys[0]);
    setSearchedColumn (dataIndex);
  };
  const handleReset = clearFilters => {
    clearFilters ();
    setSearchText ('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={e => e.stopPropagation ()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys (e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch (selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch (selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset (clearFilters)}
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
    filterIcon: filtered => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString ()
        .toLowerCase ()
        .includes (value.toLowerCase ()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text => (searchedColumn === dataIndex ? searchText : text),
  });

  const [filteredInfo, setFilteredInfo] = useState ({});
  const [sortedInfo, setSortedInfo] = useState ({});

  const handleChange = (pagination, filters, sorter) => {
    console.log ('Various parameters', pagination, filters, sorter);
    setFilteredInfo (filters);
    setSortedInfo (sorter);
  };

  const clearAll = () => {
    setFilteredInfo ({});
    setSortedInfo ({});
  };

  const cities = [
    {
      name: 'Addis Ababa',
      subCities: [
        {
          name: 'Kirkos',
          weredas: ['Wereda 1', 'Wereda 2'],
        },
        {
          name: 'Lideta',
          weredas: ['Wereda 3', 'Wereda 4'],
        },
        {
          name: 'Bole',
          weredas: ['Wereda 5', 'Wereda 6'],
        },
      ],
    },
    {
      name: 'Gonder',
      subCities: [
        {
          name: 'Aynalem',
          weredas: ['Wereda 7', 'Wereda 8'],
        },
        {
          name: 'Agena',
          weredas: ['Wereda 9', 'Wereda 10'],
        },
        {
          name: 'Gore',
          weredas: ['Wereda 11', 'Wereda 12'],
        },
      ],
    },
    {
      name: 'Sidama',
      subCities: [
        {
          name: 'Hawassa',
          weredas: ['Wereda 13', 'Wereda 14'],
        },
        {
          name: 'Bensa',
          weredas: ['Wereda 15', 'Wereda 16'],
        },
      ],
    },
  ];

  const preDefined = [
    {
      title: 'IDNO',
      dataIndex: 'IDNO',
      ...getColumnSearchProps ('IDNO'),
      fixed: 'left',
      width: '80px',
      key: 'IDNO',
    },
    {
      title: 'Employee Information',
      children: [
        {
          title: 'Personal info',
          children: [
            {
              title: 'Full Name',
              children: [
                {
                  title: 'First',
                  dataIndex: 'fName',
                  ...getColumnSearchProps ('fName'),
                  width: '90px',
                  key: 'fName',
                },
                {
                  title: 'Middle',
                  dataIndex: 'mName',
                  ...getColumnSearchProps ('mName'),
                  width: '90px',
                  key: 'mName',
                },
                {
                  title: 'Last',
                  dataIndex: 'lName',
                  ...getColumnSearchProps ('lName'),
                  width: '90px',
                  key: 'lName',
                },
                ,
              ],
            },
            {
              title: 'Sex',
              dataIndex: 'sex',
              key: 'sex',
              width: '80px',
              filters: [
                {
                  text: 'Male',
                  value: 'Male',
                },
                {
                  text: 'Female',
                  value: 'Female',
                },
              ],
              filteredValue: filteredInfo.sex || null,
              onFilter: (value, record) => record.sex.includes (value),
            },
            {
              title: 'Date Of Birth',
              dataIndex: 'dateOfBirth',
              width: '150px',
              key: 'createdAt',
              render: r => <span>{FormatDay (r)}</span>,
            },
            {
              title: 'Branch',
              dataIndex: 'branch',
              key: 'branch',
              ...getColumnSearchProps ('branch'),
              width: '200px',
            },
            {
              title: 'Department',
              dataIndex: 'department',
              ...getColumnSearchProps ('department'),
              key: 'department',
              width: '200px',
            },
            {
              title: 'Position',
              dataIndex: 'position',
              ...getColumnSearchProps ('position'),
              key: 'position',
              width: '200px',
            },
          ],
        },
      ],
    },
    {
      title: 'Payment Info',
      children: [
        {
          title: 'Basic Salary',
          dataIndex: 'basicSalary',
          key: 'basicSalary',
          width: '80px',
        },
        {
          title: 'Salary',
          dataIndex: 'salary',
          key: 'salary',
          width: '80px',
        },
        {
          title: 'Total Earning',
          dataIndex: 'totalEarning',
          key: 'totalEarning',
          width: '100px',
        },
        {
          title: 'Gross Salary',
          dataIndex: 'grossSalary',
          key: 'grossSalary',
          width: '80px',
        },
        {
          title: 'Income Tax',
          dataIndex: 'incomeTax',
          key: 'incomeTax',
          width: '100px',
        },
        {
          title: 'PF 7%',
          dataIndex: 'employeePension',
          key: 'employeePension',
          width: '100px',
        },
        {
          title: 'PF 11%',
          dataIndex: 'employerPension',
          key: 'employerPension',
          width: '100px',
        },
        {
          title: 'Total Deduction',
          dataIndex: 'totalDeduction',
          key: 'totalDeduction',
          width: '100px',
        },
        {
          title: 'Net Salary',
          dataIndex: 'netSalary',
          key: 'netSalary',
          width: '120px',
        },
      ],
    },

    // {
    //   fixed: 'right',
    //   title: 'Status',
    //   width: '80px',
    //   key: 'status',
    //   render: r => (
    //     <Tag color={r.status === 'Pending' ? 'orange' : 'Green'}>
    //       {r.status}
    //     </Tag>
    //   ),
    // },
    // {
    //   title: 'Action',
    //   width: '165px',
    //   fixed: 'right',
    //   key: 'operation',
    //   render: r => (
    //     <Space
    //       style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}
    //     >
    //       <Button
    //         type="text"
    //         onClick={() => {
    //           setModalOpen (true);
    //           setModalContent (r.IDNO);
    //         }}
    //       >
    //         <MdEdit />
    //       </Button>
    //       <Popconfirm
    //         title="Are you sure, Delete user"
    //         onConfirm={() => DeleteUser (r.IDNO)}
    //       >
    //         <Button
    //           type="text"
    //           disabled={deleteLoading}
    //           loading={deleteLoading}
    //         >
    //           <MdDelete color="red" />
    //         </Button>
    //       </Popconfirm>
    //     </Space>
    // ),
    // },
  ];

  let dynamicColumns = [];
  let dynamicColumns2 = [];

  dynamicColumns.push ({
    title: 'Earning',
    children: [
      {
        title: 'test',
        dataIndex: 'test',
        width: '100px',
      },
      {
        title: 'test',
        dataIndex: 'test',
        width: '100px',
      },
    ],
  });

  dynamicColumns2.push ({
    title: 'Dductions',
    children: [
      {
        title: 'test',
        dataIndex: 'test',
        width: '100px',
      },
      {
        title: 'test',
        dataIndex: 'test',
        width: '100px',
      },
    ],
  });

  const columns = [...preDefined];
  // const columns = [...preDefined, ...dynamicColumns ,...dynamicColumns2];
  return (
    <div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          marginBottom: '30px',
        }}
      >
        <div style={{display: 'flex', gap: '5px'}}>
          <CSVLink data={payrollData} filename={'payroll-detail-csv'}>
            <Button><FaFileCsv />CSV</Button>
          </CSVLink>
          <CSVLink data={payrollData} filename={'payroll-detail-csv'}>
            <Button><FaFileExcel />Excel</Button>
          </CSVLink>
        </div>
        <div style={{display: 'flex', gap: '5px'}}>
          <Button onClick={reload} type="primary"><TbReload />Refresh</Button>
          <Button onClick={clearAll}><MdFilterAltOff /> Clear filters</Button>
        </div>
      </div>
      <Table
        size="small"
        columns={columns}
        bordered
        scroll={{
          x: 500,
        }}
        pagination={{
          defaultPageSize: 10,
          position: 'topRight',
          showSizeChanger: false,
        }}
        dataSource={payrollData}
        loading={loading}
        onChange={handleChange}
      />
    </div>
  );
};
export default PayrollTable;
