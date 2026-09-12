import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [students, setStudents] = useState([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    year: ''
  })

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error(error))
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const newStudent = await response.json()

    setStudents([...students, newStudent])

    setFormData({
      name: '',
      email: '',
      course: '',
      year: ''
    })
  }

  return (
    <div>
      <h1>Student Management</h1>

      <h2>Add Student</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
        />

        <input
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />

        <button type="submit">Add Student</button>
      </form>

      <h2>Students</h2>

      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Email: {student.email}</p>
          <p>Course: {student.course}</p>
          <p>Year: {student.year}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}

export default App