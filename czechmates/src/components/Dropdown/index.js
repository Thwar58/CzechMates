// https://react-bootstrap.netlify.app/docs/components/dropdowns/

import Dropdown from 'react-bootstrap/Dropdown';

function dDown({text, actions}) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {text}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {actions?.map((name, index) => (
          <Dropdown.Item key={index}>{name}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default dDown;

