import React, { useState, useEffect } from 'react'
import { Web3Storage } from 'web3.storage'
import './img.css'

function Dapp() {
  const client = new Web3Storage({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERFNjRjODIwMGM4MzdlZWVlMDE0NWIwNWM1MTFiZUFCYjFjMThlODUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY1NDQ2MDQyNzEsIm5hbWUiOiJJbWFnZVVwIn0.FSNy4TIrk24P_bG8vAnB2PTI3rMb8paCPVwiwv_mrvE',
  })

  const [fileList, setFileList] = useState([])

  // Fetch existing files on component mount

 


  const handleUploadFiles = async (e) => {
    e.preventDefault()
    const fileInput = document.querySelector('#files')
    const rootCid = await client.put(fileInput.files)
    const res = await client.get(rootCid)
    const  files  = await res.files()
    setFileList((prevFiles) => [...prevFiles, ...files])
  }

  const handleDeleteFile = async (cid) => {
    const res = await client.delete(cid)
    if (res.ok) {
      setFileList((prevFiles) => prevFiles.filter((file) => file.cid !== cid))
    } else {
      console.error('Failed to delete file')
    }
  }

  return (
    <div>
      {/* Render existing files */}
      {fileList.map((file) => (
        <div key={file.cid}>
          <h1>jugal</h1>
          <img
            style={{ width: '100px', textAlign: 'center', margin: 'auto' }}
            src={`https://${file.cid}.ipfs.w3s.link/?filename=${file.name}`}
            alt=""
          />
          <button onClick={() => handleDeleteFile(file.cid)}>Delete</button>
        </div>
      ))}

      {/* File input and submit button */}
      <form>
        <input type="file" id="files" placeholder="enter your file name" />
        <button onClick={handleUploadFiles}>Upload Files</button>
      </form>
    </div>
  )
}

export default Dapp
