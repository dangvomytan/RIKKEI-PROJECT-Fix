import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { GrStatusGood, GrStatusInfo } from "react-icons/gr";
import { IUserList, UserApi } from "../../models/User/User.Model";
import { useState,useEffect } from "react";
import { toast,Toaster } from "react-hot-toast";
import { handleDeleteUser, handleGetAllUser, handleRegisterUser, handleUpdateUser } from "../../redux/slices/user.Slice";

const UserListComponent: React.FC = () => {

  const [userApi, setUserApi] = useState<Array<IUserList>>([]);
  const [isCall, setIsCall] = useState<boolean>(true);

  const dispatch = useDispatch();


  const handleCallDataUse = async () =>{
  const data: IUserList[] = await UserApi.getAllUser();
    setUserApi(data);
  }

  useEffect(()=>{

      if (isCall) {
        handleCallDataUse();
      }
      return () => {
        setIsCall(false);
      };
  },[isCall])
console.log(1111,userApi);

  //xu li modal
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [formData, setFormData] = useState<IUserList>({
    id:0,
    fullName: '',
    userName: '',
    password: '',
    role: 2,
    status: 1
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!isUpdating)// add
    {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await dispatch(handleRegisterUser(formData) as any).unwrap();
        const notify = () => toast.success("Successfully registered");
        handleCallDataUse();
        handleClose();
        notify();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error:any) {
        console.log(error.message);
        const notify = () => toast.error(error.message ? error.message : "Error  registered");
        notify();
      }
    }
    else //upadater
    {
      try {
        console.log(formData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await dispatch(handleUpdateUser(formData) as any).unwrap();
        const notify = () => toast.success("Successfully registered");
        handleCallDataUse();
        handleClose();
        notify();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      catch (error:any) {
        console.log(error.message);
        const notify = () => toast.error(error.message ? error.message : "Error  update");
        notify();
      }
    }
  };
  const handleClickAdd = () => {
    setIsUpdating(false);
    handleShow();
    setFormData({
      id:0,
      fullName: '',
      userName: '',
      password: '',
      role: 2,
      status: 1
    });
  }

  // // }
  const handleClickUdateUser = (data:IUserList) => {
    setIsUpdating(true);
    handleShow();
    setFormData(
      {
      id: data?.id,
      fullName: data?.fullName,
      userName: data?.userName,
      password: data?.password,
      role: data?.role,
      status: data?.status
    });

  }
  const handleClickDeleteUser = async (data: IUserList) => {
    try {
      //goi ham delete
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log(data.id);
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await dispatch(handleDeleteUser(data.id) as any).unwrap();
           const notify = () => toast.success("Derete successfully ");

      handleCallDataUse();

      notify();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error:any) {
      console.log(error.messagex);
      const notify = () => toast.error(error.message ? error.message : "Delete error");
      notify();
    }

  }

  return (
    <>
      <Toaster
      position="bottom-right"
      reverseOrder={false}
    />
      <Modal
          show={show}
          onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <Modal.Header closeButton>
            <Modal.Title>
              {!isUpdating ? "Thêm người dùng" : "Cập nhật thông tin người dùng"}
            </Modal.Title>
          </Modal.Header>
          <form
            action="/user"
            method="POST"
            onSubmit={handleSubmit}
          >
            <label htmlFor="fullName">Họ và Tên:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
                value={formData?.fullName} onChange={handleChange}
              required
            />

            <label htmlFor="userName">Tên người dùng:</label>
            <input
              type="text"
              id="userName"
              name="userName"
                value={formData?.userName} onChange={handleChange}
              required
            />

            <label htmlFor="role">Vai trò:</label>
            <select
              id="role"
              name="role"
              defaultValue={2}
                value={formData?.role} onChange={handleChange}
              required
            >
              <option value="1">Quản trị viên</option>
              <option value="2">Người dùng</option>
            </select>

            {!isUpdating ? (
            <>
              <label htmlFor="password">Mật khẩu:</label>
              <input type="password" id="password" name="password" value={formData?.password} onChange={handleChange} required />
            </>
          ) : (
            <>
              <label htmlFor="status">Trạng thái:</label>
              <select id="status" name="status" value={formData?.status} onChange={handleChange} required>
                <option value="0">Ngưng hoạt động</option>
                <option value="1">Hoạt động</option>
              </select>
            </>
          )}

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button type="submit" variant="primary">
                {!isUpdating ? "Thêm" : "Cập nhật"}
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <div className="content_user">
        <div className="item_1">
          <div className="item_2">
            <h2>Quản lý người dùng</h2>
          </div>
          <div className="item_3"></div>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên</th>
              <th>Tên đăng nhập</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>
                <Button
                  variant="outline-success"
                  onClick={() => handleClickAdd()}
                >
                  Thêm mới
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {userApi?.length > 0 &&
              userApi?.map((data: IUserList, index) => {
                return (
                  <tr key={data?.id}>
                    <td>{index + 1}</td>
                    <td>{data?.fullName}</td>
                    <td>{data?.userName}</td>
                    <td>{data?.role == 1 ? "Quản trị viên" : "Người dùng"}</td>
                    <td>
                      <div className="statusIcon_user">
                        {data?.status == 1 ? (
                          <GrStatusGood />
                        ) : (
                          <GrStatusInfo />
                        )}
                      </div>
                    </td>
                    <td>{data?.createdAt}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                          onClick={() => handleClickUdateUser(data)}
                      >
                        Cập nhật
                      </Button>{" "}
                      <Button
                        variant="outline-danger"
                          onClick={() => handleClickDeleteUser(data)}
                      >
                        Xoá
                      </Button>{" "}
                    </td>
                  </tr>
                );
              })}
              {userApi?.length == 0 && (
                <tr>
                  <td colSpan={8}>Không có dữ liệu</td>
                </tr>
              )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UserListComponent;
