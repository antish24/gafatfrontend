import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import ProjectTable from '../../../components/tables/project/ProjectTable';
import NewProjectForm from '../../../components/forms/project/NewProjectForm';
import ModalForm from '../../../modal/Modal';
import { BACKENDURL } from '../../../helper/Urls';

const ProjectsPage = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch project data
  const getProjectData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKENDURL}/project/all`); // Adjust URL if needed
      console.log('Fetched Project Data:', res.data); // Check API response
      setProjectData(res.data.data || res.data); // Adjust based on API response structure
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch project data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getProjectData();
  }, [getProjectData]);

  return (
    <div>
      <div style={{ height: '50px', display: 'flex', gap: '10px' }}>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add New Project
        </Button>
        <Button type="default" onClick={getProjectData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen(false)}
          title={'New Project Form'}
          content={<NewProjectForm reload={getProjectData} openModalFun={setModalOpen} />}
        />
      </div>
      <ProjectTable loading={loading} datas={projectData} setProjectData={setProjectData} />
    </div>
  );
};

export default ProjectsPage;