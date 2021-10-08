const admin = require('firebase-admin');
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
admin.initializeApp(functions.config().firebase);

exports.setUserClaim = functions.auth.user().onCreate((user) => {
  grantUserRole(user.uid);
});

// const grantModeratorRole = (userId) =>
//   admin.auth().setCustomUserClaims(userId, {
//     user: true,
//     admin: false,
//     moderator: true,
//   });

const grantAdminRole = (userId) => {
  return admin.auth().setCustomUserClaims(userId, {
    admin: true,
  });
};
const grantUserRole = (userId) => {
  admin.auth().setCustomUserClaims(userId, {
    admin: false,
  });
};
// exports.addModerator = functions.https.onRequest((req, res) => {
//   const token = req.get('Authorization');
//   if (token) {
//     const tokenId = token.split('Bearer ')[1];
//     return admin
//       .auth()
//       .verifyIdToken(tokenId)
//       .then((decoded) => res.status(200).send(decoded))
//       .catch((err) => res.status(401).send(err));
//   } else {
//     res.status(403).send('No Token Provided');
//   }

//   //     admin.auth().verifyIdToken(req.Authorization)
//   //   if (context.auth.token.admin !== true) {
//   //     // 1
//   //     return {
//   //       error: 'Request not authorized. User must be a admin',
//   //     };
//   //   } // 2
//   //   const userId = data.uid; // 3
//   //   return grantModeratorRole(userId).then(() => {
//   //     return {
//   //       result: `Request fulfilled! ${userId} is now a
//   //                 moderator.`,
//   //     };
//   //   }); // 4
// });
exports.addAdmin = functions.https.onCall((data, context) => {
  //   if (context.auth.token.admin !== true) {
  //     // 1
  //     return {
  //       error: 'Request not authorized. User must be a admin.',
  //     };
  //   } // 2
  const userId = data.userId;
  const token = context.rawRequest.get('Authorization').split('Bearer ')[1];
  console.log(token);
  if (token) {
    return admin
      .auth()
      .verifyIdToken(token)
      .then((decoded) => {
        grantAdminRole(userId)
          .then(() => {
            console.log('Addmin Ading role for ' + userId);
            return {
              result: `Request fulfilled! ${userId} is now a
                moderator.`,
            };
          })
          .catch((e) => {
            return {
              result: `Request failed! ${e.message}`,
            };
          });
      })
      .catch((err) => {
        return {
          result: 'Not Authorized.',
        };
      });
  } else {
    return {
      result: 'Request failed',
    };
  }
});
