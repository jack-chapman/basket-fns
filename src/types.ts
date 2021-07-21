export interface IBasketItem {
  id: string
  value: number
}

export interface IRow<T extends IBasketItem = IBasketItem> {
  item: T
  quantity: number
}

export interface IBasket<T extends IBasketItem = IBasketItem> {
  rows: IRow<T>[]
}
