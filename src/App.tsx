import { useEffect, useMemo, useState } from "react"
import "./App.css"

type OtherItem = {
  id: string
  name: string
  amountInput: string
}

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function App() {
  const [eightYuan, setEightYuan] = useState(0)
  const [tenYuan, setTenYuan] = useState(0)
  const [fifteenYuan, setFifteenYuan] = useState(0)
  const [twentyYuan, setTwentyYuan] = useState(0)
  const [twentyEightYuan, setTwentyEightYuan] = useState(0)
  const [people, setPeople] = useState(1)
  const [otherItems, setOtherItems] = useState<OtherItem[]>([
    { id: makeId(), name: "", amountInput: "" },
  ])

  const otherTotal = useMemo(() => {
    return otherItems.reduce((sum, item) => {
      const trimmed = item.amountInput.trim()
      if (!trimmed) return sum
      const n = Number(trimmed)
      return sum + (Number.isFinite(n) ? Math.max(0, n) : 0)
    }, 0)
  }, [otherItems])

  const total = useMemo(() => {
    return (
      eightYuan * 8 +
      tenYuan * 10 +
      fifteenYuan * 15 +
      twentyYuan * 20 +
      twentyEightYuan * 28 +
      otherTotal
    )
  }, [eightYuan, tenYuan, fifteenYuan, twentyYuan, twentyEightYuan, otherTotal])

  useEffect(() => {
    void fetch("https://api.xiluo.net/nonuser", { mode: "no-cors" }).catch(() => {})
  }, [])

  const perPerson = useMemo(() => {
    const safePeople = Math.max(1, people)
    return total / safePeople
  }, [total, people])

  function resetAll() {
    setEightYuan(0)
    setTenYuan(0)
    setFifteenYuan(0)
    setTwentyYuan(0)
    setTwentyEightYuan(0)
    setOtherItems([{ id: makeId(), name: "", amountInput: "" }])
    setPeople(1)
  }

  function addOtherItem() {
    setOtherItems((prev) => [...prev, { id: makeId(), name: "", amountInput: "" }])
  }

  function removeOtherItem(id: string) {
    setOtherItems((prev) => {
      const next = prev.filter((x) => x.id !== id)
      return next.length > 0 ? next : [{ id: makeId(), name: "", amountInput: "" }]
    })
  }

  function updateOtherItem(id: string, patch: Partial<OtherItem>) {
    setOtherItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)))
  }

  function PlateCounter({
    label,
    count,
    onIncrement,
    onDecrement,
    variant,
  }: {
    label: string
    count: number
    onIncrement: () => void
    onDecrement: () => void
    variant: "white" | "red" | "grey" | "yellow" | "black"
  }) {
    return (
      <div className="plateWrap">
        <button
          type="button"
          className={`plate plate--${variant}`}
          onClick={onIncrement}
          aria-label={`Add ${label}`}
        >
          <span className="plateLabel">{label}</span>
        </button>
        <div className="plateFooter" aria-label={`${label} controls`}>
          <div className="plateCount" aria-label={`${label} count`}>
            {count}
          </div>
          <button
            type="button"
            className="plateMinus"
            onClick={onDecrement}
            aria-label={`Remove ${label}`}
            disabled={count <= 0}
          >
            −
          </button>
        </div>
      </div>
    )
  }

  function message(): string {
    if (total > 0 && total <= 50) {
      return "吃这么少, Shunya没力踢ball"
    } else if (total > 50 && total < 200) {
      return "吃太多骆2会肥噶"
    } else if (total >= 200) {
      return "吃太多靓女会肥噶"
    }
    return ""
  }

  const msg = message()

  return (
    <div className="app">
      <div className="phoneCard">
        <header className="header">
          <h1 className="title">寿司计算器</h1>
          <p className="subtitle">点盘子加一碟，点下面减号减一碟</p>
        </header>

        <section className="platesGrid" aria-label="Plates">
          <PlateCounter
            label="¥8"
            count={eightYuan}
            onIncrement={() => setEightYuan(eightYuan + 1)}
            onDecrement={() => setEightYuan(Math.max(0, eightYuan - 1))}
            variant="white"
          />
          <PlateCounter
            label="¥10"
            count={tenYuan}
            onIncrement={() => setTenYuan(tenYuan + 1)}
            onDecrement={() => setTenYuan(Math.max(0, tenYuan - 1))}
            variant="red"
          />
          <PlateCounter
            label="¥15"
            count={fifteenYuan}
            onIncrement={() => setFifteenYuan(fifteenYuan + 1)}
            onDecrement={() => setFifteenYuan(Math.max(0, fifteenYuan - 1))}
            variant="grey"
          />
          <PlateCounter
            label="¥20"
            count={twentyYuan}
            onIncrement={() => setTwentyYuan(twentyYuan + 1)}
            onDecrement={() => setTwentyYuan(Math.max(0, twentyYuan - 1))}
            variant="yellow"
          />
          <PlateCounter
            label="¥28"
            count={twentyEightYuan}
            onIncrement={() => setTwentyEightYuan(twentyEightYuan + 1)}
            onDecrement={() => setTwentyEightYuan(Math.max(0, twentyEightYuan - 1))}
            variant="black"
          />
        </section>

        <section className="extrasCard" aria-label="Extras">
          <div className="extrasRow">
            <div className="extrasLabel">人数</div>
            <div className="extrasControl">
              <button
                type="button"
                className="miniBtn"
                onClick={() => setPeople(Math.max(1, people - 1))}
                aria-label="减少人数"
                disabled={people <= 1}
              >
                −
              </button>
              <div className="miniValue" aria-label="人数">
                {people}
              </div>
              <button
                type="button"
                className="miniBtn"
                onClick={() => setPeople(people + 1)}
                aria-label="增加人数"
              >
                +
              </button>
            </div>
          </div>


          <div className="otherTable" aria-label="其他金额明细">
            <div className="otherHeader">
              <div className="otherHeaderCell">其他项目</div>
              <div className="otherHeaderCell otherHeaderCell--amount">金额</div>
              <div className="otherHeaderCell otherHeaderCell--action" aria-hidden="true" />
            </div>

            {otherItems.map((item) => (
              <div className="otherRow" key={item.id}>
                <input
                  className="itemNameInput"
                  type="text"
                  value={item.name}
                  placeholder="例如：乌冬面"
                  onChange={(e) => updateOtherItem(item.id, { name: e.target.value })}
                  aria-label="项目"
                />

                <div className="itemAmount">
                  <span className="miniPrefix">¥</span>
                  <input
                    className="moneyInput moneyInput--compact"
                    inputMode="numeric"
                    type="text"
                    pattern="[0-9]*"
                    value={item.amountInput}
                    onChange={(e) => {
                      const next = e.target.value
                      if (next === "" || /^\d+$/.test(next))
                        updateOtherItem(item.id, { amountInput: next })
                    }}
                    onBlur={() => {
                      const trimmed = item.amountInput.trim()
                      if (!trimmed) return
                      const n = Number(trimmed)
                      const normalized = Number.isFinite(n) ? String(Math.max(0, Math.trunc(n))) : ""
                      updateOtherItem(item.id, { amountInput: normalized })
                    }}
                    aria-label="金额"
                  />
                </div>

                <button
                  type="button"
                  className="miniBtn miniBtn--danger"
                  onClick={() => removeOtherItem(item.id)}
                  aria-label="删除项目"
                >
                  −
                </button>
              </div>
            ))}

            <div className="otherActions">
              <button type="button" className="miniBtn" onClick={addOtherItem} aria-label="新增项目">
                +
              </button>
            </div>
          </div>

          <div className="extrasRow">
            <div className="extrasLabel">其他合计：</div>
            <div className="miniValue" aria-label="其他合计">
              ¥{otherTotal}
            </div>
          </div>

        </section>

        <section className="totalCard" aria-label="Total">
          <div className="totalLabel">总计</div>
          <div className="totalValue">¥{total}</div>
          <div className="perPerson">人均：¥{perPerson.toFixed(2)}</div>
        </section>

        <div className="extrasRow extrasRow--center">
          <button type="button" className="resetBtn" onClick={resetAll}>
            重置
          </button>
        </div>

        <p className={`message ${msg ? "" : "message--empty"}`}>{msg || "\u00A0"}</p>

        <footer className="credit">Developed by 骆Hey</footer>
        <a
          className="coffeeLink"
          href="https://buymeacoffee.com/xiluo.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="coffeeHeart" aria-hidden="true">
            ♥
          </span>
          <span className="coffeeText">狠狠打赏我</span>
        </a>
      </div>
    </div>
  )
}
export default App
