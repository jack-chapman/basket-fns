import { IBasketItem, IRow, IBasket } from './types'

export const createBasket = <T extends IBasketItem = IBasketItem>(
  rows: IRow<T>[] = [],
): IBasket<T> => {
  return {
    rows,
  }
}

export const addItem = <T extends IBasketItem = IBasketItem>(
  basket: IBasket<T>,
  item: T,
  quantity?: number,
): IBasket => {
  if (containsItem(basket, item)) {
    const newRows = basket.rows.map((row) => {
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
    return createBasket(newRows)
  } else {
    const newRow: IRow = {
      item: { ...item },
      quantity: quantity || 1,
    }
    return createBasket([...basket.rows, newRow])
  }
}

export const subItem = <T extends IBasketItem = IBasketItem>(
  basket: IBasket<T>,
  item: T,
  quantity: number = 1,
): IBasket => {
  if (containsItem(basket, item)) {
    const remainder = countItem(basket, item) - (quantity || 1)
    if (remainder <= 0) {
      const newRows = basket.rows.filter((row) => row.item.id !== item.id)
      return createBasket(newRows)
    } else {
      const newRows = basket.rows.map((row) => {
        if (row.item.id !== item.id) {
          return row
        } else {
          return {
            ...row,
            quantity: remainder,
          }
        }
      })
      return createBasket(newRows)
    }
  } else {
    return createBasket([...basket.rows])
  }
}

export const sumValue = <T extends IBasketItem = IBasketItem>(
  basket: IBasket<T>,
): number => {
  return basket.rows.reduce((prev, curr) => {
    const currValue = curr.item.value * curr.quantity
    return (prev += currValue)
  }, 0)
}

export const sumItem = <T extends IBasketItem = IBasketItem>(
  basket: IBasket<T>,
  item: T,
): number => {
  return countItem(basket, item) * item.value
}

export const containsItem = <T extends IBasketItem = IBasketItem>(
  basket: IBasket<T>,
  item: T,
): boolean => {
  return basket.rows.some((row) => {
    return row.item.id === item.id
  })
}

export const countItem = <T extends IBasketItem = IBasketItem>(
  basket: IBasket<T>,
  item: T,
): number => {
  if (!containsItem(basket, item)) {
    return 0
  } else {
    return basket.rows.find((row) => row.item.id === item.id)?.quantity || 0
  }
}

export const clearItem = <T extends IBasketItem = IBasketItem>(
  basket: IBasket<T>,
  item: T,
): IBasket<T> => {
  return createBasket([...basket.rows.filter((row) => row.item.id !== item.id)])
}
