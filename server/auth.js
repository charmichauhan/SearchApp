// const express = require('express');
// const validator = require('validator');

// const router = new express.Router();

// // function validateSignupForm(payload) {
// //   const errors = {};
// //   let isFormValid = true;
// //   let message = '';

// //   if (!payload || typeof payload.Email !== 'string' || !validator.isEmail(payload.Email)) {
// //     isFormValid = false;
// //     errors.Email = 'Please provide a correct email address.';
// //   }

// //   if (!payload || typeof payload.Password !== 'string' || payload.Password.trim().length < 8) {
// //     isFormValid = false;
// //     errors.Password = 'Password must have at least 8 characters.';
// //   }

// //   if (!payload || typeof payload.Username !== 'string' || payload.Username.trim().length === 0) {
// //     isFormValid = false;
// //     errors.Username = 'Please provide your username.';
// //   }

// //   if (!isFormValid) {
// //     message = 'Check the form for errors.';
// //   }

// //   return {
// //     success: isFormValid,
// //     message,
// //     errors
// //   };
// // }

// function validateLoginForm(payload) {
//   const errors = {};
//   let isFormValid = true;
//   let message = '';

//   if (!payload || typeof payload.Username !== 'string' || payload.Username.trim().length === 0) {
//     isFormValid = false;
//     errors.Username = 'Please provide your Username.';
//   }

//   if (!payload || typeof payload.Password !== 'string' || payload.Password.trim().length === 0) {
//     isFormValid = false;
//     errors.Password = 'Please provide your password.';
//   }

//   if (!isFormValid) {
//     message = 'Check the form for errors.';
//   }

//   return {
//     success: isFormValid,
//     message,
//     errors
//   };
// }

// router.post('/register', (req, res) => {
//   const validationResult = validateSignupForm(req.body);
//   if (!validationResult.success) {
//     return res.status(400).json({
//       success: false,
//       message: validationResult.message,
//       errors: validationResult.errors
//     });
//   }

//   return res.status(200).end();
// });

// router.post('/', (req, res) => {
//   const validationResult = validateLoginForm(req.body);
//   if (!validationResult.success) {
//     return res.status(400).json({
//       success: false,
//       message: validationResult.message,
//       errors: validationResult.errors
//     });
//   }

//   return res.status(200).end();
// });
// module.exports = router;

//********************************************************************* */
