import React, {useContext, useRef, useState} from 'react';
import {
  Badge,
  Button,
  Divider,
  Input,
  Popconfirm,
  Space,
  Table,
  Tag,
} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {FaUserLock} from 'react-icons/fa6';
import {MdDelete, MdEdit} from 'react-icons/md';
import {FormatDateTime} from '../../../helper/FormatDate';
import ModalForm from '../../../modal/Modal';
import UpdateUserForm from '../../forms/UpdateUserForm';
import {AlertContext} from '../../../context/AlertContext';
import {BACKENDURL} from '../../../helper/Urls';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import {FormatDay} from '../../../helper/FormateDay';

const EmployeeTable = ({userData, loading, reload}) => {
  const {openNotification} = useContext (AlertContext);
  const [searchedColumn, setSearchedColumn] = useState ('');
  const [searchText, setSearchText] = useState ('');
  const searchInput = useRef (null);
  const [modalOpen, setModalOpen] = useState (false);
  const [modalContent, setModalContent] = useState ([]);
  const [banLoading, setBanLoading] = useState (false);
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

  const BanUser = async ({id, status}) => {
    setBanLoading (true);
    try {
      const res = await axios.get (
        `${BACKENDURL}/users/ban?id=${id}&&status=${status}`
      );
      openNotification ('success', res.data.message, 3, 'green');
      reload ();
      setBanLoading (false);
    } catch (error) {
      setBanLoading (false);
      openNotification ('error', error.response.data.message, 3, 'red');
    }
  };

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
      title: 'IDNO',
      dataIndex: 'IDNO',
      ...getColumnSearchProps ('IDNO'),
      width: '80px',
      fixed:'left',
      key: 'IDNO',
    },
    {
      title: 'Employee Info',
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
        },
        {
          title: 'Date Of Birth',
          dataIndex: 'dateOfBirth',
          width: '150px',
          key: 'createdAt',
          render: r => <span>{FormatDay (r)}</span>,
        },
        {
          title: 'Nationality',
          dataIndex: 'nationality',
          key: 'nationality',
          width: '100px',
        },
      ],
    },
    {
      title: 'Work Info',
      children: [
        {
          title: 'Branch',
          dataIndex: 'branch',
          width: '100px',
          key: 'branch',
        },
        {
          title: 'Department',
          dataIndex: 'department',
          width: '100px',
          key: 'department',
        },
        {
          title: 'Position',
          dataIndex: 'position',
          width: '80px',
          key: 'position',
        },
        {
          title: 'Start Date',
          dataIndex: 'startDate',
          width: '100px',
          render: r => <span>{FormatDay(r)}</span>,
          key: 'startDate',
        },
        {
          title: 'Employement Type',
          dataIndex: 'employementType',
          width: '120px',
          key: 'employementType',
        },
        {
          title: 'Shift',
          dataIndex: 'shift',
          width: '80px',
          key: 'shift',
        },
        {
          title: 'Salary',
          dataIndex: 'salary',
          width: '80px',
          key: 'salary',
        },
      ],
    },
    {
      title: 'Registered',
      dataIndex: 'registered',
      width: '150px',
      key: 'registered',
      render: r => <span>{FormatDay(r)}</span>,
    },
    {
      fixed: 'right',
      title: 'Status',
      width: '80px',
      key: 'status',
      render: r => (
        <Badge
          status={r.status === 'Active' ? 'success' : 'error'}
          text={r.status}
        />
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
          <Button
            style={{padding: 2, margin: 0}}
            type="text"
            disabled={banLoading}
            loading={banLoading}
          >
            <FaUserLock
              onClick={() =>
                BanUser ({
                  id: r.IDNO,
                  status: r.status === 'Active' ? 'InActive' : 'Active',
                })}
            />
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

  return (
    <Table
      size="small"
      columns={columns}
      bordered
      scroll={{
        x: 500,
      }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        position:['topRight']
      }}
      dataSource={userData}
      loading={loading}
    />
  );
};
export default EmployeeTable;
