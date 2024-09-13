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
import {FaUserLock, FaUsers} from 'react-icons/fa6';
import {MdClose, MdDelete, MdEdit, MdViewAgenda} from 'react-icons/md';
import {FormatDateTime} from '../../../helper/FormatDate';
import ModalForm from '../../../modal/Modal';
import {AlertContext} from '../../../context/AlertContext';
import {BACKENDURL} from '../../../helper/Urls';
import axios from 'axios';
import {CSVLink} from 'react-csv';
import { IoMdEyeOff } from 'react-icons/io';
import { Link } from 'react-router-dom';
import UpdateInterviewForm from '../../forms/vacancy/UpdateInterviewForm';
import { LuFileStack } from 'react-icons/lu';

const InterviewTable = ({interviewData, loading, reload}) => {
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
      key: 'IDNO',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      ...getColumnSearchProps ('title'),
      width: '200px',
      key: 'title',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      width: '150px',
      key: 'createdAt',
      render: r => <span>{FormatDateTime (r)}</span>,
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
      width: '100px',
      fixed: 'right',
      key: 'operation',
      render: r => (
        <Space
          style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}
        >
          <Button style={{padding:'0',margin:'0'}}
            type="text"
            onClick={() => {
              setModalOpen (true);
              setModalContent (r.IDNO);
            }}
          >
            <MdEdit />
          </Button>
          <Button style={{padding:'0',margin:'0'}}
            type="text"
          >
            <IoMdEyeOff/>
          </Button>
            <Link
              to={`/vacancy/interview/usedby`}
            >
              <LuFileStack />
            </Link>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <CSVLink data={interviewData}>Download me</CSVLink>
      <ModalForm
        open={modalOpen}
        close={() => setModalOpen (false)}
        title={<Divider>Update Interview</Divider>}
        content={
          <UpdateInterviewForm
            id={modalContent}
            reload={() => reload ()}
            openModalFun={e => setModalOpen (e)}
          />
        }
      />
      <Table
        size="small"
        columns={columns}
        scroll={{
          x: 500,
        }}
        pagination={{
          defaultPageSize: 7,
          showSizeChanger: false,
        }}
        dataSource={interviewData}
        loading={loading}
      />
    </div>
  );
};
export default InterviewTable;