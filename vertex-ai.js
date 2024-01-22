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

const API_URL = `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT}/locations/us-central1/publishers/google/models/codechat-bison:predict`

parameters = {
  'candidateCount': 1,
  'maxOutputTokens': 1024,
  'temperature': 0
}


menu_option_prompt_prefix_map = {
  'generate_unit_tests': 'Generate unit tests for the following code:\n',
  'generate_doc_strings': 'Generate doc strings for the following code:\n',
  'code_review': 'Consider you are professional sotfware engineer. You task is to review the code and give recommendations of code changes for following code with specific line numbers:\n',
  'code_summary': 'Consider you are professional sotware engineer. Summarize and explain the following code.\n'
}

function get_payload(prompt) {
  payload = {
    'instances': [{
      'messages': [
        {
          'author': 'user',
          'content': prompt
        }
      ]
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