import React, { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../context/AlertContext';
import axios from 'axios';
import ModalForm from '../modal/Modal';
import NewUserForm from '../components/forms/NewUserForm';
import { Button } from 'antd';
import EmployeeTable from '../components/tables/EmployeeTable';
import { BACKENDURL } from '../helper/Urls';

const Employee = () => {
  const {openNotification} = useContext(AlertContext);

  const [userData,setEmployeeData]=useState([])
  const [loading,setLoading]=useState(false)

  const getEmployeeData=async()=>{
    setLoading(true)
    try {
      const res = await axios.get (`${BACKENDURL}/employee/getall`);
      setLoading (false);
      setEmployeeData(res.data.employees)
    } catch (error) {
      openNotification('error', error.response.data.message, 3, 'red');
      setLoading (false);
    }
  }

  useEffect(()=>{
    getEmployeeData()
  },[])


  const [modalOpen, setModalOpen] = useState (false);

  return (
    <div>
      <div style={{height: '50px',display:'flex',gap:'10px'}}>
        <Button type='default' onClick={getEmployeeData} loading={loading}>
          Reload
        </Button>
        <ModalForm
          open={modalOpen}
          close={() => setModalOpen (false)}
          title={'New User Form'}
          content={<NewUserForm openModalFun={(e) => setModalOpen (e)}/>}
        />
      </div>
      <EmployeeTable loading={false} userData={userData}/>
    </div>
  )
}

export default Employee