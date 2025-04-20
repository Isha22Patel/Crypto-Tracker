import React,{useState} from 'react'
import './Contact.css'

const Contact = () =>{
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        message:'',
    })

    const handleChange= (e) =>{
        setFormData((prev)=>({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        alert(`Thanks for reaching out, ${formData.name} `)
        setFormData({name:'',email:'',message:''})
    }

    return(
        <div className="contact-container">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
  
  export default Contact