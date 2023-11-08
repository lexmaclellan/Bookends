import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsInfoCircle } from 'react-icons/bs'
import { GiCheckMark } from 'react-icons/gi'
import axios from 'axios'

const EMAIL_REGEX =  	
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,100}$/
const REGISTER_URL = '/signup'

function Signup() {
    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    // Set focus to email input
    useEffect(() => {
        emailRef.current.focus()
    }, [])

    // Validate email
    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    // Validate password
    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        setValidPwd(result)

        const match = pwd === matchPwd
        setValidMatch(match)
    }, [pwd, matchPwd])

    // Clear error message when email or pwd states change
    useEffect(() => {
        setErrMsg('')
    }, [email, pwd, matchPwd])

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault()

        const v1 = EMAIL_REGEX.test(email)
        const v2 = PWD_REGEX.test(pwd)

        if (!v1 || !v2) {
            setErrMsg('Invalid entry')
            return
        }

        try {
            const res = await axios.post(REGISTER_URL,
                JSON.stringify({ email: email, password: pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No response from server.')
            } else if (err.response?.status === 409)
            {
                setErrMsg('Email address already in use.')
            } else {
                setErrMsg('Registration failed.')
            }
            errRef.current.focus()
        }

        setSuccess(true)
    }

    return (
        <>
        {success ? (
                <article className='p-4'>
                    <h3 className='text-2xl block font-semibold mb-2'>Welcome</h3>
                    <p>You are logged in.</p>
                    <Link to='/' className='text-gray-50 font-semibold hover:underline hover:text-sky-200'>Back to Home</Link>
                </article>
            ) : (
                <article className='p-4 flex justify-center items-center h-screen'>
                    <section className='w-96 shadow-lg p-7 bg-slate-700 rounded-md'>
                        <h3 className='text-2xl block text-center font-semibold'>Sign Up</h3>
                        <form onSubmit={handleSubmit}>
                            <hr className='mt-6' />
                            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
                                {errMsg}
                            </p>
                            <section className='mt-3'>
                                <label htmlFor='email' className='text-base mb-1 flex'>
                                    <span>Email Address:</span>
                                    <span className={validEmail ? 'valid' : 'hide'}>
                                        <GiCheckMark className='text-2xl text-green-600 ml-2' />
                                    </span>
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    ref={emailRef}
                                    className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-gray-950 rounded-md'
                                    placeholder='your.name@example.com'
                                    autoComplete='off'
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-invalid={validEmail ? 'false' : 'true'}
                                    aria-describedby='emailnote'
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                    value={email}
                                    required
                                />
                                <p id='emailnote' className={emailFocus && email && !validEmail ? 'instructions flex' : 'offscreen'}>
                                    <span><BsInfoCircle className='text-2xl text-teal-200 hover:text-green-100 mr-2' /></span>
                                    <span>Must be a valid email address.</span>
                                </p>
                            </section>

                            <section className='mt-3'>
                                <label htmlFor='pwd' className='text-base mb-1 flex'>
                                    <span>Password:</span>
                                    <span className={validPwd ? 'valid' : 'hide'}>
                                        <GiCheckMark className='text-2xl text-green-600 ml-2' />
                                    </span>
                                </label>
                                <input
                                    type='password'
                                    id='pwd'
                                    className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-gray-950 rounded-md'
                                    placeholder='********'
                                    onChange={(e) => setPwd(e.target.value)}
                                    aria-invalid={validPwd ? 'false' : 'true'}
                                    aria-describedby='pwdnote'
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                    value={pwd}
                                    required
                                />
                                <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions flex' : 'offscreen'}>
                                    <span><BsInfoCircle className='text-2xl text-teal-200 hover:text-green-100 mr-2' /></span>
                                    <span>
                                        8 to 100 characters.<br />
                                        Must include uppercase and lowercase letters, a number and a special character.<br />
                                        Allowed special characters:&nbsp;
                                            <span aria-label='exclamation mark'>!</span>
                                            <span aria-label='at symbol'>@</span>
                                            <span aria-label='hashtag'>#</span>
                                            <span aria-label='dollar sign'>$</span>
                                            <span aria-label='percent'>%</span>
                                            <span aria-label='caret'>^</span>
                                            <span aria-label='ampersand'>&</span>
                                            <span aria-label='asterisk'>*</span>
                                    </span>
                                </p>
                            </section>

                            <section className='mt-3'>
                                <label htmlFor='confirm_pwd' className='text-base mb-1 flex'>
                                    <span>Confirm Password:</span>
                                    <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                                        <GiCheckMark className='text-2xl text-green-600 ml-2' />
                                    </span>
                                </label>
                                <input
                                    type='password'
                                    id='confirm_pwd'
                                    className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-gray-950 rounded-md'
                                    placeholder='********'
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    aria-invalid={validMatch ? 'false' : 'true'}
                                    aria-describedby='confirmnote'
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                    value={matchPwd}
                                    required
                                />
                                <p id='confirmnote' className={matchFocus && !validMatch ? 'instructions flex' : 'offscreen'}>
                                    <span><BsInfoCircle className='text-2xl text-teal-200 hover:text-green-100 mr-2' /></span>
                                    <span>Must match the first password field.</span>
                                </p>
                            </section>
                            
                            <button
                                className='mt-6 py-1 w-full bg-gray-800 text-slate-300 border-2 border-slate-500 font-semibold rounded-md auth-submit'
                                disabled={!validEmail || !validPwd || !validMatch ? true : false}
                            >
                                Register
                            </button>
                        </form>
                        <section className='mt-1 flex justify-between items-center'>
                            <span>
                                <p className='mt-2 text-base'>
                                    Already registered?
                                </p>
                            </span>
                            <span>
                                <p className='mt-2 text-base'>
                                    <Link to='/login' className='text-sm text- font-semibold underline hover:no-underline'>
                                        Log In
                                    </Link>
                                </p>
                            </span>
                        </section>
                    </section>
                </article>
            )}
        </>
    )
    
}

export default Signup