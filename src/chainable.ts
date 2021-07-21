import type { IBasketItem, IRow } from './types'

export class Basket<T extends IBasketItem = IBasketItem> {
  private readonly rows: IRow<T>[] = []

  constructor(rows: IRow<T>[] = []) {
    this.rows = rows
  }

  clone(): Basket<T> {
    return new Basket([...this.rows])
  }

  addItem<T extends IBasketItem>(item: T, quantity?: number): Basket {
    if (this.containsItem(item)) {
      const newRows = this.rows.map((row) => {
        if (row.item.id !== item.id) {
          return row
        } else {
          const q = quantity ? row.quantity + quantity : row.quantity + 1
          return {
            ...row,
            quantity: q,
          }
        }
      })
      return new Basket(newRows)
    } else {
      const newRow: IRow = {
        item: { ...item },
        quantity: quantity || 1,
      }
      return new Basket([...this.rows, newRow])
    }
  }

  subItem<T extends IBasketItem>(item: T, quantity: number = 1): Basket {
    if (this.containsItem(item)) {
      const remainder = this.countItem(item) - (quantity || 1)
      if (remainder <= 0) {
        const newRows = this.rows.filter((row) => row.item.id !== item.id)
        return new Basket(newRows)
      } else {
        const newRows = this.rows.map((row) => {
          if (row.item.id !== item.id) {
            return row
          } else {
            return {
              ...row,
              quantity: remainder,
            }
          }
        })
        return new Basket(newRows)
      }
    } else {
      return new Basket([...this.rows])
    }
  }

  sumValue(): number {
    return this.rows.reduce((prev, curr) => {
      const currValue = curr.item.value * curr.quantity
      return (prev += currValue)
    }, 0)
  }

  sumItem<T extends IBasketItem>(item: T): number {
    return this.countItem(item) * item.value
  }

  containsItem<T extends IBasketItem>(item: T): boolean {
    return this.rows.some((row) => {
      return row.item.id === item.id
    })
  }

  countItem<T extends IBasketItem>(item: T): number {
    if (!this.containsItem(item)) {
      return 0
    } else {
      return this.rows.find((row) => row.item.id === item.id)?.quantity || 0
    }
  }

  clearItem<T extends IBasketItem>(item: T) {
    const newRows = this.rows.filter((row) => row.item.id !== item.id)
    return new Basket(newRows)
  }
}
