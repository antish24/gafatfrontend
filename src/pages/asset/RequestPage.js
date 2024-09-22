import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ModalForm from '../../modal/Modal';
import { Button, Modal } from 'antd';
import { BACKENDURL } from '../../helper/Urls';
import NewRequestForm from '../../components/forms/asset/NewRequestForm';
import RequestTable from '../../components/tables/inventory/RequestTable';
import ReturnTable from '../../components/tables/inventory/ReturnTable';

const RequestPage = () => {
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null); // To hold the selected request for return

  const getRequestData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKENDURL}/request/all`); // Adjust URL to match your backend
      setRequestData(res.data.data || res.data); // Adjust based on API response structure
    } catch (error) {
      console.error('Failed to fetch request data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getRequestData();
  }, [getRequestData]);

  const openReturnModal = (request) => {
    setSelectedRequest(request);
    setReturnModalOpen(true); // Open the return modal
  };

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
        openReturnModal={openReturnModal} // Pass the function down to RequestTable
      />

      {/* ReturnTable will display return data based on selected request */}
      <Modal
        title={`Return Item for Request ID: ${selectedRequest ? selectedRequest.id : ''}`}
        visible={returnModalOpen}
        onCancel={() => setReturnModalOpen(false)}
        footer={null}
      >
        <ReturnTable
          loading={loading} 
          returnData={[]} // Pass return data if needed
          reload={() => {
            // Reload returns logic can go here if required
          }} 
        />
      </Modal>
    </div>
  );
};

export default RequestPage;