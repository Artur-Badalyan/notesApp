import { useState } from 'react';
import '../assets/styles/login.css'
import { useSelector, useDispatch } from 'react-redux';


const Login = () => {

    const users = useSelector((state) => {
        return state.users
    })
    const currentUser = useSelector((state) => {
        return state.currentUser
    })

    const [isAccount, setIsAccount] = useState(true)
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [newUserName, setNewUserName] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()


    return(
        <div className="Login">
            {
                isAccount ? <div className="signin">
                <div className="title">Вход</div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    let currentUser = users.filter((user) => user.userName == userName && user.password === password)
                    dispatch({
                            type: 'SET-CURRENT-USER',
                            payload: {
                                user: currentUser[0]
                            }
                        })

                    users.filter((user) => user.userName != userName || user.password !== password) && console.log("Неправильно указан логин и/или пароль ");
                }}>
                    <input type="text" value={userName} placeholder='Имя пользователя' onChange={(e) => {
                        setUserName(e.target.value)
                    }}/>
                    <input type="password" value={password} placeholder='Пароль' onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                    <button>Вход</button>
                </form>
                <div className="createAccount" onClick={(e) => {
                    setIsAccount(false)
                }}>Создать аккаунт</div>
            </div> 
            :
            <div className="registration">
            <div className="title">Регистрация</div>
                <form onSubmit={(e) => {
                    e.preventDefault()

                    let validUser = users.length > 0 && users.filter((user) => user.userName == newUserName)
                    validUser.length > 0 && console.log('Пользователь с таким именем уже существует ') 
                    validUser.length == 0 && dispatch({
                        type: 'ADD-NEW-USER',
                        payload: {
                            userName: newUserName,
                            password: newPassword
                        }
                    }) 
                    
                    console.log(users);

                }}>
                    <input type="text" value={newUserName} placeholder='Придумайте имя пользователя'
                    onChange={(e) => {
                        setNewUserName(e.target.value)
                    }}/>
                    <input type="password" value={newPassword} placeholder='Придумайте пароль'
                    onChange={(e) => {
                        setNewPassword(e.target.value)
                    }}/>
                    <input type="password" value={confirmPassword} placeholder='Подтвердите пароль'
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                    }}/>
                    <button>Создать аккаунт</button>
                </form>
            </div>
            }
            
        </div>
    );
}

export default Login;