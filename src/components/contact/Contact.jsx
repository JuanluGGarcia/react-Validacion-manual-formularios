import { useState } from 'react';

const Contact = () => {

	// Validación usando 2 estados
	// Estado para guardar los valores del formulario
	// const [formValues, setFormValues] = useState({
	// 	name: '',
	// 	email: ''
	// });

	// Estado para gestionar los errores del formulario. Sólo sirve para mostrar los mensajes
	// const [errors, setErrors] = useState({
	// 	name: false,
	// 	email: false
	// });

	// Validación usando 1 sólo estado
	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		errors: {
			name: false,
			email: false
		}
	});

	console.log(formValues);

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='name'>NAME</label>
				<input
					type='text'
					id='name'
					name='name'
					value={formValues.name}
					/* función de un campo solo */
					// onChange={event =>
					// 	changeName(event.target.value, formValues, setFormValues)
					// }

					/* función de todos los campos */
					onChange={event =>
						changeFormValues(
							event.target,
							formValues,
							setFormValues,
							// errors,
							// setErrors
						)
					}
				/>
				{/* {errors.name && <span>El nombre no es correcto</span>} */}
				{formValues.errors.name && <span>El nombre no es correcto</span>}
			</div>
			<div>
				<label htmlFor='email'>EMAIL</label>
				<input
					type='text'
					id='email'
					name='email'
					value={formValues.email}
					/* función de un campo solo */
					// onChange={event =>
					// 	changeEmail(event.target.value, formValues, setFormValues)
					// }

					/* función de todos los campos */
					onChange={event =>
						changeFormValues(
							event.target,
							formValues,
							setFormValues,
							// errors,
							// setErrors
						)
					}
				/>
				{/* {errors.email && <span>El email no es correcto</span>} */}
				{formValues.errors.email && <span>El email no es correcto</span>}
			</div>
			<input 
                type='submit' 
                value='SEND'
                // disabled={!Object.values(errors).every(error => !error)} 
                disabled={!Object.values(formValues.errors).every(error => !error)} 
            />
		</form>
	);
};

const validateForm = (
	name, 
	value, 
	// errors, 
	// setErrors, 
	formValues, 
	setFormValues
	) => {
	const formatedValue = value.trim();
	// Expresión regular sólo admite letras
	const regexName = /^[a-z]+$/gi;
	const regexEmail =
		/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

	if (name === 'name') {
		
		const isValidName = !regexName.test(formatedValue);

		// Validando con 2 estados
		// console.log(isValidName);
		// setErrors({ ...errors, name: isValidName });

		// Validando con 1 sólo estado
		setFormValues({
			...formValues,
			errors: {
				...formValues.errors,
				name: isValidName
			}
		})
	}

	if (name === 'email') {
		// validación
		const isValidEmail = !regexEmail.test(formatedValue);

		// setErrors({ ...errors, email: isValidEmail });

		setFormValues({
			...formValues,
			errors: {
				...formValues.errors,
				email: isValidEmail
			}
		})
	}
};

/* Todos los valores juntos en la misma función */
const changeFormValues = (
	input,
	formValues,
	setFormValues,
	// errors,
	// setErrors
) => {
	// const name = input.name;
	// const value = input.value;

	// Esto de aqui arriba se puede poner desestructurando:

	const { name, value } = input;

	// console.log(name); me da name o email

	// Se pone name entre corchetes para acceder al valor de la propiedad name, que es name o email
	setFormValues({ ...formValues, [name]: value });
	// validateForm(name, value, errors, setErrors);
	validateForm(name, value, formValues, setFormValues);
};

/* Cada valor por separado */
/* const changeName = (value, formValues, setFormValues) => {
	setFormValues({ ...formValues, name: value });
};

const changeEmail = (value, formValues, setFormValues) => {
	setFormValues({ ...formValues, email: value });
}; */

const handleSubmit = event => {
	event.preventDefault();
	// console.log('NAME', event.target.name.value);
	// console.log('EMAIL', event.target.email.value);
};
/* 
    FORMS

    NO CONTROLADA -> Los datos del formulario no están controlados por React. Los datos se obtienen a través de un evento del DOM(JScript).

    CONTROLADA -> Los datos del formulario los controla React. Los datos se obtienen a través de un estado.
*/

export default Contact;
