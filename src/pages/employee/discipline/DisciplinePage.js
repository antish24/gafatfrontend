import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../../context/AlertContext';
import axios from 'axios';
import ModalForm from '../../../modal/Modal';
import { Button } from 'antd';
import { BACKENDURL } from '../../../helper/Urls';
import DisciplineTable from '../../../components/tables/employee/DisciplineTable';
import NewDiscipline from '../../../components/forms/employee/NewDiscipline';

const DisciplinePage = () => {
  const {openNotification} = useContext(AlertContext);

  const [userData,setUserData]=useState([])
  const [loading,setLoading]=useState(false)

  const getUserData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get(`${BACKENDURL}/employee/all`);
      setLoading (false);
      setUserData(res.data.employees)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getUserData()
  },[])


  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <div style={{height: '50px',display:'flex',gap:'10px'}}>
        <Button type="primary" onClick={() => setModalOpen (true)}>
        Discipline Form
        </Button>
        <Button type='default' onClick={getUserData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={'New Discipline Form'}
          content={<NewDiscipline reload={()=>getUserData()} openModalFun={(e) => setModalOpen (e)}/>}
        />
      </div>
      <DisciplineTable loading={loading} reload={()=>getUserData()} userData={userData}/>
    </div>
  )
}

export default DisciplinePage