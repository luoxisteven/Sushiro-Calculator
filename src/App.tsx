import { useMemo, useState } from "react"
import "./App.css"

function App() {
  const [eightYuan, setEightYuan] = useState(0)
  const [tenYuan, setTenYuan] = useState(0)
  const [fifteenYuan, setFifteenYuan] = useState(0)
  const [twentyYuan, setTwentyYuan] = useState(0)
  const [twentyEightYuan, setTwentyEightYuan] = useState(0)
  const [people, setPeople] = useState(1)
  const [otherAmount, setOtherAmount] = useState(0)

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
    setOtherAmount(0)
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
      return "吃太多会肥噶"
    } else if (total >= 200) {
      return "200蚊，每多一蚊加收一蚊使用此App的税，收款人：骆熙，多谢！"
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
                type="number"
                min={0}
                step={1}
                value={otherAmount}
                onChange={(e) => setOtherAmount(Math.max(0, Number(e.target.value) || 0))}
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

        {msg ? <p className="message">{msg}</p> : null}
      </div>
    </div>
  )
}
export default App
