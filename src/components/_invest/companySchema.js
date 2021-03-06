import React, { Component } from 'react';
import axios from 'axios';
import styles from './invest.module.css';

class CompanySchema extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companyDetails: {}
        };
    }

    componentDidMount() {
        axios
            .get(`https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/${this.props.id}`)
            .then((res) => {
                var details = res.data.data;

                this.setState({
                    companyDetails: {
                        companyName: details.SC_FULLNM,
                        sector: details.SC_SUBSEC,
                        sharePrice: details.pricecurrent,
                        dayChange: details.pricepercentchange,
                        oneYearLow: details['52L'],
                        oneYearHigh: details['52H'],
                        marketCap: details.MKTCAP,
                        peRatio: details.PE,
                        industryPe: details.IND_PE
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const companyDetails = this.state.companyDetails;

        if (companyDetails === null) {
            return null;
        }

        const anchorStyles = {
            color: 'white',
            fontWeight: 'bold'
        };

        return (
            <div className={[styles.companyContainer, 'companyRow'].join(' ')}>
                <div>
                    <a
                        className="companyName"
                        style={anchorStyles}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={('https://www.bing.com/search?q=' + this.state.companyDetails.companyName + ' share').toLowerCase()}
                    >
                        {this.state.companyDetails.companyName}
                    </a>
                </div>
                <div className="companySector">Sector: {this.state.companyDetails.sector}</div>
                <div>Share Price: {this.state.companyDetails.sharePrice}</div>
                <div className={['dayChange', 'dummy'].join(' ')}>
                    Day's Change: {(this.state.companyDetails.dayChange * 1).toFixed(2)}%
                </div>
                <div>52 Week Low: {this.state.companyDetails.oneYearLow}</div>
                <div>52 Week High: {this.state.companyDetails.oneYearHigh}</div>
                <div>Market Cap: {this.state.companyDetails.marketCap}</div>
                <div>PE Ratio: {this.state.companyDetails.peRatio}</div>
                <div>Industry PE: {this.state.companyDetails.industryPe}</div>
            </div>
        );
    }
}

export default CompanySchema;
