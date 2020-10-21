import React from "react";
import { fireEvent, render, waitFor } from "../../tests/util";
import { DataTable } from "./DataTable";
import { Item, Order, Status } from "../../stores/dataStore";

class MockStore {
  rawData: Item[] = [];
  data: Item[] = [];
  status: Status = "";
  order: Order = "desc";
  fetchData = jest.fn().mockResolvedValue([]);
  switchOrder = jest.fn();

  constructor({
    data,
    status,
    order,
    fetchData,
    switchOrder,
  }: {
    data?: Item[];
    status?: Status;
    order?: Order;
    fetchData?: jest.Mock;
    switchOrder?: jest.Mock;
  }) {
    this.data = data || this.data;
    this.status = status || this.status;
    this.order = order || this.order;
    this.fetchData = fetchData || this.fetchData;
    this.switchOrder = switchOrder || this.switchOrder;
  }
}

describe("DataTable", () => {
  it("should fetchData when load", async () => {
    const store = new MockStore({
      fetchData: jest.fn().mockResolvedValue([])
    });
    const { getByTestId } = render(<DataTable />, { store });
    expect(store.fetchData).toBeCalledTimes(1);
    await waitFor(() => expect(getByTestId("load-button")));
  });

  it("should fetchData when click", async () => {
    const store = new MockStore({
      fetchData: jest.fn().mockResolvedValue([])
    })
    const { getByTestId } = render(<DataTable />, { store });
    await waitFor(() => getByTestId("load-button"));
    fireEvent.click(getByTestId("load-button"));
    expect(store.fetchData).toBeCalledTimes(2);
  });

  it("should show error when fetch fails", async () => {
    const store = new MockStore({
      status: 'error'
    })
    const { getByTestId } = render(<DataTable />, { store });
    await waitFor(() => expect(getByTestId("error-message")));
  });

  it("should switch sort order when click Date header", async () => {
    const store = new MockStore({})
    const { getByTestId } = render(<DataTable />, { store });
    await waitFor(() => getByTestId("load-button"));
    fireEvent.click(getByTestId("date-header"));
    expect(store.switchOrder).toBeCalled()
  });
});
