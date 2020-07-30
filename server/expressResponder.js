import logger from './logger'
import _ from 'lodash'

function Responder () { }

/*
 * This method sends the response to the client.
 */
function sendResponse (res, status, body) {
  if (!res.headersSent) {
    if (body) { return res.status(status).json(body) }
    return res.status(status).send()
  } else {
    logger.error('Response already sent.')
  }
}

/*
 * These methods are called to respond to the API user with the information on
 * what is the result of the incomming request
 */
Responder.sendJSONResponse = (res, obj) => {
  return sendResponse(res, 200, obj)
}

Responder.success = (res, data) => {
  let message = 'Request has been processed successfully.'
  if (_.isString(data)) {
    message = data
    data = ''
  } else if (_.isObject(data) && data['message']) {
    message = data['message']
  }

  if (data && data['message']) {
    delete data['message']
  }

  return sendResponse(res, 200, { data: data || [], message })
}

export default Responder
