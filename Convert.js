import axios from 'axios';
const Convert =async(amount,from,to)=>{
    await axios.get('https://v6.exchangerate-api.com/v6/9be71d5026d0ddb459e84b78/latest/USD')
    .then((response)=>{
        const rate=response.data.conversion_rates
        const exchangeRate=rate[to]/rate[from]
        const convertedAmount=(amount*exchangeRate).toFixed(2)
        return `${convertedAmount} ${to}`
    }
    )
    .catch((error)=>{
        console.log(error)
    }
    )

}


const getCurrencyList=async()=>{
    await axios.get('https://v6.exchangerate-api.com/v6/9be71d5026d0ddb459e84b78/latest/USD')
    .then((response)=>{
        const currencyList=response.data.conversion_rates
        const currencyArray=Object.keys(currencyList)
        return currencyArray
    })
    .catch((error)=>{
        console.log(error)
    })
}
export {Convert,getCurrencyList}
