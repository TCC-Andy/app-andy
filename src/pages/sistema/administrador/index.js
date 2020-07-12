import React, { Component } from 'react';
import Menu from '../menu';
import { FaTrash } from 'react-icons/fa';
import api from '../../../service/api';
import history from '../../../service/history';
import '../styleGlobalSistema.css';
import Helmet from 'react-helmet';

class CadastroEmpresa extends Component {
	constructor () {
		super();
		this.handleSubmitUsuario = this.handleSubmitUsuario.bind(this);
		this.handleSubmitEmpresa = this.handleSubmitEmpresa.bind(this);
		this.state = {
			mensagem: undefined,
			mensagemCadastro: undefined,
			usuario: [],
			usuariosAll: [],
			empresasAll: []
		}
	};

	componentDidMount() {
		this.verifyToken();
		this.carregarUsuarios();
		this.carregarEmpresas();
	}

	carregarUsuarios = async () => {
		const usuarios = await api.get('/showUsers');
		const usuario = usuarios.data.filter((usuario) => {
			return usuario.perfil !== 'administrador';
		})
		this.setState({
			usuariosAll: usuario
		})
	}

	carregarEmpresas = async () => {
		const empresas = await api.get('/showCompanies');
		this.setState({
			empresasAll: empresas.data
		})
	}

	verifyToken = async () => {
		const token = localStorage.getItem('Key_Andy');
		const id = localStorage.getItem('Key_Id_Usuario');

		if (token !== null) {
			await api.get(`/verifyToken/${id}`, {
				headers: {
					"authorization": `Bearer ${token}`
				}
			}).then((response) => {
				if (response.data.status === 200) {
					this.setState({
						logged: true
					})
				} else {
					localStorage.removeItem('Key_Andy');
					localStorage.removeItem('Key_Id_Usuario');
					this.setState({
						logged: false
					});
					history.push('/');
				}
			}).catch((err) => {
				console.log(err);
			});
		} else {
			history.push('/');
		}
	}

	handleSubmitUsuario = async (e) => {
		e.preventDefault();
		try {
			const nome = this.refs.nome.value;
			const sobrenome = this.refs.sobrenome.value;
			const email = this.refs.email.value;
			const senha = this.refs.senha.value;
			const perfil = this.refs.perfil.value;
			if (!nome || !sobrenome || !email || !senha || !perfil) {
				this.setState({
					mensagem: 'Todos os campos deverá ser preenchido.'
				});
				setTimeout(() => {
					this.setState({
						mensagem: undefined
					})
				}, 1000);
			} else {
				const data = {
					nome: nome,
					sobrenome: sobrenome,
					email: email,
					senha: senha,
					perfil: perfil
				}
				await api.post('/createUser', data).then(response => {
					if (response.data.status === 200) {
						this.refs.nome.value = '';
						this.refs.sobrenome.value = '';
						this.refs.email.value = '';
						this.refs.senha.value = '';
						this.refs.perfil.value = '';
						this.setState({
							mensagemCadastro: response.data.mensagem
						})
						setTimeout(() => {
							this.setState({
								mensagemCadastro: undefined,
								usuario: response.data.usuario,
							})
						}, 1000)
					}
				})
			}
		} catch (error) {
			console.log(error);
		}
	};

	deletarEmpresa = async (id) => {
		console.log(id);
		await api.delete(`/deleteCompany/${id}`).then(response => {
			if (response.data.status === 200) {
				this.setState({
					mensagemCadastro: response.data.mensagem
				})
				setTimeout(() => {
					this.setState({
						mensagemCadastro: [],
					})
					window.location.reload();
				}, 1500)
			}
		})
	}

