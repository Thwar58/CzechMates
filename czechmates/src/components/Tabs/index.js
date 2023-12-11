// https://react-bootstrap.netlify.app/docs/components/tabs
import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

/**
 * Purpose: a component for the tabs where the user can change between content on a page
 * Params: 
 * text: string, the title of the tab
 * content: VARIES, whatever the content of the page should be (generally an array of components)
 * userTheme: string, the user's color theme
 * currPage: int, the current index of the tab the user is on
 * setCurrPage: function, sets the current index of the tab the user is on
 */
function ControlledTabs({ text, content, userTheme, currPage, setCurrPage }) {
  // useState the sets the default tab
  const [key, setKey] = useState(text[0]);

  /**
  * Purpose: changes the tab to the current page when the current page changes 
  * Params/Dependencies: 
  * currPage
  * text
  */
  useEffect(() => {
    //only activates if the buttons are used in the character edit page that change the current page passed in 
    if (currPage !== undefined) {
      setKey(text[currPage]);
    }
  }, [currPage])

  /**
   * Purpose: renders the tabs component
   * Params/Dependencies: 
   * setCurrPage
   * text
   * content
   * userTheme
   */
  return (
    <Tabs
      style={{ paddingTop: '10px' }}
      id="tabs"
      activeKey={key}
      onSelect={
        (k) => {
          //set the key to the selected tab when clicking on the tabs at the top
          setKey(k);
          //sets the current page to make sure the value that the buttons use is also changed when the tabs are changed
          if (setCurrPage !== undefined) {
            setCurrPage(text.indexOf(k.toString()));
          }
        }
      }
      className={"mb-3 header_" + userTheme}
      defaultActiveKey={text[currPage]}
    >
      {/* populate the tabs with the information passed in, using index to match them */}
      {content?.map((tcontent, index) => (
        <Tab tabClassName={"header_" + userTheme} className={"mb-3 header_" + userTheme} key={text[index]} eventKey={text[index]} title={text[index]}>
          {tcontent}
        </Tab>
      ))}
    </Tabs>
  );
}

export default ControlledTabs;