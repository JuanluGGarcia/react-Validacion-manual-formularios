const Contact = () => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor='name'>NAME</label>
				<input type='text' id='name' name='name' />
			</div>
			<div>
				<label htmlFor='email'>EMAIL</label>
				<input type='text' id='email' name='email' />
			</div>
            <input type='submit' value='SEND' />
		
        </form>
	);
};

const handleSubmit = event => {
    event.preventDefatult();
	console.log('NAME', event.target.name.value);
	console.log('EMAIL', event.target.email.value);
};
/* 
    FORMS

    NO CONTROLADA -> Los datos del formulario no están controlados por React. Los datos se obtienen a través de un evento del DOM (JScript)

    CONTROLADA
*/

export default Contact;
