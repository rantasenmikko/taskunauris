import { useState } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { loginAtom, availableUsersAtom } from '../atoms/userAtoms';
import './LoginPage.css';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const login = useSetAtom(loginAtom);
	const availableUsers = useAtomValue(availableUsersAtom);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		const result = login({ username, password });

		if (!result.success) {
			setError(result.error || 'Kirjautuminen epäonnistui');
		}
		// If successful, AuthProvider will automatically show the dashboard
	};

	return (
		<div className="login-page">
			<div className="login-container">
				<div className="login-card">
					<h1 className="login-title">Kirjaudu sisään</h1>
					<p className="login-subtitle">Testiympäristö - käytä alla olevia käyttäjätunnuksia</p>

					<div className="demo-users">
						<h3>Saatavilla olevat testikayttäjät:</h3>
						<ul>
							{availableUsers.map((user) => (
								<li key={user.id}>
									<strong>{user.username}</strong> ({user.email})
								</li>
							))}
						</ul>
						<p>
							<small>Salasana: mikä tahansa (ei tarkisteta testiympäristössä)</small>
						</p>
					</div>

					<form onSubmit={handleSubmit} className="login-form">
						<div className="form-group">
							<label htmlFor="username">Käyttäjätunnus:</label>
							<input
								type="text"
								id="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
								placeholder="Syötä käyttäjätunnus"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password">Salasana:</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								placeholder="Syötä salasana"
							/>
						</div>

						{error && <div className="error-message">{error}</div>}

						<div className="login-actions">
							<button type="submit" className="login-button">
								Kirjaudu sisään
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
