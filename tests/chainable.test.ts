import { IBasket, IBasketItem, IRow, Basket } from '../src'

const randomId = () => {
  return Math.random().toString(36).substr(2, 9)
}

const makeItem = (): IBasketItem => {
  return {
    id: '123',
    value: 10,
  }
}

const randomItem = (): IBasketItem => {
  return {
    id: randomId(),
    value: 10,
  }
}

describe('constructor', () => {
  it('creates a valid basket', () => {
    const basket = new Basket()

    const expected: IBasket = {
      rows: [],
    }

    expect(basket).toEqual(expected)
  })

  it('creates a basket with predefined rows', () => {
    const rows: IRow[] = [
      {
        item: { id: 'abc', value: 10 },
        quantity: 1,
      },
    ]

    const expected: IBasket = {
      rows,
    }

    const basket = new Basket(rows)

    expect(basket).toEqual(expected)
  })
})

describe('addItem', () => {
  it('Adds an item to an empty basket', () => {
    const basket = new Basket()

    const item: IBasketItem = {
      id: randomId(),
      value: 10,
    }

    const updated = basket.addItem(item)

    const expected: IBasket = {
      rows: [
        {
          item,
          quantity: 1,
        },
      ],
    }

    expect(updated).toEqual(expected)
  })

  it('Adds 5 of an item to an empty basket', () => {
    const basket = new Basket()

    const item: IBasketItem = {
      id: randomId(),
      value: 10,
    }

    const updated = basket.addItem(item, 5)

    const expected: IBasket = {
      rows: [
        {
          item,
          quantity: 5,
        },
      ],
    }

    expect(updated).toEqual(expected)
  })

  it('Adds a new item to a basket', () => {
    const existingItem = makeItem()
    const basket = new Basket([
      {
        item: existingItem,
        quantity: 3,
      },
    ])

    const item: IBasketItem = {
      id: randomId(),
      value: 10,
    }

    const updated = basket.addItem(item)

    const expected: IBasket = {
      rows: [
        {
          item: existingItem,
          quantity: 3,
        },
        {
          item,
          quantity: 1,
        },
      ],
    }

    expect(updated).toEqual(expected)
  })

  it('Adds 5 of a new item to a basket', () => {
    const existingItem = makeItem()
    const basket = new Basket([
      {
        item: existingItem,
        quantity: 3,
      },
    ])

    const item: IBasketItem = {
      id: randomId(),
      value: 10,
    }

    const updated = basket.addItem(item, 5)

    const expected: IBasket = {
      rows: [
        {
          item: existingItem,
          quantity: 3,
        },
        {
          item,
          quantity: 5,
        },
      ],
    }

    expect(updated).toEqual(expected)
  })

  it('Adds an existing item to a basket', () => {
    const existingItem = makeItem()
    const basket = new Basket([
      {
        item: existingItem,
        quantity: 3,
      },
    ])

    const updated = basket.addItem(existingItem)

    const expected: IBasket = {
      rows: [
        {
          item: existingItem,
          quantity: 4,
        },
      ],
    }

    expect(updated).toEqual(expected)
  })

  it('Adds 5 of an existing item to a basket', () => {
    const existingItem = makeItem()
    const basket = new Basket([
      {
        item: existingItem,
        quantity: 1,
      },
    ])

    const updated = basket.addItem(existingItem, 5)

    const expected: IBasket = {
      rows: [
        {
          item: existingItem,
          quantity: 6,
        },
      ],
    }

    expect(updated).toEqual(expected)
  })
})

