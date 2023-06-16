'use client'
import React,{useState,useMemo,useEffect} from 'react'
import {Table} from 'antd'
import convert from '@/Convert'
import { Input,Button,Dropdown } from '@nextui-org/react'
import axios from 'axios'
import {Convert,getCurrencyList} from '@/Convert'
import Image from 'next/image'
import { SearchOutlined } from '@ant-design/icons'
import CryptoStat from './CryptoStat'



const Cryptocurrencies = () => {
 
    const [from,setFrom]=useState()

    const [currencyList,setCurrencyList]=useState([])
    const [selectedCurrency,setSelectedCurrency]=useState('USD')
    const [cryptoStats,setCryptoStats]=useState([])

    
    const [searchData,setSearchData] = useState('')
    const [cryptocurrencies,setCryptocurrencies] = useState([])
    const [api,setapi]=useState('')
    const [queryParams,setqueryParams]=useState({
        referencyCurrencyUuid:'yhjMzLPhuIDl',
        timePeriod:'24h',
        orderBy:'marketCap',
        orderDirection:'desc',
        limit:100
    })
    
    const categories=[
        'defi',
        'stablecoin',
        'nft',
        'dex',
        'exchange',
        'staking',
        'dao',
        'meme',
        'privacy',
        'metaverse',
        'gaming',
        'wrapped',
        'layer-1',
        'layer-2',
        'fan-token',
        'football-club',
        'web3',
        'social'
       
    ] // defi stablecoin nft dex exchange staking dao meme privacy metaverse gaming wrapped layer-1 layer-2 fan-token football-club web3 social
    const headers={
        'X-RapidAPI-Key': 'a67bb7208amshc9f3583b2bf2877p159913jsn086a6691f0d5',
        'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    }


    const columns = [   
        {
            title: 'Name',
            dataIndex: 'nameTag',
            key: 'name',

            render:({name,iconUrl})=>(
                <div className="flex items-center w-[200px] gap-[2px]">
                    
                    <img src={iconUrl} alt={name} width={20} height={20} />
                    <span className="ml-2">{name}</span>
                </div>
            )
            },
            {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render:(price)=>(
                <span
                className='w-[70px]'
                >{`$${price}`}</span>
            )

            },
            {
            title: 'Market Cap',
            dataIndex: 'marketCap',
            key: 'marketCap',
            },
            {
            title: '24h Change',
            dataIndex: 'change',
            key: 'change',
            render:(change)=>(
                <span className={`w-[70px] ${change>0?'text-green-500':'text-red-500'}`}>{change}%</span>
            )
            }
        ]
        const categoriesBar=categories.map((category)=>(
           
            // eslint-disable-next-line react/jsx-key
            <Button
            className='hover:bg-sky-200  border-hidden hover:text-blue-600'
            onClick={()=>setqueryParams({
                ...queryParams,
                "tags[]":category
            })

            }
             light color="primary" auto ghost>
                {category}
        </Button>
            )
        )
    

      
       
        
    useEffect(() => {
        const getCurrencyList=async()=>{
            await axios.get('https://v6.exchangerate-api.com/v6/9be71d5026d0ddb459e84b78/latest/'+selectedCurrency)
            .then((response)=>{
                const currencyList=response.data.conversion_rates
                const currencyArray=Object.keys(currencyList)
                
                setCurrencyList(currencyArray)

            })
            .catch((error)=>{
                console.log(error)
            })
        }
        getCurrencyList()
    }, [])

           
        

    useEffect(() => {
        const fetchData=async()=>{
            try{
                const response=await axios.get('https://coinranking1.p.rapidapi.com/coins?',
               { params:queryParams,
                headers:headers
            })
                setCryptocurrencies(response.data.data.coins)
                setCryptoStats(response.data.data.stats)
                
                console.log(response)
            }
            catch(error){
                console.log(error)
            }
        }
   
        fetchData()
    },[queryParams,searchData])

    
    const onSearchChange=(value)=>{
        setSearchData(value)
        setqueryParams({
            ...queryParams,
            search:value
        })

    
        
    
    }

    const cryptoCoins=cryptocurrencies.map((coin)=>({
        key:coin.uuid,
        nameTag:{
            name:coin.name,
            iconUrl:coin.iconUrl
        },
        price:(coin.price),
        marketCap:coin.marketCap,
        change:coin.change,
      
    }))
    
   const item='Search'
console.log(cryptoStats)

    return (
        <div
        className='bg-slate-100 text-black'
        >
            {cryptoStats && <CryptoStat
            cryptocurrencies={cryptoStats?.totalCoins}
            marketCap={cryptoStats?.totalMarketCap}
            markets={cryptoStats?.totalMarkets}
            volume24h={cryptoStats?.total24hVolume}
            exchanges={cryptoStats?.totalExchanges}
            />
}




            

       
        
        <div className='pt-[30px]'>
            <div className="flex items-center px-[30px] ml-2 gap-[10px]">
            <Image src='/CRYPTO.png' width={200} height={200} alt='cryptpo' />
            
            <Input
            bordered
            color='primary'
            placeholder={item}
            onChange={(e)=>onSearchChange(e.target.value)}
            value={searchData}
            labelRight={<SearchOutlined />}
            />
              
            </div>
            <div className=" flex flex-wrap border-gray-400 pt-5 mx-10 rounded-md bg-gray-50 items-center gap-[10px]">
                <div
                className='px-9'
                ><h1
                className="text-black text-[20px] font-semibold"
                >Top 100 cryptocurrencies</h1>
                <p
                className="text-[#8e8e8e] text-[14px]"
                >By Market Capitalization</p>
                </div>

            </div>
              <div className='rounded-xl my-5 pt-4 mx-[40px] shadow-2xl px-4'>
            <div className="flex flex-wrap gap-[10px] mt-[20px]">
                {categoriesBar}
            </div>

          

            <Table
            dataSource={cryptoCoins}
            columns={columns}
            orderBy={queryParams.orderBy}
            
            
            />
            </div>
            
        
        </div>
        </div>

    )
}

export default Cryptocurrencies

