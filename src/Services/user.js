import axios from "axios"


export const isUserExist = async(username) => {
    const response = await axios.get("http://localhost:3000/users")
    let usernames = response.data.map((user) => user.username)
    
    const userExists = usernames.includes(username)
    return userExists ? {status: true, message: "This username already exists."} : {status: false, message: "This username does not exist."}

}   
export const checkPassword = async(username, password) => {
    const response = await axios.get(`http://localhost:3000/users?username=${username}` )
    let correctPassword = response.data[0].password
    console.log(correctPassword)
    console.log(password)
    return (correctPassword === password) ? {status: true} : {status: false, message: "Invalid username or password."}
}

export const registerUser = async(username, password, phoneNumber, email, gender) => {
    const response = await axios.post("http://localhost:3000/users", {
            username: username,
            password: password,
            phoneNumber: phoneNumber,
            email: email,
            gender: gender,
            scores: {},
            quizData: {}
        })
    return (
        response.data.username,
        response.data.password,
        response.data.phoneNumber,
        response.data.email,
        response.data.gender
        )
}
