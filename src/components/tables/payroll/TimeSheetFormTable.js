import React, {useRef, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {
  Form,
  Space,
  Button,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from 'antd';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <Input />;
  return (
    <td {...restProps}>
      {editing
        ? <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        : children}
    </td>
  );
};
const TimeSheetFormTable = ({timesheetData}) => {
  const [form] = Form.useForm ();
  const [data, setData] = useState (timesheetData);
  const [editingKey, setEditingKey] = useState ('');
  const isEditing = record => record.key === editingKey;
  const edit = record => {
    form.setFieldsValue ({
      address: '',
      regularHour: '',
      RPOTHour: '',
      OT32: '',
      totalHour: '',
      specialHour: '',
      ...record,
    });
    setEditingKey (record.key);
  };

  const cancel = () => {
    setEditingKey ('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields ();
      const newData = [...data];
      const index = newData.findIndex (item => key === item.IDNO);
      if (index > -1) {
        const item = newData[index];
        newData.splice (index, 1, {
          ...item,
          ...row,
        });
        setData (newData);
        setEditingKey ('');
        console.log (newData.find(item => key === item.IDNO));
      } else {
        newData.push (row);
        setData (newData);
        setEditingKey ('');
      }
    } catch (errInfo) {
      console.log ('Validate Failed:', errInfo);
    }
  };

  const [searchedColumn, setSearchedColumn] = useState ('');
  const [searchText, setSearchText] = useState ('');
  const searchInput = useRef (null);

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
    // onFilterDropdownOpenChange: (visible) => {
    //   if (visible) {
    //     setTimeout(() => searchInput.current?.select(), 100);
    //   }
    // },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     searchText
    //   ) : (
    //     text
    //   ),
  });

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
      ],
    },
    {
      title: 'Regular Place Hour',
      dataIndex: 'regularHour',
      key: 'regularHour',
      width: '80px',
      editable: true,
    },
    {
      title: '32 Over Time',
      dataIndex: 'OT32',
      key: 'OT32',
      editable: true,
      width: '80px',
    },

    {
      title: 'Regular Place OT Hour',
      dataIndex: 'RPOTHour',
      key: 'RPOTHour',
      editable: true,
      width: '80px',
    },
    {
      title: 'Special Place Hour',
      dataIndex: 'specialHour',
      key: 'specialHour',
      editable: true,
      width: '80px',
    },
    {
      title: 'Total Hour',
      dataIndex: 'totalHour',
      width: '80px',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: '200px',
      render: (_, record) => {
        const editable = isEditing (record);
        return editable
          ? <span>
              <Typography.Link
                onClick={() => save (record.IDNO)}
                style={{
                  marginInlineEnd: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          : <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit (record)}
            >
              Edit
            </Typography.Link>;
      },
    },
  ];
  const mergedColumns = columns.map (col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing (record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          position: ['topRight'],
        }}
      />
    </Form>
  );
};
export default TimeSheetFormTable;
