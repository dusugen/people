import './App.css';
import Table from "./components/Table/Table";
import React, {useEffect, useState} from "react";
import Filters from "./components/Filters/Filters";
import axios from "axios";

function App() {
  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [gender, setGender] = useState('')

  const [activeStatus, setActiveStatus] = useState(false)


  const [inActiveStatus, setInActiveStatus] = useState(false)
// все пользователи полученные с сервера
  const [usersData, setUsersData] = useState([]);

  const [filtredUsers, setFiltredUsers] = useState([...usersData])

  useEffect(() => {
    axios.get('https://gorest.co.in/public-api/users?page=1&per_page=50')
      .then(res => {
        setUsersData(res.data.data)
      })
  }, [])


  // Фильтрация по имени работника
  useEffect(() => {
    const filtredItems = usersData.filter((obj) => {
      if (name.length !== 0 && obj.name.toLowerCase().includes(name.toLowerCase())) {
        return obj;
      } else if (name.length === 0) {
        return obj
      }
    })
    setFiltredUsers(filtredItems)
  }, [name])


  // Фильтрация по email
  useEffect(() => {
    const filtredItems = usersData.filter((obj) => {
      if (email.length !== 0 && obj.email.toLowerCase().includes(email.toLowerCase())) {
        return obj;
      } else if (email.length === 0) {
        return obj
      }
    })
    setFiltredUsers(filtredItems)
  }, [email])

  // Фильтрация по гендеру
  useEffect(() => {
    const filtredItems = usersData.filter((obj) => {
      if (obj.gender === gender) {
        return obj;
      } else if (gender.length === 0) {
        return obj
      }
    })
    setFiltredUsers(filtredItems)
  }, [gender])

  console.log(activeStatus, inActiveStatus)

  // фильтрация по статусу
  useEffect(() => {
    const filtredItems = usersData.filter((obj, index) => {
      if (activeStatus && obj.status === 'active') {
        return obj
      } else if (inActiveStatus && obj.status === 'inactive') {
        return obj
      }

    })
    console.log(filtredItems.length, 'length')
    setFiltredUsers(filtredItems)
  }, [activeStatus, inActiveStatus])

  return (
    <div className="container">
      <h1 className={'display-3 fw-bold text-center mb-4'}>People</h1>
      <div className="row">
        <div className={`col-8`}>
          {
            (name.length === 0 && email.length === 0 && gender.length === 0
              && activeStatus === false && inActiveStatus === false)
              ? <Table items={usersData}/> :
              <Table items={filtredUsers}/>
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
