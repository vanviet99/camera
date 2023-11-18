
// // async function displayUserInfo(userId) {
// //     try {
     
// //         const userInfoResponse = await fetch(`http://localhost:5000/api/v1/auth/userInfo/${userId}`);
// //         if (!userInfoResponse.ok) {
// //             throw new Error(`Lỗi khi gọi API: ${userInfoResponse.statusText}`);
// //         }

// //         const userData = await userInfoResponse.json();
// //         const userInfo = userData.userInfo;


// //         console.log('Thông tin người dùng:', userInfo);

// //         const displayImage = document.getElementById('displayImage');

// //         if (userInfo.image) {
//             // const dataUrl = `data:image/jpeg;base64,${userInfo.image}`;
// //             displayImage.src = dataUrl;
// //         } else {
// //             console.error('Dữ liệu ảnh không hợp lệ');
// //         }
// //     } catch (error) {
// //         console.error('Lỗi khi lấy thông tin người dùng:', error.message);
// //     }
// // }

// // const userId = '655319644e8e9e36d686b754';
// // displayUserInfo(userId);

// // async function addProduct() {
// //     const productForm = document.getElementById('productForm');
// //     const formData = new FormData(productForm);

// //     try {
// //         const response = await fetch('http://localhost:5000/api/v1/product/addProduct', {
// //             method: 'POST',
// //             body: formData,
// //         });

// //         const result = await response.json();

// //         if (response.ok) {
// //             alert('Thêm sản phẩm thành công!');
// //             console.log(result);
// //         } else {
// //             alert(`Thêm sản phẩm thất bại: ${result.message}`);
// //         }
// //     } catch (error) {
// //         console.error('Lỗi kết nối:', error);
// //     }
// // }

// // document.addEventListener('DOMContentLoaded', function () {
// //     const refreshBtn = document.getElementById('refreshBtn');
// //     const resultDiv = document.getElementById('result');

// //     refreshBtn.addEventListener('click', async function () {
// //         try {
// //             const refreshToken = 'YOUR_REFRESH_TOKEN_HERE';  // Replace with your actual refresh token
// //             const response = await fetch('http://localhost:5000/refreshToken', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({ refreshToken }),
// //             });

// //             const data = await response.json();

// //             if (response.ok) {
// //                 resultDiv.textContent = 'Refresh Token thành công: ' + data.message;
// //             } else {
// //                 resultDiv.textContent = 'Lỗi: ' + data.message;
// //             }
// //         } catch (error) {
// //             console.error('Lỗi khi thực hiện Refresh Token:', error);
// //             resultDiv.textContent = 'Lỗi khi thực hiện Refresh Token';
// //         }
// //     });
// // });

// function registerUser() {
//     try {
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;
//         const phone = document.getElementById('phone').value;
//         const money = document.getElementById('money').value;
//         const email = document.getElementById('email').value;
//         const comment = document.getElementById('comment').value;
//         const avatarInput = document.getElementById('avatar');

//         // Kiểm tra xem người dùng đã chọn ảnh chưa
//         if (!avatarInput.files || avatarInput.files.length === 0) {
//             alert('Vui lòng chọn ảnh đại diện');
//             return;
//         }

//         const avatar = avatarInput.files[0];

//         // Tạo FormData để chuyển ảnh
//         const formData = new FormData();
//         formData.append('username', username);
//         formData.append('password', password);
//         formData.append('phone', phone);
//         formData.append('money', money);
//         formData.append('email', email);
//         formData.append('comment', comment);
//         formData.append('avatar', avatar);

//         // Gửi dữ liệu đến API (thay đổi đường dẫn API tương ứng)
//         fetch('http://localhost:5000/api/v1/auth/register', {
//             method: 'POST',
//             body: formData,
//         })
//         .then(response => response.json())
//         .then(data => {
//             if (response.ok) {
//                 alert(data.message);
//                 // Redirect or perform other actions upon successful registration
//             } else {
//                 alert(data.message);
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Đã xảy ra lỗi khi đăng ký');
//         });
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Đã xảy ra lỗi khi đăng ký');
//     }
// }

// // Xem trước ảnh trước khi đăng ký
// document.getElementById('avatar').addEventListener('change', function (event) {
//     const preview = document.getElementById('avatarPreview');
//     const file = event.target.files[0];

//     if (file) {
//         const reader = new FileReader();

//         reader.onload = function (e) {
//             preview.src = e.target.result;
//             preview.style.display = 'block';
//         };

//         reader.readAsDataURL(file);
//     } else {
//         preview.style.display = 'none';
//     }
// });
