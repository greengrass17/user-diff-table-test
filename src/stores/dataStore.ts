import { makeAutoObservable, runInAction } from "mobx"
import { createContext } from "react"
import api from "../lib/api"

export type Item = {
  id: string;
  timestamp: number;
  diff: {
    oldValue: string;
    newValue: string;
  }[];
};

export type Status = 'loading'|'error'|''

export type Order = 'desc'|'asc'

class Store {
  rawData: Item[] = []
  status: Status = 'loading'
  order: Order = 'desc'

  constructor() {
    makeAutoObservable(this)
  }

  get data() {
    return this.rawData.slice().sort((a: Item, b: Item) =>
    (this.order === "desc" ? 1 : -1) * (b.timestamp - a.timestamp))
  }

  switchOrder() {
    this.order = this.order === 'desc' ? 'asc' : 'desc'
  }

  async fetchData() {
    this.status = 'loading'
    try {
      const result = await api.getUsersDiff();
      runInAction(() => {
        this.rawData = [...this.rawData, ...result.data]
        this.status = ''
      })
      return result.code;
    } catch (error) {
      runInAction(() => {
        this.status = 'error'
      })
    }
  }
}

export const store = new Store()

export default createContext(store)