// https://react-bootstrap.netlify.app/docs/components/dropdowns/

import Dropdown from 'react-bootstrap/Dropdown';

function BasicExample({text, actions}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {text}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {actions?.map((name, index) => (
          <Dropdown.Item href={`#/action-${index}`}>{name}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;

