import { useState } from 'react';

const Contact = () => {
	
	// Validación usando 1 sólo estado
	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		isDirty: {
			name: false,
			email: false
		},
		errors: {
			name: false,
			email: false
		}
		
	});

	// console.log(formValues)

	return (
		<form onSubmit={handleSubmit}>
			
			<div>
				<label htmlFor='name'>NAME</label>
				<input
					type='text'
					id='name'
					name='name'
					// value={formValues.name}
					
					onChange={event =>
						changeFormValues(
							event.target,
							formValues,
							setFormValues
						)
					}
				/>
				
				{formValues.isDirty.name && formValues.errors.name && <span>El nombre no es correcto</span>}
			</div>
			<div>
				<label htmlFor='email'>EMAIL</label>
				<input
					type='text'
					id='email'
					name='email'
					// value={formValues.email}

					onChange={event =>
						changeFormValues(
							event.target,
							formValues,
							setFormValues
						)
						
					}
				/>
				
				{formValues.isDirty.email && formValues.errors.email && <span>El email no es correcto</span>}
			</div>
			<input
				type='submit'
				value='SEND'
				disabled={!Object.values(formValues.errors).every(error => !error)}
			/>
		</form>
	);
};

const validateForm = (
	name,
	value,
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

		setFormValues({
			...formValues,
			errors: { 
				...formValues.errors, 
				name: isValidName 
			},
			isDirty: {
				...formValues.isDirty,
				name: true
			}
		});
	}

	if (name === 'email') {
		const isValidEmail = !regexEmail.test(formatedValue);

		setFormValues({
			...formValues,
			errors: { 
				...formValues.errors, 
				email: isValidEmail 
			},
			isDirty: {
				...formValues.isDirty,
				email: true
			}
		});
	}
};

/* Todos los valores juntos en la misma función */
const changeFormValues = (input, formValues, setFormValues) => {

	// desestructurando:
	const { name, value } = input;

	// Se pone name entre corchetes para acceder al valor de la propiedad name, que es name o email
	setFormValues({ ...formValues, [name]: value });
	validateForm(name, value, formValues, setFormValues);
};

const handleSubmit = event => {
	event.preventDefault();
};


export default Contact;
/* 
    FORMS

    NO CONTROLADA -> Los datos del formulario no están controlados por React. Los datos se obtienen a través de un evento del DOM(JScript).

    CONTROLADA -> Los datos del formulario los controla React. Los datos se obtienen a través de un estado.
*/