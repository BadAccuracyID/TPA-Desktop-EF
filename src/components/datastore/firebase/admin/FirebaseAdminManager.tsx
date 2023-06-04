export const deleteAccount = async (email: string) => {
    fetch('/api/DeleteUserByEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email})
    }).then((resp) => {
        if (resp.ok) {
            console.log("Account deleted")
        }
    })
}
