import axios from "axios"


export const isUserExist = async(username) => {
    const response = await axios.get("http://localhost:4000/users")
    let usernames = response.data.map((user) => user.username)
    const userExists = usernames.includes(username)
    return userExists ? {status: true, message: "This username already exists."} : {status: false, message: "This username does not exist."}

}   
export const checkPassword = async(username, password) => {
    const response = await axios.get(`http://localhost:4000/users?username=${username}` )
    let correctPassword = response.data[0].password
    return (correctPassword === password) ? {status: true} : {status: false, message: "Invalid username or password."}
}

export const registerUser = async(username, password, phoneNumber, email, gender) => {
    const response = await axios.post("http://localhost:4000/users", {
            username: username,
            password: password,
            phoneNumber: phoneNumber,
            email: email,
            gender: gender,
            scores: {}
        })
    return (response.data)
}
