import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { AuthContext } from '../../context/AuthContext';
import ModalTransaction from './ModalTransaction';
import useFetch from '../../hooks/useFetch';

const UserTransaction = () => {

  const initialState = {
    _id: undefined,
    userName: undefined,
    bookName: undefined,
    dueDate: undefined,
    transactiontype: undefined,
  }

  const [transaction, settransaction] = useState(initialState);
  const [ModalTitle, setModalTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const role = user?.role;
  const [transactions, settransactions] = useState([]);
  const modalTransactionRef = useRef(null);
  const recordsPerPage = 10;

  const [modalUpdated, setModalUpdated] = useState(false);
  const [modalCreated, setModalCreated] = useState(false);


  const { data: AllUsers } = useFetch(`${BASE_URL}/user/allusernames`, 'get', {
    'content-type': 'application/json',
    'Authorization': `Bearer ${user?.token}`
  })

  const { data: AllBooks } = useFetch(`${BASE_URL}/book/allbooknames`, 'get', {
    'content-type': 'application/json',
    'Authorization': `Bearer ${user?.token}`
  })

  const readData = async () => {
    try {
      const url = `${BASE_URL}/transaction/${user?.role === 'admin' ? '' : `user/${user?._id}`}`;
      const res = await fetch(url, {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }
      })

      let result = await res.json();
      settransactions(result.data);

    } catch (err) {
      alert(err.message);
    }
  }
  const createModal = () => {
    settransaction(initialState);
    setModalTitle("Add Transaction");
  }

  const editModal = (item) => {
    const newState = { ...item };

    settransaction(newState)
    console.log(transaction);
    setModalTitle("Update Transaction");
  }

  const deletetransaction = async (_id) => {
    try {

      const res = await fetch(`${BASE_URL}/transaction/${_id}`, {
        method: 'delete',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }
      })

      const result = await res.json();
      readData();

    } catch (err) {
      alert(err.message);
    }
  }

  const createTransaction = async () => {
    try {
      const res = await fetch(`${BASE_URL}/transaction/add`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(transaction)
      });

      const result = await res.json();
      settransaction(initialState);
      if (modalTransactionRef.current) {
        modalTransactionRef.current.click();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const updateTransaction = async () => {
    try {
      const res = await fetch(`${BASE_URL}/transaction/${transaction._id}`, {
        method: 'put',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(transaction)
      });

      const result = await res.json();
      settransaction(initialState);
      if (modalTransactionRef.current) {
        modalTransactionRef.current.click();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChange = (event) => {
    settransaction(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const action = event.target.name;

    if (action === 'create') {
      setModalCreated(true);
    } else if (action === 'update') {
      setModalUpdated(true);
    }
  }

  const onCloseModal = (event) => {
    settransaction(initialState);
  }

  useEffect(() => {
    if (modalCreated) {
      createTransaction();
      setModalCreated(false);
    }

    if (modalUpdated) {
      updateTransaction();
      setModalUpdated(false);
    }

    readData();
  }, [modalCreated, modalUpdated]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

  }, [user])

  const indexOfLastTransaction = currentPage * recordsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - recordsPerPage;
  const currentTransactions = transactions?.slice(indexOfFirstTransaction, indexOfLastTransaction);
  return (

    <div className='container'>
      <section>
        {user?.role === 'admin' ? (<button type="button"
          className="btn btn-primary m-2 float-end primary__btn"
          data-bs-toggle="modal"
          data-bs-target="#transactionModal"
          onClick={() => { createModal() }}>
          Issue/Return Book
        </button>) : null}

        {/*Table Section start */}

        <table className='table table-hover'>
          <thead>
            <tr>
              <th>
                Transaction ID
              </th>
              <th>
                User Name
              </th>
              <th>
                Book Name
              </th>
              <th>
                Due Date
              </th>
              <th>
                Transaction Type
              </th>
              {user?.role === 'admin' ? (<th>
                Options
              </th>) : null}

            </tr>
          </thead>
          <tbody>
            {
              currentTransactions?.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.userName}</td>
                  <td>{item.bookName}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.transactiontype}</td>
                  {user?.role === 'admin' ? (<td>
                    <button className='btn btn-light mr-1 secondary__btn'

                      data-bs-toggle="modal"
                      data-bs-target="#transactionModal"
                      onClick={() => editModal(item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>         </button>
                    <button className='btn btn-light mr-1 secondary__btn'
                      onClick={() => deletetransaction(item._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                      </svg> </button>
                  </td>) : null}

                </tr>
              ))
            }

            <button
              className="btn btn-light mx-2 "
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-light mx-2"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(transactions?.length / recordsPerPage)}
            >
              Next
            </button>


          </tbody>
        </table>
        <ModalTransaction
          allusers={AllUsers}
          allbooks={AllBooks}
          transaction={transaction}
          modalTitle={ModalTitle}
          handleChange={(event) => handleChange(event)}
          handleSubmit={handleSubmit}
          modalTransactionRef={modalTransactionRef}
          onCloseModal={onCloseModal} />
      </section>
      {/*Table Section end */}
    </div>



  )
}

export default UserTransaction