describe('subItem', () => {
  it('Subs an item from an empty basket', () => {
    const basket = new Basket()

    const item: IBasketItem = {
      id: randomId(),
      value: 10,
    }

    const updated = basket.subItem(item)

    const expected: IBasket = {
      rows: [],
    }

    expect(updated).toEqual(expected)
  })

  it('Subs 5 of an item from an empty basket', () => {
    const basket = new Basket()

    const item: IBasketItem = {
      id: randomId(),
      value: 10,
    }

    const updated = basket.subItem(item, 5)

    const expected: IBasket = {
      rows: [],
    }

    expect(updated).toEqual(expected)
  })

  it('Subs an item from a basket', () => {
    const existingItem = makeItem()
    const basket = new Basket([
      {
        item: existingItem,
        quantity: 3,
      },
    ])

    const updated = basket.subItem(existingItem)

    const expected: IBasket = {
      rows: [
        {
          item: existingItem,
          quantity: 2,
        },
      ],
    }

    expect(updated).toEqual(expected)
  })

  it('Subs 5 of an item from a basket', () => {
    const existingItem = makeItem()
    const basket = new Basket([
      {
        item: existingItem,
        quantity: 6,
      },
    ])

    const updated = basket.subItem(existingItem, 5)

    const expected: IBasket = {
      rows: [
        {
          item: existingItem,
          quantity: 1,
        },
      ],
    }

    expect(updated).toEqual(expected)
  })

  it('Subs an item from a populated basket', () => {
    const existingItemA = randomItem()
    const existingItemB = randomItem()
    const basket = new Basket([
      {
        item: existingItemA,
        quantity: 3,
      },
      {
        item: existingItemB,
        quantity: 3,
      },
    ])

    const updated = basket.subItem(existingItemA)

    const expected: IBasket = {
      rows: [
        {
          item: existingItemA,
          quantity: 2,
        },
        {
          item: existingItemB,
          quantity: 3,
        },
      ],
    }

    expect(updated).toEqual(expected)
  })

  it('Subs 5 of an item from a populated basket', () => {
    const existingItemA = randomItem()
    const existingItemB = randomItem()
    const basket = new Basket([
      {
        item: existingItemA,
        quantity: 10,
      },
      {
        item: existingItemB,
        quantity: 3,
      },
    ])

    const updated = basket.subItem(existingItemA, 5)

    const expected: IBasket = {
      rows: [
        {
          item: existingItemA,
          quantity: 5,
        },
        {
          item: existingItemB,
          quantity: 3,
        },
      ],
    }

    expect(updated).toEqual(expected)
  })

  describe('Removes the row if zero of an item are left over', () => {
    it('single item basket sub 1', () => {
      const existingItem = makeItem()
      const basket = new Basket([
        {
          item: existingItem,
          quantity: 1,
        },
      ])

      const updated = basket.subItem(existingItem)

      const expected: IBasket = {
        rows: [],
      }

      expect(updated).toEqual(expected)
    })
    it('single item basket sub 5', () => {
      const existingItem = makeItem()
      const basket = new Basket([
        {
          item: existingItem,
          quantity: 3,
        },
      ])

      const updated = basket.subItem(existingItem, 5)

      const expected: IBasket = {
        rows: [],
      }

      expect(updated).toEqual(expected)
    })
    it('multi item basket sub 1', () => {
      const existingItemA = randomItem()
      const existingItemB = randomItem()
      const basket = new Basket([
        {
          item: existingItemA,
          quantity: 1,
        },
        {
          item: existingItemB,
          quantity: 3,
        },
      ])

      const updated = basket.subItem(existingItemA)

      const expected: IBasket = {
        rows: [
          {
            item: existingItemB,
            quantity: 3,
          },
        ],
      }

      expect(updated).toEqual(expected)
    })
    it('multi item basket sub 5', () => {
      const existingItemA = randomItem()
      const existingItemB = randomItem()
      const basket = new Basket([
        {
          item: existingItemA,
          quantity: 3,
        },
        {
          item: existingItemB,
          quantity: 3,
        },
      ])

      const updated = basket.subItem(existingItemA, 5)

      const expected: IBasket = {
        rows: [
          {
            item: existingItemB,
            quantity: 3,
          },
        ],
      }

      expect(updated).toEqual(expected)
    })
  })
})

describe('containsItem', () => {
  it('returns true when it finds an item', () => {
    const item = makeItem()

    const row: IRow = {
      item,
      quantity: 1,
    }

    const basket = new Basket([row])

    const result = basket.containsItem(item)

    expect(result).toBe(true)
  })

  it('returns false when it does not find an item', () => {
    const basket = new Basket()

    const item = makeItem()

    const result = basket.containsItem(item)

    expect(result).toBe(false)
  })
})

describe('countItem', () => {
  it('counts items correctly', () => {
    const item = randomItem()
    const basketA = new Basket([
      { item, quantity: 5 },
      { item: randomItem(), quantity: 15 },
      { item: randomItem(), quantity: 1 },
    ])

    expect(basketA.countItem(item)).toBe(5)

    const basketB = new Basket([
      { item: randomItem(), quantity: 15 },
      { item: randomItem(), quantity: 1 },
    ])

    expect(basketB.countItem(item)).toBe(0)
  })
})

describe('clearItem', () => {
  it('removes an item from the basket', () => {
    const item = makeItem()
    const empty = new Basket()

    const added = empty.addItem(item)

    const removed = added.clearItem(item)

    expect(empty).toEqual(removed)
  })
})

describe('sumItem', () => {
  it('calculates the total value of a row', () => {
    const item = makeItem()
    const valueOfOne = item.value
    const valueOfFive = valueOfOne * 5

    const basket = new Basket()

    const totalA = basket.addItem(item).sumItem(item)
    expect(totalA).toBe(valueOfOne)

    const totalB = basket.addItem(item, 5).sumItem(item)
    expect(totalB).toBe(valueOfFive)
  })
})

describe('sumValue', () => {
  it('calculates the total value of a row', () => {
    const itemA = randomItem()
    const itemB = randomItem()
    const valueOfBoth = itemA.value + itemB.value

    const basket = new Basket().addItem(itemA).addItem(itemB)

    const total = basket.sumValue()

    expect(total).toBe(valueOfBoth)
  })
})
