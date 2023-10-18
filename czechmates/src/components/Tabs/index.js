// https://react-bootstrap.netlify.app/docs/components/tabs

import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function ControlledTabs({text, content}) {
  const [key, setKey] = useState(text[0]);
  // console.log(text[0]);
  // console.log(text[1]);
  // console.log(text[2]);

  // console.log("check here", text[0]);

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      defaultActiveKey={text[0]}
    >

      {content?.map((tcontent, index) => (
          <Tab key={text[index]} eventKey={text[index]} title={text[index]}>
            Tab content for {tcontent}
          </Tab>
        ))}


    </Tabs>
  );
}

export default ControlledTabs;