import React, { useState } from 'react'
import { Modal, Container, Row, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import ProfileImage from '../../assets/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpeg'
import Avatar1 from '../../assets/image (8).png'
import Avatar2 from '../../assets/image (7).png'
import Avatar3 from '../../assets/image (6).png'
import Avatar4 from '../../assets/image (12).png'
import Avatar5 from '../../assets/image (13).png'
import Avatar6 from '../../assets/image (14).png'
import Avatar7 from '../../assets/image (15).png'
import Avatar8 from '../../assets/image (16).png'
import Avatar9 from '../../assets/image (17).png'
import Avatar10 from '../../assets/image (18).png'
import Avatar11 from '../../assets/image (19).png'

export const ImageSelector = () => {
  const [showModal, setShowModal] = useState(false)
  const [avatarImages, setAvatarImages] = useState(ProfileImage)

  const selectImage = (imagePath) => {
    setShowModal(false)
    setAvatarImages(imagePath)
  }

  return (
    <div className='avatar-character'>
      <img
        className='img-fluid'
        style={{
          width: '350px',
          height: '350px',
          cursor: 'pointer',
          borderRadius: '50%',
        }}
        src={avatarImages}
        alt='Your Image'
        onClick={() => setShowModal(true)}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className='modal-header'>
          <Modal.Title className='modal-title'>
            Select Your Favourite Profile Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={6} md={2}>
                <img
                  src={Avatar1}
                  alt='Image 1'
                  className='img-fluid'
                  onClick={() => selectImage(Avatar1)}
                />
              </Col>
              <Col xs={6} md={2}>
                <img
                  src={Avatar2}
                  alt='Image 2'
                  className='img-fluid '
                  onClick={() => selectImage(Avatar2)}
                />
              </Col>
              <Col xs={6} md={2}>
                <img
                  src={Avatar3}
                  alt='Image 3'
                  className='img-fluid '
                  onClick={() => selectImage(Avatar3)}
                />
              </Col>
              <Col xs={6} md={2}>
                <img
                  src={Avatar4}
                  alt='Image 4'
                  className='img-fluid '
                  onClick={() => selectImage(Avatar4)}
                />
              </Col>
              <Col xs={6} md={2}>
                <img
                  src={Avatar5}
                  alt='Image 5'
                  className='img-fluid '
                  onClick={() => selectImage(Avatar5)}
                />
              </Col>
              <Col xs={6} md={2}>
                <img
                  src={Avatar6}
                  alt='Image 6'
                  className='img-fluid '
                  onClick={() => selectImage(Avatar6)}
                />
              </Col>
              <Col xs={6} md={2}>
                <img
                  src={Avatar7}
                  alt='Image 6'
                  className='img-fluid '
                  onClick={() => selectImage(Avatar7)}
                />
              </Col>
              <Col xs={6} md={2}>
                <img
                  src={Avatar8}
                  alt='Image 6'
                  className='img-fluid '
                  onClick={() => selectImage(Avatar8)}
                />
              </Col>
              <Col xs={6} md={2}>
                <img
                  src={Avatar9}
                  alt='Image 6'
                  className='img-fluid '
                  onClick={() => selectImage(Avatar9)}
                />
              </Col>
              <Col xs={6} md={2}>
                <img
                  src={Avatar10}
                  alt='Image 6'
                  className='img-fluid'
                  onClick={() => selectImage(Avatar10)}
                />
              </Col>
              <Col xs={6} md={2}>
                <img
                  src={Avatar11}
                  alt='Image 6'
                  className='img-fluid '
                  onClick={() => selectImage(Avatar11)}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ImageSelector
