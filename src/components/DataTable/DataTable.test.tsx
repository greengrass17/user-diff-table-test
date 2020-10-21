import React from "react";
import { fireEvent, render, waitFor } from "../../tests/util";
import { DataComponentProps } from "./withData";
import { DataTable } from "./DataTable";

describe("DataTable", () => {
  const defaultProps: DataComponentProps = {
    data: [],
    fetchData: jest.fn().mockResolvedValue([]),
    order: "desc",
    setOrder: jest.fn(),
  };

  it("should fetchData when load", async () => {
    const props = {
      ...defaultProps,
    };
    const { container } = render(<DataTable {...props} />);
    await waitFor(() => container.querySelector(".MuiCircularProgress-root"));
    expect(props.fetchData).toBeCalled();
  });

  it("should fetchData when click", async () => {
    const props = {
      ...defaultProps,
    };
    const { container, getByTestId } = render(<DataTable {...props} />);
    await waitFor(() => getByTestId('load-button'));
    fireEvent.click(getByTestId('load-button'));
    expect(props.fetchData).toBeCalled();
    await waitFor(() =>
      expect(
        container.querySelector(".MuiCircularProgress-root")
      ).toBeInTheDocument()
    );
  });

  it("should show error when fetch fails", async () => {
    const props = {
      ...defaultProps,
      fetchData: jest.fn().mockRejectedValue({})
    };
    const { getByTestId } = render(<DataTable {...props} />);
    await waitFor(() => expect(getByTestId("error-message")));
  });

  it('should switch sort order when click Date header', async () => {
    const props = {
      ...defaultProps
    }
    const { getByTestId } = render(<DataTable {...props} />)
    await waitFor(() => getByTestId('load-button'))
    fireEvent.click(getByTestId('date-header'))
    expect(props.setOrder).toBeCalledWith('asc')
  })
  
});
