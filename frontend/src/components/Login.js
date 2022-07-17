import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import useFromValidation from "../utils/useFormValidation";
import NotFound from "./NoutFound";

function Login({ onLogin, onInfoTooltip }) {
  const {path} = useRouteMatch();
  const {valid, values, setValues, errorMessages, setErrorMessages, onChange, onBlur} = useFromValidation();
	const inputInvalid = {};

  function handleSubmit(e) {
    e.preventDefault();

    if(!valid) {
			for(let name in values) {
				if(values[name].length <= 0) {
					inputInvalid[name] = 'Заполните это поле.';
				}
			}

			setErrorMessages({...errorMessages, ...inputInvalid});
      return
    }

    onLogin(values.loginPassword, values.loginEmail)
      .then(res => {
        if(res) {
          setValues({});
        }
      })
      .catch(err => {
        onInfoTooltip({isOpen: true, status: false, message: err.error || err.message})
      })
  }

  useEffect(() => {
    setValues({loginEmail: '', loginPassword: ''})
  }, [])

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <section className="login">
          <h2 className="login__title title">Вход</h2>
          <form className="form" name="login" method="post" onSubmit={handleSubmit} noValidate>
            <label className="form__input-group">
              <input
                className={`form__input ${errorMessages?.loginEmail ? 'input-invalid' : ''}`}
                type="email"
                name="loginEmail"
                placeholder="Email"
                required
                value={values.loginEmail || ''}
                onChange={e => onChange(e)}
                onBlur={e => onBlur(e)} />
              <p className="input-error">{errorMessages.loginEmail}</p>
            </label>
            <label className="form__input-group">
              <input
                className={`form__input ${errorMessages?.loginPassword ? 'input-invalid' : ''}`}
                type="password"
                name="loginPassword"
                placeholder="Пароль"
                minLength="3"
                required
                value={values.loginPassword || ''}
                onChange={e => onChange(e)}
                onBlur={e => onBlur(e)} />
              <p className="input-error">{errorMessages.loginPassword}</p>
            </label>
            <button className="form__button" type="submit">Войти</button>
          </form>
        </section>
      </Route>
      <Route path={`${path}*`}>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Login;
