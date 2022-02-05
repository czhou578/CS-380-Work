console.log('hellos');


async function joinAndTasks() {
  const results = await fetch('http://localhost:8080/join', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  let resultsResponses = await results.text()
  
  console.log(resultsResponses);  

  let firstRequest = await fetch(`http://localhost:8080/crew/${resultsResponses}/tasks/next`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (firstRequest.status === 204 && firstRequest.body !== null) {
    console.log('Finished with all tasks!');
    return
  }

  if (firstRequest.status === 500) {
    repairTask()
  }

  let firstRequestResponse = await firstRequest.text()
  console.log(firstRequestResponse);
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
