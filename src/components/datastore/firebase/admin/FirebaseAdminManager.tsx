export const deleteAccount = async (uid: string) => {
    return fetch('/api/DeleteUserByUID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({uid: uid})
    })
}
