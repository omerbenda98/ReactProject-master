import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";
// import {
//   fetchUsers,
//   updateUserAdminStatus,
//   updateUserBizStatus,
// } from "./crmSlice";
import { CircularProgress } from "@mui/material";
import axios from "axios";

const CRMPage = () => {
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    axios
      .get("/users/getAllUsers")
      .then((response) => {
        setAllUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const handleUpdate = async (userId) => {
    const user = allUsers.find((user) => user._id === userId);
    try {
      delete user._id;
      delete user.isAdmin;
      await axios.put(`/users/userInfo/${userId}`, user);
      toast.success("user updated");
    } catch (err) {
      console.log("err", err);
      toast.error("error");
    }
  };

  const handleBizToggle = (event, user) => {
    const checked = event.target.checked;
    setAllUsers((prevUsers) =>
      prevUsers.map((prevUser) =>
        prevUser._id === user._id ? { ...prevUser, biz: checked } : prevUser
      )
    );
  };

  if (!allUsers) {
    return <CircularProgress />;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Biz</TableCell>
          <TableCell>Update</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allUsers.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Checkbox
                checked={user.biz}
                onChange={(event) => handleBizToggle(event, user)}
              />
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdate(user._id)}
              >
                Update
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CRMPage;
