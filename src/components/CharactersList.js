import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const CharactersList = (props) => {
	const [charactersList, setCharactersList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [sortPortrayed, setSortPortrayed] = useState(false);
	const [sortName, setSortName] = useState(false);
	const [sortReset, setSortReset] = useState(false);
	let cards = null;

	useEffect(() => {
		fetchData();
		setLoading(false);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		sortById();
		setLoading(false);
		// eslint-disable-next-line
	}, [sortReset]);

	useEffect(() => {
		sortList();
		setLoading(false);
		// eslint-disable-next-line
	}, [sortName, sortPortrayed]);

	async function fetchData() {
		try {
			setLoading(true);
			const url = 'https://breakingbadapi.com/api/characters';
			const { data } = await axios.get(url);
			setCharactersList(data);
		} catch (e) {
			setError(true);
		}
	}

	const buildCard = (character) => {
		return (
			<Link
				to={`/characters/${character.char_id}`}
				key={character.char_id}
				className="card"
			>
				<div className="card-img">
					<img
						src={character.img}
						loading="lazy"
						onError={(e) => {
							e.target.onerror = null;
							e.target.src = '/img/no-img.jpeg';
						}}
						alt={character.name}
					/>
				</div>
				<div className="card-body">
					<p className="card-title">{character.name}</p>
					<p className="card-subtitle">aka {character.nickname}</p>
					<p className="card-subtitle-xs">Portrayed by</p>
					<p className="card-subtitle-s">{character.portrayed}</p>
				</div>
			</Link>
		);
	};

	if (charactersList.length) {
		cards = charactersList.map((character) => {
			return buildCard(character);
		});
	}

	const sortById = () => {
		const sortedList = [].concat(charactersList).sort((a, b) => {
			return a.char_id - b.char_id;
		});

		setCharactersList(sortedList);
	};

	const sortList = () => {
		if (sortReset) return;

		let sortedList = charactersList;

		sortedList.sort(function (a, b) {
			let nameA, nameB;

			if (sortPortrayed) {
				nameA = a.portrayed.toLowerCase();
				nameB = b.portrayed.toLowerCase();
			} else {
				nameA = a.name.toLowerCase();
				nameB = b.name.toLowerCase();
			}

			if (nameA < nameB)
				//sort string ascending
				return -1;
			if (nameA > nameB) return 1;

			return 0; //default return value (no sorting)
		});

		setCharactersList(sortedList);
	};

	const sortButtons = () => {
		return (
			<div className="sort-btns">
				<span>Sort by: </span>
				<div className="btns">
					<button
						type="button"
						onClick={() => {
							setLoading(true);
							setSortName(true);
							setSortPortrayed(false);
							setSortReset(false);
						}}
						disabled={sortName ? 'disabled' : ''}
					>
						Character name
					</button>
					<button
						type="button"
						onClick={() => {
							setLoading(true);
							setSortPortrayed(true);
							setSortName(false);
							setSortReset(false);
						}}
						disabled={sortPortrayed ? 'disabled' : ''}
					>
						Real name
					</button>

					<button
						type="button"
						onClick={() => {
							setLoading(true);
							setSortReset(true);
							setSortName(false);
							setSortPortrayed(false);
						}}
						disabled={sortReset ? 'disabled' : ''}
					>
						Reset
					</button>
				</div>
			</div>
		);
	};

	if (error) {
		return <Redirect to={'/error'}></Redirect>;
	} else {
		return (
			<div>
				{sortButtons()}
				{loading ? (
					<div className="center">
						<FontAwesomeIcon icon={faSpinner} size="3x" spin />
					</div>
				) : (
					<div className="cards-container">{cards}</div>
				)}
			</div>
		);
	}
};

export default CharactersList;
