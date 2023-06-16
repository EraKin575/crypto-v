import React from 'react'

const CryptoStat = ({cryptocurrencies,markets,marketCap,volume24h,exchanges}) => {
  return (
    <div className='flex justify-evenly'>
      <div className='flex'>
        <h1 className='text-slate-400'
        >Cryptocurrencies
        <span className='text-black'

        >{cryptocurrencies}</span></h1>
        <h1 className='text-slate-400'
        >
          Markets<span>{markets}</span></h1>
      </div>
      <div className='flex'>
        <h1 className='text-slate-400'
        >Market Cap <span>{marketCap}</span></h1>
        <h1 className='text-slate-400'
        >Volume 24H<span>{volume24h}</span></h1>
      </div>
      <h1 className='text-slate-400'h1
      >{exchanges}</h1>

        


    </div>
  )
}

export default CryptoStat