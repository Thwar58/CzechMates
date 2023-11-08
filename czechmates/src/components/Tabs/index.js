// https://react-bootstrap.netlify.app/docs/components/tabs

import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// a component for when we need tabs in a page
// input: an array of labels and an array of tab contents
function ControlledTabs({ text, content }) {
  // sets the starting state of the tabs to the first tab
  const [key, setKey] = useState(text[0]);

  return (
    // monitor the active tab, set a new tab when a tab is clicked, and set the default tab to the first tab
    <Tabs
      id="tabs"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      defaultActiveKey={text[0]}
    >
      {/* populate the tabs with the information passed in, using index to match them */}
      {content?.map((tcontent, index) => (
        <Tab key={text[index]} eventKey={text[index]} title={text[index]}>
          {tcontent}
        </Tab>
      ))}
    </Tabs>
  );
}

export default ControlledTabs;