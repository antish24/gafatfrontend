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
import { TbReload } from 'react-icons/tb';

const PayrollTable = ({payrollDate, loading, reload}) => {
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
  
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
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

  const columns = [
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
              title: 'Name',
              dataIndex: 'name',
              ...getColumnSearchProps ('name'),
              key: 'name',
              width: '200px',
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
              dataIndex: 'branch',
              ...getColumnSearchProps ('branch'),
              key: 'branch',
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
        {
          title: 'Work Place info',
          children: [
            {
              title: 'Site',
              dataIndex: 'site',
              ...getColumnSearchProps ('site'),
              key: 'site',
              width: '200px',
            },
            {
              title: 'City / Region',
              dataIndex: 'city',
              key: 'city',
              width: '200px',
              filters: cities.map(city => ({
                text: city.name,
                value: city.name
              })),
            
              filteredValue: filteredInfo.city || null,
            
              onFilter: (value, record) => {
                // Get city object matching filter value
                const city = cities.find(c => c.name === value);
            
                // Check if record's city matches filter
                return city.name === record.city; 
              }
            },
            {
              title: 'SubCity / Zone',
              dataIndex: 'subCity',
              key: 'subCity',
              width: '200px',
              filters: cities.flatMap(city => 
                city.subCities.map(sub => ({
                  text: sub.name, 
                  value: sub.name
                }))
              ),
            
              onFilter: (value, record) => {
                const city = cities.find(c => {
                  return c.subCities.some(s => s.name === value); 
                });
              
                const subcity = city.subCities.find(s => s.name === value);
              
                return record.city === city.name && record.subCity === subcity.name;
              }
            },
            {
              title: 'Wereda',
              dataIndex: 'wereda',
              key: 'wereda',
              width: '200px',
              filters: cities.flatMap(city =>
                city.subCities.flatMap(sub =>  
                  sub.weredas.map(w => ({
                    text: w,
                    value: w  
                  }))
                )
              ),
              filteredValue: filteredInfo.wereda || null,
              onFilter: (value, record) => {
                const city = cities.find(c => {
                  return c.subCities.some(sc => {
                    return sc.weredas.some(w => w === value);
                  });
                });
              
                const subcity = city.subCities.find(sc => {
                  return sc.weredas.some(w => w === value);
                });
              
                const wereda = subcity.weredas.find(w => w === value);
              
                return (
                  record.city === city.name && 
                  record.subCity === subcity.name &&
                  record.wereda === wereda
                );
              }
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
          dataIndex: 'basicSalary',
          key: 'basicSalary',
          width: '80px',
        },
        {
          title: 'Earnings',
          children: [
            {
              title: 'Taxable',
              dataIndex: 'earnings',
              render:(r)=>r.taxable,
              key: 'earnings',
              width: '80px',
            },
            {
              title: 'Non Taxable',
              dataIndex: 'earnings',
              key: 'earnings',
              render:(r)=>r.nonTaxable,
              width: '100px',
            },
            {
              title: 'Total',
              dataIndex: 'earnings',
              key: 'earnings',
              render:(r)=>r.total,
              width: '100px',
            },
          ],
        },
        {
          title: 'Gross Salary',
          dataIndex: 'grossSalary',
          key: 'grossSalary',
          width: '80px',
        },
        {
          title: 'Deduction',
          children: [
            {
              title: 'Income Tax',
              dataIndex: 'deductions',
              key: 'deductions',
              render:(r)=>r.incomeTax,
              width: '80px',
            },
            {
              title: 'PF 7%',
              dataIndex: 'deductions',
              key: 'deductions',
              render:(r)=>r.PF7,
              width: '80px',
            },
            {
              title: 'PF 11%',
              dataIndex: 'deductions',
              key: 'deductions',
              render:(r)=>r.PF11,
              width: '80px',
            },
            {
              title: 'Loan',
              dataIndex: 'deductions',
              key: 'deductions',
              render:(r)=>r.loan,
              width: '80px',
            },
            {
              title: 'Penality',
              dataIndex: 'deductions',
              render:(r)=>r.penalty,
              key: 'deductions',
              width: '100px',
            },
            {
              title: 'Total',
              dataIndex: 'deductions',
              key: 'deductions',
              render:(r)=>r.total,
              width: '100px',
            },
          ],
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

  return (
    <div>
      <div style={{display:'flex',width:"100%",justifyContent:'space-between',marginBottom:'30px'}}>
      <div style={{display:'flex',gap:'5px'}}>
      <CSVLink
        data={payrollDate}
        filename={"payroll-detail-csv"}>
          <Button><FaFileCsv/>CSV</Button>
      </CSVLink>
      <CSVLink
        data={payrollDate}
        filename={"payroll-detail-csv"}>
          <Button><FaFileExcel/>Excel</Button>
      </CSVLink>
      </div>
      <DatePicker onChange={reload} disabled/>
      <div style={{display:'flex',gap:'5px'}}>
      <Button onClick={reload} type='primary'><TbReload />Refresh</Button>
      <Button onClick={clearAll}><MdFilterAltOff/> Clear filters</Button>
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
          position:'topRight',
          showSizeChanger: false,
        }}
        dataSource={payrollDate}
        loading={loading}
        onChange={handleChange}
      />
    </div>
  );
};
export default PayrollTable;
