import React from 'react'

const CryptoStat = ({cryptocurrencies,markets,marketCap,volume24h,exchanges}) => {
  return (
    <div className='flex gap-[60px]'>
      <div className='flex gap-2'>
        <h1 className='text-gray-600'
        >Cryptocurrencies
        <span className=' pl-2 font-semibold text-black'

        >{cryptocurrencies}</span></h1>
        <h1 className='text-gray-600 font-semibold'
        >
          Markets<span className='text-black pl-2 font-semibold'>{markets}</span></h1>
      </div>
      <div className='flex gap-2'>
        <h1 className='text-gray-600 font-semibold'
        >Market Cap <span className='text-black font-semibold pl-2'>{marketCap}</span></h1>
        <h1 className='text-gray-600'
        >Volume 24H<span className='text-black font-semibold pl-2'>{volume24h}</span></h1>
      </div>
      
      <h1 className='font-semibold text-black'
      ><span className='pr-3 text-gray-600 '>Exchanges</span>{exchanges}</h1>

        


    </div>
  )
}

export default CryptoStat