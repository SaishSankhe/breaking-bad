import './style/App.scss';
import Characters from './components/Characters';
import CharactersList from './components/CharactersList';
import Error from './components/Error';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className="App">
				<header>
					<h1 className="title">Breaking Bad</h1>
				</header>
				<main>
					<Switch>
						<Route exact path="/" component={CharactersList} />
						<Route exact path="/characters/:id" component={Characters} />
						<Route>
							<Error />
						</Route>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
