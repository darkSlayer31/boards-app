import loader from '../../assets/images/loader.gif'

const Loader = () => {
  return (
    <div className='modal modal--loader show'>
      <div className="modal__content modal__content--loader">
        <img src={loader} alt="" />
      </div>
    </div>
  )
}

export default Loader;