import { sdk } from '../provides/sdk.js'

export const UserMe = () => new Promise((resolve, reject) => {
  sdk.user.me((err, me) => {
    if (err) return reject(err)
    resolve(me)
  })
})

export const UserSearch = (criteria) => new Promise((resolve, reject) => {
  const query = {
    criteria,
    limit: 50,
    populate: {'company':['name','type']},
    searchFields: 'firstName,lastName,email,id',
    selectedFields: 'firstName,lastName,email,company,avatars,id,role,status',
    sort: 'updatedAt DESC',
  }
  sdk.user.search(query, (err, res) => {
    if (err) return reject(err)
    const { docs } = res
    resolve(docs)
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

export const EventsFiltersSave = (user, userInfo, filter) => new Promise((resolve, reject) => {
  sdk.eventsFilter.saveFilters({ user, userInfo, filter }, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})





