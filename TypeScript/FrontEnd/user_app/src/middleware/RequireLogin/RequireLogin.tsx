import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import FormRequireUser from '../../components/modal/FormRequireUser';

const RequireLogin:React.FC = () => {
    const token = localStorage.getItem("accessToken") // lấy token từ localStorage về JSON.parse(...)
    console.log(token);
    
    const [exp, setExp] = useState(false) //set trạng thái để hiện popup hết phiên đăng nhập
    const navigate = useNavigate()
    useEffect(() => {
        try {
            const date = new Date()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decode:any = jwtDecode(token as any)
            if (decode && decode.exp > date.getTime() / 1000) {
                //néu token còn hạng thì chỉ chuyển hướng trang vào outlet
                setExp(false)
               
            } else {
                // nếu hết hạng thì hiện popup thông báo hết phiên
                setExp(true)
                console.log(1111, "Hết hạn");
            }
        } catch (error) {
            // nếu cố ý nhập bậy token thì cho về lsogin
            navigate("/login")
       
        }
    }, [])

    return (
        <>
            {exp && <FormRequireUser />}
            <Outlet />
        </>
    )

}

export default RequireLogin