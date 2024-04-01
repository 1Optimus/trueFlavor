import { useState, useContext } from 'react'
import { Context } from '../../App'
import { useNavigate } from 'react-router-dom'
import Email from '../../assets/email.png'
import Lock from '../../assets/candado.png'
import User from '../../assets/user.png'
import { logIn, newUserCreated } from '../functions'
function Login(){
    const [user,setUser]=useContext(Context) 
    const [newUser,setNewIser]=useState(true)
    const [email,setEmail]=useState("")
    const [password,setPasswordr]=useState("")
    const [confirmPasssword,setConfirmPassword]=useState("")
    const [name,setName]=useState("") 
    const navigate = useNavigate(); 
    
    const loginUser =()=>{                   
        if (user==""||password=="") {
            alert("Please enter your all the information required to login")
            return(false)
        }        
        try {
            setUser({...user, 
                isSigned: true,
                name: 'defaultName', //doesnt exist the name due to there is no backend yet
                email: email,
            })            
            logIn(email, user.mode, user.products)
            navigate("/");                           
        } catch (error) {
            alert("Couldn't login")
            console.log(error)
        }                
    }
    const createUser =()=>{               
        if (email==""||password==""||confirmPasssword==""||name=="") {
            alert("Please enter your all the information required to create account")
            return(false)
        }        
        try {
            setUser({...user, 
                isSigned: true,
                name: name,
                email: email,
            })    
            newUserCreated(email, user.mode, name, user.products)                             
            navigate("/");                 
        } catch (error) {
            alert("Couldn't login")
            console.log(error)
        } 
    }
    return (       
            <main className="flex flex-col items-center justify-center w-full flex-1 px-10 text-center md:py-32">            
                <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row md:w-2/3 max-w-4xl"> 
                {newUser&&(                        
                    <div className="md:w-3/5 p-5">                        
                        <div className="flex flex-col min-h-full items-center content-center my-14">
                            <h2 className="text-3xl font-bold text-orange-300 mb-6">
                                sign in to account
                            </h2>
                            <div className="flex flex-col items-center">
                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                            <img className='text-gray-400 m-2' src={Email}/>                                
                                <input 
                                type='email' 
                                name='email' 
                                placeholder='Email' 
                                className='bg-gray-100 outline-none text-sm felx-1'
                                onChange={(e)=>{setEmail(e.target.value)}}
                                />
                            </div>
                            </div>
                            <div className="flex flex-col items-center">
                            <div className="bg-gray-100 w-64 p-2 flex items-center">
                            <img className='text-gray-400 m-2' src={Lock}/>                                
                                <input 
                                type='password' 
                                name='password' 
                                placeholder='Password' 
                                className='bg-gray-100 outline-none text-sm flex-1'
                                onChange={(e)=>{setPasswordr(e.target.value)}}
                                />
                            </div>
                            </div>
                            <div className="flex justify-between w-64 my-5">                               
                                <button 
                                className='text-xs'
                                onClick={()=>{alert('Email sent successfully')}}
                                >Forgot password?</button>
                            </div>    
                            <button 
                                className="border-2 border-orange-300 rounded-full px-12 py-2 inline-block font-semibold hover:bg-orange-300 hover:text-white"
                                onClick={()=>loginUser()}
                                >
                                sign up
                            </button>                        
                        </div>                        
                    </div>
                )}                    
                    
                    <div className="md:w-2/5 bg-orange-300 text-white rounded-2xl rounded-br-2xl py-36 px-12">
                        <h2 className="text-3xl font-bold mb-2">{newUser?('New here?'):("already have a user?")}</h2>
                        <div className="border-2 w-10 border-white inline-block mb-2"></div>
                        <p  className="mb-2">{newUser?('Fill up personal information and start journey with us'):("Let's continue with this unforgettable experience")}</p>
                        <button
                        className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-orange-300"
                        onClick={() => setNewIser(!newUser)}
                        >
                            {newUser?('sign up'):('sign in')}
                        </button>
                    </div>
                    {!newUser&&(                        
                    <div className="md:w-3/5 p-5">                        
                        <div className="flex flex-col min-h-full items-center content-center my-14">
                            <h2 className="text-3xl font-bold text-orange-300 mb-6">
                                Create your account
                            </h2>
                            <div className="flex flex-col items-center">
                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                            <img className='text-gray-400 m-2' src={User}/>                                
                                <input 
                                type='text' 
                                name='name' 
                                placeholder='Full name' 
                                className='bg-gray-100 outline-none text-sm felx-1'
                                onChange={(e)=>{setName(e.target.value)}}
                                />
                            </div>
                            </div>
                            <div className="flex flex-col items-center">
                            <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                            <img className='text-gray-400 m-2' src={Email}/>                                
                                <input 
                                type='email' 
                                name='email' 
                                placeholder='Email' 
                                className='bg-gray-100 outline-none text-sm felx-1'
                                onChange={(e)=>{setEmail(e.target.value)}}
                                />
                            </div>
                            </div>
                            <div className="flex flex-col items-center">
                            <div className="bg-gray-100 w-64 p-2 flex items-center">
                            <img className='text-gray-400 m-2' src={Lock}/>                                
                                <input 
                                type='password' 
                                name='password' 
                                placeholder='Password' 
                                className='bg-gray-100 outline-none text-sm flex-1'
                                onChange={(e)=>{setPasswordr(e.target.value)}}
                                />
                            </div>
                            </div>    
                            <div className="flex flex-col items-center">
                            <div className="bg-gray-100 w-64 p-2 flex items-center my-3">
                            <img className='text-gray-400 m-2' src={Lock}/>                                
                                <input 
                                type='password' 
                                name='password2' 
                                placeholder='Confirm Password'  
                                className='bg-gray-100 outline-none text-sm flex-1'
                                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                                />
                            </div>
                            </div>                            
                            <button 
                            className="border-2 border-orange-300 rounded-full px-12 py-2 inline-block font-semibold hover:white hover:text-orange-300"
                            onClick={()=>createUser()}
                            >
                                sign up
                            </button>                        
                        </div>                        
                    </div>
                    )}
                </div>
            </main>
    )
}
export default Login;
  