import type { NextPage } from 'next'
import Head from 'next/head'
// import ManualHeader from '../components/ManualHeader'
import Header from '../components/Header'
import LotteryEntrance from '../components/LotteryEntrance'

const Home: NextPage = () => {
  return (
    <div className="w-5/6 m-auto">
      <Head>
        <title>Smart Contract Raffle</title>
        <meta name="description" content="Smart Contract Raffle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>
      <LotteryEntrance/>
    </div>
  )
}

export default Home
