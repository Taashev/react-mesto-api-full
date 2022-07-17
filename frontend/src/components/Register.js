import React, { useEffect } from "react";
import { Link, Switch, useRouteMatch, Route } from "react-router-dom";
import useFormValidation from "../utils/useFormValidation";
import NotFound from "./NoutFound";

function Register({ onInfoTooltip, onRegister }) {
  const {path} = useRouteMatch();
  const {values, setValues, errorMessages, setErrorMessages, onChange, onBlur} = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    const validation = e.target.checkValidity();
    const inputInvalid = [];

    if(!validation) {
			for(let name in values) {
				if(values[name].length <= 0) {
					inputInvalid[name] = 'Заполните это поле.';
				}
			}

			setErrorMessages({...errorMessages, ...inputInvalid});
      return
    }

    onRegister(values.registerPassword, values.registerEmail)
      .catch(err => {
        onInfoTooltip({isOpen: true, status: false, message: err?.message || err.error});
      })
  };

  useEffect(() => {
    setValues({registerEmail: '', registerPassword: ''})
  }, [])

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <section className="register">
          <h2 className="register__title title">Регистрация</h2>
          <form className="form" name="register" method="post" onSubmit={handleSubmit} noValidate>
            <label className="form__input-group">
              <input
                className={`form__input ${errorMessages?.registerEmail ? 'input-invalid' : ''}`}
                type="email"
                name="registerEmail"
                placeholder="Email"
                required
                value={values.registerEmail || ''}
                onChange={e => onChange(e)}
                onBlur={e => onBlur(e)} />
              <p className="input-error">{errorMessages.registerEmail}</p>
            </label>
            <label className="form__input-group">
              <input
                className={`form__input ${errorMessages?.registerPassword ? 'input-invalid' : ''}`}
                type="password"
                name="registerPassword"
                placeholder="Пароль"
                minLength="3"
                required
                value={values.registerPassword || ''}
                onChange={e => onChange(e)}
                onBlur={e => onBlur(e)} />
              <p className="input-error">{errorMessages.registerPassword}</p>
            </label>
            <button className="form__button" type="submit">Зарегистрироваться</button>
          </form>
          <p className="register__login">Уже зарегистрированы? {<Link className="register__link hover" to="/sign-in">Войти</Link>}</p>
        </section>
      </Route>
      <Route path={`${path}*`}>
        <NotFound />
      </Route>
    </Switch>
  )
}

export default Register;
