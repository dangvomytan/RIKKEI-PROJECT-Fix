
import { BrowserRouter } from 'react-router-dom'
import Router from './routers/router'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useEffect } from 'react';
// import { handleGetAllUser } from './redux/slices/user.Slice';
// import { useDispatch } from 'react-redux';


function App() {

  // const dispatch = useDispatch();
  // useEffect(()=>{
  //   const handleCallDataUse = async () =>{
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     await dispatch(handleGetAllUser() as any).unwrap();
  //   }

  //     handleCallDataUse();
  // },[])
  return (
<BrowserRouter>
<Router/>
</BrowserRouter>
  )
}

export default App
