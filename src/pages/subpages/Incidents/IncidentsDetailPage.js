import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Descriptions, Image, Popconfirm, Skeleton, Tag} from 'antd';
import {useParams} from 'react-router-dom';
import {BACKENDURL} from '../../../helper/Urls';
import {AlertContext} from '../../../context/AlertContext';
import {FormatDay} from '../../../helper/FormateDay';

const IncidentsDetailPage = () => {
  const {openNotification} = useContext (AlertContext);

  const [incident, setIncident] = useState ([]);
  const [loading, setLoading] = useState (false);
  const [loadingApprove, setLoadingApprove] = useState (false);
  const [loadingReject, setLoadingReject] = useState (false);
  const params = useParams ();

  const getincident = async () => {
    setLoading (true);
    try {
      const res = await axios.get (
        `${BACKENDURL}/incidents/detail?id=${params.id}`
      );
      setLoading (false);
      setIncident (res.data.detail);
      console.log (res.data);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  };

  const approveReport = async () => {
    setLoadingApprove (true);
    try {
      const res = await axios.get (
        `${BACKENDURL}/incidents/approve?id=${params.id}`
      );
    setLoadingApprove (false);
    getincident()
    openNotification ('success', res.data.message, 3, 'green');
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoadingApprove (false);
    }
  };

  const rejectReport = async () => {
    setLoadingReject (true);
    try {
      const res = await axios.get (
        `${BACKENDURL}/incidents/reject?id=${params.id}`
      );
      openNotification ('success', res.data.message, 3, 'green');
      getincident()
      setLoadingReject (false);
    } catch (error) {
      openNotification ('error', error.response.data.message, 3, 'red');
      setLoadingReject (false);
    }
  };

  useEffect (() => {
    getincident ();
  }, []);


  const employeeinfo = [
    {
      key: '0',
      label: 'IDNO',
      children: incident.employeeIdNo,
    },
    {
      key: '1',
      label: 'FullName',
      span: 2,
      children: incident.employeeFirstname + ' ' + incident.employeeLastname,
    },
    {
      key: '2',
      label: 'Job Title',
      children: incident.jobTitle,
    },
    {
      key: '3',
      label: 'Company',
      children: incident.companyName + 'uglhiuu ytviut76 ytvit',
    },
    {
      key: '6',
      label: 'Status',
      children: (
        <Tag color={incident.workstatus === 'Active' ? 'success' : 'error'}>
          {incident.workstatus}
        </Tag>
      ),
    },
    {
      key: '4',
      label: 'Start Date',
      children: <span>{FormatDay (incident.startDate)}</span>,
    },
    {
      key: '5',
      label: 'End Date',
      children: <span>{FormatDay (incident.endDate)}</span>,
    },
  ];

  const report = [
    {
      key: '1',
      label: 'Incidents',
      children: incident.incidents,
    },
    {
      key: '2',
      label: 'Incident Magnitude',
      children: (
        <Tag
          color={incident.incidentMagnitude === 'High' ? 'error' : 'warning'}
        >
          {incident.incidentMagnitude}
        </Tag>
      ),
    },
    {
      key: '3',
      label: 'Incident Date',
      children: <span>{FormatDay (incident.incidentDate)}</span>,
    },
    {
      key: '4',
      label: 'Note',
      span: 3,
      children: incident.note +
        'hooooi  iuehytiuly  my name is anteneh ashenafi abera i work for t',
    },
    {
      key: '5',
      label: 'Attachments',
      children: <Image src={incident.Attachments} alt="attachments" />,
    },
    {
      key: '7',
      label: 'Reporter Name',
      children: <span>{incident.reportername}</span>,
    },
    {
      key: '8',
      label: 'Reporter Phone',
      children: <span>{incident.reporterphone}</span>,
    },
    {
      key: '6',
      label: 'Status',
      children: (
        <Tag
          color={
            incident.status === 'Approved'
              ? 'success'
              : incident.status === 'Pending' ? 'warning' : 'error'
          }
        >
          {incident.status}
        </Tag>
      ),
    },
    {
      key: '9',
      label: 'Reported Date',
      children: <span>{FormatDay (incident.createdAt)}</span>,
    },
    {
      key: '10',
      label: 'Updated At',
      children: <span>{FormatDay (incident.updatedAt)}</span>,
    },
  ];

  return (
    <div>
      <div style={{display: 'flex',gap:'10px'}}>
        <Popconfirm onConfirm={approveReport} title='Are you sure? Approve Report' ><Button type='primary' disabled={loading || loadingApprove} loading={loadingApprove}>Approve</Button></Popconfirm>
        <Popconfirm onConfirm={rejectReport} title='Are you sure? Reject Report'><Button danger disabled={loading || loadingReject} loading={loadingReject}>Reject</Button></Popconfirm>
      </div>
      {!loading?
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
        <Descriptions
          size="small"
          style={{width: '500px'}}
          title="Employee Info"
          items={employeeinfo}
          layout="vertical"
          bordered
        />
        <Descriptions
          size="small"
          style={{width: '500px'}}
          title="Incident Report"
          items={report}
          layout="vertical"
          bordered
        />
      </div>:
      <Skeleton/>}
    </div>
  );
};

export default IncidentsDetailPage;
