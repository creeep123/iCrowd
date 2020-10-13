export async function fetchTask() {
    let response = await fetch('http://127.0.0.1:8081/task/')
    let data = await response.json()
    const taskList = await data.map((task) => {
        let taskForCard = {
            key:task.email,
            name: task.first_name,
            email: task.email,
            avatar: faker.image.avatar()
        }
        return (taskForCard)
    })
    return taskList
}



