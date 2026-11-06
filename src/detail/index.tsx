import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import type { CoinsProps } from "../home"
import { api } from "../service/api"
import style from './detail.module.css'

interface ResponseData {
  data:CoinsProps
}

interface Error{
  error:string
}


type DataProps = ResponseData | Error

export function Detail() {
const [coin,setCoin]=useState<CoinsProps>()  
const {cripto} =useParams() 
const navigate = useNavigate()
const[load,setLoad]=useState(true)

useEffect(()=>{

  async function getConis() {
    try {

    const response = await api.get<DataProps>(`assets/${cripto}`,{params:{apiKey:import.meta.env.VITE_API_KEY}})

      if ("error" in response.data) {

        navigate("/")
        return
        
      }

    const coinData = response.data.data
    
 const price = Intl.NumberFormat("en-US",{style:"currency",currency:"USD"})

const priceCompact = Intl.NumberFormat("en-US",{style:"currency",currency:"USD",notation:"compact"})

const formated = {...coinData, 
        formatedPrice: price.format(Number(coinData.priceUsd)),
        formatedMarket: priceCompact.format(Number(coinData.marketCapUsd)),
        formatedVolume: priceCompact.format(Number(coinData.volumeUsd24Hr))
      
      }

      console.log(formated)
      setCoin(formated)
      setLoad(false)
    } catch (error) {
      console.log(error)
      navigate("/")
    }
  }


getConis()

},[cripto])


  if (load) {
    return(
      <div className={style.container}>
        <h4>Carregando os detalhes . . .</h4>
      </div>
    )
  }


  return (
    <div className={style.container}>
      <h1 className={style.center}>{coin?.name}</h1>
      <h1 className={style.center}>{coin?.symbol}</h1>

    <section className={style.content}>
      <img src={`https://assets.coincap.io/assets/icons/${coin?.symbol.toLocaleLowerCase()}@2x.png`} alt="logo"  className={style.logo}/>
    

    <h1>{coin?.name} | {coin?.symbol}</h1>

    <a><strong>Preço: </strong>{coin?.formatedPrice}</a>
    <a><strong>Mercado: </strong>{coin?.formatedMarket}</a>
    <a><strong>Volume: </strong>{coin?.formatedVolume}</a>

    <a><strong>Mudança 24h: </strong> <span className={Number(coin?.changePercent24Hr)> 0 ? style.profit:style.loss}> {Number(coin?.changePercent24Hr).toFixed(3)}</span></a>
    </section>
    </div>
  )
}

