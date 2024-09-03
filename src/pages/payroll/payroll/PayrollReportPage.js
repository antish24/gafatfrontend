import React from 'react'
import PayrollTable from '../../../components/tables/payroll/PayrollTable'
import { Tabs } from 'antd';
import IncomeTax from '../../../components/tabs/payroll/IncomeTax';

const PayrollReportPage = () => {
  const tabs2 = [
    {
      key: '1',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          Income Tax
        </div>
      ),
      children:<div>Income tax</div>,
    },
    {
      key: '3',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          Penstion
        </div>
      ),
      children:<div>Penstion tax</div>,
    },
    {
      key: '2',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          Net Payment
        </div>
      ),
      children:<div>Net Payment</div>,
    },
  ];

  const tabs = [
    {
      key: '1',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          Income Tax
        </div>
      ),
      children:<IncomeTax/>,
    },
    {
      key: '3',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          Penstion
        </div>
      ),
      children:<div>Penstion tax</div>,
    },
    {
      key: '2',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
          Net Payment
        </div>
      ),
      children:<div>Net Payment</div>,
    },
    {
      key: '4',
      label: (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
          }}
        >
         Summation
        </div>
      ),
      children:<Tabs defaultActiveKey="1" items={tabs2} style={{width: '100%'}} />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={tabs} style={{width: '100%'}} />
    </div>
  )
}

export default PayrollReportPage