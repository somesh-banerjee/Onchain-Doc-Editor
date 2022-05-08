import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import { create as ipfsHttpClient } from 'ipfs-http-client'

import {
    contractAddress
} from './config'
import ABI from "./Editor.json"

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


const UpdateDoc = async(key,file) => {

    let url
    try {
        const added = await client.add(
            file,
            {
                progress: (prog) => console.log(`received: ${prog}`)
            }
        )
        //creating ipfs url with the hash
        url = `https://ipfs.infura.io/ipfs/${added.path}`
        console.log(url)
    } catch (error) {
        console.log(error);
    }

    // const web3Modal = new Web3Modal()
    // const connection = await web3Modal.connect()
    // const provider = new ethers.providers.Web3Provider(connection)
    // const signer = provider.getSigner()

    // const Contract = new ethers.Contract(contractAddress, ABI, signer)
    
    // try {
    //     let transaction = await Contract.newVersion(key,url)
    //     console.log(transaction);
    //     let tx = await transaction.wait()
    //     let event = tx.events[0]
    //     console.log(event);
    // } catch (err) {
    //     console.log(err);
    // }

}

export default UpdateDoc