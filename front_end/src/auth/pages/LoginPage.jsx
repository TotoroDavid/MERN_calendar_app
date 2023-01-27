import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}

export const LoginPage = () => {

    const { startLogin, errorMessage, startRegister } = useAuthStore()

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields,)
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields,)

    const loginSubmit = (e) => {
        e.preventDefault()
        startLogin({ email: loginEmail, password: loginPassword }) //initial is an Id and a Email undefine//

    }

    const registerSubmit = (e) => {
        e.preventDefault()
        if (registerPassword !== registerPassword2) {
            Swal.fire(`Register Error`, `Password have to be the same`, 'error')
        }

        startRegister({ name: registerName, email: registerEmail, password: registerPassword, /*registerPassword2*/ })

    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            // console.log(errorMessage);
            Swal.fire(`Error in the authentication ${errorMessage} error`)
        }
    }, [errorMessage])


    return (
        <div className="container login-container">
            <div className="row">
                {/* formLogin */}
                <div className="col-md-6 login-form-1">
                    <h3>Login</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>
                {/* formRegister */}
                <div className="col-md-6 login-form-2">

                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="name"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Create a new account" />
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}