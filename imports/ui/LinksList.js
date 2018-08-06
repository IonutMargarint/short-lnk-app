import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import { Tracker } from 'meteor/tracker';
import { Lnks } from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            links: []
        };
    }
    
    componentDidMount(){
        console.log('componentDidMount - LinksList');
        
        this.linksTracker = Tracker.autorun(() =>  {
        Meteor.subscribe('links');
   
        const links = Lnks.find({
            visible: Session.get('showVisible')
        }).fetch();
    
        this.setState({ links });
});
        
    }
    
    componentWillUnmount(){
        console.log('componentWillUnmount - LinksList');
        this.linksTracker.stop();
    }
    
    renderLinksListItems(){
        
        if(this.state.links.length===0){
            return( 
                <div className="item">
                    <p className="item__status-message">No Links Found</p>
                </div>
            );
        }
        
        return this.state.links.map((link) => {
            const cloudLink = 'https://react-meteor-app-ionutmargarint.c9users.io/';
            const shortUrl = cloudLink + link._id;
            // const shortUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
        });
        
    }
    
    render(){
        return(
            <div>
                    <FlipMove maintainContainerHeight={true}>
                        {this.renderLinksListItems()}
                    </FlipMove>
            </div>
            );
    }
};