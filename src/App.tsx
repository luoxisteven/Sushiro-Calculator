import { useState } from "react"

function App() {
  const [eightYuan, setEightYuan] = useState(0)
  const [tenYuan, setTenYuan] = useState(0)
  const [fifthteenYuan, setFifthteenYuan] = useState(0)
  const [twentyYuan, setTwentyYuan] = useState(0)
  const [twentyEightYuan, setTwentyEightYuan] = useState(0)

  function Cal() : number {
    return eightYuan * 8 + tenYuan * 10 + fifthteenYuan * 15 + twentyYuan * 20 + twentyEightYuan * 28
  }

  function ButtonGroup({ parameter, setParameter }: {
    parameter: number;
    setParameter: (value: number) => void;
  }) {
    return(
      <div>
        <button onClick={() => setParameter(parameter + 1) }>+</button>
        <button onClick={() => setParameter(parameter >= 1 ? parameter - 1 : 0)}>-</button>
      </div>
    )
  }

  function message() : string{
    if (Cal()>0 && Cal()<=50){
      return "吃这么少, Shunya没力踢ball"
    } else if (Cal()>50 && Cal()<200){
      return "吃太多会肥噶"
    } else if (Cal()>=200){
      return "200蚊，每多一蚊加收一蚊使用此App的税，收款人：骆熙，多谢！"
    }
    return ""
  }

  return (
    <div>
      <h2> 寿司郎计算器 Sushiro Calculator </h2>
      <text>{message()}</text>
      <div>
        <text> 8元 </text>
        <text>{eightYuan}碟</text>
        <text></text>
        <ButtonGroup parameter={eightYuan} setParameter={setEightYuan}/>
      </div>
      <div>
        <text> 10元 </text>
        <text>{tenYuan}碟</text>
        <ButtonGroup parameter={tenYuan} setParameter={setTenYuan}/>
      </div>
      <div>
        <text> 15元 </text>
        <text>{fifthteenYuan}碟</text>
        <ButtonGroup parameter={fifthteenYuan} setParameter={setFifthteenYuan}/>
      </div>
      <div>
        <text> 20元 </text>
        <text>{twentyYuan}碟</text>
        <ButtonGroup parameter={twentyYuan} setParameter={setTwentyYuan}/>
      </div>
      <div>
        <text> 28元 </text>
        <text>{twentyEightYuan}碟</text>
        <ButtonGroup parameter={twentyEightYuan} setParameter={setTwentyEightYuan}/>
      </div>
      <text>总计: {Cal()}元</text>
    </div>
  )
}
export default App
