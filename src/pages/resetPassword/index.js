import React, { Component } from 'react';
import Helmet from 'react-helmet';
import api from '../../service/api';
import { Link } from 'react-router-dom';
import './style.css';
import history from '../../service/history';

class ResetPassword extends Component {
	constructor () {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);

		this.state = {
			email: undefined,
			token: undefined,
			senha: undefined,
			mensagem: undefined,
			mensagemError: undefined
		};
	};

	async handleSubmit(e) {
		e.preventDefault();
		const data = {
			email: this.refs.email.value,
			token: this.refs.token.value,
			senha: this.refs.senha.value
		};
		await api.post('/updatePassword', data).then((response) => {
			console.log(response.data);
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
			} else if (response.data.status === 400) {
				this.setState({
					mensagemError: response.data.mensagem
				});
				setTimeout(() => {
					this.setState({
						mensagemError: undefined
					})
				}, 1500)
			} else if (response.data.status === 500) {
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
					mensagemError: 'Caro usuário favor verificar seu e-mail.'
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
										<input type="hidden" className="form-control" value={this.props.match.params.token} id="token" ref="token" />
										<div className="form-group">
											<label htmlFor="email">Email</label>
											<input type="email" className="form-control" id="email" ref="email" required />
										</div>
										<div className="form-group">
											<label htmlFor="senha">Password</label>
											<input type="password" className="form-control" id="senha" ref="senha" required />
										</div>
										<button type="submit" className="btn btn-success">Alterar </button>
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

export default ResetPassword;


