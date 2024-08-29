import React, {useState} from 'react';
import { Link, Route, Routes} from 'react-router-dom';
import {Layout,theme,Button, Menu,} from 'antd';

import {FaAngleLeft, FaAngleRight,FaBuilding,FaBuildingUser,FaClipboardList,FaDiagramProject,FaFileInvoice,FaListUl,FaServicestack, FaUserCheck, FaUserGear, FaUserGroup, FaUserMinus, FaUserPlus, FaUsers, FaUserSecret, FaUsersGear, FaUserShield, FaWpforms} from 'react-icons/fa6';
import { MdAccountBalance, MdAirlines, MdAnalytics, MdBuild, MdDashboard, MdLocationCity, MdOutlineDateRange, MdOutlineSupportAgent, MdOutlineWork, MdOutlineWorkHistory, MdSettings, MdWork } from 'react-icons/md';
import { PiOfficeChair } from 'react-icons/pi';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import SupportPage from './pages/SupportPage';
import PageNotFound from './pages/PageNotFound';
import logo from './assets/imgs/image.png'

import { SiAwsorganizations, SiOnlyoffice } from 'react-icons/si';
import { BsCalendarDate } from 'react-icons/bs';
import { GrMoney, GrTransaction } from 'react-icons/gr';
import { IoBusiness, IoTimeOutline } from 'react-icons/io5';
import { FaListAlt } from 'react-icons/fa';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import VacancyPage from './pages/vacancy/VacancyPage';
import BranchPage from './pages/organzation/branch/BranchPage';
import DepartmentPage from './pages/organzation/department/DepartmentPage';
import PostionPage from './pages/organzation/postion/PostionPage';
import EmployeePage from './pages/employee/employee/EmployeePage';
import { GoLaw } from 'react-icons/go';
import AgreementPage from './pages/employee/agreement/AgreementPage';
import EmployeeDetail from './pages/employee/employee/EmployeeDetail';

const {Header, Content, Footer, Sider} = Layout;

