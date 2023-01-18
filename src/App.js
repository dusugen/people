import './App.css';
import Table from "./components/Table/Table";
import React, {useEffect, useState} from "react";
import Filters from "./components/Filters/Filters";
import axios from "axios";
import styles from "../src/components/Table/Table.module.scss"

function App() {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [gender, setGender] = useState('')

  const [activeStatus, setActiveStatus] = useState(false)

  const [inActiveStatus, setInActiveStatus] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [sortDirection, setSortDirection] = useState('asc')

  const [sortField, setSortField] = useState('id')
// все пользователи полученные с сервера
  const [usersData, setUsersData] = useState([]);

  const [filtredUsers, setFiltredUsers] = useState([])

  useEffect(() => {
    setIsLoading(true)
    axios.get('https://gorest.co.in/public-api/users?page=1&per_page=50')
      .then(res => {
        setUsersData(res.data.data)
        setFiltredUsers(res.data.data)
        setIsLoading(false)
      })

  }, [])

  // sort by id


  useEffect(() => {
    const filtredItems = usersData.filter((obj) => {
      if (name.length !== 0) {
        const nameArr = name.toLowerCase().replace(/  +/g, ' ').trim().split(' ');
        const result = nameArr.every((item) => {      // ищем наличие всех массивов nameArr в obj.name
          return obj.name.toLowerCase().includes(item)
        })
        return result
      } else {
        return true
      }
    }).filter((obj) => {
      return (email.length !== 0) ? obj.email.toLowerCase().includes(email.toLowerCase()) : true
    }).filter(obj => {
      return (gender.length !== 0) ? obj.gender === gender : true;
    }).filter(obj => {
      return (activeStatus && !inActiveStatus) ? obj.status === 'active' : true;
    }).filter(obj => {
      return (inActiveStatus && !activeStatus) ? obj.status === 'inactive' : true;
    })
    setFiltredUsers(filtredItems)

  }, [name, email, gender, activeStatus, inActiveStatus])

  console.log(filtredUsers, 'filtredUsers')

  filtredUsers.sort((itemA, itemB) => {
    if (sortField === 'id') {
      return (sortDirection === "asc") ? (itemA.id - itemB.id) : (itemB.id - itemA.id);
    }
    if (sortField === 'status') {
      return (sortDirection === "asc") ? (itemA.status.localeCompare(itemB.status)) : (itemB.status.localeCompare(itemA.status));
    }
  })


  return (
    <div className="container">
      <h1 className={'display-3 fw-bold text-center mb-4'}>People</h1>
      <div className={`row ${styles.table}`}>
        <div className={`col-lg-8`}>
          {
            (isLoading) ? (
                <div className={`d-flex justify-content-center align-items-center h-100`}>
                  <div className="spinner-border " role="status">
                    <span className="sr-only"></span>
                  </div>
                </div>)
              : (<Table items={filtredUsers}
                        sortDirection={sortDirection}
                        setSortDirection={(value) => setSortDirection(value)}
                        sortField={sortField}
                        setSortField={setSortField}/>)
          }
        </div>
        <Filters name={name}
                 setName={(text) => setName(text)}
                 email={email}
                 setEmail={(mail) => setEmail(mail)}
                 setGender={(sex) => setGender(sex)}
                 activeStatus={activeStatus}
                 setActiveStatus={(value) => setActiveStatus(value)}
                 inActiveStatus={inActiveStatus}
                 setInActiveStatus={(value) => setInActiveStatus(value)}
        />
      </div>
    </div>
  )
}

export default App;
