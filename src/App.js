import React, {useState} from 'react';
import { Link, Route, Routes} from 'react-router-dom';
import {Layout,theme,Button, Menu,} from 'antd';

import {FaAngleLeft, FaAngleRight,FaUser, FaUserCheck, FaUsers, FaUserShield} from 'react-icons/fa6';
import { MdDashboard, MdOutlineAnalytics, MdOutlineHomeWork, MdOutlineSupportAgent, MdSearch, MdSecurity } from 'react-icons/md';
import { PiBuildingOfficeFill } from 'react-icons/pi';
import { TbReportAnalytics, TbReportSearch } from 'react-icons/tb';

import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Incidents from './pages/Incidents';
import Employee from './pages/Employee';
import IncidentsDetailPage from './pages/subpages/Incidents/IncidentsDetailPage';
import UsersAccessPage from './pages/subpages/users/UsersAccessPage';
import IncidentsAnalyticsPage from './pages/subpages/Incidents/IncidentsAnalyticsPage';
import EmployeeDetailPage from './pages/subpages/employee/EmployeeDetailPage';
import EmployeeAnalytics from './pages/subpages/employee/EmployeeAnalytics';
import Company from './pages/Company';
import CompanyAnalytics from './pages/subpages/company/CompanyAnalytics';
import SupportPage from './pages/SupportPage';
import PageNotFound from './pages/PageNotFound';
import EmployeeSearch from './pages/subpages/employee/EmployeeSearch';

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
      label: 'Employees',
      icon: <FaUserCheck size={20} />,
      children: [
        {
          key: '22',
          label: <Link to={'/employees'}><FaUserCheck/> List</Link>,
        },
        {
          key: '21',
          label: <Link to={'/employee'}><MdSearch/> Search</Link>,
        },
        {
          key: '23',
          label: <Link to={'/employees/analytics'}><MdOutlineAnalytics /> Analytics</Link>,
        },
      ],
    },
    {
      key: '3',
      label: 'Company',
      icon: <PiBuildingOfficeFill size={20} />,
      children: [
        {
          key: '22',
          label: <Link to={'/companys'}><MdOutlineHomeWork/> List</Link>,
        },
        {
          key: '23',
          label: <Link to={'/companys/analytics'}><MdOutlineAnalytics /> Analytics</Link>,
        },
      ],
    },
    {
      key: '4',
      label: 'Incidents',
      icon: <TbReportSearch size={20} />,
      children: [
        {
          key: '42',
          label: <Link to={'/incidents'}><TbReportAnalytics />List</Link>,
        },
        {
          key: '43',
          label: <Link to={'/incidents/analytics'}><MdOutlineAnalytics/> Analytics</Link>,
        },
      ],
    },
    {
      key: '5',
      label: 'Users',
      icon: <FaUserShield size={20} />,
      children: [
        {
          key: '51',
          label: <Link to={'/users'}><FaUsers/> List</Link>,
        },
        {
          key: '52',
          label: <Link to={'/users/access'}><MdSecurity/> Access</Link>,
        },
      ],
    },
    {
      type: 'divider',
    },
    {
      key: '/support',
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
      >
        <div
          style={{
            width: '100%',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <FaUser size={35} color='white'/>
          <span style={{color: 'white', fontWeight: 'bold',display:collapsed?"none":'flex'}}>Admin</span>
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

            <Route element={<Users />} path="/users" />
            <Route element={<UsersAccessPage />} path="/users/access" />

            <Route element={<Incidents />} path="/incidents" />
            <Route element={<IncidentsAnalyticsPage />} path="/incidents/analytics" />
            <Route element={<IncidentsDetailPage />} path="/incident/:id" />

            <Route element={<Employee />} path="/employees" />
            <Route element={<EmployeeSearch />} path="/employee" />
            <Route element={<EmployeeDetailPage />} path="/employee/:id" />
            <Route element={<EmployeeAnalytics />} path="/employees/analytics" />

            <Route element={<Company />} path="/companys" />
            <Route element={<CompanyAnalytics />} path="/companys/analytics" />
            
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
          
          {'BlackList Employee '}
          ©
          {new Date ().getFullYear ()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
