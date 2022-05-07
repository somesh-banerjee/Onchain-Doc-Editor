import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import {
    contractAddress
} from './config'


import ABI from "./Editor.json"

const CreateDoc = async(key) => {

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const Contract = new ethers.Contract(contractAddress, ABI, signer)
    
    try {
        let transaction = await Contract.newDoc(key)
        console.log(transaction);
        let tx = await transaction.wait()
        let event = tx.events[0]
        console.log(event);
    } catch (err) {
        console.log(err);
    }

}

export default CreateDoc