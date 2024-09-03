import React, {useContext, useRef, useState} from 'react';
import {
  Badge,
  Button,
  Divider,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {MdDelete, MdEdit} from 'react-icons/md';
import {FormatDateTime} from '../../../helper/FormatDate';
import ModalForm from '../../../modal/Modal';
import UpdateUserForm from '../../forms/UpdateUserForm';
import {AlertContext} from '../../../context/AlertContext';
import {BACKENDURL} from '../../../helper/Urls';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import { FaFile } from 'react-icons/fa6';
import FiterTimeSheetForm from '../../forms/payroll/FiterTimeSheetForm';
import FiterTimeSheet from '../../forms/payroll/FiterTimeSheet';

const TimeSheetTable = ({timesheetData, loading, reload}) => {
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

  const DeleteUser = async id => {
    setDeleteLoading (true);
    try {
      const res = await axios.get (`${BACKENDURL}/users/delete?id=${id}`);
      setDeleteLoading (false);
      reload ();
      openNotification ('success', res.data.message, 3, 'green');
    } catch (error) {
      setDeleteLoading (false);
      openNotification ('error', error.response.data.message, 3, 'red');
    }
  };

  const columns = [
    {
      title: 'Employee Information',
      fixed: 'left',
      children: [
        {
          title: 'IDNO',
          dataIndex: 'IDNO',
          ...getColumnSearchProps ('IDNO'),
          width: '80px',
          key: 'IDNO',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          ...getColumnSearchProps ('name'),
          key: 'name',
          width: '200px',
        },
        {
          title: 'Work Information',
          children: [
            {
              title: 'Branch',
              dataIndex: 'branch',
              key: 'branch',
              width: '80px',
            },
            {
              title: 'Department',
              dataIndex: 'department',
              key: 'department',
              width: '100px',
            },
            {
              title: 'Postion',
              dataIndex: 'postion',
              key: 'postion',
              width: '80px',
            },
          ],
        },
      ],
    },
    {
      title: 'Working Hours',
      children: [
        {
          title: 'Regular Place',
          dataIndex: 'regularPlace',
          children: [
            {
              title: 'Day',
              dataIndex: 'regularDay',
              key: 'regularDay',
              width: '80px',
            },
            {
              title: 'Hour',
              dataIndex: 'regularHour',
              key: 'regularHour',
              width: '80px',
            },
          ],
        },
        {
          title: '32 Over Time',
          dataIndex: 'OT32',
          key: 'OT32',
          width: '80px',
        },
        {
          title: 'Non Regular Place',
          dataIndex: 'nonRegularPlace',
          children: [
            {
              title: 'Day',
              dataIndex: 'nonRegularDay',
              key: 'nonRegularDay',
              width: '80px',
            },
            {
              title: 'Hour',
              dataIndex: 'nonRegularHour',
              key: 'nonRegularHour',
              width: '80px',
            },
          ],
        },
        {
          title: 'Special Place',
          dataIndex: 'specialPlace',
          children: [
            {
              title: 'Day',
              dataIndex: 'specialDay',
              key: 'specialDay',
              width: '80px',
            },
            {
              title: 'Hour',
              dataIndex: 'specialHour',
              key: 'specialHour',
              width: '80px',
            },
          ],
        },
        {
          title: 'Total',
          dataIndex: 'totalWorking',
          children: [
            {
              title: 'Day',
              dataIndex: 'totalDay',
              key: 'totalDay',
              width: '80px',
            },
            {
              title: 'Hour',
              dataIndex: 'totalHour',
              key: 'totalHour',
              width: '80px',
            },
          ],
        },
      ],
    },
    {
      fixed: 'right',
      title: 'Status',
      width: '80px',
      key: 'status',
      render: r => (
        <Tag color={r.status === 'Pending' ? 'orange' : 'Green'}>
          {r.status}
        </Tag>
      ),
    },
    {
      title: 'Action',
      width: '165px',
      fixed: 'right',
      key: 'operation',
      render: r => (
        <Space
          style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}
        >
          <Button
            type="text"
            onClick={() => {
              setModalOpen (true);
              setModalContent (r.IDNO);
            }}
          >
            <MdEdit />
          </Button>
          <Popconfirm
            title="Are you sure, Delete user"
            onConfirm={() => DeleteUser (r.IDNO)}
          >
            <Button
              type="text"
              disabled={deleteLoading}
              loading={deleteLoading}
            >
              <MdDelete color="red" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [siteLocation,setSiteLocation]=useState([
    {value:'Addis Abeba',lable:'Addis Abeba'}
  ])
  return (
    <div>
      <div style={{display:'flex',height:'60px',justifyContent:'space-between'}}>
        <span style={{fontSize:'20px'}}>TimeSheet List </span>
      <div style={{display:'flex',gap:'10px'}}>
        <FiterTimeSheet/>
      <CSVLink
        data={timesheetData}
        onClick={() => {
          console.log ('clicked');
        }}
      >
        <Button><FaFile/></Button>
      </CSVLink>
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
          defaultPageSize: 7,
          showSizeChanger: false,
        }}
        dataSource={timesheetData}
        loading={loading}
      />
    </div>
  );
};
export default TimeSheetTable;
