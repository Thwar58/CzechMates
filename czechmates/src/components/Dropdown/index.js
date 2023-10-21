// https://react-bootstrap.netlify.app/docs/components/dropdowns/

import Dropdown from 'react-bootstrap/Dropdown';

// we should edit this later so that the selection is indicated in the new text
function dDown({ text, actions }) {

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {text}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {actions?.map((name, index) => (
          <Dropdown.Item key={index}>{name}</Dropdown.Item>
          // <Dropdown.Item onClick={changeText(name)} key={index}>{name}</Dropdown.Item>
          // <Dropdown.Item as="button"><div onClick={(e) => this.changeValue(e.target.textContent)}>{name}</div></Dropdown.Item>

        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default dDown;

