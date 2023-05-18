const authConfig: {secret: string} = {
    secret: process.env.SECRET ? process.env.SECRET : ""
}

export default authConfig