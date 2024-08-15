import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../context/AlertContext';
import axios from 'axios';
import ModalForm from '../modal/Modal';
import NewUserForm from '../components/forms/NewUserForm';
import { Button } from 'antd';
import IncidentsTable from '../components/tables/IncidentsTable';
import { BACKENDURL } from '../helper/Urls';

const Incidents = () => {
  const {openNotification} = useContext(AlertContext);

  const [incidents,setIncidents]=useState([])
  const [loading,setLoading]=useState(false)

  const getincidents=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/incidents/all`);
      setLoading (false);
      setIncidents(res.data.incidentslist)
      console.log(res.data)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getincidents()
  },[])


  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <div style={{height: '50px',display:'flex',gap:'10px'}}>
        <Button type='default' onClick={getincidents} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={'New User Form'}
          content={<NewUserForm openModalFun={(e) => setModalOpen (e)}/>}
        />
      </div>
      <IncidentsTable loading={false} incidents={incidents}/>
    </div>
  )
}

export default Incidents