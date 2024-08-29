import {Descriptions} from 'antd';
import React from 'react';

const EmployeeInfoTab = ({data}) => {
  return (
    <div>
      <Descriptions
        style={{width: '100%'}}
        column={{xs: 1, sm: 1}}
        bordered
        size="small"
        items={data}
      />
    </div>
  );
};

export default EmployeeInfoTab;
