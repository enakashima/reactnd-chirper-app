import React, { Component } from 'react'
import { connect } from 'react-redux'

import Tweet from './Tweet'
import NewTeet from './NewTweet'

class TweetPage extends Component {
    render() {
        console.log('rendering tweet page')
        const {id, replies} = this.props 

        return (
            <div>
                <Tweet id={id} />
                <NewTeet id={id} />
                {replies.lenght !== 0 && <h3 className='center'>Replies</h3>}
                <ul>
                    {replies.map((replyId) => (
                        <li key={replyId}>
                            <Tweet id={replyId} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({tweets}, props) {
    const { id } = props.match.params

    return {
        id,
        replies: !tweets[id]
            ? []
            : tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(TweetPage)