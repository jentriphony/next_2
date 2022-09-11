import {MongoClient, ObjectId} from 'mongodb'

import {Fragment} from 'react'
import Head from 'next/head'
import classes from './../../styles/item.module.css'
const Page = props => {
  if(!props.item) return <section>hi</section>
  return <Fragment>
      <Head>
        <title>{`item ${props.item.title.length > 16 ? props.item.title.slice(0, 16) + '..' : props.item.title}`}</title>
        <meta name='description' content={`list item add item 213179282554 ${props.item.description}`}/>
      </Head>
      <section className={classes.item}>
      <div className={classes.image}>
        <img src={props.item.image} alt={props.item.title}/>
      </div>
      <div className={classes.content}>
        <span>{props.item.title}</span>
        <address>{props.item.address}</address>
        <span>{props.item.description}</span>
      </div>
    </section>
  </Fragment>
}
export const getStaticPaths = async () => {
  const mongo = await MongoClient.connect('mongodb+srv://<username>:<password>@p7dbvdjaxse6yrim3-hceff.l2ohbwk.mongodb.net/?retryWrites=true&w=majority')
  const list = mongo.db('test').collection('list')
  const ids = await list.find({}, {_id: 1}).toArray()
  mongo.close()
  return {fallback: false, paths: ids.map(id => ({params: {slug: id._id.toString()}}))}
}
export const getStaticProps = async context => {
  const mongo = await MongoClient.connect('mongodb+srv://<username>:<password>@p7dbvdjaxse6yrim3-hceff.l2ohbwk.mongodb.net/?retryWrites=true&w=majority')
  const list = mongo.db('test').collection('list')
  const item = await list.findOne({_id: ObjectId(context.params.slug)})
  mongo.close()
  item.id = item._id.toString()
  delete item._id
  return {props: {item}, revalidate: 4096}
}
// export const getServerSideProps = async context => {
//   const response = await fetch(`http://localhost:3000/api/item/${context.params.slug}`)
//   if(!response.ok) return {props: {item: null}}
//   const data = await response.json()
//   return {props: {item: data}}
// }
// export const getStaticPaths = () => ({fallback: false, paths: [{params: {slug: 'item_1'}}, {params: {slug: 'item_2'}}]})
// export const getStaticProps = async context => ({props: {item: {
//   id: `item`, title: 'title', address: 'address', description: 'description',
//   image: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Mentos-box.jpg/300px-Mentos-box.jpg',}}})
export default Page