import React, {useEffect, useState} from 'react'
import {useMoralis, useWeb3Contract} from 'react-moralis'
import {abi, contractAddresses} from '../constants'
import {BigNumber, ContractTransaction, ethers} from 'ethers'
import {useNotification} from 'web3uikit'

interface ContractAddressesInterface {
  [key: string]: string[]
}

const LotteryEntrance = () => {
  const [entranceFee, setEntranceFee] = useState('0')
  const [numberOfPlayers, setNumberOfPlayers] = useState('0')
  const [recentWinner, setRecentWinner] = useState('0')
  const dispatch = useNotification()

  const {chainId: chainIdHex, isWeb3Enabled} = useMoralis()
  const chainId: string = parseInt(chainIdHex!).toString()
  const addresses: ContractAddressesInterface = contractAddresses
  const contractAddress = chainId in contractAddresses ? addresses[chainId][0] : null

  const {runContractFunction: enterRaffle, isLoading, isFetching} = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress!,
    functionName: 'enterRaffle',
    params: {},
    msgValue: entranceFee
  })

  const {runContractFunction: getEntranceFee} = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress!,
    functionName: 'getEntranceFee',
    params: {}
  })

  const {runContractFunction: getNumberOfPlayers} = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress!,
    functionName: 'getNumberOfPlayers',
    params: {}
  })

  const {runContractFunction: getRecentWinner} = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddress!,
    functionName: 'getRecentWinner',
    params: {}
  })

  const updateUI = async () => {
    if (isWeb3Enabled) {
      const entranceFeeFromContract = ((await getEntranceFee()) as BigNumber).toString()
      setEntranceFee(entranceFeeFromContract)

      const numberOfPlayers = ((await getNumberOfPlayers()) as BigNumber).toString()
      setNumberOfPlayers(numberOfPlayers)

      const recentWinner = ((await getRecentWinner()) as BigNumber).toString()
      setRecentWinner(recentWinner)
    }
  }

  useEffect(() => {
    updateUI()
  }, [isWeb3Enabled])

  const handleSuccess = async (tx:ContractTransaction) => {
    await tx.wait(1)
    handleNewNotification()
    await updateUI()
  }

  const handleNewNotification = () => {
    dispatch({
      type: 'info',
      message: 'Transaction complete!',
      title: 'Tx Notification',
      icon: 'bell',
      position: 'topR',
    })
  }

  /************************** Challenge **************************

   useMoralisSubscription('RaffleEnter', q => q, [], {
    enabled: true,
    onCreate: () => console.log('onCreate'),
    onUpdate: () => console.log('onUpdate'),
    onEnter: () => console.log('onEnter'),

  })

   // useMoralisSubscription("WinnerPicked", q => q, [], {
  //   onCreate: winner => console.warn(`Winner just picked: ${winner}`),
  // });

  // const { data, error, isLoading } = useMoralisQuery("WinnerPicked");
  // if (data) {
  //   console.warn(`Winner just picked: ${data}`)
  // }

  useEffect(() => {
    // window.ethereum.on('WinnerPicked', someEvent)
    // window.ethereum.on('RaffleEnter', someEvent)
    // @ts-ignore
    window.ethereum.on('message', someEvent)
    // const web3On = web3?.on('c',someEvent)

    // @ts-ignore
    // let ClientReceipt = web3.eth.contract(abi);
    // let EventTestContract = ClientReceipt.at(contractAddress);

    // @ts-ignore
    // EventTestContract.transfer(function(err, data) {
    //   if (!err)
    //     console.log(data);
    // });

    return () => {
      // @ts-ignore
      window.ethereum.removeListener('WinnerPicked', someEvent)
      // @ts-ignore
      window.ethereum.removeListener('RaffleEnter', someEvent)

    }
  }, [])

  // @ts-ignore
  function someEvent() {
    console.log('someEvent:::')
    // window.location.reload();
  }

  const emitEvent = () => {

    // @ts-ignore
    window.ethereum.emit('RaffleEnter')
    //--------------------------
    console.log('emitted')
    //--------------------------
  }
  ***************************************************************************/

  return (
    <div>
      {contractAddress
        ? <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded"
                      disabled={isLoading || isFetching}
                      onClick={async () => {
                        await enterRaffle({
                        // @ts-ignore
                          onSuccess: tx => handleSuccess(tx),
                          onError: (error) => console.error(error)
                        })
                      }}>
              <div className="w-24">
              {isLoading || isFetching
                ? <div className="animate-spin spinner-border h-6 w-6 border-b-2 rounded-full mx-auto"/>
                : <div>Enter Raffle</div>
              }
              </div>
            </button>

          <p>Entrance Fee: {ethers.utils.formatUnits(entranceFee, 'ether')} ETH</p>
          <p>Number of players: {numberOfPlayers}</p>
          <p>Recent winner: {recentWinner}</p>
        </div>










        : <div>
          No Raffle address detected...
        </div>
      }
      {/*<button onClick={emitEvent}> // ************** Challenge *****************/}
      {/*  Emit event*/}
      {/*</button>*/}
    </div>
  )
}

export default LotteryEntrance
