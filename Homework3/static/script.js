
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
  
  console.log('id: ' + crewID);  

  let firstRequest = await fetch(`http://localhost:8080/crew/${crewID}/tasks/next`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  
  if (firstRequest.status === 204 && firstRequest.body !== null) { //completed all tasks
    console.log('Finished with all tasks!');
    return
  }

  if (firstRequest.status === 500) { //complete repair before next task
    repairTask()
  }

  let nextTask = await firstRequest.text()

  if (nextTask === 'cleaning1') {
    let result = await fetch(`/crew/${crewID}/tasks/${nextTask}`, {
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

  } else if (nextTask === 'cleaning2') {

    let result = await fetch(`/crew/${crewID}/tasks/${nextTask}`, {
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

    await fetch(`/crew/${crewID}/tasks/${nextTask}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resultObj)
    })

  } else if (nextTask === 'decoding') {
    let result = await fetch(`/crew/${crewID}/tasks/${nextTask}`, {
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

    // console.log('asd: ' + resultMessage);

    fetch(`/crew/${crewID}/tasks/${nextTask}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: resultMessage
    })

  } else if (nextTask === 'lookup') {
    let result = await fetch(`/crew/${crewID}/tasks/${nextTask}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    let response = await result.json()
    console.log(response);
    let resultValue = eval("response.tree." + response.path)
    console.log(resultValue);

    await fetch(`/crew/${crewID}/tasks/${nextTask}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: resultValue
    })

  } else if (nextTask === 'dispatch') {
    console.log('dispatch');

    let result = await fetch(`/crew/${crewID}/tasks/${nextTask}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    let response = await result.json()

    for (let value in response) {
      await fetch(`/crew/${crewID}/tasks/${nextTask}/${value}`, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: response[value]
      })
    }

    
  } else if (nextTask === 'routing') {
    let result = await fetch(`/crew/${crewID}/tasks/${nextTask}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    let response = await result.json()
    console.log('responseRouting: ' + response);

    let firstRequestRouting = await fetch(`/crew/${crewID}/tasks/${nextTask}/${response.path}`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: response.value
    })

    let firstReply = await firstRequestRouting.json()
    console.log('responseRouting: ' + response);
    
    
  }


}

async function repairTask() {
  let repairRequest = await fetch(`http://localhost:8080/crew/${resultsResponses}/tasks/repair`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  let data = await repairRequest.json()

  let numbers = Object.keys(data)

  

}

//82a2ecda-49ff-4722-8479-93c24f120734

// async function getNextTask() {
//   const results = await fetch('http://localhost:8080/join', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   })
  
//   console.log(results);  
// }



document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('button').addEventListener('click', function() {
    joinAndTasks()
  }) 
})
