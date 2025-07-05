const express = require('express')
const app = express()

// Middleware to handle JSON requests
app.use(express.json())

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// Endpoint: /tasks
// HTTP Method: post
// Description: add a new task..
// Request:
let tasks = []
app.post('/tasks', (req, res) => {
    const task = req.body.task
    tasks.push({id: tasks.length + 1, task})
    res.status(201).json({ message: 'Task created successfully', task })
})

// Endpoint: /tasks
// HTTP Method: get
// Description: get all tasks..
// Request:
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks)
})

// Endpoint: /tasks/:id
// HTTP Method: put
// Description: update a task..
// Request:
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const task = req.body.task
    const taskIndex = tasks.findIndex((t) => t.id === id)
    
    if (taskIndex !== -1) {
        tasks[taskIndex].task = task
        res.status(200).json({ message: 'Task updated successfully', tasks })
    } else {
        res.status(404).json({ message: 'Task not found'})
    }
})

// Endpoint: /tasks/:id
// HTTP Method: deletw
// Description: delete a task..
// Request:
app.delete('tasks/:id', (req, res) => {
    const id = parseInt(req.params.id)
    tasks = tasks.filter((task) => task.id !== id)
    res.status(200).json({ message: 'Task deleted succesfully', tasks })
})
