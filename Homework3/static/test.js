
async function joinAndTasks() {
  const results = await fetch('http://localhost:8080/join', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  // console.log(results);

  let crewID = await results.text()
  
  // console.log('id: ' + crewID);  

  
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
      repairTask(crewID)
    } else {
      nextTask = await firstRequest.text()
    } 
  
  
    if (nextTask === 'cleaning1') {
      cleaning1(crewID, nextTask)
  
    } else if (nextTask === 'cleaning2') {
      cleaning2(crewID, nextTask)
  
    } else if (nextTask === 'decoding') {
      decoding(crewID, nextTask)
  
    } else if (nextTask === 'lookup') {
      lookup(crewID, nextTask)
  
    } else if (nextTask === 'dispatch') {
      dispatch(crewID, nextTask)
      
    } else if (nextTask === 'routing') {
      routing(crewID, nextTask)
    }

    // console.log('did it loop back');
    
  }

  console.log('Finished with all tasks!');
  return 
  
}

async function cleaning1(crewID, taskName) {
  let result = await fetch(`/crew/${crewID}/tasks/${taskName}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let array = await result.json()
  console.log('cleaning1array: ' + array);

  let uniqueArray = array.filter((item, position) => {
    return array.indexOf(item) === position
  })

  console.log('uniqueArray: ' + uniqueArray);

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
  console.log('routingFirstReply: ' + firstReply);

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

  console.log('routinglaterReply: ' + laterReply);

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
    console.log('routinglaterReplyInLoop: ' + laterReply);
  }

}

async function dispatch(crewID, taskName) {
  console.log('dispatch');

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

  return
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
  console.log(response);
  let resultValue = eval("response.tree." + response.path)
  console.log('lookup result value');

  await fetch(`/crew/${crewID}/tasks/${taskName}`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: resultValue
  })

  return
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

  fetch(`/crew/${crewID}/tasks/${taskName}`, {
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

  console.log(resultObj);

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
  console.log('entered repair task');

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
      number = number * -1 
      number = 1 / number
      number = Math.pow(number, 3)
      number = number % 360
      result.push(number)
    }
  }

  await fetch(`http://localhost:8080/crew/${resultsResponses}/tasks/repair`, {
    method: 'POST',
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
