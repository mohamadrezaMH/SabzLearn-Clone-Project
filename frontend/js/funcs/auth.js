const register = () => {
    const nameInput = document.querySelector("#name");
    const usernameInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");
    const phoneInput = document.querySelector("#phone");
    const passwordInput = document.querySelector("#password");
  
    const newUserInfos = {
      name: nameInput.value.trim(),
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      password: passwordInput.value.trim(),
      confirmPassword: passwordInput.value.trim(),
    };
  
    fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    })
      .then((res) => {
        if(res.status === 201) {
          swal({
            title: "ثبت نام با موفقیت انجام شد",
            icon: 'success',
            buttons: 'ورود به پنل'
          })
        } else if (res.status === 409) {
          swal({
            title: "نام کاربری یا ایمیل قبلا استفاده شده",
            icon: 'error',
            buttons: 'تصحیح اطلاعات'
          })
        }
        return res.json()
      })
      .then((result) => console.log(result));
  };
  
  export { register };
  