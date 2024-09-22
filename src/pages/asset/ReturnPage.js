import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ReturnTable from '../../components/tables/inventory/ReturnTable';

const ReturnPage = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleReload = () => {
    // Logic to reload data if needed
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate reload
  };

  return (
    <div>
      <div style={{ height: '50px', display: 'flex', gap: '10px' }}>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          View Returns
        </Button>
        <Button type="default" onClick={handleReload} loading={loading}>
          Reload
        </Button>
      </div>

      <Modal
        title="Return Data"
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
      >
        <ReturnTable 
          loading={loading} 
          reload={handleReload} 
        />
      </Modal>
    </div>
  );
};

export default ReturnPage;