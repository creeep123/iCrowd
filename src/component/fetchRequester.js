import faker from 'faker'

export async function fetchRequester() {
    let response = await fetch('http://127.0.0.1:8081/requester/')
    let data = await response.json()
    const requesterList = await data.map((requester) => {
        let requesterForCard = {
            key:requester.email,
            name: requester.first_name,
            email: requester.email,
            avatar: faker.image.avatar()
        }
        return (requesterForCard)
    })
    return requesterList
}



