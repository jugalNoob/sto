import React,{useState , useEffect} from 'react'

import { ethers } from "ethers";

import abi from "./ABI.json"

function Thup() {

  const [state , setState]=useState({

    provider:null,
    signer:null,
    address:null
  })

const [Addresss, setAddresss]=useState();

const contractAddress="0x8798aDcDd73b25C59B9552B631946fb7b91b44Bc";
  useEffect(()=>{
    const Checker=async()=>{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const account=await provider.send("eth_requestAccounts", []);
      const signer=provider.getSigner()
      const address = await signer.getAddress()
      console.log("this is account " + account)
      console.log("this is signer " + signer.toString())
      console.log(address)
      setAddresss(address)
      setState({provider , signer , address})

   
    }

    Checker()


  },[])





//Balance
const [bal , setBal]=useState()
useEffect(()=>{
const All=async()=>{
  const {provider ,  address}=state;
  const balance=await provider.getBalance(address)
  const balaether=ethers.utils.formatEther(balance)
  console.log(balaether)
  setBal(balaether)
}
All()

},[state])

//ShowAge



  

const [pro ,setPro]=useState()

useEffect(()=>{
const Ages=async()=>{
  const {provider}=state;
  const contracts=new ethers.Contract(contractAddress, abi , provider)
  const ages=await contracts.age()
  console.log(ages.toString())
  setPro(String(ages))


}
Ages()
},[state])


//Ages Signer
const [sig , setSign]=useState()

const Chnage=async()=>{

  const {signer}=state;
  const contractss=new ethers.Contract(contractAddress, abi , signer)
  const sigs=await contractss.Age(sig)
  await sigs.wait();
  console.log(String(sigs))
  setSign(String(sigs))


}



  return (
    <div>

     <h1>{Addresss}</h1>
     <h1>{bal}</h1>
     <h1>{pro}</h1>

  


     <br />

     <br />



      <input type="text" name="sig" id="" value={sig} onChange={(e)=>setSign(e.target.value)} placeholder="updat value"/>

      <button onClick={Chnage}>update</button>
 
    </div>
  )
}

export default Thup