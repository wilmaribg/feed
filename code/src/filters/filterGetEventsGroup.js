export default (groupId, events) => {
  return events.filter(event => event.docId == groupId)
} 