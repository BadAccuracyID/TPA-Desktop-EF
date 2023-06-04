export const deleteAccount = async (uid: string) => {
    fetch('/api/DeleteUserByUID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({uid: uid})
    }).then((resp) => {
        if (resp.ok) {
            console.log("Account deleted")
        }
    })
}
