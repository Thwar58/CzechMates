import { fireEvent, render, screen } from "@testing-library/react";
// import "@testing-library/jest-dom";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import JoinCodePopup from "./components/JoinCodePopup";

  it("Makes sure Navigate hook works", () => {
    const { getByText } = render(
      <BrowserRouter>
        <JoinCodePopup />
      </BrowserRouter>
    );

    const button = getByText(/subCharacterPages/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });