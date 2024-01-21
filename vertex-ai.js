// code review
// generation of doc strings
// code summary
// generation of unit tests

const OAUTH_TOKEN = 'token'
const PROJECT = 'gcve-hackathon-24'

const MODEL_MAP = {
  'code_generation': 'code-bison',
  'code_completion': 'code-gecko',
  'code_chat': 'codechat-bison'
}

const API_URL = `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/us-central1/publishers/google/models/code-bison:predict`


parameters = {
  'candidateCount': 1,
  'maxOutputTokens': 1024,
  'temperature': 0.9,
  'topP': 1
}


menu_option_prompt_prefix_map = {
  'generate_unit_tests': 'Generate unit tests for the following code:\n',
  'generate_doc_strings': 'Generate doc strings for the following code:\n',
  'code_review': 'Review the following code:\n'
}

function get_payload(prompt) {
  payload = {
    'instances': [{
      'prefix': prompt
    }],
    'parameters': parameters
  }
  return payload
}

function get_response_from_ai(menu_option, user_prompt) {
  final_prompt = menu_option_prompt_prefix_map[menu_option] + user_prompt

  payload = get_payload(final_prompt)

  return fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${OAUTH_TOKEN}`
    }
  })
}


module.exports = {
  get_response_from_ai
}