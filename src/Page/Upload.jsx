import React, { useState,useEffect } from 'react'
import { ethers } from "ethers";
import { Web3Storage } from 'web3.storage'
import up from "./UP.json"


function Upload() {

    const [state , setState]=useState({
        provide:null,
        signer:null,
        address:null
    })

    
const contractAddress="0x4fb3B17e755C2D9d1f2dc70AdC0D5a333579F96f";


//address
const [Addresss, setAddresss]=useState();

useEffect(()=>{
    const Checker=async()=>{
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const account=await provider.send("eth_requestAccounts", []);
      const signer=provider.getSigner()
      const address = await signer.getAddress()
      // console.log("this is account " + account)
      // console.log("this is signer " + signer.toString())
      // console.log(address)
      setAddresss(address)
      setState({provider , signer , address})   


    }

    Checker()
  },[])

  const [bal , setBal]=useState()
useEffect(()=>{
const All=async()=>{
  const {provider ,  address}=state;
  const balance=await provider.getBalance(address)
  const balaether=ethers.utils.formatEther(balance, "ether")

  // console.log(balaether)
  setBal(balaether)
}
All()

},[state])


//Image Upload Web3


  const client = new Web3Storage({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERFNjRjODIwMGM4MzdlZWVlMDE0NWIwNWM1MTFiZUFCYjFjMThlODUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY1NDQ2MDQyNzEsIm5hbWUiOiJJbWFnZVVwIn0.FSNy4TIrk24P_bG8vAnB2PTI3rMb8paCPVwiwv_mrvE',
  })



const [File , setFile]=useState()

const handleUploadFiles=async(e)=>{

  const {signer}=state;

 const fileInput = document.querySelector('#files')
 e.preventDefault()
    const rootCid = await client.put(fileInput.files)

    console.log(rootCid)
    const res = await client.get(rootCid)
    console.log(res)
    const  files  = await res.files()


    for(let fil of files){

   let uploadUrl=`https://${fil.cid}.ipfs.w3s.link/?filename=${fil.name}`

   console.log(uploadUrl)
   const contractss=new ethers.Contract(contractAddress, up , signer)
  const sigs=await contractss.upload(Addresss,uploadUrl)


console.log(sigs)


    }



}
//CheckData

const [chec , setCheck]=useState()

const Datacheck=async(e)=>{
  e.preventDefault()
  const {provider }=state;
  const contractss=new ethers.Contract(contractAddress, up , provider)
  const che=await contractss.CheckInfo(chec)

  console.log(che.add)

  console.log(che.url)

  console.log(che)


  setCheck(che)
}





  return (
    <div>

<h1>upload</h1>

<h1>{Addresss}</h1>

<h1>{bal}</h1>



<img src={`${chec.url}`} alt="" />


<form>

    <input type="file" name=""  id="files" value={File} />
    <br />
    <br />
    <button onClick={handleUploadFiles}>Upload Files</button>
</form>


{/* CheckDataLine */}

<form >

<input type="text" name="" id="" onChange={(e)=>setCheck(e.target.value)} />

<button onClick={Datacheck}>getData</button>

</form>
    </div>
  )
}

export default Upload