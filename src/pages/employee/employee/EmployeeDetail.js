import {Button, Image, Tabs, Tag, Tooltip} from 'antd';
import React, {useState, useContext, useEffect} from 'react';
import EmployeeInfoTab from '../../../components/tabs/employee/EmployeeInfoTab';
import {FaBuilding, FaSchool, FaUserAlt} from 'react-icons/fa';
import {FaHeartPulse, FaUserGear, FaUserLock} from 'react-icons/fa6';
import {MdList, MdPrint, MdReport, MdWorkHistory} from 'react-icons/md';
import {GiExitDoor} from 'react-icons/gi';
import ModalForm from '../../../modal/Modal';
import ReportEmployee from '../../../components/forms/employee/ReportEmployee';
import TextArea from 'antd/es/input/TextArea';
import {BACKENDURL} from '../../../helper/Urls';
import {AlertContext} from '../../../context/AlertContext';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const EmployeeDetail = () => {
  const {openNotification} = useContext (AlertContext);
  const params = useParams ();
  const [personalInfo, setPersonalInfo] = useState ([]);
  const [loadingPersonalInfo, setLoadingPersonalInfo] = useState (false);

  const getPersonalInfo = async () => {
    setLoadingPersonalInfo (true);
    try {
      const res = await axios.get (
        `${BACKENDURL}/employee/detail/personalinfo?id=${params.id}`
      );
      setLoadingPersonalInfo (false);
      console.log (res.data.employee);
      setPersonalInfo (res.data.employee);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoadingPersonalInfo (false);
    }
  };

  useEffect (() => {
    getPersonalInfo ();
  }, []);

  const EmployeeInfoData = [
    {
      key: '1',
      label: 'Profile',
      children: (
        <Image
          src={`${BACKENDURL}/uploads/new/${personalInfo.profile}`}
          alt="profile"
          width={30}
          height={30}
        />
      ),
      name: 'profile',
      type: 'File',
      width: '32%',
      req: 'image/*',
    },
    {
      key: '2',
      label: 'ID Front',
      children: (
        <Image
          src={`${BACKENDURL}/uploads/new/${personalInfo.IDFront}`}
          alt="ID Front"
          width={30}
          height={30}
        />
      ),
      name: 'IDF',
      type: 'File',
      width: '32%',
      req: 'image/*',
    },
    {
      key: '3',
      label: 'ID Back',
      children: (
        <Image
          src={`${BACKENDURL}/uploads/new/${personalInfo.IDBack}`}
          alt="ID Back"
          width={30}
          height={30}
        />
      ),
      name: 'IDB',
      type: 'File',
      width: '32%',
      req: '.tml',
    },
    {
      key: '4',
      label: 'Full Name',
      children: personalInfo.fName +' ' + personalInfo.mName +' ' + (personalInfo.lName?personalInfo.lName:''),
      name: 'fullName',
      type: 'Input',
      width: '69%',
    },
    {
      key: '5',
      label: 'Date of Birth',
      children: '02 jun 1889',
      name: 'dateOfBirth',
      type: 'Date',
      width: '30%',
    },
    {
      key: '6',
      label: 'Gender',
      children: 'Male',
      name: 'sex',
      type: 'Select',
      options: [
        {value: 'Male', lable: 'Male'},
        {value: 'Female', lable: 'Female'},
      ],
      width: '25%',
    },
    {
      key: '7',
      label: 'Nationality',
      children: 'Ethiopian',
      name: 'nationality',
      type: 'Input',
      width: '40%',
    },
    {
      key: '8',
      label: 'City / Regional',
      children: 'Amhara',
      name: 'city',
      type: 'Input',
      width: '33%',
    },
    {
      key: '9',
      label: 'Sub City / Zone',
      children: '7',
      name: 'subCity',
      type: 'Input',
      width: '35%',
    },
    {
      key: '10',
      label: 'Wereda',
      children: '09',
      name: 'wereda',
      type: 'Input',
      width: '25%',
    },
    {
      key: '11',
      label: 'Kebele',
      children: '3',
      name: 'kebele',
      type: 'Input',
      width: '17%',
    },
    {
      key: '11',
      label: 'House No',
      children: 'New',
      name: 'houseNo',
      type: 'Input',
      width: '20%',
    },
    {
      key: '12',
      label: 'Email',
      children: 'abebebalch@gmail.com',
      name: 'email',
      type: 'Input',
      width: '50%',
      notRequired: true,
    },
    {
      key: '13',
      label: 'Phone',
      children: '0911755025',
      name: 'phone',
      type: 'Input',
      width: '25%',
    },
    {
      key: '14',
      label: 'Optional Phone',
      children: '0911755023',
      name: 'otherPhone',
      type: 'Input',
      notRequired: true,
      width: '24%',
    },
  ];

  const WorkInfoData = [
    {key: '1', label: 'Branch', children: 'Gonder'},
    {key: '2', label: 'Department', children: 'IT'},
    {key: '3', label: 'Postion', children: 'Software Dev'},
    {key: '4', label: 'Employee Type', children: 'Full Time'},
    {key: '4', label: 'Shift', children: 'Normal'},
    {key: '5', label: 'Start Date', children: '02 jun 1889'},
    {key: '6', label: 'Salary', children: '2000'},
    {
      key: '7',
      label: 'Agreement',
      children: (
        <a
          target="_blank"
          href={`${BACKENDURL}/uploads/bulletproof flyer.pdf`}
          alt="profile"
        >
          View
        </a>
      ),
      span: 2,
    },
    {key: '8', label: 'Bank Name', children: 'CBE'},
    {key: '9', label: 'Account Number', children: '1000152677889'},
    {key: '10', label: 'Tin', children: '00457281'},
  ];

  const PersonalInfoData = [
    {key: '1', label: 'Marital status', children: 'Single'},
    {key: '2', label: 'Religion', children: 'Ortodox'},
    {key: '3', label: 'Ethnic Group', children: 'Afar'},
    {key: '6', label: 'Emergency Contact Name', children: 'Abrham Welede'},
    {key: '7', label: 'Emergency Contact Phone', children: '0910778899'},
    {key: '8', label: 'EmergencyContact Relation', children: 'Father'},
    {key: '5', label: 'Family', children: '3'},
    {key: '4', label: 'Blood Type', children: 'O+'},
    {
      key: '9',
      label: 'Medical Report',
      children: (
        <a
          target="_blank"
          href={`${BACKENDURL}/uploads/bulletproof flyer.pdf`}
          alt="profile"
        >
          View
        </a>
      ),
    },
    {
      key: '10',
      label: 'FingerPrint Report',
      children: (
        <Image
          src={`${BACKENDURL}/uploads/${personalInfo.profile}`}
          alt="profile"
          width={30}
          height={30}
        />
      ),
    },
  ];

  const SuretyInfoData = [
    {key: '1', label: 'Type', children: 'Letter'},
    {
      key: '2',
      label: 'Attachment',
      span: 2,
      children: (
        <Image
          src={`${BACKENDURL}/uploads/${personalInfo.profile}`}
          alt="profile"
          width={30}
          height={30}
        />
      ),
    },
    {key: '3', label: 'Full Name', children: 'Telahun Wase Mula'},
    {key: '4', label: 'Phone', children: '0911664477'},
    {key: '5', label: 'City', children: 'Addis Abeba'},
    {key: '6', label: 'Sub City', children: 'Yeka'},
    {key: '7', label: 'Wereda', children: '01'},
    {key: '8', label: 'Kebele', children: '13'},
    {key: '9', label: 'House No', children: 'New'},
  ];

  const TerminationData = [
    {key: '1', label: 'Termination Date', children: '05 oct 2025'},
    {key: '9', label: 'Start Date', children: '01 oct 2025'},
    {
      key: '7',
      label: 'Clearance ',
      children: <Tag color="warning">Pending</Tag>,
    },
    {
      key: '2',
      label: 'Reason for Termination',
      children: <TextArea />,
      span: 3,
    },
    {key: '3', label: 'Exit Interview', children: <TextArea />, span: 3},
    {
      key: '4',
      label: 'Employee Acknowledgment',
      children: <TextArea />,
      span: 3,
    },
    {key: '8', label: 'Employee Letter', children: <TextArea />, span: 3},
    {
      key: '5',
      label: 'Confidentiality and Non-Disclosure Agreements',
      children: (
        <a
          target="_blank"
          href={`${BACKENDURL}/uploads/bulletproof flyer.pdf`}
          alt="profile"
        >
          View
        </a>
      ),
      span: 3,
    },
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
      children: <EmployeeInfoTab id={params.id} data={EmployeeInfoData} />,
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
      children: <EmployeeInfoTab data={WorkInfoData} />,
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
      children: <EmployeeInfoTab data={PersonalInfoData} />,
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
      children: <EmployeeInfoTab data={SuretyInfoData} />,
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
          <GiExitDoor size={20} />Termination{' '}
        </div>
      ),
      children: <EmployeeInfoTab data={TerminationData} />,
    },
    {
      key: '8',
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
      children: <EmployeeInfoTab />,
    },
  ];

  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <ModalForm
        open={modalOpen}
        close={() => setModalOpen (false)}
        title={'Report Employee Form'}
        content={
          <ReportEmployee
            reload={() => console.log ('fun')}
            openModalFun={e => setModalOpen (e)}
          />
        }
      />
      <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
        <Tooltip title="Print"><Button><MdPrint />Print</Button></Tooltip>
        <Tooltip title="Status">
          <Button type="primary"><FaUserLock />Status</Button>
        </Tooltip>
        <Tooltip title="Report">
          <Button onClick={() => setModalOpen (true)} danger>
            <MdReport color="red" />Report
          </Button>
        </Tooltip>
      </div>
      <Tabs defaultActiveKey="1" items={tabs} style={{width: '100%'}} />
    </div>
  );
};

export default EmployeeDetail;
