import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { BACKENDURL } from '../../../helper/Urls';
import ModalForm from '../../../modal/Modal';
import CompanyTable from '../../../components/tables/project/CompanyTable';
import NewCompanyForm from '../../../components/forms/project/NewCompanyForm';

const CompanyPage = () => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const getCompanyData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKENDURL}/company/all`); // Adjust URL if needed
      console.log('Fetched Data:', res.data); // Check API response
      setCompanyData(res.data.data || res.data); // Adjust based on API response structure
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch company data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCompanyData();
  }, [getCompanyData]);

  return (
    <div>
      <div style={{ height: '50px', display: 'flex', gap: '10px' }}>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add New Company
        </Button>
        <Button type="default" onClick={getCompanyData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen(false)}
          title={'New Company Form'}
          content={<NewCompanyForm reload={getCompanyData} openModalFun={setModalOpen} />}
        />
      </div>
      <CompanyTable loading={loading} datas={companyData} />
    </div>
  );
};

export default CompanyPage;