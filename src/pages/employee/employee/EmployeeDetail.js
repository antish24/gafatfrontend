import {Button, Image, Tabs, Tooltip} from 'antd';
import React, { useState } from 'react';
import EmployeeInfoTab from '../../../components/tabs/employee/EmployeeInfoTab';
import {FaBuilding, FaSchool, FaUserAlt} from 'react-icons/fa';
import {FaHeartPulse, FaUserGear, FaUserLock} from 'react-icons/fa6';
import { MdList, MdPrint, MdReport, MdWorkHistory } from 'react-icons/md';
import ModalForm from '../../../modal/Modal';
import ReportEmployee from '../../../components/forms/employee/ReportEmployee';

const EmployeeDetail = () => {
    const EmployeeInfoData = [
        {key: '1',label: 'Profile',children:<Image alt='profile'/>},
        {key: '2',label: 'ID Front',children:<Image alt='ID Front'/>},
        {key: '3',label: 'ID Back',children:<Image alt='ID Back'/>},
        {key: '4',label: 'Full Name',children:'Abebe Balch Mulu'},
        {key: '5',label: 'Date of Birth',children:'02 jun 1889'},
        {key: '6',label: 'Gender',children:'Male'},
        {key: '7',label: 'Nationality',children:"Ethiopian"},
        {key: '8',label: 'City / Regional',children:"Amhara"},
        {key: '9',label: 'Sub City / Zone',children:"7"},
        {key: '10',label: 'Wereda',children:"09"},
        {key: '11',label: 'Kebele',children:"New"},
        {key: '12',label: 'Email',children:"abebebalch@gmail.com"},
        {key: '13',label: 'Phone',children:"0911755025"},
        {key: '14',label: 'Optional Phone',children:"0911755023"},
      ];

      const WorkInfoData = [
        {key: '1',label: 'Branch',children:'Gonder'},
        {key: '2',label: 'Department',children:"IT"},
        {key: '3',label: 'Postion',children:'Software Dev'},
        {key: '4',label: 'Employee Type',children:'Full Time'},
        {key: '4',label: 'Shift',children:'Normal'},
        {key: '5',label: 'Start Date',children:'02 jun 1889'},
        {key: '6',label: 'Salary',children:'2000'},
        {key: '7',label: 'Agreement',children:"File",span:2},
        {key: '8',label: 'Bank Name',children:"CBE"},
        {key: '9',label: 'Account Number',children:"1000152677889"},
        {key: '10',label: 'Tin',children:"00457281"},
      ];

      const PersonalInfoData = [
        {key: '1',label: 'Marital status',children:'SIngle'},
        {key: '2',label: 'Religion',children:"Ortodox"},
        {key: '3',label: 'Ethnic Group',children:'Afar'},
        {key: '6',label: 'Emergency Contact Name',children:'Abrham Welede'},
        {key: '7',label: 'Emergency Contact Phone',children:'0910778899'},
        {key: '8',label: 'EmergencyContact Relation',children:'Father'},
        {key: '5',label: 'Family',children:'3'},
        {key: '4',label: 'Blood Type',children:'O+'},
        {key: '9',label: 'Medical Report',children:"1000152677889"},
        {key: '10',label: 'FingerPrint Report',children:"00457281"},
      ];

      const SuretyInfoData = [
        {key: '1',label: 'Type',children:'Letter'},
        {key: '2',label: 'Attachment',children:"",span:2},
        {key: '3',label: 'Full Name',children:'Telahun Wase Mula'},
        {key: '4',label: 'Phone',children:'0911664477'},
        {key: '5',label: 'City',children:"Addis Abeba"},
        {key: '6',label: 'Sub City',children:"Yeka"},
        {key: '7',label: 'Wereda',children:"01"},
        {key: '8',label: 'Kebele',children:"13"},
        {key: '9',label: 'House No',children:"New"},
      ];


  const tabs = [
    {
      key: '1',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <FaUserAlt size={20} />Personal Info
        </div>
      ),
      children: <EmployeeInfoTab data={EmployeeInfoData}/>,
    },
    {
      key: '2',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <FaBuilding size={20} />Work Detail
        </div>
      ),
      children: <EmployeeInfoTab data={WorkInfoData}/>,
    },
    {
      key: '3',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <FaHeartPulse size={20} />Personal Info
        </div>
      ),
      children: <EmployeeInfoTab data={PersonalInfoData}/>,
    },
    {
      key: '4',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <MdWorkHistory size={20} />Work History
        </div>
      ),
      children: <EmployeeInfoTab />,
    },
    {
      key: '5',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <FaSchool size={20} />Education
        </div>
      ),
      children: <EmployeeInfoTab />,
    },
    {
      key: '6',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <FaUserGear size={20} />Surety Info
        </div>
      ),
      children: <EmployeeInfoTab data={SuretyInfoData}/>,
    },
    {
      key: '7',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          <MdList size={20} />Log
        </div>
      ),
      children: <EmployeeInfoTab/>,
    },
  ];

  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={'Report Employee Form'}
          content={<ReportEmployee reload={()=>console.log('fun')} openModalFun={(e) => setModalOpen(e)}/>}
        />
      <div style={{display:'flex',gap:'10px',justifyContent:'flex-end'}}>
        <Tooltip title='Print'><Button><MdPrint/>Print</Button></Tooltip>
        <Tooltip title='Status'><Button type='primary'><FaUserLock/>Status</Button></Tooltip>
        <Tooltip title='Report'><Button onClick={()=>setModalOpen(true)} danger><MdReport color='red'/>Report</Button></Tooltip>
      </div>
      <Tabs defaultActiveKey="1" items={tabs} style={{width: '100%'}} />
    </div>
  );
};

export default EmployeeDetail;
