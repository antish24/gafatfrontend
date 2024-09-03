import React from 'react'
import TimeSheetFormTable from '../../../../components/tables/payroll/TimeSheetFormTable'
import FiterTimeSheet from '../../../../components/forms/payroll/FiterTimeSheet';
import FiterTimeSheetForm from '../../../../components/forms/payroll/FiterTimeSheetForm';

const TimeSheetForm = () => {
  const names = ['John', 'Jane', 'Mark'];

  const generateRandomEmployee = () => {
    return {
      key: Math.random().toString(),
      IDNO: `EMP00${Math.floor(Math.random() * 100)}`,
      name: names[Math.floor(Math.random()*names.length)],
      regularHour: Math.floor(Math.random() * 10),
      OT32: Math.floor(Math.random() * 10),
      nonRegularHour: Math.floor(Math.random() * 10),
      specialHour: Math.floor(Math.random() * 10),
      totalHour: Math.floor(Math.random() * 10),
      status: ['Approved', 'Pending'][Math.floor(Math.random() * 2)]
    }
  }

  const employees = Array(35).fill(0).map(generateRandomEmployee)

  return (
    <div>
      <div><FiterTimeSheetForm/></div>
        <TimeSheetFormTable timesheetData={employees}/>
    </div>
  )
}

export default TimeSheetForm