import * as React from 'react';
import styles from './Tile.module.scss';
import { ITileProps } from './ITileProps';
import { escape } from '@microsoft/sp-lodash-subset';
import pnp, { Item }  from 'sp-pnp-js';
import { sp } from "@pnp/sp";
import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';

export default class Tile extends React.Component<ITileProps, any> {
  constructor(props){
    super(props);
    this.state={
      items:[]
    }
  }
  componentDidMount(){
    sp.web.lists.getByTitle("Documents").items.get().then(result=>{
      console.log(result)
      this.setState({items:result})
    })
  }
  
  getImage(input){
    if(input=='XL'){
    var imagePath = 'https://cdn.ca.emap.com/wp-content/uploads/sites/9/2018/09/railwayline1007926_960_720.jpg';
    return imagePath;
  }
  else
  if(input=='PDF'){
    var imagePath = 'https://cdn.pixabay.com/photo/2015/12/01/20/28/fall-1072821__340.jpg';
    return imagePath;
  }
  else
  if(input=='WORD'){
    var imagePath = 'https://image.shutterstock.com/image-photo/impressive-summer-view-lovatnet-lake-260nw-692930053.jpg';
    return imagePath;
  }
  else
  if(input=='TXT'){
    var imagePath = 'https://image.shutterstock.com/image-photo/spring-blossom-background-beautiful-nature-260nw-1033292395.jpg';
    return imagePath;
  }
}

  public render(): React.ReactElement<ITileProps> {
    return (
<StyleRoot>
    <Coverflow
      displayQuantityOfSide={3}
      navigation
      infiniteScroll
      enableHeading
      media={{
        '@media (max-width: 900px)': {
          width: '300px',
          height: '300px'
        },
        '@media (min-width: 900px)': {
          width: '700px',
          height: '250px'
        }
      }}
    >{
      this.state.items.map((res)=>{
      return <img key={res["ID"]} src={this.getImage(res["Department"])} alt={res["Title"]} data-action={res["ServerRedirectedEmbedUri"]}/>
    })
    }
    </Coverflow>
  </StyleRoot>
      );
  }
}