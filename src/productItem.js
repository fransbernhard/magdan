import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    background            : 'rgba(0, 0, 0, 0.8)',
    width                 : '100vw',
    height                : '100vh',
    display               : 'flex',
    'justify-content'     : 'center',
    'align-items'         : 'center',
    'flex-flow'           : 'column'
  }
};

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
    console.log('OpenModal');
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log(this.props.product.id);
    console.log('It is now open');
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render(){
    var img = this.state.image ?
      <img src={this.state.image} /> :
      this.props.product.thumbnail;

    const name = this.props.product.stocked ?
      <h3>{this.props.product.name}</h3> :
      <h3><span style={{color: 'red'}}>
        {this.props.product.name}
      </span></h3>;

    var limited = this.props.product.limited ?
      <p>begränsad upplaga: {this.props.product.limited} ex</p> :
      null;

    var available = this.props.product.available ?
      <p>tillgängliga: {this.props.product.available} ex</p> :
      null;

    var price = this.props.product.price ?
      <p>{this.props.product.price}  kr</p> :
      null;

    var type = this.props.product.type ?
      <p>{this.props.product.type}</p> :
      null;

    var size = this.props.product.size ?
      <p>{this.props.product.size} cm</p> :
      null;

    var desc = this.props.product.desc ?
      <p>{this.props.product.desc}</p> :
      null;

    var modalName = this.props.product.name ?
      <h2>{this.props.product.name}</h2> :
      null;

    var modalDesc = this.props.product.desc ?
      <h2>{this.props.product.desc}</h2> :
      null;

    // const img = this.props.product.thumbnail;
    // var img = import(`./img/${this.props.product.thumbnail}`).then(img => img);
    // <img src={img ? img : null} />

    return (
      <div className="product hvr-sink" onClick={this.openModal}>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-box" onClick={this.closeModal}>
            <div className="close" onClick={this.closeModal}>x</div>
            <img className="modal-img" src={this.state.previewImg}/>
            {modalName}
            {modalDesc}
          </div>
        </Modal>
        {img}
        {name}
        {type}
        {limited}
        {available}
        {size}
        {price}
        {desc}
      </div>
    );
  };

  componentDidMount() {
    this.props.product.thumbnail && import(`./images/${this.props.product.thumbnail}`).then(
      (image) => this.setState({
        image: image
      })
    )
    this.props.product.previewImg && import(`./images/${this.props.product.previewImg}`).then(
      (previewImg) => this.setState({
        previewImg: previewImg
      })
    )
  }
};

export default ProductItem;