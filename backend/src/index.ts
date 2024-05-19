import express from 'express'
import mainRoutes from './routes/mainRoutes'
import cors from 'cors'
import createTablesdB from './models/setup'
import populateTablesdB from './models/populate'

createTablesdB()
populateTablesdB()


const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/v1', mainRoutes)


app.listen(3001, () => {
    console.log('Server is running on port 3001')
})