import colors from 'colors'
import server from './server'

const port = process.env.PORT || 4000

server.listen(port, ()=>{
    console.log(colors.bgGreen.bold(`Server is running on http://localhost:${port}`))
})