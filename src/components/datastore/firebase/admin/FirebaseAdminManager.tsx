export const deleteAccount = async (uid: string) => {
    const response = await fetch(`/api/deletebyuid`, {
        method: "GET",
        body: JSON.stringify({uid}),
    });

    // data => { success: boolean, result: any }
    const data = await response.json();
    return data;
}
