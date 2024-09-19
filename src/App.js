import React, {useState} from 'react';
import { Link, Route, Routes} from 'react-router-dom';
import {Layout,theme,Button, Menu,} from 'antd';

import {FaAngleLeft, FaAngleRight,FaBuilding,FaBuildingUser,FaClipboardList,FaDiagramProject,FaFileInvoice,FaListUl,FaServicestack, FaUserCheck, FaUserGroup, FaUserMinus, FaUsers, FaUserSecret, FaUsersGear, FaUserShield, FaWpforms} from 'react-icons/fa6';
import { MdAccountBalance, MdTimer,MdAirlines, MdAnalytics, MdBuild, MdDashboard, MdLocationCity, MdOutlineDateRange, MdOutlineSupportAgent, MdOutlineWork, MdOutlineWorkHistory, MdSettings, MdWork, MdReport } from 'react-icons/md';
import { PiOfficeChair } from 'react-icons/pi';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import SupportPage from './pages/SupportPage';
import PageNotFound from './pages/PageNotFound';
import logo from './assets/imgs/image.png'

import { SiAwsorganizations, SiOnlyoffice } from 'react-icons/si';
import { BsCalendarDate } from 'react-icons/bs';
import { GrMoney } from 'react-icons/gr';
import { IoTimeOutline } from 'react-icons/io5';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import VacancyPage from './pages/vacancy/VacancyPage';
import BranchPage from './pages/organzation/branch/BranchPage';
import DepartmentPage from './pages/organzation/department/DepartmentPage';
import PostionPage from './pages/organzation/postion/PostionPage';
import EmployeePage from './pages/employee/employee/EmployeePage';
import { GoLaw } from 'react-icons/go';
import AgreementPage from './pages/employee/agreement/AgreementPage';
import EmployeeDetail from './pages/employee/employee/EmployeeDetail';
import TimeSheet from './pages/attendance/timesheet/TimeSheet';
import PayrollPage from './pages/payroll/payroll/PayrollPage';
import PayrollReportPage from './pages/payroll/payroll/PayrollReportPage';
import TimeSheetForm from './pages/attendance/timesheet/TimeSheetForm';
import ApplicantList from './pages/vacancy/Applicant/ApplicantList';
import ApplicantDetail from './pages/vacancy/Applicant/ApplicantDetail';
import InterviewPage from './pages/vacancy/interview/InterviewPage';
import InterviewVacancyPage from './pages/vacancy/interview/InterviewVacancyPage';
import ManageLeavePage from './pages/leave/ManageLeavePage';
import LeaveBalancePage from './pages/leave/balance/LeaveBalancePage';
import LeaveApplicationPage from './pages/leave/application/LeaveApplicationPage';

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
          label: <Link to={'/vacancy/interview'}><FaUserCheck/> Interview</Link>,
        },
        {
          key: '23',
          label: <Link to={'/vacancy/reports'}><MdAnalytics/> Reports</Link>,
        },
      ],
    },
    {
      key: '3',
      label: 'Organzation',
      icon: <SiAwsorganizations size={20} />,
      children: [
        {
          key: '31',
          label: <Link to={'/organzation/branch'}><MdLocationCity/> Branch</Link>,
        },
        {
          key: '32',
          label: <Link to={'/organzation/department'}><SiOnlyoffice/> Department</Link>,
        },
        {
          key: '33',
          label: <Link to={'/organzation/postion'}><PiOfficeChair/> Postion</Link>,
        },
      ],
    },
    {
      key: '4',
      label: 'Employee',
      icon: <FaBuildingUser size={20} />,
      children: [
        {
          key: '41',
          label: <Link to={'/employee/list'}><FaUsers/> Employee</Link>,
        },
        {
          key: '42',
          label:<Link to={'/employee/agreement'}><GoLaw/> Agreement</Link>,
        },
        {
          key: '43',
          label: <><FaUsersGear/> Performace</>,
          children: [
            {
              key: '431',
              label: <Link to={'/employee/performace/setting'}><MdSettings/> Setting</Link>,
            },
            {
              key: '432',
              label: <Link to={'/employee/performace/list'}><FaWpforms/> Performace</Link>,
            },
          ],
        },
      ],
    },
    {
      key: '5',
      label: 'Manage Project',
      icon: <FaDiagramProject size={20} />,
      children: [
        {
          key: '51',
          label: <Link to={'/project/list'}><MdWork/> Companies</Link>,
        },
        {
          key: '52',
          label: <Link to={'/project/list'}><MdWork/> Projects</Link>,
        },
        {
          key: '53',
          label: <Link to={'/project/assign'}><FaUserCheck/> Report</Link>,
        },
        {
          key: '54',
          label: <Link to={'/project/assign'}><FaUserCheck/> Tender</Link>,
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
          label: <Link to={'/leave/leaves'}><MdAirlines/> Leaves</Link>,
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
          key: '71',
          label: <Link to={'/asset/requests'}><FaClipboardList/> Requests</Link>,
        },
        {
          key: '72',
          label: <Link to={'/asset/list'}><MdAccountBalance/> Asset</Link>,
        },
      ],
    },

    {
      key: '8',
      label: 'Attendance',
      icon: <MdTimer size={20} />,
      children: [
        {
          key: '81',
          label:<><IoTimeOutline/> TimeSheet</>,
          children: [
            {
              key: '811',
              label: <Link to={'/payroll/timesheet/form'}><FaClipboardList/> Form</Link>,
            },
            {
              key: '812',
              label: <Link to={'/payroll/timesheet/list'}><MdAccountBalance/> List</Link>,
            },
          ],
        },
        {
          key: '82',
          label: <><FaUserMinus/> Attendance</>,
          children: [
            {
              key: '821',
              label: <Link to={'/payroll/timesheet/form'}><FaClipboardList/> Components</Link>,
            },
            {
              key: '822',
              label: <Link to={'/payroll/timesheet/list'}><MdAccountBalance/> Structure</Link>,
            },
            {
              key: '823',
              label: <Link to={'/payroll/timesheet/list'}><MdAccountBalance/> Assignment</Link>,
            },
          ],
        },
      ],
    },
    {
      key: '9',
      label: 'Manage Payroll',
      icon: <GrMoney size={20} />,
      children: [
        {
          key: '91',
          label: <><FaUserMinus/> Salary</>,
          children: [
            {
              key: '911',
              label: <Link to={'/payroll/timesheet/form'}><FaClipboardList/> Components</Link>,
            },
            {
              key: '912',
              label: <Link to={'/payroll/timesheet/list'}><MdAccountBalance/> Structure</Link>,
            },
            {
              key: '913',
              label: <Link to={'/payroll/timesheet/list'}><MdAccountBalance/> Assignment</Link>,
            },
          ],
        },
        {
          key: '92',
          label: <><FaFileInvoice/> Payroll</>,
          children: [
            {
              key: '921',
              label: <Link to={'/payroll/list/all'}><FaUsers/> Payroll</Link>,
            },
            {
              key: '922',
              label: <Link to={'/payroll/list/report'}><HiOutlineDocumentReport/> Report</Link>,
            },
          ],
        },
      ],
    },
    {
      key: '10',
      label: 'Daily Report',
      icon: <MdReport size={20} />,
      children: [
        {
          key: '101',
          label: <Link to={'/dailyteport/list'}><FaClipboardList/> List</Link>,
        },
        {
          key: '102',
          label: <Link to={'/dailyreport/analytics'}><MdAnalytics/> Analytics</Link>,
        },
      ],
    },
    {
      key: 'System',
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
      key: '13',
      label: <Link to={'/setting'}>Setting</Link>,
      icon: <MdBuild size={20} />,
    },
    {
      key: '14',
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
            <Route element={<ApplicantList />} path="/vacancy/applicants/:id" />
            <Route element={<ApplicantDetail />} path="/vacancy/applicant/detail/:id" />

            <Route element={<InterviewPage />} path="/vacancy/interview" />
            <Route element={<InterviewVacancyPage />} path="/vacancy/interview/usedby" />

            <Route element={<BranchPage />} path="/organzation/branch" />
            <Route element={<DepartmentPage />} path="/organzation/department" />
            <Route element={<PostionPage />} path="/organzation/postion" />

            <Route element={<EmployeePage />} path="/employee/list" />
            <Route element={<EmployeeDetail />} path="/employee/detail/:id" />
            <Route element={<AgreementPage />} path="/employee/agreement" />

            <Route element={<ManageLeavePage />} path="/leave/leaves" />
            <Route element={<LeaveApplicationPage />} path="/leave/application" />
            <Route element={<LeaveBalancePage />} path="/leave/balance" />

            <Route element={<Users />} path="/users/list" />

            <Route element={<TimeSheet />} path="/payroll/timesheet/list" />
            <Route element={<TimeSheetForm />} path="/payroll/timesheet/form" />
            <Route element={<PayrollPage />} path="/payroll/list/all" />
            <Route element={<PayrollReportPage />} path="/payroll/list/report" />
            
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
