import React from 'react'
import VacancyApplicantTable from '../../../components/tables/vacancy/VacancyApplicantTable'

const ApplicantList = () => {
  return (
    <div>
      <div>Job Title</div>
      <VacancyApplicantTable loading={false} reload={()=>{}} vacancyData={[]}/>
    </div>
  )
}

export default ApplicantList