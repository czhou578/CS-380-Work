
async function joinAndTasks() {
  const results = await fetch('http://localhost:8080/join', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  let crewID = await results.text()
  
  while (true) {
    let firstRequest = await fetch(`http://localhost:8080/crew/${crewID}/tasks/next`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    let nextTask

    if (firstRequest.status === 204 && firstRequest.body !== null) { //completed all tasks
      break

    } else if (firstRequest.status === 500) { //complete repair before next task
      await repairTask(crewID)
      continue
      
    } else {
      nextTask = await firstRequest.text()
    }
  
    if (nextTask === 'cleaning1') {
      await cleaning1(crewID, nextTask)
  
    } else if (nextTask === 'cleaning2') {
      await cleaning2(crewID, nextTask)
  
    } else if (nextTask === 'decoding') {
      await decoding(crewID, nextTask)
  
    } else if (nextTask === 'lookup') {
      await lookup(crewID, nextTask)
  
    } else if (nextTask === 'dispatch') {
      await dispatch(crewID, nextTask)
      
    } else if (nextTask === 'routing') {
      await routing(crewID, nextTask)
    }

  }

  console.log('Finished with all tasks!');
  return 
}

async function cleaning1(crewID, taskName) {
  let result = await fetch(`http://localhost:8080/crew/${crewID}/tasks/${taskName}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let array = await result.json()
  let uniqueArray = array.filter((item, position) => {
    return array.indexOf(item) === position
  })

  await fetch(`/crew/${crewID}/tasks/cleaning1`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(uniqueArray)
  })

}

async function routing(crewID, taskName) {
  let result = await fetch(`/crew/${crewID}/tasks/${taskName}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  let firstReply = await result.json()

  let subsequentRequest = await fetch(`/crew/${crewID}/tasks/${taskName}/${firstReply.path}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: firstReply.value
  })
  
  let responseCode = 202
  let laterReply = await subsequentRequest.json()

  while(responseCode === 202) {
    let subsequentRequest = await fetch(`/crew/${crewID}/tasks/${taskName}/${laterReply.path}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: laterReply.value
    })
    
    if (subsequentRequest.status === 200) {
       break
    }

    laterReply = await subsequentRequest.json()
  }

}

async function dispatch(crewID, taskName) {
  let result = await fetch(`/crew/${crewID}/tasks/${taskName}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let response = await result.json()

  for (let value in response) {
    await fetch(`/crew/${crewID}/tasks/${taskName}/${value}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: response[value]
    })
  }
}

async function lookup(crewID, taskName) {
  let result = await fetch(`/crew/${crewID}/tasks/${taskName}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let response = await result.json()
  let resultValue = eval("response.tree." + response.path)

  await fetch(`/crew/${crewID}/tasks/${taskName}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: resultValue
  })
}

async function decoding(crewID, taskName) {
  let result = await fetch(`/crew/${crewID}/tasks/${taskName}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  let response = await result.json()
  let receivedMessage = response.message
  let key = response.key
  let resultMessage = ''

  for (const element of receivedMessage) {
    resultMessage += key[element]
  }

  await fetch(`/crew/${crewID}/tasks/${taskName}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: resultMessage
  })

}

async function cleaning2(crewID, taskName) {
  let result = await fetch(`/crew/${crewID}/tasks/${taskName}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let stringArray = await result.json()

  let resultObj = {}
  let isNums = []
  let isNotNums = []

  for (const element of stringArray) {
    if (Number(element) || Number(element) === 0) {
      isNums.push(element)
    } else {
      isNotNums.push(element)
    }
  }

  resultObj['numbers'] = isNums
  resultObj['non-numbers'] = isNotNums

  await fetch(`/crew/${crewID}/tasks/${taskName}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resultObj)
  })
}

async function repairTask(crewID) {

  let repairRequest = await fetch(`http://localhost:8080/crew/${crewID}/tasks/repair`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let data = await repairRequest.json()
  let result = []

  for (const element in data) {
    let number = data[element]
    if (number === 0) {
      result.push(0)

    } else {
      if (number < 0) {
        number = number * -1 
      }
      number = 1 / number
      number = Math.pow(number, 3)
      number = number % 360
      result.push(number)
    }
  }

  await fetch(`http://localhost:8080/crew/${crewID}/tasks/repair`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(result)
  })  

}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('button').addEventListener('click', function() {
    joinAndTasks()
  }) 
})
