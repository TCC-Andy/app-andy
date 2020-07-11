import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import api from '../../service/api';
import './style.css';
import history from '../../service/history';

class ForgoutPassword extends Component {
	constructor () {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			email: undefined,
			mensagem: undefined,
			mensagemError: undefined
		};
	};

	async handleSubmit(e) {
		e.preventDefault();
		const data = {
			email: this.refs.email.value,
		};
		await api.post('/sendPassReset', data).then((response) => {
			if (response.data.status === 200) {
				this.setState({
					mensagem: response.data.mensagem
				});
				setTimeout(() => {
					this.setState({
						mensagem: undefined
					});
					history.push('/login');
				}, 1500)
			} else if(response.data.status === 400 || response.data.status === 401 || response.data.status === 402 || response.data.status === 500) {
				this.setState({
					mensagemError: response.data.mensagem
				});
				setTimeout(() => {
					this.setState({
						mensagemError: undefined
					})
				}, 1500)
			} else {
				this.setState({
					mensagemError: 'Porfavor verifique seu email.'
				});
				setTimeout(() => {
					this.setState({
						mensagemError: undefined
					})
				}, 1500)
			}
		}).catch((error) => {
			console.log(error);
		});
	};

	render() {
		const mensagem = this.state.mensagem;
		const mensagemError = this.state.mensagemError;
		return (
			<div className="login">
				<Helmet title="Andy Services" />
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4"></div>
						<div className="col-md-4 teste">
							<div className="card bg-andy">
								<div className="card-body">
									{(mensagem === undefined) && (mensagemError === undefined) ? '' :
										(
											(mensagem) ?
												<div class="alert alert-success" role="alert">
													{mensagem}
												</div>
												:
												<div class="alert alert-danger" role="alert">
													{mensagemError}
												</div>
										)
									}
									<form onSubmit={this.handleSubmit}>
										<div className="form-group">
											<label htmlFor="email">Email</label>
											<input type="email" className="form-control" id="email" ref="email" required />
										</div>
										<button type="submit" className="btn btn-success">Enviar </button>
										<Link className="txt1" to="../login"> Login </Link>
										<Link className="txt2" to="/">Home</Link>
									</form>
								</div>
							</div>
						</div>
						<div className="col-md-4"></div>
					</div>
				</div>
			</div>
		)
	}
}

export default ForgoutPassword;


