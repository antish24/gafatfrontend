import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ModalForm from '../../modal/Modal';
import { Button, message } from 'antd'; // Added message for feedback
import { BACKENDURL } from '../../helper/Urls';
import InventoryTable from '../../components/tables/inventory/InventoryTable';
import NewInventoryForm from '../../components/forms/inventory/NewInventoryForm';

const InventoryPage = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const getInventoryData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKENDURL}/inventory/all`);
      setInventoryData(res.data.data); // Ensure this matches your API response
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch inventory data'); // Added error feedback
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getInventoryData();
  }, [getInventoryData]);

  return (
    <div>
      <div style={{ height: '50px', display: 'flex', gap: '10px' }}>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add New Inventory
        </Button>
        <Button type="default" onClick={getInventoryData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen(false)}
          title="New Inventory Form"
          content={
            <NewInventoryForm
              reload={getInventoryData}
              openModalFun={setModalOpen}
            />
          }
        />
      </div>
      <InventoryTable loading={loading} inventoryData={inventoryData} />
    </div>
  );
};

export default InventoryPage;