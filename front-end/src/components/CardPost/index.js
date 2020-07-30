/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Card, Grid, Icon } from 'semantic-ui-react';
import CardOpened from '../CardOpened';
import './styles.css';
import { posts } from '../../api/posts';

/*
possivel outro estilo
const renderButtons = (upVotes, downVotes, comments) => {
  return(
    <div>
    <Button
      color='green'
      content=''
      icon='angle up'
      size="mini"
      label={{ 
        basic: true, 
        color: 'green', 
        pointing: 'left', 
        content: upVotes 
      }}
    />
    <Button
      color='red'
      content=''
      icon='angle down'
      size="mini"
      label={{ 
        basic: true, 
        color: 'red', 
        pointing: 'center', 
        content: downVotes
      }}
    />
    <Button
      color='blue'
      content=''
      icon='comments'
      size="mini"
      label={{ 
        basic: true, 
        color: 'blue', 
        pointing: 'rigth', 
        content: comments 
      }}
    />
    </div>
  )
}
*/

let isBeingUsed = false;
let data = [];
let changeModal = () => {};

const voteUp = async data => {
  isBeingUsed=true;
  await console.log('up');
  isBeingUsed=false;
}

const voteDown = async data => {
  isBeingUsed=true;
  await console.log('down');
  isBeingUsed=false;
}

const voteComments = async data => {
  isBeingUsed=true;
  await console.log('comments');
  isBeingUsed=false;
}

const openCard = async posts => {
  if(!isBeingUsed) {
    changeModal(true)
    data = posts;
  }
}

const renderButtons = (upVotes, downVotes, comments, tags) => {
  
  return (
    <div>    
    <Grid style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10,}}>
    <div style={{ flex: 1,  flexDirection: 'column' }}>
      
      <a onClick={() => voteUp()}>
      <Icon className="voteUp" color="green" name="angle up" ></Icon>
        {upVotes}
      </a>

      <a style={{ marginLeft: 8 }} onClick={() => voteDown()} >
        <Icon className="voteDown" color="red" name="angle down" ></Icon>
        {downVotes}
      </a>

      <a style={{ marginLeft: 8 }} onClick={() => voteComments()}>
        <Icon className="voteComment" name="comments" ></Icon>
        {comments}
      </a>    

    </div>
    {tags && tags[0] &&
      <a>
      {tags[0].length > 35 ? 
        `${tags[0].slice(0,35)}...`
        : tags[0]
      } 
      </a>
    }

    </Grid> 
    </div>
  ) 
}

const CardMainPage = post => {
  let { data } = post;
  let { header='Sem Titulo', description="Sem descrição", upVotes=0, downVotes=0, comments=0, tags=[] } = data;
  let getRandownColor = () => {
    let possibleColors = ["red","orange","yellow","olive","green","teal","blue","violet","purple","pink","brown","grey","black"];
    return possibleColors[Math.floor((Math.random() * possibleColors.length ) + 1)]
  }

  return(
  <Card onClick={() => !isBeingUsed ? openCard(data) : {} }  elevation={1} color={getRandownColor()} style={{ minWidth: 420 }} >
    <Card.Content header={header} />
    <Card.Content description={description.length >= 163 ? `${description.slice(0, 160)}...` : description} />
    <Card.Content style={{ flexDirection: 'row' }} extra>
      {renderButtons(upVotes, downVotes, comments.length, tags)}
    </Card.Content>
  </Card>
)}

function CardPost(props) {
  let { open, onChangeModal } = props;
  changeModal = onChangeModal;

  return (
    <div>
    <Card.Group centered >
    { 
    posts.map( post => <CardMainPage key={post.header+post.description} data={post}/> )
    }
    </Card.Group>
    <CardOpened voteUp={voteUp} voteDown={voteDown} voteComments={voteComments} open={open} onChangeModal={onChangeModal} data={data} />

    </div>
  );
}

export default CardPost;
