import React, { Component } from 'react';
import NewsService from '../../_common/services/news';
import '../../_common/assets/css/public-homepage.css';

var powercat = require('../../_common/assets/img/powercat.png');
var news = null;

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { newsTable: [] }
    }

    /*
    * Pulls notification information upon loading the page.
    */
    componentDidMount() {
        NewsService.getNewsHistory().then((response) => {
            this.setState({ newsTable: JSON.parse(response.body) }, () => {
                console.log(this.state.newsTable);
                this.generateNewsTable(); // helper function
            });
        })
            .catch((resErr) => console.log('Something went wrong. Please try again'));
    }

    /*
    * Generates a table of notifications.
    */
    generateNewsTable() {
        const notes = [];
        console.log(this.state.newsTable);
        this.state.newsTable.forEach((data, index) => {
            notes.push(
                <div key={index} id="news-article">
                    <p>{data.ArticleDate}</p>
                    <h1>{data.ArticleTitle}</h1>
                    <h3>{data.ArticleSubHeading}</h3>
                    <p>{data.ArticleMessage}</p>
                </div>
            );
        });
        news = notes;
        this.forceUpdate();
    }

    /*
    * Renders the component UI.
    */
    render() {
        return (
            <div className="home">
                <div className="banner">
                    <br /><h1 id="title">Welcome To Kansas State University</h1>
                    <img src={powercat} alt="" id="logo"></img>
                </div>
                <div id="article-field">
                    {news}
                </div>
            </div>
        )
    }
}