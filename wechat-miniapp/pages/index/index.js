const PLATE_PRICES = {
  eightYuan: 8,
  tenYuan: 10,
  fifteenYuan: 15,
  twentyYuan: 20,
  twentyEightYuan: 28
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function newOtherItem() {
  return { id: makeId(), name: '', amountInput: '' }
}

function computeOtherTotal(items) {
  return items.reduce((sum, item) => {
    const trimmed = (item.amountInput || '').trim()
    if (!trimmed) return sum
    const n = Number(trimmed)
    return sum + (Number.isFinite(n) ? Math.max(0, n) : 0)
  }, 0)
}

function computeMessage(total) {
  if (total > 0 && total <= 50) return '吃这么少, Shunya没力踢ball'
  if (total > 50 && total < 200) return '吃太多骆2会肥噶'
  if (total >= 200) return '吃太多靓女会肥噶'
  return ''
}

Page({
  data: {
    eightYuan: 0,
    tenYuan: 0,
    fifteenYuan: 0,
    twentyYuan: 0,
    twentyEightYuan: 0,
    people: 1,
    otherItems: [],
    otherTotal: 0,
    total: 0,
    perPerson: '0.00',
    msg: ''
  },

  onLoad() {
    this.setData({ otherItems: [newOtherItem()] }, () => this.recompute())
  },

  recompute() {
    const d = this.data
    const platesTotal =
      d.eightYuan * PLATE_PRICES.eightYuan +
      d.tenYuan * PLATE_PRICES.tenYuan +
      d.fifteenYuan * PLATE_PRICES.fifteenYuan +
      d.twentyYuan * PLATE_PRICES.twentyYuan +
      d.twentyEightYuan * PLATE_PRICES.twentyEightYuan
    const otherTotal = computeOtherTotal(d.otherItems)
    const total = platesTotal + otherTotal
    const safePeople = Math.max(1, d.people)
    const perPerson = (total / safePeople).toFixed(2)
    const msg = computeMessage(total)
    this.setData({ otherTotal, total, perPerson, msg })
  },

  incPlate(e) {
    const key = e.currentTarget.dataset.key
    if (!PLATE_PRICES[key]) return
    this.setData({ [key]: this.data[key] + 1 }, () => this.recompute())
  },

  decPlate(e) {
    const key = e.currentTarget.dataset.key
    if (!PLATE_PRICES[key]) return
    this.setData({ [key]: Math.max(0, this.data[key] - 1) }, () => this.recompute())
  },

  incPeople() {
    this.setData({ people: this.data.people + 1 }, () => this.recompute())
  },

  decPeople() {
    this.setData({ people: Math.max(1, this.data.people - 1) }, () => this.recompute())
  },

  addOtherItem() {
    this.setData({ otherItems: [...this.data.otherItems, newOtherItem()] })
  },

  removeOtherItem(e) {
    const id = e.currentTarget.dataset.id
    let next = this.data.otherItems.filter((x) => x.id !== id)
    if (next.length === 0) next = [newOtherItem()]
    this.setData({ otherItems: next }, () => this.recompute())
  },

  updateOtherName(e) {
    const id = e.currentTarget.dataset.id
    const value = e.detail.value
    const next = this.data.otherItems.map((x) =>
      x.id === id ? { ...x, name: value } : x
    )
    this.setData({ otherItems: next })
  },

  updateOtherAmount(e) {
    const id = e.currentTarget.dataset.id
    const raw = e.detail.value == null ? '' : String(e.detail.value)
    const filtered = raw.replace(/[^\d]/g, '')
    const next = this.data.otherItems.map((x) =>
      x.id === id ? { ...x, amountInput: filtered } : x
    )
    this.setData({ otherItems: next }, () => this.recompute())
    return filtered
  },

  normalizeOtherAmount(e) {
    const id = e.currentTarget.dataset.id
    const item = this.data.otherItems.find((x) => x.id === id)
    if (!item) return
    const trimmed = (item.amountInput || '').trim()
    if (!trimmed) return
    const n = Number(trimmed)
    const normalized = Number.isFinite(n) ? String(Math.max(0, Math.trunc(n))) : ''
    if (normalized === item.amountInput) return
    const next = this.data.otherItems.map((x) =>
      x.id === id ? { ...x, amountInput: normalized } : x
    )
    this.setData({ otherItems: next }, () => this.recompute())
  },

  resetAll() {
    this.setData(
      {
        eightYuan: 0,
        tenYuan: 0,
        fifteenYuan: 0,
        twentyYuan: 0,
        twentyEightYuan: 0,
        otherItems: [newOtherItem()],
        people: 1
      },
      () => this.recompute()
    )
  },

  // openCoffee() {
  //   const url = 'https://buymeacoffee.com/xiluo.net'
  //   wx.setClipboardData({
  //     data: url,
  //     success() {
  //       wx.showModal({
  //         title: '链接已复制',
  //         content: url,
  //         confirmText: '好的',
  //         showCancel: false
  //       })
  //     }
  //   })
  // }
})
