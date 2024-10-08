import React from 'react';
import BarChart from '../../components/graph/BarChart';

const LeaveReportPage = () => {
  const monthlyLeaves = {
    labels: ['Jun', 'Jul', 'Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'],
    datasets: [
      {
        label: 'Quantity',
        data: [2, 4, 1,13,8,4,19,4,11,8,19,23],
        borderColor: 'rgba(54, 162, 235,1)',
        backgroundColor: 'rgba(54, 162, 235,.5)',
      },
    ],
  };

  const positionWise = {
    labels: ['Software Dev', 'Guard', 'Sales'],
    datasets: [
      {
        label: 'Quantity',
        data: [1, 2, 1],
        borderColor: 'rgba(54, 162, 235,1)',
        backgroundColor: 'rgba(54, 162, 235,.5)',
      },
    ],
  };

  const branchWise = {
    labels: ['Leme Hotel', 'Head Office'],
    datasets: [
      {
        label: 'Quantity',
        data: [2, 0],
        borderColor: 'rgba(54, 162, 235,1)',
        backgroundColor: 'rgba(54, 162, 235,.5)',
      },
    ],
  };

  const hireReport = {
    labels: ['Pending','Waiting','Hired'],
    datasets: [
      {
        label: 'Quantity',
        data: [2, 4,1],
        borderColor: 'rgba(54, 162, 235,1)',
        backgroundColor: 'rgba(54, 162, 235,.5)',
      },
    ],
  };

  const vacancyReport = {
    labels: ['Open','Close'],
    datasets: [
      {
        label: 'Quantity',
        data: [2, 4],
        borderColor: 'rgba(54, 162, 235,1)',
        backgroundColor: 'rgba(54, 162, 235,.5)',
      },
    ],
  };

  const sexReport = {
    labels: ['Male','Female','Both'],
    datasets: [
      {
        label: 'Quantity',
        data: [2,1, 4],
        borderColor: 'rgba(54, 162, 235,1)',
        backgroundColor: 'rgba(54, 162, 235,.5)',
      },
    ],
  };

  const monthlyOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Leave Applications',
      },
    },
  };

  const vacancyOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Report',
      },
    },
  };

  const braOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Open Application Wise',
      },
    },
  };

  const posOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Position Wise Leave',
      },
    },
  };

   const hireOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Applicant Status',
      },
    },
  };

  const sexOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Applicant Sex',
      },
    },
  };

  return (
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:"space-between",rowGap:'10px',width:'100%'}}>
      <div style={{width: '32%',padding:'5px',background:"rgb(250,250,250)",borderRadius:'5px'}}>
        <BarChart lineData={branchWise} options={braOptions} />
      </div>

      <div style={{width: '32%',padding:'5px',background:"rgb(250,250,250)",borderRadius:'5px'}}>
        <BarChart lineData={monthlyLeaves} options={monthlyOptions} />
      </div>

      <div style={{width: '32%',padding:'5px',background:"rgb(250,250,250)",borderRadius:'5px'}}>
        <BarChart lineData={positionWise} options={posOptions} />
      </div>

      <div style={{width: '32%',padding:'5px',background:"rgb(250,250,250)",borderRadius:'5px'}}>
        <BarChart lineData={hireReport} options={hireOptions} />
      </div>

      <div style={{width: '32%',padding:'5px',background:"rgb(250,250,250)",borderRadius:'5px'}}>
        <BarChart lineData={vacancyReport} options={vacancyOptions} />
      </div>

      <div style={{width: '32%',padding:'5px',background:"rgb(250,250,250)",borderRadius:'5px'}}>
        <BarChart lineData={sexReport} options={sexOptions} />
      </div>
    </div>
  );
};

export default LeaveReportPage;
