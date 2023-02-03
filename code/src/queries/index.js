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

export const RafPlusStatus = () => new Promise((resolve, reject) => {
  sdk.event.rafPlusStatus((err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})

export const EventsPage = (page) => new Promise((resolve, reject) => {
  const limit = 10
  const skip = page * limit
  sdk.event.loadMore({ skip, limit }, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})

export const EventsSiblings = ({ id, docId }) => new Promise((resolve, reject) => {
  sdk.event.docEvents({ id, docId }, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})

export const EventsDelete = (id) => new Promise((resolve, reject) => {
  sdk.event.destroy(id, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})

export const EventsSiblingsDelete = (docId) => new Promise((resolve, reject) => {
  sdk.event.destroyEventAndSiblings({ docId }, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})

export const EventsFiltersExists = () => new Promise((resolve, reject) => {
  sdk.eventFilter.exists((err, exists) => {
    if (err) return reject(err)
    resolve(exists)
  })
})

export const EventsFilters = (user) => new Promise((resolve, reject) => {
  sdk.eventFilter.find({ user }, (err, docs) => {
    if (err) return reject(err)
    if (Array.isArray(docs) && docs.length) return resolve(docs[0].filter)
    resolve(null)
  })
})

export const EventsFiltersSave = (user, userInfo, filter) => new Promise((resolve, reject) => {
  sdk.eventFilter.saveFilters({ user, userInfo, filter }, (err, docs) => {
    if (err) return reject(err)
    resolve(docs)
  })
})





