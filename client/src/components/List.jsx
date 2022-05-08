import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import './list.css'

import {
    contractAddress
} from './../web3/config'

import ABI from "./../web3/Editor.json"

const List = (props) => {

    const [versions, setVersions] = useState([])

    useEffect(() => {
        const getData = async() => {
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)
            const Contract = new ethers.Contract(contractAddress, ABI, provider)
            try {
                let transaction = await Contract.getAllVersions(props.id)
                setVersions(transaction)
            } catch (err) {
                console.log(err);
            }
        }
        getData()
    },[])
    
    return(
        <div className='List-container'>
            <h3>All Versions</h3>
            <ul>
                {
                    versions.length>0 ? 
                    (versions.map(i=>(
                        <li key={i._id}>
                            <a href={`${i}`}>{i}</a>
                        </li>
                    ))) : 'No versions created'
                }
            </ul>
        </div>
    )
}

export default List