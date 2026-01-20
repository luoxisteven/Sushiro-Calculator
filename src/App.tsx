import { useEffect, useMemo, useState } from "react"
import "./App.css"

function App() {
  const [eightYuan, setEightYuan] = useState(0)
  const [tenYuan, setTenYuan] = useState(0)
  const [fifteenYuan, setFifteenYuan] = useState(0)
  const [twentyYuan, setTwentyYuan] = useState(0)
  const [twentyEightYuan, setTwentyEightYuan] = useState(0)
  const [people, setPeople] = useState(1)
  const [otherAmountInput, setOtherAmountInput] = useState("")

  const otherAmount = useMemo(() => {
    // Keep input UX flexible ('' while editing), but always calculate with a safe number.
    const trimmed = otherAmountInput.trim()
    if (!trimmed) return 0
    const n = Number(trimmed)
    return Number.isFinite(n) ? Math.max(0, n) : 0
  }, [otherAmountInput])

  const total = useMemo(() => {
    return (
      eightYuan * 8 +
      tenYuan * 10 +
      fifteenYuan * 15 +
      twentyYuan * 20 +
      twentyEightYuan * 28 +
      otherAmount
    )
  }, [eightYuan, tenYuan, fifteenYuan, twentyYuan, twentyEightYuan, otherAmount])

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
    setOtherAmountInput("")
    setPeople(1)
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

          <div className="extrasRow">
            <div className="extrasLabel">其他金额</div>
            <div className="extrasControl">
              <span className="miniPrefix">¥</span>
              <input
                className="moneyInput"
                inputMode="numeric"
                type="text"
                pattern="[0-9]*"
                value={otherAmountInput}
                onChange={(e) => {
                  const next = e.target.value
                  // allow empty while editing; otherwise digits only (integer amounts)
                  if (next === "" || /^\d+$/.test(next)) setOtherAmountInput(next)
                }}
                onBlur={() => {
                  // Normalize: remove leading zeros like "030" -> "30"
                  const normalized = otherAmount === 0 ? "" : String(Math.trunc(otherAmount))
                  setOtherAmountInput(normalized)
                }}
                aria-label="其他金额"
              />
            </div>
          </div>

          <div className="extrasRow extrasRow--end">
            <button type="button" className="resetBtn" onClick={resetAll}>
              Reset
            </button>
          </div>
        </section>

        <section className="totalCard" aria-label="Total">
          <div className="totalLabel">总计</div>
          <div className="totalValue">¥{total}</div>
          <div className="perPerson">人均：¥{perPerson.toFixed(2)}</div>
        </section>

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
