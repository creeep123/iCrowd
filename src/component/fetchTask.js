export async function fetchTask(id) {
    id = id? id:'' 
    let response = await fetch(`http://127.0.0.1:8081/task/${id}`)
    let taskList = await response.json()
    // const taskList = await data.map((task) => {
    //     let taskForCard = {
    //         ...task
    //     }
    //     return (taskForCard)
    // })
    return taskList
}