const App = () => {
  
  const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken ();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: '1',
      label: <Link to={'/dashboard'}>Dashboard</Link>,
      icon: <MdDashboard size={20} />,
    },
    {
      key: '2',
      label: 'Manage Vacancy',
      icon: <MdOutlineWork size={20} />,
      children: [
        {
          key: '21',
          label: <Link to={'/vacancy/list'}><MdOutlineWorkHistory /> Vacancy</Link>,
        },
        {
          key: '22',
          label: <Link to={'/vacancy/applicants'}><FaUserCheck/> Applicants</Link>,
        },
        {
          key: '23',
          label: <Link to={'/vacancy/reports'}><MdAnalytics/> Reports</Link>,
        },
      ],
    },
    {
      key: '5',
      label: 'Organzation',
      icon: <SiAwsorganizations size={20} />,
      children: [
        {
          key: '51',
          label: <Link to={'/organzation/branch'}><MdLocationCity/> Branch</Link>,
        },
        {
          key: '52',
          label: <Link to={'/organzation/department'}><SiOnlyoffice/> Department</Link>,
        },
        {
          key: '53',
          label: <Link to={'/organzation/postion'}><PiOfficeChair/> Postion</Link>,
        },
      ],
    },
    {
      key: '3',
      label: 'Employee',
      icon: <FaBuildingUser size={20} />,
      children: [
        {
          key: '34',
          label: <Link to={'/employee/list'}><FaUsers/> Employee</Link>,
        },
        {
          key: '36',
          label: <Link to={'/employee/agreement'}><GoLaw/> Agreement</Link>,
        },
        {
          key: '35',
          label: <Link to={'/employee/performace'}><FaUsersGear/> Performace</Link>,
          children: [
            {
              key: '351',
              label: <Link to={'/employee/performace/setting'}><MdSettings/> Setting</Link>,
            },
            {
              key: '352',
              label: <Link to={'/employee/performace/list'}><FaWpforms/> Performace</Link>,
            },
          ],
        },
      ],
    },
    {
      key: '20',
      label: 'Manage Project',
      icon: <FaDiagramProject size={20} />,
      children: [
        {
          key: '261',
          label: <Link to={'/project/list'}><MdWork/> Projects</Link>,
        },
        {
          key: '262',
          label: <Link to={'/project/assign'}><FaUserCheck/> Assign</Link>,
        },
      ],
    },
    {
      key: '6',
      label: 'Manage Leave',
      icon: <MdOutlineDateRange size={20} />,
      children: [
        {
          key: '61',
          label: <Link to={'/leave/holiday'}><MdAirlines/> Holidays</Link>,
        },
        {
          key: '62',
          label: <Link to={'/leave/application'}><FaWpforms/> Application</Link>,
        },
        {
          key: '63',
          label: <Link to={'/leave/balance'}><BsCalendarDate/> Balance</Link>,
        },
      ],
    },
    {
      key: '7',
      label: 'Manage Asset',
      icon: <MdAccountBalance size={20} />,
      children: [
        {
          key: '72',
          label: <Link to={'/asset/requests'}><FaClipboardList/> Requests</Link>,
        },
        {
          key: '73',
          label: <Link to={'/asset/list'}><MdAccountBalance/> Asset</Link>,
        },
      ],
    },
    {
      key: '4',
      label: 'Manage Payroll',
      icon: <GrMoney size={20} />,
      children: [
        {
          key: '42',
          label: <Link to={'/payroll/timesheet'}><IoTimeOutline/> TimeSheet</Link>,
        },
        {
          key: '44',
          label: <Link to={'/payroll/deduction'}><FaUserMinus/> Deduction</Link>,
        },
        {
          key: '45',
          label: <Link to={'/payroll/allowance'}><FaUserPlus/> Allowance</Link>,
        },
        {
          key: '41',
          label: <Link to={'/payroll/list'}><FaFileInvoice/> Payroll</Link>,
        },
        {
          key: '46',
          label: <Link to={'/companies/report'}><HiOutlineDocumentReport/> Report</Link>,
        },
      ],
    },
    {
      key: 'grp',
      label: 'Companies',
      type: 'group',
    },
    {
      key: '/Companies',
      label: 'Companies',
      icon: <FaBuilding size={20} />,
      children: [
        {
          key: '/Companies/list',
          label: <Link to={'/companies/list'}><IoBusiness/> Companies</Link>,
        },
        {
          key: '/Companies/req',
          label: <Link to={'/companies/request'}><FaListAlt/> Request</Link>,
        },
        {
          key: '/Companies/plan',
          label: <Link to={'/companies/plan'}><FaListUl/> Plan</Link>,
        },
        {
          key: '/Companies/service',
          label: <Link to={'/companies/service'}><FaServicestack/> Service</Link>,
        },
        {
          key: '/Companies/transation',
          label: <Link to={'/companies/transaction'}><GrTransaction/> Transaction</Link>,
        },
      ],
    },
    {
      key: '14',
      label: <Link to={'/support'}>Payment</Link>,
      icon: <MdOutlineSupportAgent size={20} />,
    },
    {
      key: 'grp',
      label: 'System',
      type: 'group',
    },
    {
      key: '/users',
      label: 'Users',
      icon: <FaUserShield size={20} />,
      children: [
        {
          key: '/users/list',
          label: <Link to={'/users/list'}><FaUserGroup/> Users</Link>,
        },
        {
          key: '/users/access',
          label: <Link to={'/users/access'}><FaUserSecret/> Access</Link>,
        },
      ],
    },
    {
      key: '11',
      label: <Link to={'/support'}>Setting</Link>,
      icon: <MdBuild size={20} />,
    },
    {
      key: '12',
      label: <Link to={'/support'}>Help & Support</Link>,
      icon: <MdOutlineSupportAgent size={20} />,
    },
  ];

  
  const getLevelKeys = items1 => {
    const key = {};
    const func = (items2, level = 1) => {
      items2.forEach (item => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func (item.children, level + 1);
        }
      });
    };
    func (items1);
    return key;
  };
  const levelKeys = getLevelKeys (items);

  const [stateOpenKeys, setStateOpenKeys] = useState ([]);
  const onOpenChange = openKeys => {
    const currentOpenKey = openKeys.find (
      key => stateOpenKeys.indexOf (key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter (key => key !== currentOpenKey)
        .findIndex (key => levelKeys[key] === levelKeys[currentOpenKey]);
      setStateOpenKeys (
        openKeys
          // remove repeat key
          .filter ((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter (key => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys (openKeys);
    }
  };

  return (
    <Layout style={{height: '100vh'}} >
      <Sider
      trigger={null} collapsible collapsed={collapsed}
      theme='dark'
      style={{overflow:'scroll'}}
      >
        <div
          style={{
            width: '100%',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <img src={logo} alt='logo' style={{width:"auto",height:'100%',objectFit:'contain'}}/>
        </div>
        <Menu
            openKeys={stateOpenKeys}
            onOpenChange={onOpenChange}
            theme='dark'
            style={{overflow: 'hidden', width: '100%'}}
            mode="inline"
            items={items}
          />

      </Sider>
      <Layout>
        <Header
          style={{
            padding: '0 8px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
          }}
        >
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <Button
            type="text"
            icon={collapsed ? <FaAngleRight /> : <FaAngleLeft />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 30,
              height: 64,
            }}
          />
          </div>
        </Header>
        <Content
          style={{
            overflow: 'scroll',
            margin: '16px 8px 0',
          }}
        >
          <div
            style={{
              padding: 8,
              minHeight: '100%',
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
            <Route element={<Auth />} path="/" />
            <Route element={<Dashboard />} path="/dashboard" />

            <Route element={<VacancyPage />} path="/vacancy/list" />

            <Route element={<BranchPage />} path="/organzation/branch" />
            <Route element={<DepartmentPage />} path="/organzation/department" />
            <Route element={<PostionPage />} path="/organzation/postion" />

            <Route element={<EmployeePage />} path="/employee/list" />
            <Route element={<EmployeeDetail />} path="/employee/detail/:id" />
            <Route element={<AgreementPage />} path="/employee/agreement" />

            <Route element={<Users />} path="/users/list" />
            
            <Route element={<SupportPage />} path="/support" />
            <Route element={<PageNotFound />} path="*" />

          </Routes>
          </div>
        </Content>
        <Footer
          style={{
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          
          {'SECURE HR TECH '}
          ©
          {new Date ().getFullYear ()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
