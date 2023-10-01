 class UserModel
{
    uid;
    ipaddress;
    name;
    email;
    password="";
    salt="";
    status=1;
    comcode;
    role=1;

}
module.exports = new UserModel()