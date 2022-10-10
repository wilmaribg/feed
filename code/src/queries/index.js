import { sdk } from '../provides/sdk.js'

export const UserMe = () => new Promise((resolve, reject) => {
  sdk.api.user.me((err, me) => {
    if (err) return reject(err)
    resolve(me)
  })
})

export const  EventsPage = (page) => new Promise((resolve, reject) => {
  const limit = 10
  const skip = page * limit
  sdk.api.events.loadMore({ skip, limit }, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})

export const EventsSiblings = ({ id, docId }) => new Promise((resolve, reject) => {
  sdk.api.events.docEvents({ id, docId }, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})