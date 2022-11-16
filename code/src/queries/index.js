import { sdk } from '../provides/sdk.js'

export const UserMe = () => new Promise((resolve, reject) => {
  sdk.user.me((err, me) => {
    if (err) return reject(err)
    resolve(me)
  })
})

export const  EventsPage = (page) => new Promise((resolve, reject) => {
  const limit = 10
  const skip = page * limit
  sdk.events.loadMore({ skip, limit }, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})

export const EventsSiblings = ({ id, docId }) => new Promise((resolve, reject) => {
  sdk.events.docEvents({ id, docId }, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})

export const EventsDelete = (id) => new Promise((resolve, reject) => {
  sdk.events.destroy(id, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})

export const EventsSiblingsDelete = (docId) => new Promise((resolve, reject) => {
  sdk.events.destroyEventAndSiblings({ docId }, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})

export const EventsFilters = (user) => new Promise((resolve, reject) => {
  sdk.eventsFilter.find({ user }, (err, docs) => {
    if (err) return reject(err)
    if (Array.isArray(docs) && docs.length) return resolve(docs[0].filter)
    resolve(null)
  })
})

export const EventsFiltersSave = (user, filter) => new Promise((resolve, reject) => {
  sdk.eventsFilter.saveFilters({ user, filter }, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})