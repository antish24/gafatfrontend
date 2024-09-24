import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Spin } from 'antd';
import { MdDashboard, MdWork, MdOutlineDateRange } from 'react-icons/md';
import { FaClipboardList, FaUserShield, FaUserCheck, FaProjectDiagram, FaBuilding, FaUsers, FaToolbox } from 'react-icons/fa';
import { BACKENDURL } from '../helper/Urls';

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(null);
  const [vacancyCount, setVacancyCount] = useState(null);
  const [projectCount, setProjectCount] = useState(null);
  const [assetCount, setAssetCount] = useState(null);
  const [branchCount, setBranchcount] =useState(null);
  const [departmentCount, setDepartmentCount] =useState(null);
  const [companyCount, setCompanyCount] = useState(null);
  const [positionCount, setPositionCount] = useState(null);

  // Fetch the counts from APIs (replace with your actual API calls)
  useEffect(() => {
    // Fetch employee count
    fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setEmployeeCount(data.employeeCount)
      )
      .catch(() => setEmployeeCount(0));

    // Fetch vacancy count
    fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setVacancyCount(data.vacancyCount))
      .catch(() => setVacancyCount(0));

    // Fetch project count
    fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setProjectCount(data.projectCount))
      .catch(() => setProjectCount(0));


      fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setBranchcount(data.branchCount))
      .catch(() => setBranchcount(0));

      fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setDepartmentCount(data.departmentCount))
      .catch(() => setDepartmentCount(0));

      fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setCompanyCount(data.companyCount))
      .catch(() => setCompanyCount(0));

      fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setPositionCount(data.positionCount))
      .catch(() => setPositionCount(0));

    // Fetch asset count
    fetch(`${BACKENDURL}/dashboard/counts`) // Replace with actual API endpoint
      .then((response) => response.json())
      .then((data) => setAssetCount(data.assetCount))
      .catch(() => setAssetCount(0));
  }, []);

  const cardData = [
    {
      title: 'Dashboard',
      icon: <MdDashboard size={40} />,
      link: '/dashboard',
      count: employeeCount,
    },
    {
      title: 'Manage Vacancy',
      icon: <MdWork size={40} />,
      link: '/vacancy/list',
      count: vacancyCount,
    },
    {
      title: 'Projects',
      icon: <FaProjectDiagram size={40} />,
      link: '/project/list',
      count: projectCount,
    },
    {
      title: 'Branch',
      icon: <MdOutlineDateRange size={40} />,
      link: '/timesheet/list',
      count: branchCount,
    },
    {
      title: 'Departemnt',
      icon: <FaClipboardList size={40} />,
      link: '/organzation/department',
      count: departmentCount,
    },
    {
      title: 'Users',
      icon: <FaUserShield size={40} />,
      link: '/users/list',
      count: null,
    },
    {
      title: 'Position',
      icon: <FaUserCheck size={40} />,
      link: '/vacancy/interview',
      count: positionCount,
    },
    {
      title: 'Company',
      icon: <FaBuilding size={40} />,
      link: '/project/company',
      count: companyCount,
    },
    {
      title: 'Employee',
      icon: <FaUsers size={40} />,
      link: '/employee/list',
      count: employeeCount,
    },
    {
      title: 'Manage Project',
      icon: <FaProjectDiagram size={40} />,
      link: '/manage/project',
      count: projectCount,
    },
    {
      title: 'Asset',
      icon: <FaToolbox size={40} />,
      link: '/asset/inventorypage',
      count: assetCount,
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        {cardData.map((card, index) => (
          <Col xs={24} sm={12} md={8} lg={6} key={index}>
            <Link to={card.link}>
              <Card
                hoverable
                style={{ borderRadius: '10px', textAlign: 'center' }}
              >
                <div>{card.icon}</div>
                <h3>{card.title}</h3>
                {card.count !== null ? (
                  <p>{card.count} {card.title === 'Employee' ? 'Employees' : 'Items'}</p>
                ) : (
                  <Spin /> // Show spinner if data is still loading
                )}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
