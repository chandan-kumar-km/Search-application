import { useState, useEffect } from 'react'
import Todo from './Todo';
import axios from 'axios';
import Searchform from './Searchform';

function Todos() {
    const URL = `https://jsonplaceholder.typicode.com/todos`

    const [usertodos, setUsertodos] = useState([]);//original data for from api
    const [errors, seterrors] = useState("");
    const [setsearchformcheck, setSetsearchformcheck] = useState(false);//to toggle searchbar apperance

    const filteredData = (data) => { //responsible for updating filtered data 
        seterrors("")
        console.log(data)
        data.length >= 1 ? setUsertodos(data) : seterrors("Data Not Found for the Search :(")
        setSetsearchformcheck(!setsearchformcheck)
    }

    const getData = async () => {   //api call using axios
        try {
            seterrors("")
            const response = await axios.get(`${URL}`);
            setUsertodos(response.data)
        } catch (error) {
            console.log(error)
            seterrors(error.message)
        }
    }

    useEffect(() => {
        getData()
    }, [URL]);

    return (
        <>
            <h1 className='text-center text-3xl'>Todos</h1>
            <div className="flex justify-center">
                <button className=' mx-2 rounded-lg  w-1/3 text-center border-l border-2 bg-red-100' onClick={() => {
                    seterrors("")
                    setSetsearchformcheck(!setsearchformcheck)
                }}>Search!</button>
                <button className=' mx-2 rounded-lg  w-1/3 text-center border-l border-2 bg-red-100' onClick={() => {
                    getData()
                    setSetsearchformcheck(false)
                }}>All posts</button>
            </div>
            <div className={`grid place-items-center ${setsearchformcheck ? "my-9" : ""}`}>{setsearchformcheck && <Searchform filteredData={filteredData} usertodos={usertodos} />}</div>
            {errors && <p className='text-3xl text-center'>{errors}</p>}
            <div className='grid grid-cols-3 gap-4 my-3'>
                {
                    usertodos.map((item) =>
                        <Todo key={item.id} userid={item.userId} title={item.title} completed={item.completed} />
                    )
                }
            </div>

        </>
    )
}

export default Todos
