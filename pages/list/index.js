import {MongoClient} from 'mongodb'

import {Fragment} from 'react'
import Head from 'next/head'
import List from './../../components/List/List'
const Page = props => <Fragment>
  <Head>
    <title>list</title>
    <meta name='description' content='list item add list 92926305243'/>
  </Head>
  <List list={props.list}/>
</Fragment>
// export const getServerSideProps = async context => {
//   const req = context.req
//   const res = context.res
//   return {props: {list}}
// }
// export const getServerSideProps = async context => {
//   const response = await fetch('http://localhost:3000/api/list')
//   if(!response.ok) return {errorMessage: 'error_fetch'}
//   const data = await response.json()
//   return {props: {list: data}}
// }
export const getStaticProps = async context => {
  const mongo = await MongoClient.connect('mongodb+srv://<username>:<password>@p7dbvdjaxse6yrim3-hceff.l2ohbwk.mongodb.net/?retryWrites=true&w=majority')
  let list = mongo.db('test').collection('list')
  list = await list.find().toArray()
  return {props: {list: list.map(item => {
    item.id = item._id.toString()
    delete item._id
    return item
  })}, revalidate: 4096}
}
export default Page