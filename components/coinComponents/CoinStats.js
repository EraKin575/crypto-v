import React from 'react'

const CoinStats = ({coin}) => {
  return (
   
    <div className='pb-[40px] px-[20px] border-solid border-b-2 '>
     
    
    <div className="flex">
      <div
      className="flex pr-[50px]"

      >

        <img src={coin?.iconUrl} alt=""  width={30} height={30}/>
      <div className="">
        <p className='font-bold'>{coin?.name}</p>
        <p className="text-3xl font-bold">{(coin?.price)} </p>
      </div>
      <p className={`ml-[50px] font-medium ${coin?.change>0?'text-green-500':'text-red-500'}`}>{coin?.change}%</p>
      </div>


      <div className="flex gap-[40px]">
        <div className="flex flex-col">
          <p
          className="text-black font-semibold"
          >Volume 24H</p>
          <p>{coin?.["24hVolume"]}</p>
        </div>
        <div className="flex flex-col">
          <p
             className="text-black font-semibold"
          >Market Cap</p>
          <p>{coin?.marketCap}</p>
        </div>
        <div className="flex flex-col">
          <p
             className="text-black font-semibold"
          >Circulating Supply</p>
          <p>{coin?.supply?.circulating}</p>
        </div>
        <div className="flex flex-col">
          <p
             className="text-black font-semibold"
          >Max. Supply</p>
          <p>{coin?.supply?.max}</p>
        </div>
        

      </div>
      
      
    </div>
    



  </div>
  )
}

export default CoinStats