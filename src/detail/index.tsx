import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import type { CoinsProps } from "../home"
import { api } from "../service/api"

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
      
    } catch (error) {
      console.log(error)
      navigate("/")
    }
  }


getConis()

},[cripto])


  return (
    <>
      <h1>Detalhes {cripto}</h1>
    </>
  )
}

