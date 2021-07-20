import {
  addItem,
  Basket,
  clearItem,
  containsItem,
  countItem,
  createBasket,
  Item,
  Row,
  subItem,
  sumItem,
  sumValue,
} from '../src'

const randomId = () => {
  return Math.random().toString(36).substr(2, 9)
}

const makeItem = (): Item => {
  return {
    name: 'foo',
    id: '123',
    value: 10,
  }
}

const randomItem = (): Item => {
  return {
    name: 'foo',
    id: randomId(),
    value: 10,
  }
}

describe('createBasket', () => {
  it('creates a valid basket', () => {
    const basket = createBasket()

    const expected: Basket = {
      rows: [],
    }

    expect(basket).toEqual(expected)
  })

  it('creates a basket with predefined rows', () => {
    const rows: Row[] = [
      {
        item: { name: 'foo', id: 'abc', value: 10 },
        quantity: 1,
      },
    ]

    const expected: Basket = {
      rows,
    }

    const basket = createBasket(rows)

    expect(basket).toEqual(expected)
  })
})

describe('addItem', () => {
  it('Adds an item to an empty basket', () => {
    const basket = createBasket()

    const item: Item = {
      id: randomId(),
      name: 'foo',
      value: 10,
    }

    const updated = addItem(basket, item)

    const expected: Basket = {
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
    const basket = createBasket()

    const item: Item = {
      id: randomId(),
      name: 'foo',
      value: 10,
    }

    const updated = addItem(basket, item, 5)

    const expected: Basket = {
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
    const basket = createBasket([
      {
        item: existingItem,
        quantity: 3,
      },
    ])

    const item: Item = {
      id: randomId(),
      name: 'foo',
      value: 10,
    }

    const updated = addItem(basket, item)

    const expected: Basket = {
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
    const basket = createBasket([
      {
        item: existingItem,
        quantity: 3,
      },
    ])

    const item: Item = {
      id: randomId(),
      name: 'foo',
      value: 10,
    }

    const updated = addItem(basket, item, 5)

    const expected: Basket = {
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
    const basket = createBasket([
      {
        item: existingItem,
        quantity: 3,
      },
    ])

    const updated = addItem(basket, existingItem)

    const expected: Basket = {
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
    const basket = createBasket([
      {
        item: existingItem,
        quantity: 1,
      },
    ])

    const updated = addItem(basket, existingItem, 5)

    const expected: Basket = {
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
    const basket = createBasket()

    const item: Item = {
      id: randomId(),
      name: 'foo',
      value: 10,
    }

    const updated = subItem(basket, item)

    const expected: Basket = {
      rows: [],
    }

    expect(updated).toEqual(expected)
  })

  it('Subs 5 of an item from an empty basket', () => {
    const basket = createBasket()

    const item: Item = {
      id: randomId(),
      name: 'foo',
      value: 10,
    }

    const updated = subItem(basket, item, 5)

    const expected: Basket = {
      rows: [],
    }

    expect(updated).toEqual(expected)
  })

  it('Subs an item from a basket', () => {
    const existingItem = makeItem()
    const basket = createBasket([
      {
        item: existingItem,
        quantity: 3,
      },
    ])

    const updated = subItem(basket, existingItem)

    const expected: Basket = {
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
    const basket = createBasket([
      {
        item: existingItem,
        quantity: 6,
      },
    ])

    const updated = subItem(basket, existingItem, 5)

    const expected: Basket = {
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
    const basket = createBasket([
      {
        item: existingItemA,
        quantity: 3,
      },
      {
        item: existingItemB,
        quantity: 3,
      },
    ])

    const updated = subItem(basket, existingItemA)

    const expected: Basket = {
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
    const basket = createBasket([
      {
        item: existingItemA,
        quantity: 10,
      },
      {
        item: existingItemB,
        quantity: 3,
      },
    ])

    const updated = subItem(basket, existingItemA, 5)

    const expected: Basket = {
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
      const basket = createBasket([
        {
          item: existingItem,
          quantity: 1,
        },
      ])

      const updated = subItem(basket, existingItem)

      const expected: Basket = {
        rows: [],
      }

      expect(updated).toEqual(expected)
    })
    it('single item basket sub 5', () => {
      const existingItem = makeItem()
      const basket = createBasket([
        {
          item: existingItem,
          quantity: 3,
        },
      ])

      const updated = subItem(basket, existingItem, 5)

      const expected: Basket = {
        rows: [],
      }

      expect(updated).toEqual(expected)
    })
    it('multi item basket sub 1', () => {
      const existingItemA = randomItem()
      const existingItemB = randomItem()
      const basket = createBasket([
        {
          item: existingItemA,
          quantity: 1,
        },
        {
          item: existingItemB,
          quantity: 3,
        },
      ])

      const updated = subItem(basket, existingItemA)

      const expected: Basket = {
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
      const basket = createBasket([
        {
          item: existingItemA,
          quantity: 3,
        },
        {
          item: existingItemB,
          quantity: 3,
        },
      ])

      const updated = subItem(basket, existingItemA, 5)

      const expected: Basket = {
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

    const row: Row = {
      item,
      quantity: 1,
    }

    const basket = createBasket([row])

    const result = containsItem(basket, item)

    expect(result).toBe(true)
  })

  it('returns false when it does not find an item', () => {
    const basket = createBasket()

    const item = makeItem()

    const result = containsItem(basket, item)

    expect(result).toBe(false)
  })
})

describe('countItem', () => {
  it('counts items correctly', () => {
    const item = randomItem()
    const basketA = createBasket([
      { item, quantity: 5 },
      { item: randomItem(), quantity: 15 },
      { item: randomItem(), quantity: 1 },
    ])

    expect(countItem(basketA, item)).toBe(5)

    const basketB = createBasket([
      { item: randomItem(), quantity: 15 },
      { item: randomItem(), quantity: 1 },
    ])

    expect(countItem(basketB, item)).toBe(0)
  })
})

describe('clearItem', () => {
  it('removes an item from the basket', () => {
    const item = makeItem()
    const empty = createBasket()

    const added = addItem(empty, item)

    const removed = clearItem(added, item)

    expect(empty).toEqual(removed)
  })
})

describe('sumItem', () => {
  it('calculates the total value of a row', () => {
    const item = makeItem()
    const valueOfOne = item.value
    const valueOfSix = valueOfOne * 6
    const basket = createBasket()
    const added = addItem(basket, item)
    const totalA = sumItem(added, item)
    expect(totalA).toBe(valueOfOne)
    const addedAgain = addItem(added, item, 5)
    const totalB = sumItem(addedAgain, item)
    expect(totalB).toBe(valueOfSix)
  })
})

describe('sumValue', () => {
  it('calculates the total value of a row', () => {
    const itemA = randomItem()
    const itemB = randomItem()
    const valueOfBoth = itemA.value + itemB.value

    const basket = addItem(addItem(createBasket(), itemA), itemB)

    const total = sumValue(basket)

    expect(total).toBe(valueOfBoth)
  })
})
