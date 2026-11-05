import type { SubmitEvent } from 'react'
import { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router'
import { api } from '../service/api'
import style from './home.module.css'


/* assets?limit=10&offset=0&apiKey=267c22114283e1c032d6e6e856bd1337e966f0ecbe5348b4beb5d86da028378a */

export interface CoinsProps{
id: string,
rank: string,
symbol: string,
name: string,
supply: string,
maxSupply: string,
marketCapUsd: string,
volumeUsd24Hr: string,
priceUsd: string,
changePercent24Hr: string,
vwap24Hr: string,
explorer: string,
formatedPrice?:string,
formatedMarket?:string,
formatedVolume?:string

}

interface DataProps{
  data: CoinsProps[]
}

export function Home() {

  const navigate  = useNavigate();

  const [input, setInput]=useState("");
  const[coins,setCoins] = useState<CoinsProps[]>([])
  const[offset,setOffset]=useState(0)


useEffect(()=>{

  getData()

},[offset]);

async function getData() {

  try {
    
    const reponse = await api.get<DataProps>(`assets?limit=10&offset=${offset}`,{
      params:{
        apiKey:import.meta.env.VITE_API_KEY
      }
    })

    const price = Intl.NumberFormat("en-US",{style:"currency",currency:"USD"})

    const priceCompact = Intl.NumberFormat("en-US",{style:"currency",currency:"USD",notation:"compact"})

    const conisData = reponse.data.data

    const formatedResult = conisData.map((item)=>{

      const formated = {...item, 
        formatedPrice: price.format(Number(item.priceUsd)),
        formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
        formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
      
      }
      return formated

    })

    const listConis = [...coins, ...formatedResult]
    setCoins(listConis)

    /* console.log(formatedResult) */

    
  } catch (error) {
    console.log(error)
  }
  
  
}


const handleCarregar = () =>{
  
  if (offset === 0) {
    setOffset(10)
    return
  }

  setOffset(offset+10)

}









  const handleSubmit = (e:SubmitEvent) =>{
    e.preventDefault()

    if(input==="")return

    navigate(`/detail/${input}`)
  }

  return (
   <main className={style.container}>

    <form className={style.form} onSubmit={handleSubmit}>

    <input type="text" placeholder='Digite no nome da moeda'  name='inputSearch' onChange={(e)=> setInput(e.target.value)}/>

    <button type="submit">
      <BsSearch size={30} color='#fff'/>
    </button>

    </form>

    <table>
      <thead>
      <tr>
        <th scope='col'>Moeda</th>
        <th scope='col'>Valor mercado</th>
        <th scope='col'>Preço</th>
        <th scope='col'>Volume</th>
        <th scope='col'>Mudança 24h</th>
      </tr>
      </thead>

      <tbody id='tbody'>

        {coins.length > 0 && coins.map((item)=>(
          <tr className={style.tr} key={item.id}>
        <td className={style.tdLabel} data-label="Moeda">
       <div className={style.name}>
          
         <Link to={`/detail/${item.id}`} className={style.linkName}><img src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`} alt="logo cripto" className={style.logo} /> <span>{item.name}</span></Link>
       </div>
        </td>


        <td className={style.tdLabel} data-label="Valor mercado" >
          {item.formatedMarket}
        </td>

        <td className={style.tdLabel} data-label="Preço" >
          {item.formatedPrice}
        </td>

        <td className={style.tdLabel} data-label="Volume" >
          {item.formatedVolume}
        </td>

        <td className={style.tdLabel} data-label="Mudança 24h" >
          <span className={Number(item.changePercent24Hr)>0 ? style.tdProfit : style.tdLoss}>{Number(item.changePercent24Hr).toFixed(3)}</span>
        </td>


        </tr>
        ))}
        
      </tbody>
    </table>
    <button className={style.carregar} onClick={()=>handleCarregar()}>carregas mais</button>
   </main>
  )
}

