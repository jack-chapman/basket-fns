export interface Item {
  name: string
  id: string
  value: number
}

export interface Row {
  item: Item
  quantity: number
}

export interface Basket {
  rows: Row[]
}

export const createBasket = (rows: Row[] = []): Basket => {
  return {
    rows,
  }
}

export const addItem = (
  basket: Basket,
  item: Item,
  quantity?: number,
): Basket => {
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
    const newRow: Row = {
      item: { ...item },
      quantity: quantity || 1,
    }
    return createBasket([...basket.rows, newRow])
  }
}

export const subItem = (
  basket: Basket,
  item: Item,
  quantity: number = 1,
): Basket => {
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

export const sumValue = (basket: Basket): number => {
  return basket.rows.reduce((prev, curr) => {
    const currValue = curr.item.value * curr.quantity
    return (prev += currValue)
  }, 0)
}

export const sumItem = (basket: Basket, item: Item): number => {
  return countItem(basket, item) * item.value
}

export const containsItem = (basket: Basket, item: Item): boolean => {
  return basket.rows.some((row) => {
    return row.item.id === item.id
  })
}

export const countItem = (basket: Basket, item: Item): number => {
  if (!containsItem(basket, item)) {
    return 0
  } else {
    return basket.rows.find((row) => row.item.id === item.id)?.quantity || 0
  }
}

export const clearItem = (basket: Basket, item: Item): Basket => {
  return createBasket([...basket.rows.filter((row) => row.item.id !== item.id)])
}
