import React from 'react';

const Modal = ({
    book,
    modalTitle,
    handleChange,
    handleSubmit,
    modalRef,
}) => {

    return (
        <div className="modal fade" id="bookModal" tabIndex="-1" aria-hidden="true" ref={modalRef}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title section__subtitle">{modalTitle}</h5>
                        <button type="button " className="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"
                        ></button>
                    </div>
                    {book &&
                        <div className="modal-body">
                            <div className="d-flex flex-row bd-highlight mb-3">

                                <div className="p-2 w-50 bd-highlight">


                                    {book._id !== '' ? <div className="input-group mb-3">
                                        <span className="input-group-text">Book ID</span>
                                        <input type="text" className="form-control"
                                            value={book._id}
                                            name='_id' disabled />
                                    </div> : null}


                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Book Name</span>
                                        <input type="text" className="form-control"
                                            value={book.name}
                                            onChange={handleChange} name='name' />
                                    </div>

                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Author Name</span>
                                        <input type="text" className="form-control"
                                            value={book.author}
                                            onChange={handleChange} name='author' />
                                    </div>

                                    <div class="input-group mb-3">
                                    <span className="input-group-text">Availability</span>
                                        <select class="form-control" name="availabilitystatus" value={book.availabilitystatus} onChange={handleChange}>
                                            <option value="Available">Available</option>
                                            <option value="Not Available">Not Available</option>
                                        </select>
                                    </div>


                                </div>
                            </div>

                            {book._id === '' ?
                                <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={handleSubmit}
                                    name='create'
                                >Create</button>
                                : null}

                            {book._id !== '' ?
                                <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={handleSubmit}
                                    name='update'
                                >Update</button>
                                : null}
                        </div>}



                </div>
            </div>
        </div>
    );
};

export default Modal;