import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalForm from '../../modal/Modal';
import { Button, Modal } from 'antd';
import { BACKENDURL } from '../../helper/Urls';
import NewRequestForm from '../../components/forms/asset/NewRequestForm';
import RequestTable from '../../components/tables/inventory/RequestTable';

const RequestPage = () => {
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const getRequestData =async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKENDURL}/request/all`); // Adjust URL to match your backend
      setRequestData(res.data.data || res.data); // Adjust based on API response structure
    } catch (error) {
      console.error('Failed to fetch request data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequestData();
  }, []);

  return (
    <div>
      <div style={{ height: '50px', display: 'flex', gap: '10px' }}>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add New Request
        </Button>
        <Button type="default" onClick={getRequestData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen(false)}
          title={'New Request Form'}
          content={<NewRequestForm reload={getRequestData} openModalFun={setModalOpen} />}
        />
      </div>

      <RequestTable
        loading={loading} 
        requestData={requestData} 
        reload={getRequestData}
      />
    </div>
  );
};

export default RequestPage;