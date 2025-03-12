import { getToken } from "./../../funcs/utils.js";

const getAdminInfos = async () => {
  const res = await fetch(`http://localhost:4000/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  
  const admin = await res.json()

  return admin
};

export {
    getAdminInfos
}
