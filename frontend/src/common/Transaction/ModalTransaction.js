import React,{useEffect} from 'react';

const ModalTransaction = ({
    allusers,
    allbooks,
    transaction,
    modalTitle,
    handleChange,
    handleSubmit,
    modalTransactionRef,
}) => {

    return (
        <div className="modal fade" id="transactionModal" tabIndex="-1" aria-hidden="true" ref={modalTransactionRef}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title section__subtitle">{modalTitle}</h5>
                        <button type="button " className="btn-close bg-danger" data-bs-dismiss="modal" aria-label="Close"
                        ></button>
                    </div>
                    {transaction &&
                        <div className="modal-body">Transactions
                            <div className="d-flex flex-row bd-highlight mb-3">

                                <div className="p-2 w-50 bd-highlight">


                                    {transaction._id ? <div className="input-group mb-3">
                                        <span className="input-group-text">transaction ID</span>
                                        <input type="text" className="form-control"
                                            value={transaction._id?transaction._id:''}
                                            name='_id' disabled />
                                    </div> : null}

                                    <div class="input-group mb-3">
                                        <span className="input-group-text">All Users</span>
                                        <select
                                            className="form-control"
                                            name="userName"
                                            value={transaction.userName?transaction.userName:''}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>Select a user</option>
                                            {allusers && allusers.map((user) => (
                                                <option key={user._id} value={user.userName}>
                                                    {user.userName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div class="input-group mb-3">
                                        <span className="input-group-text">All Books</span>
                                        <select
                                            className="form-control"
                                            name="bookName"
                                            value={transaction.bookName? transaction.bookName:''}
                                            onChange={handleChange}
                                        >
                                            <option value="" disabled>Select a book</option>
                                            {allbooks?.map((book) => (
                                                <option key={book._id} value={book.name} >
                                                    {book.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div class="input-group mb-3">
                                        <span className="input-group-text">Due Date</span>
                                        <input type="date" className="form-control"
                                            value={transaction.dueDate? transaction.dueDate: ''}
                                            onChange={handleChange} name='dueDate' />
                                    </div>
                                    <div class="input-group mb-3">
                                        <span className="input-group-text">Transaction Type</span>
                                        <select class="form-control" name="transactiontype" value={transaction.transactiontype? transaction.transactiontype: ''} onChange={handleChange} >
                                            <option value="Issue Book" selected>Issue Book</option>
                                            <option value="Return Book">Return Book</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {!transaction._id ?
                                <button type="button"
                                    className="btn btn-primary float-start"
                                    onClick={handleSubmit}
                                    name='create'
                                >Create</button>
                                : null}

                            {transaction._id ?
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

export default ModalTransaction;