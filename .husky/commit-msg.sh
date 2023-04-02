#!/opt/homebrew/bin/bash

# check commit message
## master branch
### - not empty
function checkEmpty() {
  local type="$1"
  local value="$2"

  if [[ -z "$value" ]];  then
    echo "$type is empty"
    exit 1
  fi
}

### - is lower case
function checkLowercase() {
  local type="$1"
  local value="$2"
  local value_to_lower_case
  value_to_lower_case=$(echo "$value" | tr '[:upper:]' '[:lower:]')

  if [[ "$value_to_lower_case" != "$value" ]]; then
    echo "$type is not lower case"
    echo "value = $value"
    exit 1
  fi
}

### - include type
function includeInTypes() {
  local value="$1"
  local types_array=(feature bugfix ci config refactor test docs)

  if [[ ! "${types_array[*]}" =~ ${value} ]]; then
    echo "Unknown type"
    echo "value = $value"
    exit 1
  fi
}

## other branches
### - validate task number
function validateTaskNumber() {
  local value=$1

  local regexp="^\[AUTH-[0-9]+\]$"
  if [[ ! "$value" =~ $regexp ]]; then
    echo "The issue number is not specified correctly"
    echo "value = $value"
    echo "need format AUTH-[0-9]+"
    exit 1
  fi
}

### - max length
function checkMaxLength() {
  local type="$1"
  local max_length="$2"
  local value="$3"

  if [[ "${#value}" -gt "$max_length" ]]; then
    echo "$type is longer than the maximum length ($max_length)"
    echo "value = $value"
    exit 1
  fi
}

branch_name=$(git branch --show-current)

if [[ "$branch_name" == "master" ]]; then
  # variables
  commit=$(cat "$1")
  task_number=$(echo "$commit" | awk -F' ' '{print $1}')
  type=$(echo "$commit" | awk -F'] ' '{print $2}' | awk -F'(' '{print $1}')
  scope=$(echo "$commit" | awk -F'(' '{print $2}' | awk -F')' '{print $1}')
  message=$(echo "$commit" | awk -F': ' '{print $2}')

  # checking
  ## TASK NUMBER
  validateTaskNumber "$task_number"

  ## TYPE
  checkEmpty "TYPE" "$type"
  includeInTypes "$type"

  ## SCOPE
  checkEmpty "SCOPE" "$scope"
  checkLowercase "SCOPE" "$scope"

  ## SUBJECT
  checkEmpty "SUBJECT" "$message"
  checkLowercase "SUBJECT" "$message"
  checkMaxLength "SUBJECT" 125 "$message"
else
  ### variables
  message=$(cat "$1")
  mapfile -t message_chunks < <( echo "$message" | tr ' ' '\n' )
  tail="${message_chunks[*]:1}"

  ### checking
  validateTaskNumber "${message_chunks[0]}"
  checkEmpty "BODY" "$tail"
  checkMaxLength "COMMIT" 125 "$message"
fi

### lint and prettier checks
npm run pre-commit
