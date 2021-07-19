import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const Characters = (props) => {
	const [characterData, setCharacterData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { id: chracterId } = props.match.params;

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line
	}, []);

	async function fetchData() {
		try {
			setLoading(true);
			const url = `https://breakingbadapi.com/api/characters/${chracterId}`;
			const { data } = await axios.get(url);
			setCharacterData(data[0]);
			setLoading(false);
		} catch (e) {
			setError(true);
			setLoading(false);
		}
	}

	const showCharacterData = () => {
		return (
			<div>
				<h2 className="character-name">{characterData.name}</h2>
				<div className="character-data">
					<img
						src={characterData.img}
						className="character-img"
						alt={characterData.name}
					></img>
					<div className="character-body">
						<p className="small-text">
							Nickname: <p className="bold">{characterData.nickname}</p>
						</p>
						<p className="small-text">
							Status: <p className="bold">{characterData.status}</p>
						</p>
						<p className="small-text">
							Portrayed by: <p className="bold">{characterData.portrayed}</p>
						</p>
						<p className="small-text">
							Occupation:{' '}
							{characterData.occupation.map((item) => (
								<p className="bold">{item}</p>
							))}
						</p>
					</div>
				</div>
			</div>
		);
	};

	if (error) {
		return <Redirect to={'/error'}></Redirect>;
	} else {
		return (
			<div>
				<button onClick={props.history.goBack}>
					<FontAwesomeIcon icon={faAngleLeft} />
					{` `}Back
				</button>
				{loading ? (
					<div className="center">
						<FontAwesomeIcon icon={faSpinner} size="3x" spin />
					</div>
				) : (
					<>{showCharacterData()}</>
				)}
			</div>
		);
	}
};

export default Characters;
