import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';
import { AuthContext } from '../../context/AuthContext';
import Modal from './BookModal';


const UserHome = () => {

  const initialState = {
    _id: '',
    name: '',
    author: '',
    availabilitystatus: 'Available',
  }

  const [book, setbook] = useState(initialState);
  const [ModalTitle, setModalTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [books, setbooks] = useState([]);
  const modalRef = useRef(null);
  const recordsPerPage = 10;

  const [modalUpdated, setModalUpdated] = useState(false);
  const [modalCreated, setModalCreated] = useState(false);



  const readData = async () => {
    try {

      const res = await fetch(`${BASE_URL}/book/`, {
        method: 'get',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        }
      })

      const result = await res.json();
      setbooks(result.data);

    } catch (err) {
      alert(err.message);
    }
  }
  const createModal = () => {
    setbook(initialState);
    setModalTitle("Add Book");
  }

  const editModal = (item) => {
    const newState = { ...item };

    setbook(newState)
    setModalTitle("Update Book");
  }

  const deletebook = async (_id) => {
    try {

      const res = await fetch(`${BASE_URL}/book/${_id}`, {
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

  const createBook = async () => {
    try {

      const res = await fetch(`${BASE_URL}/book/add`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${user?.token}`
        },
        body: JSON.stringify(book)
      })

      const result = await res.json();
      if (modalRef.current) {
        modalRef.current.click();
      }

    } catch (err) {
      alert(err.message);
    }
  }

  const updateBook = async () => {
    try {
      const res = await fetch(`${BASE_URL}/book/${book._id}`, {
        method: 'put',
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${user?.token}`

        },
        body: JSON.stringify(book)
      })

      const result = await res.json();
      if (modalRef.current) {
        modalRef.current.click();
      }


    } catch (err) {
      alert(err.message);
    }

  }

  const handleChange = (event) => {
    setbook(prev => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.name === 'create' ? setModalCreated(true) : setModalUpdated(true);
  }

  useEffect(() => {
      if (modalCreated) {
        createBook()
        setModalCreated(false);

      }
      else if (modalUpdated) {
        updateBook()
        setModalUpdated(false);
      }
      readData();
 
  }, [modalCreated, modalUpdated])

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

  }, [user])


  const indexOfLastBook = currentPage * recordsPerPage;
  const indexOfFirstBook = indexOfLastBook - recordsPerPage;
  const currentBooks = books?.slice(indexOfFirstBook, indexOfLastBook);
  return (
    <div className='container '>
      <section>
        {user?.role === 'admin' ?
          (<button type="button"
            className="btn btn-primary m-2 float-end primary__btn"
            data-bs-toggle="modal"
            data-bs-target="#bookModal"
            onClick={() => { createModal() }}>
            Add Books
          </button>) : null}

        {/*Table Section start */}

        <table className='table table-hover'>
          <thead>
            <tr>
              <th>
                Book Id
              </th>
              <th>
                Book Name
              </th>
              <th>
                Author Name
              </th>
              <th>
                Availability Status
              </th>
              {user?.role === 'admin' ? (<th>
                Options
              </th>) : null}

            </tr>
          </thead>
          <tbody>
            {
              currentBooks?.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.name}</td>
                  <td>{item.author}</td>
                  <td>{item.availabilitystatus}</td>
                  {user?.role === 'admin' ? (<td>
                    <button className='btn btn-light mr-1 secondary__btn'

                      data-bs-toggle="modal"
                      data-bs-target="#bookModal"
                      onClick={() => editModal(item)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>         </button>
                    <button className='btn btn-light mr-1 secondary__btn'
                      onClick={() => deletebook(item._id)}>
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
              disabled={currentPage === Math.ceil(books?.length / recordsPerPage)}
            >
              Next
            </button>


          </tbody>
        </table>
        <Modal book={book}
          modalTitle={ModalTitle}
          handleChange={(event) => handleChange(event)}
          handleSubmit={handleSubmit}
          modalRef={modalRef} />
      </section>
      {/*Table Section end */}
    </div>
  )
}

export default UserHome