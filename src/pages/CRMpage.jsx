import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
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
  //   const users = useSelector((state) => state.crm.users);

  useEffect(() => {
    axios
      .get("/users/getAllUsers")
      .then((response) => {
        setAllUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   const handleAdminToggle = (event, user) => {
  //     dispatch(updateUserAdminStatus(user.id, event.target.checked));
  //   };

  //   const handleBizToggle = (event, user) => {
  //     dispatch(updateUserBizStatus(user.id, event.target.checked));
  //   };

  if (!allUsers) {
    return <CircularProgress />;
  }
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Email</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>Biz</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {allUsers.map((user) => (
          <TableRow key={user._id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Checkbox
                checked={user.isAdmin}
                // onChange={(event) => handleAdminToggle(event, user)}
              />
            </TableCell>
            <TableCell>
              <Checkbox
                checked={user.biz}
                // onChange={(event) => handleBizToggle(event, user)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CRMPage;