	handleSubmitEmpresa = async (e) => {
		e.preventDefault();
		try {
			const nomeUsuario = this.refs.nomeUsuario.value;
			const nome = this.refs.razaoSocial.value;
			const nomeFantasia = this.refs.nomeFantasia.value;
			const CNPJ = this.refs.cnpj.value;
			const idEmpresario = this.refs.idUsuario.value;
			const categoria = this.refs.categoria.value;
			const numero = this.refs.numero.value;
			const descricao = this.refs.descricao.value;
			const rua = this.refs.endereco.value;
			const bairro = this.refs.bairro.value;
			const cidade = this.refs.cidade.value;
			const cep = this.refs.cep.value;
			const complemento = this.refs.complemento.value;
			const estado = this.refs.estado.value;
			const telefone = this.refs.telefone.value;
			if (!nomeUsuario || !nome || !nomeFantasia || !CNPJ || !idEmpresario || !categoria || !numero || !descricao || !rua || !bairro || !cidade || !cep || !estado || !telefone) {
				this.setState({
					mensagem: 'Todos os campos deverá ser preenchido.'
				});
				setTimeout(() => {
					this.setState({
						mensagem: undefined
					})
				}, 1000);
			} else {
				const data = {
					nomeUsuario: nomeUsuario,
					nome: nome,
					nomeFantasia: nomeFantasia,
					CNPJ: CNPJ,
					idEmpresario: idEmpresario,
					categoria: categoria,
					numero: numero,
					descricao: descricao,
					rua: rua,
					telefone: telefone,
					bairro: bairro,
					cidade: cidade,
					cep: cep,
					complemento: complemento,
					estado: estado
				}
				await api.post('/createCompany', data).then(response => {
					if (response.data.status === 200) {
						this.setState({
							mensagemCadastro: response.data.mensagem
						})
						setTimeout(() => {
							this.setState({
								mensagemCadastro: undefined,
							});
							window.location.reload();
						}, 1000)
					} else if (response.data.status === 500) {
						this.setState({
							mensagem: response.data.mensagem
						})
						setTimeout(() => {
							this.setState({
								mensagem: undefined,
							})
						}, 1000)
					} else if (response.data.status === 400) {
						this.setState({
							mensagem: response.data.mensagem
						})
						setTimeout(() => {
							this.setState({
								mensagem: undefined,
							})
						}, 1000)
					}
				})
			}
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		const mensagem = this.state.mensagem;
		const mensagemCadastro = this.state.mensagemCadastro;
		const usuario = this.state.usuario;
		const usuariosAll = this.state.usuariosAll;
		const empresasAll = this.state.empresasAll;
		return (
			<div className="row">
				<Helmet title="Andy Services" />
				<div className="col-md-2">
					<Menu />
				</div>
				<div className="col-md-10">
					<div className="corpo">
						<div className="container">
							<h3 className="title">Usuário / Empresa</h3>
							<div className="row">
								<div className="col-md-12">
									{mensagem === undefined ? '' :
										<div className="alert alert-danger" role="alert">
											{mensagem}
										</div>
									}
									{mensagemCadastro === undefined ? '' :
										<div className="alert alert-success" role="alert">
											{mensagemCadastro}
										</div>
									}
									{usuario.length === 0 ?
										(
											<form onSubmit={this.handleSubmitUsuario}>
												<div className="form-row align-items-center justify-content-md-center">
													<div className="form-group col-md-6">
														<label className="subTitulos" htmlFor="nome">Nome</label>
														<input type="text" className="form-control" id="nome" ref='nome' required />
													</div>
													<div className="form-group col-md-6">
														<label className="subTitulos" htmlFor="sobrenome">Sobrenome</label>
														<input type="text" className="form-control" id="sobrenome" ref='sobrenome' required />
													</div>
													<div className="form-group col-md-4">
														<label className="subTitulos" htmlFor="email">E-mail</label>
														<input type="email" className="form-control" id="email" ref='email' required />
													</div>
													<div className="form-group col-md-4">
														<label className="subTitulos" htmlFor="perfil">Perfil</label>
														<select className="form-control" id="perfil" ref='perfil' required>
															<option selected>Selecione uma opção abaixo.</option>
															<option value="administrador">Administrador</option>
															<option value="empresa">Empresa</option>
														</select>
													</div>
													<div className="form-group col-md-4">
														<label className="subTitulos" htmlFor="email">Senha</label>
														<input type="password" className="form-control" id="senha" ref='senha' required />
													</div>
												</div>
												<button type="submit" className="btn btn-success botao">Cadastrar</button>
												<button type="reset" className="btn btn-danger botao">Limpar</button>
											</form>
										)
										:
										(
											<form onSubmit={this.handleSubmitEmpresa}>
												<div className="form-row align-items-center justify-content-md-center">
													<input type="hidden" className="form-control" id="idUsuario" ref='idUsuario' value={usuario._id} required />
													<div className="form-group col-md-3">
														<label className="subTitulos" htmlFor="nomeUsuario">Usuário</label>
														<input type="text" className="form-control" id="nomeUsuario" ref='nomeUsuario' value={usuario.nome} readOnly required />
													</div>
													<div className="form-group col-md-2">
														<label className="subTitulos" htmlFor="cnpj">CNPJ</label>
														<input type="text" className="form-control" id="cnpj" ref='cnpj' required />
													</div>
													<div className="form-group col-md-7">
														<label className="subTitulos" htmlFor="razaoSocial">Razão Social</label>
														<input type="text" className="form-control" id="razaoSocial" ref='razaoSocial' required />
													</div>
													<div className="form-group col-md-7">
														<label className="subTitulos" htmlFor="nomeFantasia">Nome Fantasia</label>
														<input type="text" className="form-control" id="nomeFantasia" ref='nomeFantasia' required />
													</div>
													<div className="form-group col-md-2">
														<label className="subTitulos" htmlFor="telefone">Telefone</label>
														<input type="text" className="form-control" id="telefone" ref='telefone' required />
													</div>
													<div className="form-group col-md-3">
														<label className="subTitulos" htmlFor="categoria">Categoria</label>
														<select className="form-control" id="categoria" ref='categoria' required>
															<option selected>Selecione uma Categoria.</option>
															<option value="barbearia">Barbearia</option>
															<option value="salaoBeleza">Salão Beleza</option>
															<option value="mecanica">Mecanica</option>
															<option value="lavaCar">Lava Car</option>
														</select>
													</div>
													<div className="form-group col-md-4">
														<label className="subTitulos" htmlFor="descricao">Descrição</label>
														<input type="text" className="form-control" id="descricao" ref='descricao' required />
													</div>
													<div className="form-group col-md-2">
														<label className="subTitulos" htmlFor="cep">CEP</label>
														<input type="text" className="form-control" id="cep" ref='cep' required />
													</div>
													<div className="form-group col-md-6">
														<label className="subTitulos" htmlFor="endereco">Endereço</label>
														<input type="text" className="form-control" id="endereco" ref='endereco' required />
													</div>
													<div className="form-group col-md-4">
														<label className="subTitulos" htmlFor="numero">Número</label>
														<input type="number" className="form-control" id="numero" ref='numero' required />
													</div>
													<div className="form-group col-md-4">
														<label className="subTitulos" htmlFor="complemento">Complemento</label>
														<input type="text" className="form-control" id="complemento" ref='complemento' />
													</div>
													<div className="form-group col-md-4">
														<label className="subTitulos" htmlFor="bairro">Bairro</label>
														<input type="text" className="form-control" id="bairro" ref='bairro' required />
													</div>
													<div className="form-group col-md-6">
														<label className="subTitulos" htmlFor="cidade">Cidade</label>
														<input type="text" className="form-control" id="cidade" ref='cidade' required />
													</div>
													<div className="form-group col-md-6">
														<label className="subTitulos" htmlFor="estado">Estado</label>
														<select className="form-control" id="estado" ref='estado' required>
															<option selected>Selecione um Estado.</option>
															<option value="Acre">Acre</option>
															<option value="Alagoas">Alagoas</option>
															<option value="Amapá">Amapá</option>
															<option value="Amazonas">Amazonas</option>
															<option value="Bahia">Bahia</option>
															<option value="Ceará">Ceará</option>
															<option value="Distrito Federal">Distrito Federal</option>
															<option value="Espirito Santo">Espirito Santo</option>
															<option value="Goiás">Goiás</option>
															<option value="Maranhão">Maranhão</option>
															<option value="Mato Grosso">Mato Grosso</option>
															<option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
															<option value="Minas Gerais">Minas Gerais</option>
															<option value="Pará">Pará</option>
															<option value="Paraiba">Paraiba</option>
															<option value="Paraná">Paraná</option>
															<option value="Pernambuco">Pernambuco</option>
															<option value="Piauí">Piauí</option>
															<option value="Rio de Janeiro">Rio de Janeiro</option>
															<option value="Rio Grande do Norte">Rio Grande do Norte</option>
															<option value="Rio Grande do Sul">Rio Grande do Sul</option>
															<option value="Rondônia">Rondônia</option>
															<option value="Roraima">Roraima</option>
															<option value="Santa Catarina">Santa Catarina</option>
															<option value="São Paulo">São Paulo</option>
															<option value="Sergipe">Sergipe</option>
															<option value="Tocantins">Tocantins</option>
														</select>
													</div>
												</div>
												<button type="submit" className="btn btn-success botao">Cadastrar</button>
												<button type="reset" className="btn btn-danger botao">Limpar</button>
											</form>
										)
									}
								</div>
							</div>
							<hr />
							{usuariosAll.length === 0 ? '' :
								<div className="table-responsive-md">
									<table className="table table-sm table-hover text-center align-middle">
										<caption>Lista de Usuários - ${usuariosAll.length} usuários.</caption>
										<thead className="bgHead">
											<tr>
												<th className="align-middle">Nome Completo</th>
												<th className="align-middle">E-mail</th>
												<th className="align-middle">Perfil</th>
											</tr>
										</thead>
										<tbody>
											{usuariosAll.map(usuario => (
												<tr>
													<td className="align-middle">{usuario.nome + ' ' + usuario.sobrenome}</td>
													<td className="align-middle">{usuario.email}</td>
													<td className="align-middle">{usuario.perfil}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							}
							<br />
							{empresasAll.length === 0 ? '' :
								<div className="table-responsive-md">
									<table className="table table-sm table-hover text-center align-middle">
										<caption>Lista de Empresas ${empresasAll.length} empresas.</caption>
										<thead className="bgHead">
											<tr>
												<th className="align-middle">Razão Social</th>
												<th className="align-middle">CNPJ</th>
												<th className="align-middle">Telefone</th>
												<th className="align-middle">Categoria</th>
												<th className="align-middle">cidade</th>
												<th className="align-middle">Estado</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											{empresasAll.map(empresa => (
												<tr>
													<td className="align-middle">{empresa.nome}</td>
													<td className="align-middle">{empresa.CNPJ}</td>
													<td className="align-middle">{empresa.telefone}</td>
													<td className="align-middle">{empresa.categoria}</td>
													<td className="align-middle">{empresa.cidade}</td>
													<td className="align-middle">{empresa.estado}</td>
													<td className="text-danger pencilTrash align-middle" onClick={() => { if (window.confirm(`Deseja DELETAR mesmo a Empresa ${empresa.nome}? Fazendo isso irá DELETAR todos seus usuários, Funcionários e Serviços cadastrado para empresa.`)) { this.deletarEmpresa(empresa._id) } }}><FaTrash /></td>
												</tr>
											))
											}
										</tbody>
									</table>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CadastroEmpresa;
