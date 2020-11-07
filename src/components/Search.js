import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [term, setTerm] = useState('programming');
    const [result, setResult] = useState([]);

    console.log(result);

    useEffect(() => {
        const searchAPI = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term,
                },
            });

            setResult(data.query.search);
        };

        if (term && !result.length) {
            searchAPI();
        } else {
            const timeoutId = setTimeout(() => {
                if (term) {
                    searchAPI();
                }
            }, 500);

            return () => {
                clearTimeout(timeoutId);
            };
        }
        /*axios.get('adadas') Utilizando async await con axios y promesas
            .then((response) => {
                console.log(response.data);
            });*/
        /*(async () => { Usando async await declarando una funcion y llamandola inmediatamente
            await axios('dadadasd');
        })();*/
    }, [term]); //Puede estar sin array / con un array vacio / o con un array con algo

    const renderedResults = result.map((result) => {
        return (
            <div key={result.pageid} className="item">
                <div className="right floated content">
                    <a
                        className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >Go</a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </div>
        );
    });

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Introduzca el termino a buscar</label>
                    <input
                        value={term}
                        onChange={e => setTerm(e.target.value)}
                        className="input" />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    );
};

export default Search;